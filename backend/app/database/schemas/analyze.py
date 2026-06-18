from pydantic import BaseModel
from typing import List

# ======== analyze skill match ==========
class SkillMatch(BaseModel):
    skill: str
    evidence: str
    similarity: float

# ========== analyze request ==========
class AnalyzeRequest(BaseModel):
    jd_text: str

# ========== analyze response ==========
class AnalyzeResponse(BaseModel):
    match_score: float
    matched_skills: List[SkillMatch]
    improvement_areas: List[SkillMatch]
    critical_gaps: List[SkillMatch]