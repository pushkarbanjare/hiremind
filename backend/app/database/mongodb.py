from pymongo import MongoClient
import os

MONGO_URL = os.getenv("MONGO_URL")

# ========== connection pool ==========
client = MongoClient(MONGO_URL)

# ========== database instance ==========
db = client["hiremind_db"]  

def get_db():
    return db