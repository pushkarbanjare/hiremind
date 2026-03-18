from services.parser import parse_resume
from services.cleaner import clean_text

file_path = "../notebooks/sample_resume.pdf"

raw_text = parse_resume(file_path)
cleaned = clean_text(raw_text)

print("RAW TEXT:\n", raw_text[:500])
print("\nCLEANED TEXT:\n", cleaned[:500])