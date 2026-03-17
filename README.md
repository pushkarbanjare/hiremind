# HireMind 

HireMind is an AI-powered resume-job alignment analyzer that evaluates how well a candidate’s resume matches a given job description.

It extracts skills from both the resume and the job description, compares them, and highlights missing competencies along with an overall match score.

## Features
* Resume PDF parsing using PyMuPDF
* Text preprocessing and normalization
* Skill extraction using predefined vocabulary
* Resume-job skill comparison
* Match Score calculation
* Identification of missing skills

## How it Works (Pipeline)
The system follows a structured pipeline:

1. **Resume Upload (PDF)**
2. **Text Extraction**: Extract raw text from PDF
3. **Text Cleaning**: Normalize and preprocess text
4. **Skill Extraction (Resume)**: Detect skills from resume
5. **Skill Extraction (Job Description)**: Detect required skills
6. **Skill Matching**: Compare resume vs job skills
7. **Scoring**: Calculate match percentage
8. **Output Generation**: Display matched & missing skills

## Tech Stack
* **Backend:** FastAPI, Python  
* **Frontend:** Next.js
* **NLP:** spaCy (planned: sentence-transformers for semantic matching),

## Example Output
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

## Future Improvements
* Semantic skill matching using embeddings
* Improved skill extraction from project descriptions
* Resume rewriting suggestions
* Better UI/UX for visualization

## Current Status

* Prototype completed (end-to-end pipeline in notebook)
* Backend API development in progress
* Frontend integration pending