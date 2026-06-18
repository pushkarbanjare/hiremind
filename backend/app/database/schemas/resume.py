from pydantic import BaseModel

# ========= resume request ==========
class ResumeSaveRequest(BaseModel):
    resume_text: str

# ========== resume response ==========
class ResumeResponse(BaseModel):
    resume_text: str
    optimized_resume: list[str] = []