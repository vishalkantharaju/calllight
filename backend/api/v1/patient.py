from flask import Blueprint, Response, jsonify
from typing import Tuple
from flask.views import MethodView
from datetime import datetime
from flask_cors import cross_origin
import shared.db.model as db_model
from shared.types.status import ErrorResponse
from flask_pydantic import validate
from shared.types.patient import PatientLoginRequest, PatientLoginResponse, GetPatientRequest, GetPatientResponse, Mine, MineList
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
    
class FetchPatient(MethodView):
    @cross_origin(headers=["Content-Type", "Authorization"])
    @validate()
    def get(self, query : GetPatientRequest) -> Tuple[Response, int]: 
        response, err = db_model.fetch_patient(query.id)
        # print('asas')
        if err is not None:
            return jsonify(dict(ErrorResponse(err=err))), 404
        print(response)
        resp = GetPatientResponse(**response.dict(), success=True)
        return jsonify(dict(resp)), 200
    
class MinePatient(MethodView):
    @cross_origin(headers=["Content-Type", "Authorization"])
    @validate()
    def get(self, query : GetPatientRequest) -> Tuple[Response, int]: 
        response, err = db_model.mine(query.id)
        if err is not None:
            return jsonify(dict(ErrorResponse(err=err))), 404
        # # print('asas')
        resp = []
        for club in response: 
            resp.append(club) 

        resp = MineList(ambulances = resp, success=True).dict()
        return jsonify(resp), 200
    
# class AmbulanceList(MethodView):
#     @cross_origin(headers=["Content-Type", "Authorization"])
#     @validate()
#     def get(self, query : GetAmbulanceRequest)  -> Tuple[Response, int]:
#         # print('asas')
#         response, err = db_model.get_ambulances(query.id)
#         # # print('asas')
#         if err is not None:
#             return jsonify(dict(ErrorResponse(err=err))), 404
#         # # print('asas')
#         resp = []
#         for club in response:
#             club.hospital_id = ObjectId(club.hospital_id)
#             club.id = str(club.id)
#             club.history = str(club.history)
#             resp.append((GetAmbResponse(id=str(club.id), unit = club.unit, loc = [club.loc.x, club.loc.y], status = club.status, hospital_id = str(club.hospital_id), history = club.history, reported = club.reported, ))) 

#         resp = GetAmbulanceResponse(ambulances = resp, success=True).dict()
#         return jsonify(resp), 200
    
patient_bp.add_url_rule("/populate", view_func=PopulatePatients.as_view("populate"), methods=["GET"])
patient_bp.add_url_rule("/delete", view_func=DeletePatients.as_view("delete"), methods=["GET"])
patient_bp.add_url_rule("/login", view_func=VerifyPatient.as_view("login"), methods=['GET'])
patient_bp.add_url_rule("/fetch", view_func=FetchPatient.as_view("fetch"), methods=["GET"])
patient_bp.add_url_rule("/mine", view_func=MinePatient.as_view("mine"), methods=["GET"])