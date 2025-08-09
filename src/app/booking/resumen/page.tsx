"use client";

import BookingNavButtons from "@/components/BookingNavButtons";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useBookingStore } from "@/stores/bookingStore";
import { CheckIcon } from "@heroicons/react/24/solid";
import { loadStripe } from '@stripe/stripe-js';

export default function BookingConfirmation() {
    const router = useRouter();

    const booking = useBookingStore((state) => state.booking);
    const setStep = useBookingStore((state) => state.setCurrentStep);
    const reset = useBookingStore((state) => state.reset)
    const { service, date, time } = booking;

    // Redirige si no hay datos
    useEffect(() => {
        if (!service || !date || !time) {
            router.replace("/booking");
        }
    }, [service, date, time, router]);



    if (!service || !date || !time) return null;

    const formattedDate = new Date(date).toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const details = [
        { label: "Servicio", value: service.name },
        { label: "Fecha", value: formattedDate },
        { label: "Hora", value: time },
        { label: "Duración", value: service.duration },
        { label: "Precio", value: service.price },
    ];




    const handleContinue = async () => {
        if (!booking.name || !booking.email || !booking.phone) {
            return alert('Por favor completa nombre, email y teléfono.');
        }
        try {
            const res = await fetch(
                'https://servermasaje-production.up.railway.app/api/bookings',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ booking })
                }
            );
            const payload = await res.json();
            console.log('Backend payload:', payload);
            reset()
            if (!res.ok) {
                return alert(`Error: ${payload.error || JSON.stringify(payload)}`);
            }

            const { sessionId } = payload;
            if (!sessionId) {
                return alert('El backend no devolvió sessionId.');
            }

            const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK!);
            await stripe!.redirectToCheckout({ sessionId });
        } catch (err) {
            console.error('Error en handleContinue:', err);
            alert('No se pudo iniciar el pago. Inténtalo de nuevo.');
        }
    };



    return (
        <section className="booking-card">
            <h1 className="text-4xl text-center  font-semibold  text-spa-prim mb-6 ">Resumen de la Reserva</h1>

            <ul className="space-y-5 w-full px-2 md:px-10">
                {details.map((item, index) => (
                    <li key={index} className="flex items-start gap-4">
                        <CheckIcon className="w-6 h-6 text-green-500" />
                        <div className="flex flex-col sm:flex-row sm:justify-between w-full border-b border-gray-200 pb-3">
                            <span className="font-medium">{item.label}</span>
                            {
                                item.label === "Hora" ? <div className=" flex gap-2">
                                    {time.map((t) => <span key={t}>{t}</span>)}
                                </div> : <span className="text-gray-600">{item.value}</span>
                            }

                        </div>
                    </li>
                ))}
            </ul>
            <div className="text-center w-full px-10">
                <div className=" text-center">
                    <BookingNavButtons
                        backHref="/booking/agreement"
                        showContinue
                        onContinue={handleContinue}
                    />
                </div>
            </div>
        </section>
    );
}
