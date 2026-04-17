"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UploadSection from "./UploadSection";
import AnalyzeSection from "./AnalyzeSection";
import ResultSection from "./ResultSection";

export default function DashboardClient() {
  const router = useRouter();

  const [hasResume, setHasResume] = useState<boolean | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API = process.env.NEXT_PUBLIC_API_URL;

  // ========== check resume ==========
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth");
      return;
    }

    fetch(`${API}/resume/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 404) setHasResume(false);
        else if (res.ok) setHasResume(true);
        else setError("Failed to check resume");
      })
      .catch(() => setError("Server error"));
  }, []);

  return (
    <div className="flex justify-center px-4 py-12">
      <div className="w-full max-w-2xl space-y-6">
        {/* ========== loading state ========== */}
        {hasResume === null && (
          <div className="card text-center text-gray-500">
            Checking your setup...
          </div>
        )}

        {/* ========== for no resume ========== */}
        {hasResume === false && (
          <div className="space-y-4 text-center">
            <div>
              <h2 className="text-xl font-semibold">Let's get you started</h2>
              <p className="text-sm text-gray-500 mt-1">
                Upload your resume to begin analyzing job matches
              </p>
            </div>

            <UploadSection
              setHasResume={setHasResume}
              setError={setError}
              setLoading={setLoading}
              loading={loading}
            />
          </div>
        )}

        {/* ========== analyze state ========== */}
        {hasResume === true && (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-semibold">
                Analyze a job description
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Paste a job description to evaluate your match
              </p>
            </div>

            <AnalyzeSection
              setResult={setResult}
              setError={setError}
              setLoading={setLoading}
              loading={loading}
            />
          </div>
        )}

        {/* ========== error ========== */}
        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-2 rounded text-center">
            {error}
          </div>
        )}

        {/* ========== result ========== */}
        {result && <ResultSection result={result} />}
      </div>
    </div>
  );
}
