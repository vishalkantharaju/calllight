from pydantic import BaseModel, Field
from datetime import datetime
from bson.objectid import ObjectId
from typing import List, Literal, Optional

class PydanticObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not isinstance(v, ObjectId):
            raise TypeError("ObjectId required")
        return str(v)

class DatabaseSchema(BaseModel):
    id: Optional[PydanticObjectId] = Field(alias="_id")
    date_created: datetime
    date_modified: datetime

    def dict(self, exclude_none=True, **kwargs):
        return super().dict(exclude_none=exclude_none, **kwargs)
    
class NurseSchema(DatabaseSchema):
    name: str
    username: str
    password: str

class PatientSchema(DatabaseSchema):
    nurse_id: PydanticObjectId
    name: str
    username: str
    password: str
    gender: str
    age: int
    room: int

class ReportSchema(DatabaseSchema):
    patient_id: PydanticObjectId
    nurse_id: PydanticObjectId
    transcript: str
    summary: Optional[str]
    priority: Optional[str]
    resolved: bool
    priority: str
