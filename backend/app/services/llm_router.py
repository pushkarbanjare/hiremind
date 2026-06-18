import os, requests
import google.generativeai as genai
from groq import Groq

# ========== groq ==========
def groq_generate(prompt: str) -> str:
    client = Groq(api_key=os.getenv("GROQ_API_KEY"))
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}]
    )
    return (response.choices[0].message.content.strip())

# ========== gemini ==========
def gemini_generate(prompt: str) -> str:
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
    model = genai.GenerativeModel("gemini-2.5-flash-lite")
    response = model.generate_content(prompt)
    return response.text.strip()

# ========== openrouter ==========
def openrouter_generate(prompt: str) -> str:
    response = requests.post("https://openrouter.ai/api/v1/chat/completions", 
        headers={
            "Authorization":f"Bearer {os.getenv('OPENROUTER_API_KEY')}",
            "Content-Type":"application/json"
        },
        json={
            "model":"deepseek/deepseek-chat-v3-0324",
            "messages": [{"role": "user", "content": prompt}]
        }
    )
    response.raise_for_status()
    data = response.json()
    return (data["choices"][0]["message"]["content"].strip())

# ========== multi llm router ==========
def generate(prompt: str) -> str:
    providers = [groq_generate, gemini_generate, openrouter_generate,]
    errors = []
    for provider in providers:
        try:
            return provider(prompt)
        except Exception as e:
            errors.append(f"{provider.__name__}: {str(e)}")
            continue
    raise Exception(f"All LLM providers failed: {errors}")