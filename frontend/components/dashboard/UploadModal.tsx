"use client";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onFileSelect: (file: File) => void;
}

export default function UploadModal({ isOpen, onClose, onFileSelect }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
      <div className="glass-card w-full max-w-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Upload Resume</h2>
          <button onClick={onClose} className="text-2xl">
            ×
          </button>
        </div>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              onFileSelect(file);
              onClose();
            }
          }}
          className="w-full p-4 rounded-xl border border-white/10 bg-white/5"
        />
      </div>
    </div>
  );
}
