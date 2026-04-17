"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ResumeViewer from "./ResumeViewer";
import ResumeActions from "./ResumeActions";

export default function ResumeClient() {
  const router = useRouter();

  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [resumeText, setResumeText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");

    // ========== reset state ==========
    setResumeUrl(null);
    setResumeText(null);
    setError("");

    if (!token) {
      router.push("/auth");
      return;
    }

    fetchResume(token);
  }, []);

  const fetchResume = async (token: string) => {
    try {
      const res = await fetch(`${API}/resume/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const blob = await res.blob();
        setResumeUrl(URL.createObjectURL(blob));
      }
    } catch {
      setError("Failed to fetch resume");
    }
  };

  return (
    <div className="flex justify-center px-4 py-10">
      <div className="w-full max-w-3xl space-y-6">
        {/* ========== viewer ========== */}
        <ResumeViewer resumeUrl={resumeUrl} />

        {/* ========== actions ========== */}
        <ResumeActions
          setResumeUrl={setResumeUrl}
          setResumeText={setResumeText}
          setError={setError}
          setLoading={setLoading}
          loading={loading}
        />

        {/* ========== text preview ========== */}
        {resumeText && (
          <div className="card text-xs whitespace-pre-wrap max-h-60 overflow-auto">
            {resumeText}
          </div>
        )}

        {/* ========== error ========== */}
        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-2 rounded text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
