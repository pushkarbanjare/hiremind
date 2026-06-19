from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime, timezone
from app.database.mongodb import get_db
from app.database.schemas.optimize import OptimizeResponse
from app.core.dependency import get_current_user
from app.services.optimization import optimize_resume, extract_optimizable_bullets

router = APIRouter(prefix="/optimize", tags=["optimize"],)

# ========= optimize resume ==========
@router.post("/", response_model=OptimizeResponse)
def optimize(user: str = Depends(get_current_user),):
    db = get_db()
    resumes = db["resumes"]
    resume = resumes.find_one({"user_id": user})
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found",)

    optimized_resume = resume.get("optimized_resume",[])
    if optimized_resume:
        return {"optimized_resume": optimized_resume}
    
    # ========= extract bullets ==========
    bullets = extract_optimizable_bullets(resume["resume_text"])
    optimized_resume = optimize_resume(bullets)
    
    resumes.update_one({"user_id": user}, {"$set": {
        "optimized_resume": optimized_resume, 
        "updated_at": datetime.now(timezone.utc)
        }
    })

    return {"optimized_resume": optimized_resume}