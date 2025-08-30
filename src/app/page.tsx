'use client'
import { CTASection } from "@/components/home/CTASection";
import Hero from "@/components/home/Hero";
import PainPointsSection from "@/components/home/PainPointsSection";
import RecoveryPlanSection from "@/components/home/RecoveryPlanSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import Footer from "@/components/Footer";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from "sonner"
import { useRouter } from "next/navigation";

export default function ProgressTest() {

  const router = useRouter();
  const searchParams = useSearchParams();

  // Deriva un primitivo estable para usar en dependencias:
  const status = searchParams.get("status"); // string | null

  useEffect(() => {
    if (status !== "safe") return;

    // Evita toasts repetidos (refresh / navegación hacia atrás)
    const KEY = "toastSafeShown";
    if (!sessionStorage.getItem(KEY)) {
      toast("¡No te preocupes! Tu reserva sigue confirmada.");
      sessionStorage.setItem(KEY, "1");
    }

    // Limpia el parámetro de la URL para que no se dispare de nuevo
    // (usa solo pathname para no re-agregar el query)
    router.replace(window.location.pathname);
  }, [status, router]);

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
