"use client";

import { useState } from "react";

export default function AnalyzerForm({ onResult }: any) {
  const [file, setFile] = useState<File | null>(null);
  const [jdText, setJdText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  const handleAnalyze = async () => {
    setError("");

    if (!file || !jdText.trim()) {
      setError("Please upload resume and enter job description");
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

      if (!res.ok) {
        setError(data.detail || "Something went wrong");
        return;
      }

      setError("");
      onResult(data);
    } catch (err) {
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* file */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Upload Resume (PDF)</label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => {
            const selected = e.target.files?.[0] || null;
            setFile(selected);
            setFileName(selected ? selected.name : "");
          }}
          className="w-full border p-2 rounded file:mr-3 file:px-3 file:py-1 file:border-0 file:bg-black/90 file:hover:bg-black/75 file:text-white/95 file:rounded"
        />
        {fileName && (
          <p className="text-sm text-gray-600 mt-1">Selected: {fileName}</p>
        )}
      </div>

      {/* job desc */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Job Description</label>
        <textarea
          value={jdText}
          onChange={(e) => setJdText(e.target.value)}
          className="w-full h-40 p-2 border rounded resize-none"
        />
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {/* button */}
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className={`w-full py-1 rounded text-white/95 ${
          loading ? "bg-gray-400" : "bg-black/90 hover:bg-black/75"
        }`}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>
    </div>
  );
}
