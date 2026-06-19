from fastapi import APIRouter, HTTPException, Request
from slowapi import Limiter
from slowapi.util import get_remote_address
from passlib.context import CryptContext
from app.database.mongodb import get_db
from app.database.models.user import create_user_document
from app.database.schemas.auth import LoginRequest, SignupRequest
from app.core.security import create_access_token

# ========== router initialization ==========
router = APIRouter(prefix="/auth", tags=["auth"])

# ========= rate limiter ==========
limiter = Limiter(key_func=get_remote_address)

# ========== password hashing ==========
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)
def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

# ========== signup ==========
@router.post("/signup")
@limiter.limit("10/min")
def signup(request: Request, user: SignupRequest):
    db = get_db()
    users = db["users"]
    if users.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="User already exists")
    
    hashed_password = hash_password(user.password)
    user_document = create_user_document(user.email, hashed_password)
    users.insert_one(user_document)

    return {"message": "User created successfully"}

# ========== login ==========
@router.post("/login")
@limiter.limit("10/min")
def login(request: Request, user: LoginRequest):
    db = get_db()
    users = db["users"]
    db_user = users.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # ========== sub(subject), exp(expiration time), iat(issued at) ==========
    access_token = create_access_token({"sub": str(db_user["_id"])})
    return {"access_token": access_token, "token_type": "bearer"}