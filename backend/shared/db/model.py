from pymongo import MongoClient
from shared.constants import DB_USERNAME, DB_PASSWORD
from shared.db.schema import (
    PatientSchema,
    ReportSchema,
    NurseSchema
)
from typing import List, Tuple
from pymongo.errors import PyMongoError
from bson.objectid import ObjectId
from datetime import datetime
from typing import List, Tuple
from pymongo.errors import PyMongoError
from bson.objectid import ObjectId
from datetime import datetime

MONGO_URI = (
    f"mongodb+srv://{DB_USERNAME}:{DB_PASSWORD}@cluster0.kuetl.mongodb.net/?retryWrites=true&w=majority"
)
db = MongoClient(MONGO_URI)["dev"]

def populate_nurses() -> Tuple[str, str]:
    nurse_data = [
        NurseSchema(
            name="Vishal Kantharaju",
            username="vkantharaju",
            password="password1",
            id=ObjectId(),
            date_created=datetime.now(),
            date_modified=datetime.now(),
        ),
        NurseSchema(
            name="Angelica Sharma",
            username="asharma",
            password="password2",
            id=ObjectId(),
            date_created=datetime.now(),
            date_modified=datetime.now(),
        ),
        NurseSchema(
            name="Thida Lay-Sok",
            username="tlay-sok",
            password="password3",
            id=ObjectId(),
            date_created=datetime.now(),
            date_modified=datetime.now(),
        ),
        NurseSchema(
            name="Arnav Joshi",
            username="ajoshi",
            password="password4",
            id=ObjectId(),
            date_created=datetime.now(),
            date_modified=datetime.now(),
        ),
        NurseSchema(
            name="Cameron Cox",
            username="cco",
            password="password5",
            id=ObjectId(),
            date_created=datetime.now(),
            date_modified=datetime.now(),
        ),
    ]

    for nurse in nurse_data:
        nurse_dict = nurse.dict(exclude_unset=True)
        db.nurses.insert_one(nurse_dict)

def delete_nurses() -> Tuple[str, str]:
    db.nurses.delete_many({})