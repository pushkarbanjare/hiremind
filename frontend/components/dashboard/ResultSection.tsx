export default function ResultSection({ result }: any) {
  return (
    <div className="space-y-6">
      {/* ========== score ========== */}
      <div className="text-center">
        <h2 className="text-4xl font-bold">{result.match_score}%</h2>
        <p className="text-gray-500 text-sm">Match Score</p>
      </div>

      {/* ========== skills ========== */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-semibold mb-3 text-green-600">Matched Skills</h3>
          <div className="flex flex-wrap gap-2">
            {result.matched_skills.map((s: string) => (
              <span
                key={s}
                className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="font-semibold mb-3 text-red-600">Missing Skills</h3>
          <div className="flex flex-wrap gap-2">
            {result.missing_skills.map((s: string) => (
              <span
                key={s}
                className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
