from datetime import datetime, timezone

def user_schema(user) -> dict:
    return {
        "id": str(user["_id"]),
        "email": user["email"],
        "created_at": user["created_at"]
    }

def create_user_dict(email, hashed_password):
    return {
        "email": email,
        "password": hashed_password,
        "created_at": datetime.now(timezone.utc)
    }