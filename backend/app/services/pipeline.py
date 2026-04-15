from app.services.text.parser import parse_resume
from app.services.text.cleaner import clean_text
from app.services.skills.extractor import extract_skills
from app.services.skills.matcher import match_skills
from app.services.skills.scorer import calculate_score

def analyze_resume(resume_text: str, jd_text: str) -> dict:
    # ========== resume processing ==========
    raw_text = parse_resume(resume_text)
    cleaned_resume = clean_text(raw_text)
    resume_skills = extract_skills(cleaned_resume)

    # ========== job desc processing ==========
    cleaned_jd = clean_text(jd_text)
    jd_skills = extract_skills(cleaned_jd)

    # ========== matching ==========
    match_result = match_skills(resume_skills, jd_skills)

    # ========== scoring ==========
    score = calculate_score(match_result["matched"], jd_skills)

    return {
        "match_score": score,
        "matched_skills": match_result["matched"],
        "missing_skills": match_result["missing"],
        "resume_skills": resume_skills,
        "jd_skills": jd_skills 
    }