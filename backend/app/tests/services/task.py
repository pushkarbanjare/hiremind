import re, json, os

# ========== parse resume ==========
def parse_resume(resume_text: str) -> str:
    return resume_text

# ========== clean text ==========
def clean_text(text: str) -> str:
    text = text.lower()
    text = text.replace("\n", " ")
    text = re.sub(r"\s+", " ", text)
    text = text.strip()
    return text

# ========== load skills ==========
def load_skills() -> list:
    # base_dir = os.path.dirname(os.path.dirname(__file__))
    # file_path = os.path.join(base_dir, "data", "skills.json")
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
    file_path = os.path.join(base_dir, "data", "skills.json")

    with open(file_path, "r") as f:
        skills = json.load(f)

    # ========== normalize skills ==========
    return [skill.lower() for skill in skills]    # ==================== list comprehension(another form of for loop)

# ========== extract skills ==========
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

# ========== score logic ==========
def calculate_score(matched: list, jd_skills: list) -> float:
    if len(jd_skills) == 0:
        return 0.0
    
    score = len(matched) / len(jd_skills)
    return round(score * 100, 2)