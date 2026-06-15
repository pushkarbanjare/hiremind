from pydantic import BaseModel

# ========== resume text response ==========
class ResumeTextResponse(BaseModel):
    resume_text: str