from datetime import datetime, timezone

# ========== resume data for API response ==========
def resume_to_response(resume) -> dict:
    return {
        "id": str(resume["_id"]),
        "user_id": str(resume["user_id"]),
        "resume_text": resume["resume_text"],
        "resume_embedding": resume["resume_embedding"],
        "optimized_resume": resume["optimized_resume"],
        "created_at": resume["created_at"],
        "updated_at": resume["updated_at"],
    }

# ========== resume document for database ==========
def create_resume_document(user_id: str, resume_text: str, resume_embedding: list) -> dict:
    now = datetime.now(timezone.utc)
    return {
        "user_id": user_id,
        "resume_text": resume_text,
        "resume_embedding": resume_embedding,
        "optimized_resume": [],
        "created_at": now,
        "updated_at": now,
    }