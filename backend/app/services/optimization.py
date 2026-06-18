import re
from app.services.llm_router import (generate)

# ========== action verbs ==========
ACTION_VERBS = {
    "built",
    "developed",
    "implemented",
    "engineered",
    "created",
    "designed",
    "integrated",
    "optimized",
    "automated",
    "deployed",
    "led",
    "architected",
    "improved",
    "delivered",
    "launched",
    "enhanced",
}

# ========== impact words ==========
IMPACT_WORDS = {
    "reduced",
    "improved",
    "increased",
    "optimized",
    "enhanced",
    "accelerated",
    "saved",
    "boosted",
    "scaled",
    "streamlined",
    "automated",
    "improved",
}

# ========== metric detection ==========
def contains_metric(bullet: str) -> bool:
    patterns = [
        r"\d+%",
        r"\d+\+",
        r"\d+x",
        r"\d+\s*ms",
        r"\d+\s*sec",
        r"\d+\s*seconds",
        r"\d+\s*users",
        r"\d+",
    ]

    for pattern in patterns:
        if re.search(pattern, bullet.lower()):
            return True
    return False

# ========== action verb detection ==========
def contains_action_verb(bullet: str) -> bool:
    words = bullet.lower().split()
    return any(
        word in ACTION_VERBS
        for word in words
    )

# ========== impact detection ==========
def contains_impact(bullet: str) -> bool:
    words = bullet.lower().split()
    return any(
        word in IMPACT_WORDS
        for word in words
    )

# ========== optimization guardrail ==========
def needs_optimization(bullet: str) -> bool:
    score = sum([contains_metric(bullet), contains_action_verb(bullet), contains_impact(bullet)])
    return score < 2

# ========== single bullet optimization ==========
def optimize_bullet(bullet: str) -> str:
    prompt = f"""
You are an expert resume writer.
Rewrite the resume bullet.
Rules:
1. Return ONLY the rewritten bullet.
2. No explanation.
3. No numbering.
4. No markdown.
5. Maximum 30 words.
6. ATS friendly.
7. Preserve technologies.
8. Add measurable impact if reasonably inferable.
9. Use strong action verbs.
Resume Bullet:
{bullet}
"""
    return generate(prompt).strip()

# ========== bulk optimization ==========
def optimize_resume(bullets: list[str]) -> list[str]:
    optimized_bullets = []
    for bullet in bullets:
        if needs_optimization(bullet):
            optimized_bullets.append(optimize_bullet(bullet))
        else:
            optimized_bullets.append(bullet)
    return optimized_bullets