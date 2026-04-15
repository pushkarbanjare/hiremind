from fastapi import APIRouter, HTTPException, Depends
from app.db.mongodb import get_db
from app.db.models.resume import create_resume_dict
from app.core.dependency import get_current_user
from app.schemas.resume_schema import ResumeBase, ResumeResponse
from datetime import datetime, timezone

router = APIRouter(prefix="/resume", tags=["resume"])

# ========== create resume ==========
@router.post("/")
def create_resume(data: ResumeBase, user: str = Depends(get_current_user)):
    db = get_db()
    resumes = db["resumes"]

    if resumes.find_one({"user_id": user}):
        raise HTTPException(status_code=400, detail="Resume already exists")
    
    if not data.resume_text.strip():
        raise HTTPException(status_code=400, detail="Resume cannot be empty")
    
    resume_data = create_resume_dict(user, data.resume_text)
    resumes.insert_one(resume_data)
    return {"message": "Resume created successfully"}

# ========== fetch resume ==========
@router.get("/", response_model=ResumeResponse)
def get_resume(user: str = Depends(get_current_user)):
    db = get_db()
    resumes = db["resumes"]
    resume = resumes.find_one({"user_id": user})
    
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    return {"resume_text": resume["resume_text"]}

# ========== update resume ==========
@router.put("/")
def update_resume(data: ResumeBase, user: str = Depends(get_current_user)):
    db = get_db()
    resumes = db["resumes"]

    if not data.resume_text.strip():
        raise HTTPException(status_code=400, detail="Resume cannot be empty")

    result = resumes.update_one({"user_id": user}, {"$set": {"resume_text": data.resume_text, "updated_at": datetime.now(timezone.utc)}})

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    return {"message": "Resume updated successfully"}

# ========== delete resume ==========
@router.delete("/")
def delete_resume(user: str = Depends(get_current_user)):
    db = get_db()
    resumes = db["resumes"]

    result = resumes.delete_one({"user_id": user})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    return {"message": "Resume deleted successfully"}