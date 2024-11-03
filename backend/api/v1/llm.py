from flask import Blueprint, Response, jsonify, Flask, request
from typing import Tuple
from flask.views import MethodView
from datetime import datetime
from flask_cors import cross_origin
import shared.db.model as db_model
from shared.types.status import ErrorResponse, GeneralResponse
from flask_pydantic import validate
# from shared.types.ambulance import GetAmbulanceRequest, GetAmbulanceResponse, GetAmbResponse, AmbulanceLoginRequest, AmbulanceLoginResponse
from shared.db.schema import NurseSchema, ReportSchema
from shared.types.report import CreateReportRequest
from bson import ObjectId
import io
from scipy.io import wavfile
import whisper
import openai
# from pydub import AudioSegment

openai.api_key = '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' 

llm_bp = Blueprint("llm", __name__)

whisper_model = whisper.load_model("small")

# class TranscribeSpeech(MethodView):
#     @cross_origin(headers=["Content-Type", "Authorization"])
#     @validate()
#     def get(self, query : TranscribeSpeechRequest) -> Tuple[Response, int]:
#         result = model.transcribe("converted_audio4.wav")
#         print(result["text"])

class ProcessAudio(MethodView):
    @cross_origin(headers=["Content-Type", "Authorization"])
    def post(self) -> Tuple[Response, int]:
        if 'audio' not in request.files:
            return jsonify({"error": "No audio file part in the request"}), 400

        file = request.files['audio']
        
        if file.filename == '':
            return jsonify({"error": "No file selected for uploading"}), 400

        language = request.form.get("language", "")
        
        try:
            # Read the audio file into memory
            audio_data = file.read()

            temp_file_path = 'temp_audio.wav'
            with open(temp_file_path, 'wb') as temp_file:
                temp_file.write(audio_data)

            # audio_data.seek(0)
            print('here')
            # Load the audio for processing with Whisper
            audio = whisper.load_audio(temp_file_path)
            print('boo')
            # audio = whisper_model.pad_or_trim(audio)
            print('hola')
            options = {
                "language": language, 
            }
            result = whisper_model.transcribe(audio, **options)

            # Sample response on success
            response = {
                "message": "Audio file processed successfully",
                "language": language,
                "transcription": result["text"]  # Include the transcription result
            }
            return jsonify(response), 200
        
        except Exception as e:
            return jsonify({"error": str(e)}), 500

class CreateReport(MethodView):
    @cross_origin(headers=["Content-Type", "Authorization"])
    def post(self) -> Tuple[Response, int]:
        if 'audio' not in request.files:
            return jsonify({"error": "No audio file part in the request"}), 400
        file = request.files['audio']
        
        if file.filename == '':
            return jsonify({"error": "No file selected for uploading"}), 400

        language = request.form.get("language", "")
        transcript = request.form.get("transcript", "")
        nurse_id = ObjectId(request.form.get("nurse_id", ""))
        patient_id = ObjectId(request.form.get("patient_id", ""))
        if language != 'en':
            try:
                audio_data = file.read()

                temp_file_path = 'temp_audio.wav'
                with open(temp_file_path, 'wb') as temp_file:
                    temp_file.write(audio_data)

                # audio_data.seek(0)
                print('here')
                # Load the audio for processing with Whisper
                audio = whisper.load_audio(temp_file_path)
                print('boo')
                # audio = whisper_model.pad_or_trim(audio)
                print('hola')
                options = {
                    "language": 'en',
                    "task": "translate" 
                }
                result = whisper_model.transcribe(audio, **options)

                transcript = result['text'] 
            
            except Exception as e:
                return jsonify({"error": str(e)}), 500
        
        id, err = db_model.create_report(ReportSchema(patient_id=patient_id, nurse_id=nurse_id, transcript=transcript, date_created = datetime.now(), date_modified = datetime.now(), resolved=False, priority=classify_severity(transcript)))

        if err is not None:
            return jsonify(dict(ErrorResponse(err=err))), 400
        
        return jsonify(dict(GeneralResponse(success=True))), 201 
    
def classify_severity(request_text):
    # Define your prompt for severity classification
    prompt = f"""
    You are an assistant that classifies the severity of patient requests based on urgency and impact. 

    Request:
    "{request_text}"

    Classify this request as one of the following: Emergency, Immediate, Moderate, Routine. As an example, Routine would be a request for non-time sensitive matters, like a request for water or for a routine check-up. 
    Moderate is for requests with more of a deadline, like a request to go to the bathroom. 
    Immediate is something urgent like a high pain level.
    Emergency is the highest level, for things like abnormal blood pressure.

    Provide a single word response.
    """

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        temperature=0  # Low temperature for consistent outputs
    )

    # Parse and return the response
    answer = response.choices[0].message["content"].strip()
    return answer

class PopulateRequests(MethodView):
    def get(self) -> Tuple[str, str]:
        db_model.populate_requests()
        return "Success", "Hi"
    
# Register endpoint
llm_bp.add_url_rule('/summarize', view_func=ProcessAudio.as_view('summarize'), methods=["POST"]) 
llm_bp.add_url_rule('/create', view_func=CreateReport.as_view('create'), methods=["POST"])
llm_bp.add_url_rule("/populate", view_func=PopulateRequests.as_view("populate"), methods=["GET"])
# llm_bp.add_url_rule("/delete", view_func=DeleteNurses.as_view("delete"), methods=["GET"])