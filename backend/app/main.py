from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.analyze import router as analyze_router
from app.api.routes.auth import router as auth_router
from dotenv import load_dotenv
import os
load_dotenv()

print("MONGO_URL:", os.getenv("MONGO_URL"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://hiremind-frontend-voin.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze_router)
app.include_router(auth_router)


@app.get("/")
def root():
    return {"message": "HireMind API is running"}