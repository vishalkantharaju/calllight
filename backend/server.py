from flask import Flask, jsonify, request
from flask_cors import CORS
# from api.v1.ambulance import ambulance_bp
# from api.v1.hospital import hospital_bp
# from api.v1.report import report_bp

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}) 

# app.register_blueprint(ambulance_bp, url_prefix="/api/v1/ambulance")
# app.register_blueprint(hospital_bp, url_prefix="/api/v1/hospital")
# app.register_blueprint(message_bp, url_prefix="/api/v1/message")
# app.register_blueprint(report_bp, url_prefix="/api/v1/report")

@app.errorhandler(413)
def page_not_found(error):
    print("=" * 60)
    print("in error handler")
    print(error)
    print(request.headers)
    print(f"content_length = {request.content_length}")
    print(f"max_size = {1024 * 1024 * 16}")
    print("=" * 60)
    return error


@app.route("/")
def is_server_running():
    return jsonify(dict(success="Backend for CallLight is running!"))


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
