import CTAButton from "@/components/CTAButton";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center text-center px-6 py-24">
      {/* ========== hero ========== */}
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
          Understand How Well Your Resume
          <br />
          Matches Real Job Roles
        </h1>

        <p className="mt-4 text-gray-600 text-lg">
          Get instant insights on your resume's strengths, gaps, and alignment
          with job descriptions before you apply.
        </p>

        {/* ========== cta ========== */}
        <div className="mt-10 flex justify-center gap-4">
          <CTAButton label="Get Started" />
          <CTAButton label="Try Demo" variant="secondary" />
        </div>
      </div>

      {/* ========== divider ========== */}
      <div className="mt-14 w-24 h-px bg-gray-300" />

      {/* ========== features ========== */}
      <div className="mt-14 grid md:grid-cols-3 gap-8 max-w-5xl w-full">
        <div className="card hover:shadow-md hover:-translate-y-1">
          <h3 className="font-semibold mb-2">Upload Once</h3>
          <p className="text-sm text-gray-600">
            Store your resume securely and reuse it for multiple job analyses.
          </p>
        </div>

        <div className="card hover:shadow-md hover:-translate-y-1">
          <h3 className="font-semibold mb-2">Analyze Instantly</h3>
          <p className="text-sm text-gray-600">
            Paste any job description and get immediate compatibility insights.
          </p>
        </div>

        <div className="card hover:shadow-md hover:-translate-y-1">
          <h3 className="font-semibold mb-2">Actionable Insights</h3>
          <p className="text-sm text-gray-600">
            Identify missing skills and improve your chances before applying.
          </p>
        </div>
      </div>

      {/* ========== bottom cta ========== */}
      <div className="mt-20">
        <CTAButton label="Start Improving Your Resume" />
      </div>
    </div>
  );
}
