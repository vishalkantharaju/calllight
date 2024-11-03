from flask import Blueprint, Response, jsonify
from typing import Tuple
from flask.views import MethodView
from datetime import datetime
from flask_cors import cross_origin
import shared.db.model as db_model
from shared.types.status import ErrorResponse, GeneralResponse
from flask_pydantic import validate
from shared.types.report import CreateReportRequest
from shared.db.schema import NurseSchema, PatientSchema, ReportSchema
from bson import ObjectId

report_bp = Blueprint("report", __name__)

# class CreateReport(MethodView):
#     @cross_origin(headers=["Content-Type", "Authorization"])
#     @validate()
#     def get(self, query : CreateReportRequest) -> Tuple[Response, int]:
#         response, err = db_model.create_report(query.patient_id, query.nurse_id, query.transcript, query.language)
#         report = ReportSchema(id = ObjectId(), patient_id = query.patient_id, nurse_id = query.nurse_id, transcript = query.transcript, date_created = datetime.now(), date_modified = datetime.now())
#         if err is not None:
#             return jsonify(dict(ErrorResponse(err=err))), 404

#         resp = GeneralResponse(**response.dict(), success=True)
#         return jsonify(dict(resp)), 200
    
# report_bp.add_url_rule("/create", view_func=CreateReport.as_view("create"), methods=["POST"])
