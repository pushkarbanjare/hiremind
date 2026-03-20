from app.services.pipeline import analyze_resume

file_path = "../notebooks/sample_resume.pdf"

job_description = """
We are looking for a Backend Software Engineer with experience in 
Python, REST API development, and microservices architecture.
The candidate should be familiar with Docker, AWS, and SQL databases.
Experience with Kafka and distributed systems is a plus.
"""

result = analyze_resume(file_path, job_description)

print("\n==== FINAL RESULT ====")
print("Score:", result["match_score"])
print("Matched:", result["matched_skills"])
print("Missing:", result["missing_skills"])