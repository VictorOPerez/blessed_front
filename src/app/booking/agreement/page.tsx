// src/components/ConfidentialityAgreement.tsx

"use client";

import BookingNavButtons from '@/components/BookingNavButtons';
import { useRouter } from "next/navigation";
import { useEffect } from 'react';
import { useBookingStore } from '@/stores/bookingStore';

export default function ConfidentialityAgreement() {
    const router = useRouter();

    const booking = useBookingStore((state) => state.booking);
    const setAgreement = useBookingStore((state) => state.setAgreement);
    const setStep = useBookingStore((state) => state.setCurrentStep);

    const { service, date, time, name, email, agreementAccepted } = booking;

    // Redirigir si falta algún paso previo
    useEffect(() => {
        if (!service || !date || !time || !name || !email) {
            router.replace("/booking");
        }
    }, [service, date, time, name, email, router]);


    const handleContinue = () => {
        if (!agreementAccepted) {
            alert("Debes aceptar los términos para continuar.");
            return;
        }
        // ✅ Paso 2: fecha y hora
        setStep(5);
        router.push("/booking/resumen");
    };

    if (!service || !date || !time || !name || !email) return null;

    return (
        <div className="booking-card">
            <div className="w-full max-w-lg rounded-lg">
                <main className="flex flex-col items-center gap-8">

                    {/* Título del Acuerdo */}
                    <h1 className="text-4xl text-center  font-semibold  text-spa-prim">
                        Confidentiality Agreement
                    </h1>

                    {/* Caja de Texto del Acuerdo */}
                    <div className="w-full rounded-md border border-gray-200 bg-white p-6 text-gray-600 shadow-sm">
                        <p className="mb-4">
                            Lorem Ipsum dolor sit amet, consertetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>

                    {/* Checkbox de Aceptación */}
                    <div className="flex w-full items-center gap-3">
                        <input
                            id="agreement-checkbox"
                            type="checkbox"
                            checked={agreementAccepted}
                            onChange={(e) => setAgreement(e.target.checked)}
                            className="h-5 w-5 cursor-pointer rounded border-gray-300 text-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/50"
                        />
                        <label
                            htmlFor="agreement-checkbox"
                            className="cursor-pointer select-none text-gray-700"
                        >
                            I agree to the terms outlined above.
                        </label>
                    </div>

                    {/* Botón para Firmar Acuerdo */}
                    <div className="text-center w-full px-2 md:px-10">
                        <div className=" text-center">
                            <BookingNavButtons
                                backHref="/booking/details"
                                showContinue
                                onContinue={handleContinue}
                                isAgreed={agreementAccepted}
                            />
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}
