# HireMind 

HireMind is an NLP-powered resume analyzer that evaluates resume-job alignment. By extracting and comparing technical competencies, it then provides a "Match Score" and identifies exactly which skills the candidate is missing to pass the ATS.

## FEATURES
- Resume PDF parsing using PyMuPDF
- Text preprocessing and normalization
- Skill extraction using predefined vocabulary
- Resume-job skill comparison
- Match Score calculation
- Identification of missing and matched skills

## PIPELINE
The system follows a structured pipeline:

1. **Resume Upload (PDF)**
2. **Text Extraction**: Extract raw text from PDF
3. **Text Cleaning**: Normalize and preprocess text
4. **Skill Extraction (Resume)**: Detect skills from resume
5. **Skill Extraction (Job Description)**: Detect required skills
6. **Skill Matching**: Compare resume vs job skills
7. **Scoring**: Calculate match percentage
8. **Output Generation**: Display matched & missing skills

## ARCHITECTURE

Backend follows a modular pipeline:
- `services/:` core logic (Parser, Extractor, Matcher, Scorer)
- `api/:` FastAPI endpoints
- `schemas/:` Pydantic data validation

This separation ensures scalability and testability.

## TECH STACK
* **Backend:** FastAPI (Python)  
* **Frontend:** Next.js, Tailwind CSS
* **NLP:** Rule-based skill extraction (planned: embeddings for semantic matching)

## EXAMPLE OUTPUT
```
Match Score: 71.43%

Matched Skills:
- python
- docker
- aws
- sql
- kafka

Missing Skills:
- rest api
- microservices
```

## FUTURE IMPROVEMENTS
* Semantic skill matching using embeddings
* Improved skill extraction from project descriptions
* Resume rewriting suggestions
* Better UI/UX for visualization
