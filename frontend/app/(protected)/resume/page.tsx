"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ResumePage() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [resumeText, setResumeText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API = process.env.NEXT_PUBLIC_API_URL;

  // ========== protect route ==========
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth");
    } else {
      fetchResume(token);
    }
  }, []);

  // ========== fetch pdf ==========
  const fetchResume = async (token: string) => {
    try {
      const res = await fetch(`${API}/resume/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setResumeUrl(url);
      }
    } catch {
      setError("Failed to fetch resume");
    }
  };

  // ========== fetch text ==========
  const fetchText = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API}/resume/text`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setResumeText(data.resume_text);
      } else {
        setError(data.detail);
      }
    } catch {
      setError("Failed to fetch text");
    }
  };

  // ========== update ==========
  const handleUpdate = async () => {
    if (!file) {
      setError("Select a PDF file");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${API}/resume/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.detail);
        return;
      }

      fetchResume(token!);
      setResumeText(null);
    } catch {
      setError("Update failed");
    } finally {
      setLoading(false);
    }
  };

  // ========== delete ==========
  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      const res = await fetch(`${API}/resume/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.detail);
        return;
      }

      setResumeUrl(null);
      setResumeText(null);
    } catch {
      setError("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-center px-4 py-10">
        <div className="card w-full max-w-3xl">
          {/* ========== pdf view ========== */}
          {resumeUrl ? (
            <iframe src={resumeUrl} className="w-full h-125 mb-4 border" />
          ) : (
            <p className="text-center text-gray-500 mb-4">No resume found</p>
          )}

          {/* ========== file input ========== */}
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mb-4"
          />

          {/* ========== action btn ========== */}
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="btn w-full"
              disabled={loading}
            >
              Update
            </button>

            <button
              onClick={handleDelete}
              className="btn w-full bg-red-600 hover:bg-red-700"
              disabled={loading}
            >
              Delete
            </button>
          </div>

          {/* ========== view text ========== */}
          <button onClick={fetchText} className="mt-4 underline text-sm">
            View Extracted Text
          </button>
          {resumeText && (
            <pre className="mt-4 text-xs whitespace-pre-wrap bg-gray-100 p-3 rounded max-h-60 overflow-auto">
              {resumeText}
            </pre>
          )}

          {/* ========== error ========== */}
          {error && (
            <p className="text-red-600 text-sm mt-4 text-center">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
