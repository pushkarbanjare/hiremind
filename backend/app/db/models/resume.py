from datetime import datetime, timezone

# ========== resume schema ==========
def resume_schema(resume) -> dict:
    return {
        "id": str(resume["_id"]),
        "user_id": str(resume["user_id"]),
        "resume_text": resume["resume_text"],
        "created_at": resume["created_at"],
        "updated_at": resume["updated_at"],
    }

# ========== dictionary for resume ==========
def create_resume_dict(user_id, resume_text):
    return {
        "user_id": user_id,
        "resume_text": resume_text,
        "created_at": datetime.now(timezone.utc),
        "updated_at": datetime.now(timezone.utc),
    }