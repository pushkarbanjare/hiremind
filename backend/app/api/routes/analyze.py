from fastapi import APIRouter, Depends, HTTPException
from app.database.mongodb import get_db
from app.database.schemas.analyze import AnalyzeRequest, AnalyzeResponse
from app.core.dependency import get_current_user
from app.services.embedding import generate_embeddings
from app.services.matching import calculate_similarity
from app.services.skill_gap import analyze_skill_gap
from app.services.scoring import calculate_match_score

router = APIRouter(prefix="/analyze", tags=["analyze"],)

# ========= analyze resume ==========
@router.post("/", response_model=AnalyzeResponse)
def analyze_resume(request: AnalyzeRequest, user: str = Depends(get_current_user)):
    db = get_db()
    resumes = db["resumes"]
    resume = resumes.find_one({"user_id": user})
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    resume_embedding = resume["resume_embedding"]
    jd_embedding = generate_embeddings(request.jd_text)
    
    # ========= semantic similarity ==========
    semantic_similarity = calculate_similarity(resume_embedding, jd_embedding)

    # ========= skill analysis ==========
    skill_analysis = analyze_skill_gap(resume["resume_text"], request.jd_text)

    # ========= match score ==========
    match_score = calculate_match_score(skill_analysis["matched_skills"], skill_analysis["improvement_areas"], skill_analysis["critical_gaps"])
    match_score = round((semantic_similarity * 0.4 + (match_score / 100) * 0.6) * 100, 2)

    return {
        "match_score": match_score,
        "matched_skills": skill_analysis["matched_skills"],
        "improvement_areas": skill_analysis["improvement_areas"],
        "critical_gaps": skill_analysis["critical_gaps"],
    }