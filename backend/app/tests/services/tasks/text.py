import re   # ==================== regular expression

# ========== parse resume ==========
def parse_resume(resume_text: str) -> str:
    return resume_text

def clean_text(text: str) -> str:
    text = text.lower()
    text = text.replace("\n", " ")
    text = re.sub(r"\s+", " ", text)
    text = text.strip()
    return text