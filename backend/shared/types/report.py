from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from shared.types.status import GeneralResponse
from shared.db.schema import PydanticObjectId, NurseSchema, PatientSchema, ReportSchema

class CreateReportRequest(BaseModel):
    patient_id: str
    nurse_id: str
    transcript: str
    language: str