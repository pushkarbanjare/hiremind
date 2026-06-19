from dotenv import load_dotenv
load_dotenv()
from fastapi import FastAPI
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.middleware import SlowAPIMiddleware
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes.auth import router as auth_router
from app.api.routes.resume import router as resume_router
from app.api.routes.analyze import router as analyze_router
from app.api.routes.optimize import router as optimize_router

app = FastAPI()

# ========== middleware layer ==========
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter

# ========== rate limiting middleware ==========
app.add_middleware(SlowAPIMiddleware)

# ========== cors middleware ==========
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://hiremind-web.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ========== router functions ==========
app.include_router(auth_router)
app.include_router(resume_router)
app.include_router(analyze_router)
app.include_router(optimize_router)

# ========== main route ==========
@app.get("/")
def root():
    return {"message": "HireMind API is running"}