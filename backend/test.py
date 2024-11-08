# import whisper
# from pydub import AudioSegment
# # from transformers import BartForConditionalGeneration, BartTokenizer
# from transformers import T5ForConditionalGeneration, T5Tokenizer
# import sentencepiece
# import ffmpeg

# # m4a to wav
# # audio = AudioSegment.from_file("NewRecording4.m4a", format="m4a")
# # audio = audio.set_frame_rate(16000).set_channels(1)  # Set to 16kHz mono
# # audio.export("converted_audio4.wav", format="wav")

# # # Load the Whisper model
# # model = whisper.load_model("small")  # You can also use "small", "medium", or "large"
# # result = model.transcribe("transcribe_test/wav/converted_audio.wav")
# # print(result["text"])

# # video to wav
# # ffmpeg.input("/Users/VishalKantharaju/Coding/calllight/backend/translate_test/spanish.mp4").output("translate_test/output_audio.wav", format='wav').run()

# # translation
# model = whisper.load_model("small")  # You can also use "small", "medium", or "large"
# result = model.transcribe("translate_test/output_audio.wav", task="translate")
# print(result["text"])
import openai

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

# Example usage
request_text = "I need water."
severity_response = classify_severity(request_text)
print(severity_response)