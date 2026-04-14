from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends
import shutil
import os
from app.services.pipeline import analyze_resume
from app.schemas.analyze_schema import AnalyzeResponse
from app.core.dependency import get_current_user

router = APIRouter()

# ========== analyze route ==========
@router.post("/analyze", response_model=AnalyzeResponse)
def analyze(
    file: UploadFile = File(...),
    jd_text: str = Form(...),
    user: str = Depends(get_current_user),  # ==================== protected route
):
    # ========== validate JD ==========
    if not jd_text.strip():
        raise HTTPException(status_code=400, detail="Job description can't be empty")
    
    # ========== validate file ==========
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")

    # ========== save file temporarily ==========
    temp_path = f"temp_{file.filename}"

    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)   # ==================== stream file from memory to disk
    

    try:
        # ========== call pipeline ==========
        result = analyze_resume(temp_path, jd_text)
    except Exception as e:
        # ========== cleanup ==========
        os.remove(temp_path)
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
    os.remove(temp_path)

    return result