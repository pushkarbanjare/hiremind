from datetime import datetime, timezone

# ========== user schema ==========
def user_schema(user) -> dict:
    return {
        "id": str(user["_id"]),
        "email": user["email"],
        "name": user["name"],
        "created_at": user["created_at"],
    }

# ========== dictionary for user ==========
def create_user_dict(email, name, hashed_password):
    return {
        "email": email,
        "name": name,
        "password": hashed_password,
        "created_at": datetime.now(timezone.utc),
    }