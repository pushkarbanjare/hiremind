const features = [
  "Semantic Resume Matching",
  "Skill Gap Intelligence",
  "AI Resume Optimization",
  "Multi-LLM Fallback",
  "ATS Match Score",
  "Actionable Recommendations",
];

export default function Features() {
  return (
    <section id="features" className="section-container">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold">Powerful Features</h2>

        <p className="mt-4 text-gray-400">
          Everything needed to maximize interview chances.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div
            key={feature}
            className="glass-card p-8 hover:-translate-y-2 transition-all duration-300"
          >
            <div className="text-indigo-400 text-3xl">✦</div>
            <h3 className="mt-6 text-xl font-semibold">{feature}</h3>
            <p className="mt-4 text-gray-400">
              Improve resume quality and identify opportunities before applying.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
