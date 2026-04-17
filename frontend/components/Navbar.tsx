"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth");
  };

  const navItem = (label: string, path: string) => {
    const isActive = pathname === path;

    return (
      <button
        onClick={() => {
          router.push(path);
          setIsOpen(false);
        }}
        className={`text-sm px-3 py-2 rounded w-full text-left ${
          isActive ? "bg-black/90 text-white" : "text-gray-600 hover:bg-black/5"
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* ========== logo ========== */}
        <h1
          onClick={() => router.push("/dashboard")}
          className="text-xl font-semibold cursor-pointer tracking-tight"
        >
          HireMind
        </h1>

        {/* ========== desktop nav ========== */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => router.push("/dashboard")}
            className={`text-sm px-3 py-1 rounded ${
              pathname === "/dashboard"
                ? "bg-black/90 text-white"
                : "text-gray-600 hover:bg-black/5"
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => router.push("/resume")}
            className={`text-sm px-3 py-1 rounded ${
              pathname === "/resume"
                ? "bg-black/90 text-white"
                : "text-gray-600 hover:bg-black/5"
            }`}
          >
            Resume
          </button>

          <div className="h-5 w-px bg-gray-300 mx-2" />

          <button
            onClick={handleLogout}
            className="text-sm px-3 py-1.5 rounded bg-black/90 text-white hover:bg-black/75 active:scale-95"
          >
            Logout
          </button>
        </div>

        {/* ========== mobile menu button ========== */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded hover:bg-black/5 active:scale-95 transition"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* ========== mobile dropdown ========== */}
      {isOpen && (
        <div className="md:hidden border-t px-4 py-3 space-y-2 bg-white">
          {navItem("Dashboard", "/dashboard")}
          {navItem("Resume", "/resume")}

          <div className="h-px bg-gray-300 my-2" />

          <button
            onClick={handleLogout}
            className="w-full text-left text-sm px-3 py-2 rounded bg-black/90 text-white hover:bg-black/75"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
