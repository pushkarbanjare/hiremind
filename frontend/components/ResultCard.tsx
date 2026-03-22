export default function ResultCard({ result }: any) {
  if (!result) return null;

  return (
    <div className="mt-5 pt-4 border-t border-gray-200 transition-all duration-300">
      {/* score */}
      <div className="mb-4 text-center">
        <h2 className="text-sm text-gray-500">Match Score</h2>
        <p className="text-4xl font-bold text-black">{result.match_score}%</p>
      </div>

      {/* skills */}
      <div className="grid grid-cols-2 gap-6">
        {/* matched */}
        <div className="bg-green-50 p-4 rounded">
          <h3 className="font-semibold mb-2 text-black rounded text-center bg-green-300">Matched Skills</h3>
          <ul className="list-decimal ml-5 text-sm space-y-1">
            {result.matched_skills.map((s: string) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        {/* missing */}
        <div className="bg-red-50 p-4 rounded">
          <h3 className="font-semibold mb-2 text-black rounded text-center bg-red-300">Missing Skills</h3>
          <ul className="list-decimal ml-5 text-sm space-y-1">
            {result.missing_skills.map((s: string) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
