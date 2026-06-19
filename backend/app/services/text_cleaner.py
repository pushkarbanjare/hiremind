import re

# ========== clean text ==========
def clean_text(text: str) -> str:
    # ========== replacing newlines and tabs with spaces ==========
    text = text.replace("\n", " ").replace("\t", " ")
    # ========== removing extra spaces ==========
    text = re.sub(r"\s+", " ", text)  
    return text