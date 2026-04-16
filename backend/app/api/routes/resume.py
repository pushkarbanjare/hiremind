from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from fastapi.responses import FileResponse
from app.db.mongodb import get_db
from app.db.models.resume import create_resume_dict
from app.core.dependency import get_current_user
from app.schemas.resume_schema import ResumeTextResponse
from datetime import datetime, timezone
import os
import fitz

router = APIRouter(prefix="/resume", tags=["resume"])

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# ========== extract text function ==========
def extract_text_from_pdf(file_path: str) -> str:
    doc = fitz.open(file_path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text

# ========== POST: upload resume ==========
@router.post("/")
async def create_resume(file: UploadFile = File(...), user: str = Depends(get_current_user)):
    db = get_db()
    resumes = db["resumes"]

    if resumes.find_one({"user_id": user}):
        raise HTTPException(status_code=400, detail="Resume already exists")
    
    # ========== validate file ==========
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files allowed")

    file_path = os.path.join(UPLOAD_DIR, f"{user}.pdf")

    # ========== write file ==========
    content = await file.read()
    with open(file_path, "wb") as buffer:
        buffer.write(content)

    # ========== extract text ==========
    resume_text = extract_text_from_pdf(file_path)
    
    # ========== store in DB ==========
    resume_data = create_resume_dict(user, file_path, resume_text)
    resumes.insert_one(resume_data)
    return {"message": "Resume uploaded successfully"}

# ========== GET: download resume ==========
@router.get("/")
def get_resume(user: str = Depends(get_current_user)):
    db = get_db()
    resumes = db["resumes"]

    resume = resumes.find_one({"user_id": user})
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    return FileResponse(resume["file_path"], media_type="application/pdf", filename="resume.pdf")

# ========== PUT: update resume ==========
@router.put("/")
async def update_resume(file: UploadFile = File(...), user: str = Depends(get_current_user)):
    db = get_db()
    resumes = db["resumes"]

    resume = resumes.find_one({"user_id": user})
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files allowed")

    file_path = os.path.join(UPLOAD_DIR, f"{user}.pdf")

    # ========== overwrite file ==========
    content = await file.read()
    with open(file_path, "wb") as buffer:
        buffer.write(content)

    # ========== extract text ==========
    resume_text = extract_text_from_pdf(file_path)
    resumes.update_one({"user_id": user}, {"$set": {"resume_text": resume_text, "updated_at": datetime.now(timezone.utc)}})
    return {"message": "Resume updated successfully"}

# ========== DELETE: delete resume ==========
@router.delete("/")
def delete_resume(user: str = Depends(get_current_user)):
    db = get_db()
    resumes = db["resumes"]

    resume = resumes.find_one({"user_id": user})
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    # ========== delete file ==========
    if os.path.exists(resume["file_path"]):
        os.remove(resume["file_path"])

    resumes.delete_one({"user_id": user})
    return {"message": "Resume deleted successfully"}

# ========== GET: resume text ==========
@router.get("/text", response_model=ResumeTextResponse)
def get_resume_text(user: str = Depends(get_current_user)):
    db = get_db()
    resumes = db["resumes"]

    resume = resumes.find_one({"user_id": user})
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    return {"resume_text": resume["resume_text"]}