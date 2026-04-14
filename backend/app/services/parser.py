import fitz # ==================== pymupdf

def parse_resume(file_path: str) -> str:
    doc = fitz.open(file_path)

    # ========== append resume text ==========
    text = ""
    for page in doc:
        text += page.get_text()

    return text