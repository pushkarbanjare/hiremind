"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (override?: {
    email?: string;
    password?: string;
  }) => {
    // ========== reset error state ==========
    setError("");

    // ========== determine whether to use overridden or state values ==========
    const finalEmail = override?.email ?? email;
    const finalPassword = override?.password ?? password;
    if (!finalEmail || !finalPassword || (!isLogin && !name)) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      // ========== set api endpoint ==========
      const endpoint = isLogin ? "/auth/login" : "/auth/signup";
      // ========== post req to backend ==========
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          isLogin
            ? { email: finalEmail, password: finalPassword }
            : { email: finalEmail, password: finalPassword, name },
        ),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Something went wrong");
        return;
      }

      if (isLogin) {
        // ========== store token and redirect to dashboard ==========
        localStorage.setItem("token", data.access_token);
        router.push("/dashboard");
      } else {
        // ========== switch to login after successful signup ==========
        setIsLogin(true);
        setError("Account created. Please login.");
      }
    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="card w-full max-w-md space-y-5">
        {/* ========== title ========== */}
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            {isLogin ? "Welcome back" : "Create your account"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {isLogin
              ? "Login to continue"
              : "Start analyzing your resume today"}
          </p>
        </div>

        {/* ========== form ========== */}
        <div className="space-y-4">
          {!isLogin && (
            <input
              placeholder="Full Name"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* ========== error ========== */}
        {error && (
          <div className="text-sm text-red-600 text-center bg-red-50 py-2 rounded">
            {error}
          </div>
        )}

        {/* ========== action ========== */}
        <button
          onClick={() => handleSubmit()}
          disabled={loading}
          className="btn w-full"
        >
          {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
        </button>

        {/* ========== demo login ========== */}
        <button
          onClick={() => {
            setIsLogin(true);
            handleSubmit({
              email: "test@mail.com",
              password: "test",
            });
          }}
          className="w-full text-sm text-gray-600 hover:underline"
        >
          Login as Demo
        </button>

        {/* ========== toggle ========== */}
        <p className="text-sm text-center text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="font-medium cursor-pointer hover:underline"
          >
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}
