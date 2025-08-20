"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useBookingStore } from "@/stores/bookingStore";
import BookingStepsHeader from "@/components/BookingStepsHeader";
import { Toaster } from "@/components/ui/sonner"
import Footer from "@/components/Footer";
const steps = [
  "/booking",          // 1
  "/booking/date",     // 2
  "/booking/details",  // 3
  "/booking/agreement",// 4
  "/booking/resumen",  // 5
];

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const currentStep = useBookingStore((s) => s.currentStep);

  useEffect(() => {
    // Solo protege rutas del flujo
    if (!pathname.startsWith("/booking")) return;

    const expected = steps[currentStep - 1] ?? steps[0];

    // Si el usuario escribe o refresca una URL que no coincide → redirige
    if (pathname !== expected) router.replace(expected);
  }, [pathname, currentStep, router]);

  return (
    <section className="flex-1 flex flex-col bg-[#FFF8F2] text-[#4D4D4D] min-h-screen pt-20 pb-10 md:pt-20">
      <BookingStepsHeader />
      <Toaster position="top-center" richColors />
      <main className=" mx-auto px-2 md:px-4 mt-6 w-full    md:w-max">{children}</main>
    </section >
  );
}
