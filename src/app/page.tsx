'use client'
import { CTASection } from "@/components/home/CTASection";
import Hero from "@/components/home/Hero";
import PainPointsSection from "@/components/home/PainPointsSection";
import RecoveryPlanSection from "@/components/home/RecoveryPlanSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import Footer from "@/components/Footer";

export default function ProgressTest() {
  return (
    <div className="mt-16 min-h-screen">
      <Hero />
      <PainPointsSection />
      <RecoveryPlanSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
