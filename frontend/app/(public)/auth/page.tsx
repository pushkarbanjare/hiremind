"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import api from "@/lib/api";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (isLogin) {
        const response = await api.post("/auth/login", {
          email,
          password,
        });
        localStorage.setItem("token", response.data.access_token);
        router.push("/dashboard");
      } else {
        await api.post("/auth/signup", {
          email,
          password,
        });
        alert("Signup successful. Please login.");
        setIsLogin(true);
      }
    } catch (error: any) {
      alert(error?.response?.data?.detail || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="glass-card w-full max-w-md p-10">
          <div className="flex justify-center gap-3 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-6 py-2 rounded-xl transition-all ${
                isLogin ? "bg-indigo-600" : "bg-transparent"
              }`}
            >
              Login
            </button>

            <button
              onClick={() => setIsLogin(false)}
              className={`px-6 py-2 rounded-xl transition-all ${
                !isLogin ? "bg-indigo-600" : "bg-transparent"
              }`}
            >
              Signup
            </button>
          </div>

          <h1 className="text-4xl font-bold text-center">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="primary-btn w-full"
            >
              {loading
                ? "Please wait..."
                : isLogin
                  ? "Login"
                  : "Create Account"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
