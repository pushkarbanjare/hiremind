"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [jdText, setJdText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!file || !jdText.trim()) {
      alert("Please upload resume and enter job description");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("jd_text", jdText);

    try {
      setLoading(true);

      const res = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white border rounded-lg p-6 shadow-sm">
        <h1 className="text-3xl font-bold mb-6 text-center">HireMind</h1>

        {/* File Upload */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Upload Resume (PDF)</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* JD Input */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Job Description</label>
          <textarea
            placeholder="Paste Job Description here..."
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            className="w-full h-40 p-3 border rounded"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-black hover:bg-gray-800"
          }`}
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        {/* Result */}
        {result && (
          <div className="mt-6 border-t pt-4">
            <h2 className="text-xl font-semibold mb-3">
              Match Score: {result.match_score}%
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {/* Matched */}
              <div>
                <h3 className="font-medium mb-1 text-green-600">
                  Matched Skills
                </h3>
                <ul className="list-disc ml-5 text-sm">
                  {result.matched_skills.map((s: string) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>

              {/* Missing */}
              <div>
                <h3 className="font-medium mb-1 text-red-600">
                  Missing Skills
                </h3>
                <ul className="list-disc ml-5 text-sm">
                  {result.missing_skills.map((s: string) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
