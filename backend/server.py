from flask import Flask, jsonify, request
from flask_cors import CORS
from api.v1.nurse import nurse_bp

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}) 

app.register_blueprint(nurse_bp, url_prefix="/api/v1/nurse")

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
