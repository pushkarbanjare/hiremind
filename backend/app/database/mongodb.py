from pymongo import MongoClient
from pymongo.database import Database
import os

MONGO_URL = os.getenv("MONGO_URL")

# ========== connection pool ==========
client = MongoClient(
    MONGO_URL,
    maxPoolSize=50,
    minPoolSize=5,
    serverSelectionTimeoutMS=10000,
)

# ========== database instance ==========
db: Database = client["hiremind_db"]  

def get_db():
    return db