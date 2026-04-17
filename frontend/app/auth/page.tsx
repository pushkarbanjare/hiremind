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
    setError("");

    const finalEmail = override?.email ?? email;
    const finalPassword = override?.password ?? password;

    if (!finalEmail || !finalPassword || (!isLogin && !name)) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const endpoint = isLogin ? "/auth/login" : "/auth/signup";

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
        localStorage.setItem("token", data.access_token);
        router.push("/dashboard");
      } else {
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
      <div className="card w-full max-w-md">
        {/* ========== title ========== */}
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Create Account"}
        </h2>

        {/* ========== name for signup only ========== */}
        {!isLogin && (
          <div className="mb-4">
            <input
              placeholder="Full Name"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        {/* ========== email ========== */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* ========== password ========== */}
        <div className="mb-4">
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
          <div className="mb-4 text-sm text-red-600 text-center">{error}</div>
        )}

        {/* ========== button for login/signup ========== */}
        <button
          onClick={() => {
            setIsLogin(true);

            handleSubmit({
              email: "test@mail.com",
              password: "test",
            });
          }}
          className="btn w-full my-2"
        >
          Login as Demo
        </button>

        {/* ========== button for login/signup ========== */}
        <button
          onClick={() => handleSubmit()}
          disabled={loading}
          className="btn w-full"
        >
          {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
        </button>

        {/* ========== toggle btwn login/signup ========== */}
        <p className="mt-4 text-sm text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="underline cursor-pointer"
          >
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}
