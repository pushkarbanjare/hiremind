def calculate_match_score(matched_skills, improvement_areas, critical_gaps) -> float:
    similarities = []

    for skill in matched_skills:
        similarities.append(skill["similarity"])
    for skill in improvement_areas:
        similarities.append(skill["similarity"])
    for skill in critical_gaps:
        similarities.append(skill["similarity"])

    if not similarities:
        return 0.0
    score = (sum(similarities)/len(similarities)) * 100

    return round(score, 2)