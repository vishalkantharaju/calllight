from flask import Blueprint, Response, jsonify
from typing import Tuple
from flask.views import MethodView
from datetime import datetime
from flask_cors import cross_origin
import shared.db.model as db_model
from shared.types.status import ErrorResponse
from flask_pydantic import validate
from shared.types.patient import PatientLoginRequest, PatientLoginResponse
# from shared.types.ambulance import GetAmbulanceRequest, GetAmbulanceResponse, GetAmbResponse, AmbulanceLoginRequest, AmbulanceLoginResponse
from shared.db.schema import NurseSchema
from bson import ObjectId

patient_bp = Blueprint("patient", __name__)

class PopulatePatients(MethodView):
    def get(self) -> Tuple[str, str]:
        db_model.populate_patients()
        return "Success", "Hi"

class DeletePatients(MethodView):
    def get(self) -> Tuple[str, str]:
        db_model.delete_patients()
        return "Success", "Hi"

class VerifyPatient(MethodView):
    @cross_origin(headers=["Content-Type", "Authorization"])
    @validate()
    def get(self, query : PatientLoginRequest) -> Tuple[Response, int]:
        response, err = db_model.login_patient(query.username, query.password)

        if err is not None:
            return jsonify(dict(ErrorResponse(err=err))), 404

        resp = PatientLoginResponse(**response.dict(), success=True)
        return jsonify(dict(resp)), 200
    
patient_bp.add_url_rule("/populate", view_func=PopulatePatients.as_view("populate"), methods=["GET"])
patient_bp.add_url_rule("/delete", view_func=DeletePatients.as_view("delete"), methods=["GET"])
patient_bp.add_url_rule("/login", view_func=VerifyPatient.as_view("login"), methods=['GET'])