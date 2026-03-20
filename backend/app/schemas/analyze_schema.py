from pydantic import BaseModel
from typing import List

class AnalyzeResponse(BaseModel):
    match_score: float
    matched_skills: List[str]
    missing_skills: List[str]
    resume_skills: List[str]
    jd_skills: List[str]