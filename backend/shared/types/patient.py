from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from shared.types.status import GeneralResponse
from shared.db.schema import PydanticObjectId, NurseSchema, PatientSchema, ReportSchema

class PatientLoginRequest(BaseModel):
    username: str
    password: str

class PatientLoginResponse(GeneralResponse):
    id: str