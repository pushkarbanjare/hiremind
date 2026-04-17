"use client";

import { useState } from "react";

export default function AnalyzeSection({
  setResult,
  setError,
  setLoading,
  loading,
}: any) {
  const [jdText, setJdText] = useState("");
  const API = process.env.NEXT_PUBLIC_API_URL;

  const handleAnalyze = async () => {
    if (!jdText.trim()) {
      setError("Please enter job description");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      const res = await fetch(`${API}/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ jd_text: jdText }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Analyze failed");
        return;
      }

      setResult(data);
    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card space-y-4">
      <textarea
        value={jdText}
        onChange={(e) => setJdText(e.target.value)}
        className="input h-40"
        placeholder="Paste job description..."
      />

      <button onClick={handleAnalyze} className="btn w-full">
        {loading ? "Analyzing..." : "Analyze"}
      </button>
    </div>
  );
}
