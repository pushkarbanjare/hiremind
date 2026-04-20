# HireMind

HireMind is a NLP-powered resume analyzer that identifies how much job is aligned to resume. By extracting and comparing technical competencies, it then provides a "Match Score" and identifies exactly which skills the candidate is missing to pass the ATS.

**Live at: https://hiremind-web.vercel.app/**

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

Backend follows a modular and layered architecture:

- `api/` → Route handlers (FastAPI endpoints)
- `services/` → Core business logic (Parser, Extractor, Matcher, Scorer)
- `schemas/` → Data validation using Pydantic
- `db/` → MongoDB integration and models

Pipeline-based design ensures separation of concerns and easier extensibility.

Frontend is built using Next.js with a component-driven structure and protected routes for authenticated access.

## AUTHENTICATION FLOW

- User signs up or logs in via `/auth`
- Backend generates JWT token
- Token is stored on client side
- All protected routes require `Authorization: Bearer <token>`
- Backend validates token and extracts user identity for request handling

## FILE HANDLING DESIGN

- Resume is uploaded as a PDF file
- Stored on server filesystem (`/uploads`)
- File path is stored in MongoDB
- Text is extracted using PyMuPDF and stored for fast reuse
- Enables separation between raw file storage and processed data

## API DESIGN

- Authentication using JWT (issued on login, sent via Authorization header)
- Resume handled as PDF upload (not raw text input)
- Text is extracted and stored for analysis
- Analysis endpoint accepts job description as JSON payload

## TECH STACK

- **Backend:** FastAPI (Python)
- **Frontend:** Next.js, Tailwind CSS
- **NLP:** Rule-based skill extraction (planned: embeddings for semantic matching)
- **Auth:** JWT-based authentication (HTTP Bearer tokens)
- **Storage:** Local file storage for resumes (PDF) with MongoDB metadata
- **Deployment:** Backend on Render, Frontend on Vercel

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

Key Endpoints:

- `POST /auth/signup` → Register user
- `POST /auth/login` → Login & receive token
- `POST /resume/` → Upload resume (PDF)
- `GET /resume/` → View resume PDF
- `GET /resume/text` → View extracted resume text
- `PUT /resume/` → Update resume
- `DELETE /resume/` → Delete resume
- `POST /analyze` → Analyze resume vs job description

## FUTURE IMPROVEMENTS

- Semantic skill matching using embeddings
- Improved skill extraction from project descriptions
- Resume rewriting suggestions
- Better UI/UX for visualization
