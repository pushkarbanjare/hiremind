import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

/* ========== fonts ========== */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* ========== meta ========== */
export const metadata: Metadata = {
  title: "HireMind",
  description: "Smart Resume Analyzer & Job Matcher",
};

/* ========== root layout ========== */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-(--background) text-(--foreground)">
        <div className="min-h-screen flex flex-col">{children}</div>
      </body>
    </html>
  );
}
