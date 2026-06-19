interface Props {
  bullets: string[];
}

export default function OptimizedBullets({ bullets }: Props) {
  return (
    <div className="glass-card p-6 h-100 flex flex-col">
      <h2 className="text-2xl font-semibold mb-6">Optimized Resume Bullets</h2>

      <div className="space-y-4 overflow-y-auto pr-2 flex-1">
        {bullets.length === 0 ? (
          <p className="text-gray-400">
            Click optimize to generate suggestions.
          </p>
        ) : (
          bullets.map((bullet, index) => (
            <div key={index} className="bg-white/5 rounded-xl p-4">
              • {bullet}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
