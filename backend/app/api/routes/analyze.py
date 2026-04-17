from fastapi import APIRouter, HTTPException, Depends
from app.services.pipeline import analyze_resume
from app.schemas.analyze_schema import AnalyzeResponse, AnalyzeRequest
from app.core.dependency import get_current_user
from app.db.mongodb import get_db

router = APIRouter()

# ========== analyze route ==========
@router.post("/analyze", response_model=AnalyzeResponse)
def analyze(data: AnalyzeRequest, user: str = Depends(get_current_user)):
    db = get_db()
    resumes = db["resumes"]

    jd_text = data.jd_text

    # ========== validate JD ==========
    if not jd_text.strip():
        raise HTTPException(status_code=400, detail="Job description can't be empty")
    
    # ========== fetch resume ==========
    resume = resumes.find_one({"user_id": user})
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found, please upload Resume first")
    
    resume_text = resume["resume_text"]

    try:
        # ========== call pipeline ==========
        result = analyze_resume(resume_text, jd_text)
    except Exception:
        raise HTTPException(status_code=500, detail="Internal Server Error")

    return result