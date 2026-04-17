export default function ResumeViewer({ resumeUrl }: any) {
  return (
    <div className="card">
      {/* ========== title ========== */}
      <h2 className="text-lg font-semibold mb-3 text-center">Your Resume</h2>

      {/* ========== content ========== */}
      {resumeUrl ? (
        <iframe src={resumeUrl} className="w-full h-125 border rounded" />
      ) : (
        <p className="text-center text-gray-500 py-10">
          No resume uploaded yet
        </p>
      )}
    </div>
  );
}
