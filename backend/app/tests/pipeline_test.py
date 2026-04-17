from app.services.pipeline import analyze_resume

resume_text = "Experienced Python developer with knowledge of REST APIs, Docker, and AWS."

job_description = """
We are looking for a Backend Software Engineer with experience in 
Python, REST API development, and microservices architecture.
The candidate should be familiar with Docker, AWS, and SQL databases.
Experience with Kafka and distributed systems is a plus.
"""

# ========== analyze resume fn ==========
result = analyze_resume(resume_text, job_description)

print("\n==== FINAL RESULT ====")
print("Score:", result["match_score"])
print("Matched:", result["matched_skills"])
print("Missing:", result["missing_skills"])