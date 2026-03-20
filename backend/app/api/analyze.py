from fastapi import APIRouter, UploadFile, File, Form
import shutil
import os
from app.services.pipeline import analyze_resume

router = APIRouter()

@router.post("/analyze")
def analyze(
    file: UploadFile = File(...),
    jd_text: str = Form(...)
):
    # save file temporarily
    temp_path = f"temp_{file.filename}"

    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # call pipeline
    result = analyze_resume(temp_path, jd_text)

    # cleanup
    os.remove(temp_path)

    return result