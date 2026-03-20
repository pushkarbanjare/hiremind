from app.services.parser import parse_resume
from app.services.cleaner import clean_text
from app.services.extractor import extract_skills
from app.services.matcher import match_skills
from app.services.scorer import calculate_score

def analyze_resume(file_path: str, jd_text: str) -> dict:
    # Resume processing
    raw_text = parse_resume(file_path)
    cleaned_resume = clean_text(raw_text)
    resume_skills = extract_skills(cleaned_resume)

    # JD processing
    cleaned_jd = clean_text(jd_text)
    jd_skills = extract_skills(cleaned_jd)

    # Matching
    match_result = match_skills(resume_skills, jd_skills)

    # Scoring
    score = calculate_score(match_result["matched"], jd_skills)

    return {
        "match_score": score,
        "matched_skills": match_result["matched"],
        "missing_skills": match_result["missing"],
        "resume_skills": resume_skills,
        "jd_skills": jd_skills 
    }