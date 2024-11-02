from flask import Blueprint, Response, jsonify
from typing import Tuple
from flask.views import MethodView
from datetime import datetime
from flask_cors import cross_origin
import shared.db.model as db_model
from shared.types.status import ErrorResponse
from flask_pydantic import validate
# from shared.types.ambulance import GetAmbulanceRequest, GetAmbulanceResponse, GetAmbResponse, AmbulanceLoginRequest, AmbulanceLoginResponse
from shared.db.schema import NurseSchema
from bson import ObjectId

nurse_bp = Blueprint("nurse", __name__)

class PopulateNurses(MethodView):
    def get(self) -> Tuple[str, str]:
        db_model.populate_nurses()
        return "Success", "Hi"

class DeleteNurses(MethodView):
    def get(self) -> Tuple[str, str]:
        db_model.delete_ambulances()
        return "Success", "Hi"
    
nurse_bp.add_url_rule("/populate", view_func=PopulateNurses.as_view("populate"), methods=["GET"])
nurse_bp.add_url_rule("/delete", view_func=DeleteNurses.as_view("delete"), methods=["GET"])