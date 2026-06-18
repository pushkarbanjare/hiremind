from fastapi import  APIRouter, Depends, UploadFile, File, HTTPException
from datetime import datetime, timezone
import fitz
from app.database.mongodb import get_db
from app.database.models.resume import create_resume_document
from app.database.schemas.resume import ResumeSaveRequest, ResumeResponse
from app.core.dependency import get_current_user
from app.services.resume_parser import extract_text_from_pdf
from app.services.embedding import generate_embeddings

router = APIRouter(prefix="/resume", tags=["resume"],)

# ========== route: upload pdf ==========
@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    
    pdf_bytes = await file.read()
    resume_text = extract_text_from_pdf(pdf_bytes)
    return {"resume_text": resume_text}

# ========== route: save resume ==========
@router.post("/save")
def save_resume(data: ResumeSaveRequest, user: str = Depends(get_current_user)):
    db = get_db()
    resumes = db["resumes"]
    resume_embedding = generate_embeddings(data.resume_text)
    resume_document = create_resume_document(user_id=user, resume_text=data.resume_text, resume_embedding=resume_embedding)

    if resumes.find_one({"user_id": user}):
        resumes.update_one({"user_id": user}, {"$set": {
                    "resume_text":data.resume_text,
                    "resume_embedding":resume_embedding,
                    "optimized_resume":[],
                    "updated_at":datetime.now(timezone.utc),
                }
            },
        )
    else:
        resumes.insert_one(resume_document)

    return {"message": "Resume saved successfully"}

# ========== route: get resume ==========
@router.get("/", response_model=ResumeResponse)
def get_resume(user: str = Depends(get_current_user)):
    db = get_db()
    resumes = db["resumes"]
    resume = resumes.find_one({"user_id": user})
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    return {
        "resume_text": resume["resume_text"],
        "optimized_resume": resume["optimized_resume"],
    }

# ========== route: update resume ==========
@router.put("/")
async def update_resume(file: UploadFile = File(...), user: str = Depends(get_current_user)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    db = get_db()
    resumes = db["resumes"]
    resume = resumes.find_one({"user_id": user})
    if not resume:
        raise HTTPException(status_code=404,detail="Resume not found",)

    pdf_bytes = await file.read()
    resume_text = (extract_text_from_pdf(pdf_bytes))
    resume_embedding = generate_embeddings(resume_text)

    resumes.update_one({"user_id": user}, {"$set": {
                "resume_text":resume_text,
                "resume_embedding":resume_embedding,
                "optimized_resume":[],
                "updated_at":datetime.now(timezone.utc),
            }
        },
    )
    return {"message": "Resume updated successfully"}

# ========== route: delete resume ==========
@router.delete("/")
def delete_resume(user: str = Depends(get_current_user)):
    db = get_db()
    resumes = db["resumes"]
    result = resumes.delete_one({"user_id": user})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    return {"message": "Resume deleted successfully"}