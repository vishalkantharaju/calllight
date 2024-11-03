from flask import Blueprint, Response, jsonify
from typing import Tuple
from flask.views import MethodView
from datetime import datetime
from flask_cors import cross_origin
import shared.db.model as db_model
from shared.types.status import ErrorResponse
from flask_pydantic import validate
from shared.types.nurse import NurseLoginRequest, NurseLoginResponse, GetNurseRequest, GetNurseResponse
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

class VerifyNurse(MethodView):
    @cross_origin(headers=["Content-Type", "Authorization"])
    @validate()
    def get(self, query : NurseLoginRequest) -> Tuple[Response, int]:
        response, err = db_model.login_nurse(query.username, query.password)
        print('asas')
        if err is not None:
            return jsonify(dict(ErrorResponse(err=err))), 404
        print('asas')
        resp = NurseLoginResponse(**response.dict(), success=True)
        return jsonify(dict(resp)), 200

class FetchNurse(MethodView):
    @cross_origin(headers=["Content-Type", "Authorization"])
    @validate()
    def get(self, query : GetNurseRequest) -> Tuple[Response, int]: 
        response, err = db_model.fetch_nurse(query.id)
        print(err)
        if err is not None:
            return jsonify(dict(ErrorResponse(err=err))), 404
        print(response)
        resp = GetNurseResponse(**response.dict(), success=True)
        return jsonify(dict(resp)), 200
    
nurse_bp.add_url_rule("/populate", view_func=PopulateNurses.as_view("populate"), methods=["GET"])
nurse_bp.add_url_rule("/delete", view_func=DeleteNurses.as_view("delete"), methods=["GET"])
nurse_bp.add_url_rule("/login", view_func=VerifyNurse.as_view("login"), methods=['GET'])
nurse_bp.add_url_rule("/fetch", view_func=FetchNurse.as_view("fetch"), methods=['GET'])