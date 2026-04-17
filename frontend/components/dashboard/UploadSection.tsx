"use client";

import { useRef, useState } from "react";

export default function UploadSection({
  setHasResume,
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

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF file");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      // ========== prepare multipart form data for file transfer ==========
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
    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card space-y-4 text-center">
      <div className="flex items-center justify-between gap-3">
        {/* hidden input */}
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

        {/* choose file button */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="btn"
        >
          Choose File
        </button>

        {/* file name */}
        <span className="text-sm text-gray-600 truncate max-w-45">
          {fileName || "No file selected"}
        </span>
      </div>

      {/* ========== upload button ========== */}
      <button
        onClick={handleUpload}
        className="btn w-full disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload Resume"}
      </button>
    </div>
  );
}
