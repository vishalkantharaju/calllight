import whisper
from pydub import AudioSegment
# from transformers import BartForConditionalGeneration, BartTokenizer
from transformers import T5ForConditionalGeneration, T5Tokenizer
import sentencepiece
import ffmpeg

# m4a to wav
# audio = AudioSegment.from_file("NewRecording4.m4a", format="m4a")
# audio = audio.set_frame_rate(16000).set_channels(1)  # Set to 16kHz mono
# audio.export("converted_audio4.wav", format="wav")

# # Load the Whisper model
# model = whisper.load_model("small")  # You can also use "small", "medium", or "large"
# result = model.transcribe("transcribe_test/wav/converted_audio.wav")
# print(result["text"])

# video to wav
# ffmpeg.input("/Users/VishalKantharaju/Coding/calllight/backend/translate_test/spanish.mp4").output("translate_test/output_audio.wav", format='wav').run()

# translation
model = whisper.load_model("small")  # You can also use "small", "medium", or "large"
result = model.transcribe("translate_test/output_audio.wav", task="translate")
print(result["text"])