from pymongo import MongoClient
from shared.constants import DB_USERNAME, DB_PASSWORD
from shared.db.schema import (
    PatientSchema,
    ReportSchema,
    NurseSchema
)
from shared.types.patient import Mine
from typing import List, Tuple
from pymongo.errors import PyMongoError
from bson.objectid import ObjectId
from datetime import datetime
from typing import List, Tuple
from pymongo.errors import PyMongoError
from bson.objectid import ObjectId
from datetime import datetime
import random
import openai

openai.api_key = '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' 

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

def login_nurse(username: str, password: str) -> Tuple[NurseSchema, str]:
    # print('ddad')
    document = db.nurses.find_one({"$and": [{"username": username}, {"password": password}]})

    # print('asas31312')
    if document:
        print(document) 
        document['_id'] = ObjectId(document['_id']) 
        resp = NurseSchema(**document)
        return resp, None
    else:
        return None, "Login failed"
    
def login_patient(username: str, password: str) -> Tuple[PatientSchema, str]:
    # print('ddad')
    document = db.patients.find_one({"$and": [{"username": username}, {"password": password}]})

    # print('asas31312')
    if document:
        print(document) 
        document['_id'] = ObjectId(document['_id']) 
        document['nurse_id'] = ObjectId(document['nurse_id'])
        resp = PatientSchema(**document)
        return resp, None
    else:
        return None, "Login failed"
    
def populate_patients() -> None:
    # Retrieve all nurses' IDs from the database
    nurses = list(db.nurses.find({}, {"_id": 1}))
    nurse_ids = [nurse["_id"] for nurse in nurses]

    # Define sample patient data
    patient_names = [
        "John Doe", "Jane Smith", "Paul Brown", "Lucy Gray", "Michael Green",
        "Olivia Blue", "Liam White", "Sophia Pink", "James Black", "Emma Yellow",
        "Daniel Silver", "Isabella Gold", "Ethan Bronze", "Mia Red", "Alexander Orange",
        "Ava Purple", "Logan Aqua", "Charlotte Lime", "Mason Crimson", "Amelia Cyan"
    ]
    usernames = [
        "jdoe", "jsmith", "pbrown", "lgray", "mgreen",
        "oblue", "lwhite", "spink", "jblack", "eyellow",
        "dsilver", "igold", "ebronze", "mred", "aorange",
        "apurple", "laqua", "clime", "mcrimson", "acyan"
    ]
    passwords = [f"password{i+1}" for i in range(20)]
    genders = ["Male", "Female"]
    ages = [random.randint(20, 80) for _ in range(20)]
    rooms = [random.randint(100, 199) for _ in range(20)]

    current_datetime = datetime.now()
    patients = []
    for i in range(20):
        patient = PatientSchema(
            nurse_id=nurse_ids[i % len(nurse_ids)],  # Distribute nurse_ids equally
            name=patient_names[i],
            username=usernames[i],
            password=passwords[i],
            gender=random.choice(genders),
            age=ages[i],
            room=rooms[i],
            date_created=current_datetime,
            date_modified=current_datetime
        )
        patients.append(patient.dict(exclude_unset=True))

    # Insert patients into the database
    db.patients.insert_many(patients)
    print("Successfully populated 20 patients into the database.")

def delete_patients() -> Tuple[str, str]:
    db.patients.delete_many({})

def fetch_patient(id: ObjectId) -> Tuple[PatientSchema, str]:
    document = db.patients.find_one({"_id": ObjectId(id)})
    
    # print('asas31312')
    if document:
        # document['hospital_id'] = ObjectId(document['hospital_id'])
        document['_id'] = ObjectId(document['_id'])
        document['nurse_id'] = ObjectId(document['nurse_id'])
        resp = PatientSchema(**document)
        return resp, None
    else:
        return None, "Login failed"
    
def create_report(report: ReportSchema) -> Tuple[str, str]:
    report.nurse_id = ObjectId(report.nurse_id)
    report.patient_id = ObjectId(report.patient_id)
    db.requests.insert_one(report.dict())
    return '', None

def fetch_nurse(id: ObjectId) -> Tuple[PatientSchema, str]:
    document = db.nurses.find_one({"_id": ObjectId(id)})

    # print('asas31312')
    if document:
        # document['hospital_id'] = ObjectId(document['hospital_id'])
        document['_id'] = ObjectId(document['_id'])
        resp = NurseSchema(**document)
        return resp, None
    else:
        return None, "Fetch failed"
    
def populate_requests() -> None:
    # Retrieve all nurses' and patients' IDs from the database
    nurses = list(db.nurses.find({}, {"_id": 1}))
    patients = list(db.patients.find({}, {"_id": 1}))
    nurse_ids = [nurse["_id"] for nurse in nurses]
    patient_ids = [patient["_id"] for patient in patients]

    # Define sample request transcripts
    transcripts = [
        "Please give me water", "I need pain medicine", "Could you help me to the bathroom?",
        "I would like to speak to a doctor", "Can someone adjust my bed?", 
        "I need assistance with my meal", "I feel dizzy", "I need my medication",
        "Please bring me a blanket", "Can I have some ice?", "I need to change my bandage",
        "Can someone help me sit up?", "I need help with my IV", "I feel nauseous",
        "Could someone check my vitals?", "I need my wheelchair", "Can I have a pillow?",
        "Please bring me my phone", "Could someone help me with my oxygen mask?", "I need help to stand up"
    ]
    current_datetime = datetime.now()
    # Create 20 report entries
    requests = []
    for i in range(20):
        t = random.choice(transcripts)
        prompt = f"""
        You are an assistant that classifies the severity of patient requests based on urgency and impact. 

        Request:
        "{t}"

        Classify this request as one of the following: Emergency, Immediate, Moderate, Routine. As an example, Routine would be a request for non-time sensitive matters, like a request for water or for a routine check-up. 
        Moderate is for requests with more of a deadline, like a request to go to the bathroom. 
        Immediate is something urgent like a high pain level.
        Emergency is the highest level, for things like abnormal blood pressure.

        Provide a single word response.
        """

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0  # Low temperature for consistent outputs
        )

        # Parse and return the response
        answer = response.choices[0].message["content"].strip()

        report = ReportSchema(
            patient_id=patient_ids[i % len(patient_ids)],  # Distribute patient_ids equally
            nurse_id=nurse_ids[i % len(nurse_ids)],        # Distribute nurse_ids equally
            transcript=t,
            resolved=True,
            priority=answer,
            date_created=current_datetime,
            date_modified=current_datetime

        )
        requests.append(report.dict(exclude_unset=True))

    # Insert requests into the database
    db.requests.insert_many(requests)
    print("Successfully populated 20 requests into the database.")

def mine(id: ObjectId) -> Tuple[List[Mine], str]:
    query = {"nurse_id": id}

    # Query the database using the find method.
    cursor = db.requests.find(query)

    if cursor:
        ambulances = []

        for ambulance_doc in cursor:

            ambulance = Mine(**ambulance_doc)
            ambulances.append(ambulance)

        return ambulances, None
    else:
        return None, "Error"