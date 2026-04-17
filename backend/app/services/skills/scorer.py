# ========== calc score logic ==========
def calculate_score(matched: list, jd_skills: list) -> float:
    if len(jd_skills) == 0:
        return 0.0
    
    score = len(matched) / len(jd_skills)
    return round(score * 100, 2)