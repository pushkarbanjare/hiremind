const steps = [
  {
    title: "Upload Resume",
    description:
      "Upload your resume PDF and let HireMind extract and understand your professional profile.",
  },
  {
    title: "Paste Job Description",
    description:
      "Provide the job description you're targeting and our AI analyzes semantic compatibility.",
  },
  {
    title: "Get Actionable Insights",
    description:
      "Discover missing skills, receive optimized resume bullets, and improve your chances.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-container">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold">How HireMind Works</h2>

        <p className="mt-4 text-gray-400">
          Three simple steps to improve your resume.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="glass-card p-8">
            <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-xl font-bold">
              {index + 1}
            </div>

            <h3 className="text-2xl font-semibold mt-6">{step.title}</h3>
            <p className="text-gray-400 mt-4 leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
