from pydantic import BaseModel, EmailStr

# ========== signup schema ==========
class UserSignup(BaseModel):
    email: EmailStr
    name: str
    password: str
    
# ========== login route ==========
class UserLogin(BaseModel):
    email: EmailStr
    password: str