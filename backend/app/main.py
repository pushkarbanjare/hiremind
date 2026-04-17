from dotenv import load_dotenv
load_dotenv()
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes.auth import router as auth_router
from app.api.routes.analyze import router as analyze_router
from app.api.routes.resume import router as resume_router

app = FastAPI()

# ========== middleware layer ==========
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://hiremind-frontend-voin.onrender.com", "https://hiremind-web.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ========== router functions ==========
app.include_router(auth_router)
app.include_router(resume_router)
app.include_router(analyze_router)

# ========== main route ==========
@app.get("/")
def root():
    return {"message": "HireMind API is running"}
