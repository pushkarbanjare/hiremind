"use client";

import { useRouter } from "next/navigation";

export default function CTAButton({
  label,
  variant = "primary",
}: {
  label: string;
  variant?: "primary" | "secondary";
}) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/auth")}
      className={`px-6 py-2 rounded-md text-sm font-medium transition ${
        variant === "primary"
          ? "bg-black text-white hover:bg-black/80 shadow-sm"
          : "border border-gray-300 hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  );
}
