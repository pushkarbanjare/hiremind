import spacy
from app.services.embedding import generate_embeddings
from app.services.matching import calculate_similarity

nlp = spacy.load("en_core_web_sm")

def extract_skill_candidates(text: str) -> list:
    doc = nlp(text)
    skills = set()
    for chunk in doc.noun_chunks:
        value = chunk.text.strip().lower()
        if len(value) > 2:
            skills.add(value)
    return list(skills)

def analyze_skill_gap(resume_text: str, jd_text: str):
    resume_skills = (extract_skill_candidates(resume_text))
    jd_skills = (extract_skill_candidates(jd_text))

    matched_skills = []
    improvement_areas = []
    critical_gaps = []

    for jd_skill in jd_skills:
        jd_embedding = (generate_embeddings(jd_skill))
        best_match = None
        best_similarity = 0
        for resume_skill in resume_skills:
            resume_embedding = (generate_embeddings(resume_skill))
            similarity = (calculate_similarity(resume_embedding, jd_embedding))
            if similarity > best_similarity:
                best_similarity = similarity
                best_match = resume_skill

        result = {"skill": jd_skill, "evidence": best_match, "similarity": best_similarity,}
        if best_similarity >= 0.80:
            matched_skills.append(result)
        elif best_similarity >= 0.60:
            improvement_areas.append(result)
        else:
            critical_gaps.append(result)

    return {
        "matched_skills":matched_skills,
        "improvement_areas":improvement_areas,
        "critical_gaps":critical_gaps,
    }