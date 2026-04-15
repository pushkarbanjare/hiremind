from pydantic import BaseModel

# ========== create/update resume ==========
class ResumeBase(BaseModel):
    resume_text: str

# ========== response ==========
class ResumeResponse(BaseModel):
    resume_text: str