"use client";

import { useRef, useState } from "react";

export default function ResumeActions({
  setResumeUrl,
  setResumeText,
  setError,
  setLoading,
  loading,
}: any) {
  // ========== state for selected file and its display name ==========
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  // ========== reference to the hidden file input element ==========
  const inputRef = useRef<HTMLInputElement | null>(null);

  const API = process.env.NEXT_PUBLIC_API_URL;

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // ========== update handle ==========
  const handleUpdate = async () => {
    if (!file) {
      setError("Select a PDF file");
      return;
    }

    try {
      setLoading(true);

      // ========== create multipart form data for file transfer ==========
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

      // ========== convert response to blob to generate a local url ==========
      const blob = await res.blob();
      setResumeUrl(URL.createObjectURL(blob));
      setResumeText(null);
    } catch {
      setError("Update failed");
    } finally {
      setLoading(false);
    }
  };

  // ========== delete handle ==========
  const handleDelete = async () => {
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

      // ========== reset states after deletion ==========
      setResumeUrl(null);
      setResumeText(null);
    } catch {
      setError("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  // ========== fetch resume text ==========
  const fetchText = async () => {
    try {
      const res = await fetch(`${API}/resume/text`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (res.ok) setResumeText(data.resume_text);
      else setError(data.detail);
    } catch {
      setError("Failed to fetch text");
    }
  };

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between gap-3">
        <input
          type="file"
          accept=".pdf"
          ref={inputRef}
          className="hidden"
          onChange={(e) => {
            const selected = e.target.files?.[0] || null;
            setFile(selected);
            setFileName(selected ? selected.name : "");
          }}
        />

        {/* ========== choose file button ========== */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="btn"
        >
          Choose File
        </button>

        {/* ========== file name ========== */}
        <span className="text-sm text-gray-600 truncate max-w-45">
          {fileName || "No file selected"}
        </span>
      </div>

      {/* ========== action btns ========== */}
      <div className="flex gap-3">
        <button
          onClick={handleUpdate}
          className="btn w-full disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Processing..." : "Update"}
        </button>

        <button
          onClick={handleDelete}
          className="w-full bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-60"
          disabled={loading}
        >
          Delete
        </button>
      </div>

      {/* ========== text btn ========== */}
      <button
        onClick={fetchText}
        className="text-sm text-gray-600 hover:underline text-center"
      >
        View extracted text
      </button>
    </div>
  );
}
