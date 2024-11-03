from flask import Blueprint, Response, jsonify
from typing import Tuple
from flask.views import MethodView
from datetime import datetime
from flask_cors import cross_origin
import shared.db.model as db_model
from shared.types.status import ErrorResponse
from flask_pydantic import validate
# from shared.types.ambulance import GetAmbulanceRequest, GetAmbulanceResponse, GetAmbResponse, AmbulanceLoginRequest, AmbulanceLoginResponse
# from shared.db.schema import NurseSchema
from bson import ObjectId
from server import get_whisper_model, get_bart_model_and_tokenizer
# from pydub import AudioSegment

llm_bp = Blueprint("llm", __name__)

whisper_model = get_whisper_model()
bart_model, bart_tokenizer = get_bart_model_and_tokenizer()

# class TranscribeSpeech(MethodView):
#     @cross_origin(headers=["Content-Type", "Authorization"])
#     @validate()
#     def get(self, query : TranscribeSpeechRequest) -> Tuple[Response, int]:
#         result = model.transcribe("converted_audio4.wav")
#         print(result["text"])

# class DeleteNurses(MethodView):
#     def get(self) -> Tuple[str, str]:
#         db_model.delete_ambulances()
#         return "Success", "Hi"
    
# llm_bp.add_url_rule("/populate", view_func=PopulateNurses.as_view("populate"), methods=["GET"])
# llm_bp.add_url_rule("/delete", view_func=DeleteNurses.as_view("delete"), methods=["GET"])