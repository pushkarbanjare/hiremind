import re
from services.skill_loader import load_skills

def extract_skills(text: str) -> list:
    skills = load_skills()

    detected = []
    for skill in skills:
        # regex with word boundaries
        pattern = r"\b" + re.escape(skill) + r"\b"
        # r = rawstring & \b = word boundary & re.escape() = converts special chars safely like "c++" to "c\+\+"

        if re.search(pattern, text):
            detected.append(skill)

    return detected