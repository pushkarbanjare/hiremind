from services.parser import parse_resume
from services.cleaner import clean_text
from services.extractor import extract_skills

file_path = "../notebooks/sample_resume.pdf"

raw_text = parse_resume(file_path)
cleaned = clean_text(raw_text)
skills = extract_skills(raw_text)

print("Detected Skills:")
for s in skills:
    print("-", s)