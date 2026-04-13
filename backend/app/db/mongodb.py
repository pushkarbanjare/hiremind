from pymongo import MongoClient
import os

MONGO_URL = os.getenv("MONGO_URL")

client = MongoClient(MONGO_URL) # ==================== connection pool
db = client["hiremind_db"]  # ==================== database instance

def get_db():
    return db