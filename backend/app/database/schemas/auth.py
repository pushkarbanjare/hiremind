from pydantic import BaseModel, EmailStr

# ========== signup schema ==========
class SignupRequest(BaseModel):
    email: EmailStr
    password: str
    
# ========== login schema ==========
class LoginRequest(BaseModel):
    email: EmailStr
    password: str