import re, json, os

def load_skills() -> list:
    # base_dir = os.path.dirname(os.path.dirname(__file__))
    # file_path = os.path.join(base_dir, "data", "skills.json")
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
    file_path = os.path.join(base_dir, "data", "skills.json")

    with open(file_path, "r") as f:
        skills = json.load(f)

    # ========== normalize skills ==========
    return [skill.lower() for skill in skills]    # ==================== list comprehension(another form of for loop)

def extract_skills(text: str) -> list:
    skills = load_skills()
    detected = []

    for skill in skills:
        # ========== regex with word boundaries ==========
        pattern = r"\b" + re.escape(skill) + r"\b"  # ==================== r=rawstring, \b=word boundary, re.escape()=converts special chars safely like "c++" to "c\+\+"
        if re.search(pattern, text):
            detected.append(skill)

    return detected

# ========== match logic ==========
def match_skills(resume_skills: list, jd_skills: list) -> dict:
    matched = []
    missing = []

    # ========== skill append logic ==========
    for skill in jd_skills:
        if skill in resume_skills:
            matched.append(skill)
        else:
            missing.append(skill)

    return {
        "matched": matched,
        "missing": missing
    }

# ========== calc score logic ==========
def calculate_score(matched: list, jd_skills: list) -> float:
    if len(jd_skills) == 0:
        return 0.0
    
    score = len(matched) / len(jd_skills)
    return round(score * 100, 2)