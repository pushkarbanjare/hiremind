"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import AnalyzerForm from "@/components/AnalyzerForm";
import ResultCard from "@/components/ResultCard";

export default function Home() {
  const [result, setResult] = useState<any>(null);

  return (
    <div>
      <Navbar />
      <div className="flex justify-center px-4 my-10">
        <div className="w-full max-w-2xl bg-white border rounded-lg p-6 shadow-sm">
          <AnalyzerForm onResult={setResult}/>
          <ResultCard result={result}/>
        </div>
      </div>
    </div>
  )
}
