import { redirect } from "next/navigation";

export default function Home() {
  // ========== redirect root to auth page ==========
  redirect("/auth");
}