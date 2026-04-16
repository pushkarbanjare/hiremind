"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth");
  };

  return (
    <div className="flex justify-between items-center px-6 py-3 border-b bg-white">
      {/* ========== left ========== */}
      <h1
        onClick={() => router.push("/dashboard")}
        className="text-xl font-bold cursor-pointer"
      >
        HireMind
      </h1>

      {/* ========== right ========== */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/dashboard")}
          className="text-sm hover:underline"
        >
          Dashboard
        </button>

        <button
          onClick={() => router.push("/resume")}
          className="text-sm hover:underline"
        >
          Resume
        </button>

        <button onClick={handleLogout} className="btn">
          Logout
        </button>
      </div>
    </div>
  );
}
