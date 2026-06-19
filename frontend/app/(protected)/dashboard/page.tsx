"use client";

import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import ResumePanel from "@/components/dashboard/ResumePanel";
import JDPanel from "@/components/dashboard/JDPanel";
import ScoreCard from "@/components/dashboard/ScoreCard";
import ResultsPanel from "@/components/dashboard/ResultsPanel";
import OptimizedBullets from "@/components/dashboard/OptimizedBullets";
import UploadModal from "@/components/dashboard/UploadModal";
import LoadingOverlay from "@/components/shared/LoadingOverlay";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import api from "@/lib/api";

export default function DashboardPage() {
  const [resumeText, setResumeText] = useState("");
  const [jdText, setJDText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [matchedSkills, setMatchedSkills] = useState([]);
  const [improvementAreas, setImprovementAreas] = useState([]);
  const [criticalGaps, setCriticalGaps] = useState([]);
  const [optimizedBullets, setOptimizedBullets] = useState([]);
  const [score, setScore] = useState(0);

  const handleFileUpload = async (file: File) => {
    try {
      setLoading(true);
      setLoadingText("Uploading Resume...");
      const formData = new FormData();
      formData.append("file", file);
      const uploadResponse = await api.post("/resume/upload", formData);
      const resumeText = uploadResponse.data.resume_text;
      setResumeText(resumeText);
      await api.post("/resume/save", {
        resume_text: resumeText,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      setLoadingText("Analyzing Resume...");
      const response = await api.post("/analyze", {
        jd_text: jdText,
      });
      setScore(Math.round(response.data.match_score));
      setMatchedSkills(response.data.matched_skills);
      setImprovementAreas(response.data.improvement_areas);
      setCriticalGaps(response.data.critical_gaps);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOptimize = async () => {
    try {
      setLoading(true);
      setLoadingText("Optimizing Resume...");
      const response = await api.post("/optimize");
      setOptimizedBullets(response.data.optimized_resume);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
    <>
      <Navbar />

      <main className="section-container">
        {/* TOP */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <ResumePanel
            resumeText={resumeText}
            setResumeText={setResumeText}
            onUpload={() => setIsModalOpen(true)}
          />
          <JDPanel jdText={jdText} setJDText={setJDText} />
        </div>

        {/* BUTTONS */}
        <div className="flex justify-center gap-4 my-10">
          <button onClick={handleAnalyze} className="primary-btn">
            Analyze Resume
          </button>
          <button onClick={handleOptimize} className="secondary-btn">
            Optimize Bullets
          </button>
        </div>

        {/* SCORE */}
        <div className="mb-10">
          <ScoreCard score={score} />
        </div>

        {/* RESULTS */}
        <div className="grid lg:grid-cols-3 gap-8">
          <ResultsPanel title="Matched Skills" skills={matchedSkills} />
          <ResultsPanel title="Improvement Areas" skills={improvementAreas} />
          <ResultsPanel title="Critical Gaps" skills={criticalGaps} />
        </div>

        {/* OPTIMIZED */}
        <div className="mt-10">
          <OptimizedBullets bullets={optimizedBullets} />
        </div>
      </main>

      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onFileSelect={handleFileUpload}
      />

      {loading && <LoadingOverlay text={loadingText} />}
    </>
    </ProtectedRoute>
  );
}
