interface Skill {
  skill: string;
  similarity: number;
}

interface Props {
  title: string;
  skills: Skill[];
}

export default function ResultsPanel({ title, skills }: Props) {
  return (
    <div className="glass-card p-6 h-80 flex flex-col">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>

      <div className="space-y-3 overflow-y-auto pr-2 flex-1">
        {skills.length === 0 ? (
          <p className="text-gray-400">No data yet.</p>
        ) : (
          skills.map((skill, index) => (
            <div key={index} className="bg-white/5 p-3 rounded-xl">
              <p className="font-medium">{skill.skill}</p>

              <p className="text-sm text-gray-400">
                Similarity: {(skill.similarity * 100).toFixed(0)}%
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
