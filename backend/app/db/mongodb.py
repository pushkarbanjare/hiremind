from pymongo import MongoClient
import os

MONGO_URL = os.getenv("MONGO_URL")
print("MONGO_URL:", MONGO_URL)

client = MongoClient(MONGO_URL)
db = client["hiremind_db"]

def get_db():
    return db