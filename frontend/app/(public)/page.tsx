import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import CTASection from "@/components/landing/CTASection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <CTASection />
      <Footer />
    </>
  );
}