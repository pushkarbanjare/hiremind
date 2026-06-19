import Link from "next/link";

export default function CTASection() {
  return (
    <section className="section-container">
      <div className="glass-card p-14 text-center">
        <h2 className="text-5xl font-bold">
          Stop guessing.
          <br />
          Start getting interviews.
        </h2>

        <p className="mt-6 text-gray-400 text-lg">
          Optimize your resume before recruiters ever see it.
        </p>

        <Link href="/auth">
          <button className="primary-btn mt-10">Get Started</button>
        </Link>
      </div>
    </section>
  );
}
