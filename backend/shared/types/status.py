from pydantic import BaseModel
from typing import Optional
from flask import jsonify, make_response

from typing import Dict


class GeneralResponse(BaseModel):
    success: bool
    err: Optional[str] = ""


class ErrorResponse(BaseModel):
    success: bool = False
    err: str


def success_response(msg: str):
    return jsonify(msg), 200


def success_response(msg: Dict):
    return make_response(jsonify(msg), 200)
