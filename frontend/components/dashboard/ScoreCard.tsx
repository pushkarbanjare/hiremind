interface Props {
  score: number;
}

export default function ScoreCard({ score }: Props) {
  return (
    <div className="glass-card p-8 text-center">
      <h2 className="text-xl text-gray-400">Match Score</h2>

      <div className="w-44 h-44 rounded-full border-12 border-indigo-500 mx-auto mt-6 flex items-center justify-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold wrap-break-word">
            {score.toFixed(0)}%
          </h1>
          <p className="text-gray-400">Overall Match</p>
        </div>
      </div>
    </div>
  );
}
