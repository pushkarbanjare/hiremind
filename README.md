# HireMind
An AI-powered resume intelligence platform that analyzes resume-to-job compatibility, identifies skill gaps using semantic matching, and optimizes resume bullets through a multi-LLM pipeline.

>### Project Status
>- Backend development is complete and fully functional in the local environment and Frontend is under active UI/UX refinement.
>- Cloud deployment is temporarily unavailable due to free-tier resource limitations. Deployment will be restored after migrating the embedding pipeline to a lightweight inference architecture.

## FEATURES
- JWT-based authentication and protected routes
- Resume PDF parsing using PyMuPDF
- Automatic resume text extraction
- Resume persistence with MongoDB
- Semantic resume-to-JD skill matching using spaCy
- Match score generation
- Skill-gap analysis (Matched Skills, Improvement Areas, Critical Gaps)
- AI-assisted resume bullet optimization
- Multi-LLM fallback (Open Router + Groq)
- Database-backed caching for optimized resumes
- API rate limiting using SlowAPI

## ANALYSIS PIPELINE
The system follows a structured processing pipeline:
1. User Authentication
2. Resume Upload (PDF)
3. Resume Text Extraction
4. Resume Storage
5. Job Description Processing
6. Semantic Skill Extraction
7. Skill Matching
8. Match Score Calculation
9. Skill Gap Generation
10. Resume Bullet Optimization (On Demand)

## TECH STACK
- **Backend:** FastAPI (Python), MongoDB, PyMuPDF, spaCy, SlowAPI
- **Frontend:** Next.js, Tailwind CSS
- **AI/NLP:** spaCy Semantic Matching, Open Router, Groq (Multi-LLM Routing)

## API ENDPOINTS:
- **Authentication**: 
    - POST /auth/signup
    - POST /auth/login
- **Resume**: 
    - POST /resume/upload
    - POST /resume/save
    - GET /resume
    - PUT /resume
    - DELETE /resume
- **Analyse**: 
    - POST /analyze
- **Optimization**:
    - POST /optimize

## FUTURE IMPROVEMENTS
- Lightweight hosted embedding inference
- Personalized interview preparation
- ATS keyword density visualization
- Job recommendation engine

## PROJECT GOAL
HireMind was built to reduce manual resume evaluation by combining NLP, semantic matching, and LLM-powered optimization into a single end-to-end workflow that helps candidates understand and improve their resume before applying.