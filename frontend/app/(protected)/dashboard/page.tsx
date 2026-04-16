"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const [jdText, setJdText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [hasResume, setHasResume] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API = process.env.NEXT_PUBLIC_API_URL;

  // ========== protect route ==========
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth");
    } else {
      checkResume(token);
    }
  }, []);

  // ========== check resume ==========
  const checkResume = async (token: string) => {
    try {
      const res = await fetch(`${API}/resume/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 404) {
        setHasResume(false);
      } else if (res.ok) {
        setHasResume(true);
      } else {
        setError("Failed to check resume");
      }
    } catch {
      setError("Server error");
    }
  };

  // ========== upload resume ==========
  const handleUpload = async () => {
    setError("");

    if (!file) {
      setError("Please select a PDF file");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(`${API}/resume/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.detail || "Upload failed");
        return;
      }

      setHasResume(true);
      setError("");
    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  // ========== analyze ==========
  const handleAnalyze = async () => {
    setError("");

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
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-center px-4 py-10">
        <div className="card w-full max-w-2xl">
          {/* ========== loading state ========== */}
          {hasResume === null && (
            <p className="text-center text-gray-500">Loading...</p>
          )}

          {/* ========== upload ========== */}
          {hasResume === false && (
            <div>
              <h2 className="text-lg font-semibold mb-4 text-center">
                Upload Resume
              </h2>

              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="mb-4 w-full"
              />

              <button
                onClick={handleUpload}
                className="btn w-full"
                disabled={loading}
              >
                {loading ? "Uploading..." : "Upload Resume"}
              </button>
            </div>
          )}

          {/* ========== analyze ========== */}
          {hasResume === true && (
            <div>
              <h2 className="text-lg font-semibold mb-4 text-center">
                Analyze Job Description
              </h2>

              <textarea
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                className="input h-40 mb-4"
                placeholder="Paste job description..."
              />

              <button
                onClick={handleAnalyze}
                className="btn w-full"
                disabled={loading}
              >
                {loading ? "Analyzing..." : "Analyze"}
              </button>
            </div>
          )}

          {/* ========== error ========== */}
          {error && (
            <p className="text-red-600 text-sm mt-4 text-center">{error}</p>
          )}

          {/* ========== result ========== */}
          {result && (
            <div className="mt-8 space-y-6">
              {/* SCORE */}
              <div className="text-center">
                <h2 className="text-4xl font-bold">{result.match_score}%</h2>
                <p className="text-gray-500 text-sm">Match Score</p>
              </div>

              {/* SKILLS */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* MATCHED */}
                <div className="card">
                  <h3 className="font-semibold mb-3 text-green-600">
                    Matched Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.matched_skills.map((skill: string) => (
                      <span
                        key={skill}
                        className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* MISSING */}
                <div className="card">
                  <h3 className="font-semibold mb-3 text-red-600">
                    Missing Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.missing_skills.map((skill: string) => (
                      <span
                        key={skill}
                        className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
