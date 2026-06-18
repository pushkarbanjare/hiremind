from datetime import datetime, timezone

# ========== user data for API response ==========
def user_to_response(user) -> dict:
    return {
        "id": str(user["_id"]),
        "email": user["email"],
        "created_at": user["created_at"],
    }

# ========== user document for database ==========
def create_user_document(email: str, hashed_password: str) -> dict:
    return {
        "email": email,
        "password": hashed_password,
        "created_at": datetime.now(timezone.utc),
    }