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

# ========== extract weak bullets ==========
def extract_optimizable_bullets(resume_text: str) -> list[str]:
    sections = []
    patterns = [
        r"PROJECTS(.*?)(EXPERIENCE|SKILLS|EDUCATION|ACHIEVEMENTS|$)",
        r"EXPERIENCE(.*?)(SKILLS|EDUCATION|ACHIEVEMENTS|$)"
    ]
    for pattern in patterns:
        match = re.search(
            pattern, 
            resume_text,
            re.DOTALL | re.IGNORECASE
        )
        if match:
            sections.append(match.group(1))
    content = "\n".join(sections)
    bullets = [
        line.strip()
        for line in content.split("\n")
        if line.strip().startswith("•")
    ]
    return bullets

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
    return score < 3

# ========== bulk optimization ==========
def optimize_resume(bullets: list[str]) -> list[str]:
    optimized_bullets = []
    weak_bullets = []
    weak_indices = []

    # ========== separate weak and strong bullets ==========
    for index, bullet in enumerate(bullets):
        if needs_optimization(bullet):
            weak_bullets.append(bullet)
            weak_indices.append(index)
        optimized_bullets.append(bullet)

    if not weak_bullets:
        return optimized_bullets

    prompt = f"""
You are an expert resume writer.
Rewrite ONLY the provided resume bullets.

Rules:
1. Return exactly {len(weak_bullets)} bullets.
2. Keep the same order.
3. No explanations.
4. No numbering.
5. No markdown.
6. Maximum 30 words per bullet.
7. Preserve technologies.
8. Use strong action verbs.
9. Add measurable impact only if reasonably inferable.
10. Return one bullet per line.

Resume Bullets:
{chr(10).join(weak_bullets)}
"""
    response = generate(prompt)
    improved_bullets = [
        line.strip()
        for line in response.split("\n")
        if line.strip()
    ]

    # ========== replace weak bullets ==========
    for idx, improved in zip(weak_indices, improved_bullets):
        optimized_bullets[idx] = improved
    return optimized_bullets