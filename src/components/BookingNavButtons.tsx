// components/BookingNavButtons.tsx
"use client";
import { useRouter, usePathname } from "next/navigation";
import { useBookingStore } from "@/stores/bookingStore";

const steps = [
    "/booking",          // 1
    "/booking/date",     // 2
    "/booking/details",  // 3
    "/booking/agreement",// 4
    "/booking/resumen",  // 5
];

export default function BookingNavButtons({ backHref, showContinue = false, onContinue, isAgreed = true }: {
    backHref: string;
    showContinue?: boolean;
    onContinue?: () => void;
    isAgreed?: boolean
}) {
    const router = useRouter();
    const pathname = usePathname();
    console.log(backHref)
    const setStep = useBookingStore((state) => state.setCurrentStep);

    return (
        <div className="flex justify-between items-center">
            <button
                onClick={() => {
                    router.push(backHref);
                    setStep(steps.indexOf(pathname));
                }}
                className="text-sm text-gray-600 underline hover:text-spa-prim cursor-pointer"
            >
                ← Back
            </button>

            {showContinue && (
                <button
                    onClick={onContinue}
                    disabled={!isAgreed}
                    className="bg-spa-accent text-white px-5 py-2 rounded-md font-medium hover:bg-[#7EA1F4] cursor-pointer"
                >
                    {
                        pathname === "/booking/resumen" ? "Pay" : "Continue"
                    }
                </button>
            )}
        </div>
    );
}
