from fastapi import APIRouter, HTTPException
from app.schemas.auth_schema import UserLogin, UserSignup
from app.db.mongodb import get_db
from app.db.models.user import create_user_dict
from app.core.security import create_access_token
from passlib.context import CryptContext

# ========== router initialization ==========
router = APIRouter(prefix="/auth", tags=["auth"])

# ========== password hashing ==========
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

# ========== signup route ==========
@router.post("/signup")
def signup(user: UserSignup):
    db = get_db()
    users = db["users"]

    if users.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="User already exists")
    
    hashed = hash_password(user.password)
    user_data = create_user_dict(user.email, hashed)
    users.insert_one(user_data)

    return {"message": "User created successfully"}

# ========== login route ==========
@router.post("/login")
def login(user: UserLogin):
    db = get_db()
    users = db["users"]
    db_user = users.find_one({"email": user.email})

    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # ==================== sub(subject), exp(expiration time), iat(issued at)
    token = create_access_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}