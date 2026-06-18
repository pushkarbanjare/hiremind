from pydantic import BaseModel

# ========= optimize response ==========
class OptimizeResponse(BaseModel):
    optimized_resume: list[str]