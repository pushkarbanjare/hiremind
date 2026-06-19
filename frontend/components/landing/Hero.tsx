import Link from "next/link";

export default function Hero() {
  return (
    <section className="section-container">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <div>
          <span className="inline-block mb-6 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-300 text-sm">
            AI-Powered Resume Intelligence
          </span>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Know exactly why your resume{" "}
            <span className="text-indigo-400">gets rejected</span>
          </h1>

          <p className="mt-8 text-xl text-gray-400 leading-relaxed">
            Understand resume strengths, identify skill gaps, optimize weak
            bullets, and match against real job descriptions before applying.
          </p>

          <div className="mt-10 flex gap-4">
            <Link href="/auth">
              <button className="primary-btn">Analyze Resume</button>
            </Link>

            <button className="secondary-btn">Try Demo</button>
          </div>
        </div>

        {/* RIGHT */}

        <div className="glass-card p-8 max-w-md mx-auto">
          <div className="flex justify-between text-gray-400">
            <span>ATS SCORE REPORT</span>
            <span>Realtime</span>
          </div>

          <div className="mt-10 flex justify-center">
            <div className="w-40 h-40 rounded-full border-12 border-indigo-500 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-5xl font-bold">87</h2>

                <p className="text-gray-400">Match Score</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-10">
            <div className="glass-card p-4">
              <p className="text-gray-400 text-sm">Matched Skills</p>

              <h3 className="text-3xl font-bold mt-2">32</h3>
            </div>

            <div className="glass-card p-4">
              <p className="text-gray-400 text-sm">Missing Skills</p>

              <h3 className="text-3xl font-bold mt-2">7</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
