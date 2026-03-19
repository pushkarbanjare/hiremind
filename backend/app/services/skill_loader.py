import json
import os

def load_skills() -> list:
    base_dir = os.path.dirname(os.path.dirname(__file__))
    file_path = os.path.join(base_dir, "data", "skills.json")

    with open(file_path, "r") as f:
        skills = json.load(f)

    # normalize
    skills = [skill.lower() for skill in skills]    # list comprehension

    # new_skills = []   # simpler-form
    # for skill in skills:
    #     new_skills.append(skill.lower())

    return skills