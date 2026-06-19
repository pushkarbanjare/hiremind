"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold tracking-tight">
          HireMind
        </Link>

        <div className="hidden md:flex gap-8 text-gray-300">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it Works</a>
        </div>

        <Link href="/auth">
          <button className="primary-btn">Analyze Resume</button>
        </Link>
      </div>
    </nav>
  );
}
