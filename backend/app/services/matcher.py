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