interface ResumePanelProps {
  resumeText: string;
  setResumeText: (value: string) => void;
  onUpload: () => void;
}

export default function ResumePanel({
  resumeText,
  setResumeText,
  onUpload,
}: ResumePanelProps) {
  return (
    <div className="glass-card p-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Resume</h2>
        <button onClick={onUpload} className="primary-btn">
          Upload PDF
        </button>
      </div>

      <textarea
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        placeholder="Resume text will appear here..."
        className="w-full h-100 rounded-xl bg-white/5 border border-white/10 p-4 outline-none resize-none"
      />
    </div>
  );
}
