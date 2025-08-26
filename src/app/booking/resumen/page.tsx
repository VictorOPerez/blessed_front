"use client";

import BookingNavButtons from "@/components/BookingNavButtons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useBookingStore } from "@/stores/bookingStore";
import { CheckIcon } from "@heroicons/react/24/solid";
import { loadStripe } from "@stripe/stripe-js";

// Carga Stripe una sola vez
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK!);

export default function BookingConfirmation() {
    const router = useRouter();
    const booking = useBookingStore((s) => s.booking);
    const reset = useBookingStore((s) => s.reset);
    const { service, date, time } = booking;

    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // Redirige si faltan datos (pero no mientras enviamos)
    useEffect(() => {
        if (!submitting && (!service || !date || !time)) {
            router.replace("/booking");
        }
    }, [service, date, time, router, submitting]);

    // ⚠️ No usamos useMemo: variable simple (evita cambio de orden de hooks)
    const formattedDate =
        date
            ? new Date(date).toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            })
            : "";

    // Si faltan campos, no renderizamos contenido (los hooks ya se llamaron arriba)
    if (!service || !date || !time) return null;

    const details = [
        { label: "Servicio", value: service.name },
        { label: "Fecha", value: formattedDate },
        { label: "Hora", value: time },
        { label: "Duración", value: service.duration },
        { label: "Precio", value: service.price },
    ];

    const handleContinue = async () => {
        const { agreementSignatureDataURL } = booking;

        const signatureBase64 =
            agreementSignatureDataURL ? agreementSignatureDataURL.split(",")[1] : undefined;



        if (!booking.name || !booking.email || !booking.phone) {
            alert("Por favor completa nombre, email y teléfono.");
            return;
        }
        if (submitting) return;

        setSubmitting(true);
        setErrorMsg(null);

        try {

            const res = await fetch(
                "https://servermasaje-production.up.railway.app/api/bookings",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        booking: {
                            ...booking,
                            signatureBase64,                           // ⬅️ lo que espera tu backend
                            acceptedAt: new Date().toISOString(),     // ⬅️ timestamp útil
                            // (policyVersion/hash ya van en booking si los seteaste en el paso de acuerdo)
                        },
                    }),
                    cache: "no-store",
                }
            );

            const payload = await res.json();
            if (!res.ok) {
                setSubmitting(false);
                setErrorMsg(payload.error || "No se pudo crear la sesión de pago.");
                return;
            }

            const { sessionId, url } = payload;

            if (sessionId) {
                const stripe = await stripePromise;
                const { error } = await stripe!.redirectToCheckout({ sessionId });
                setSubmitting(false);
                setErrorMsg(error?.message || "No se pudo redirigir a Stripe.");
                return;
            }

            if (url) {
                window.location.assign(url);
                return;
            }

            setSubmitting(false);
            setErrorMsg("El backend no devolvió sessionId ni url.");
        } catch (err) {
            console.error("Error en handleContinue:", err);
            setSubmitting(false);
            setErrorMsg("No se pudo iniciar el pago. Inténtalo de nuevo.");
        }
    };

    return (
        <section className="booking-card relative   h-auto md:min-h-0 md:h-[550px] ">
            {submitting && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-lg px-8 py-10 flex flex-col items-center max-w-sm w-full">
                        {/* Spinner */}
                        <div className="w-12 h-12 border-4 border-gray-200 border-t-spa-prim rounded-full animate-spin mb-6"></div>

                        {/* Mensaje principal */}
                        <p className="text-lg font-semibold text-gray-800 text-center">
                            Un momento, estamos preparando tu pago de forma segura…
                        </p>

                        {/* Mensaje secundario */}
                        <p className="text-sm text-gray-500 text-center mt-3">
                            No cierres esta ventana.
                        </p>
                    </div>
                </div>

            )}

            <h1 className="text-4xl text-center font-semibold text-spa-prim mb-6">
                Resumen de la Reserva
            </h1>

            <ul className={`space-y-5 w-full px-2 md:px-10 ${submitting ? "pointer-events-none opacity-50" : ""}`}>
                {details.map((item, index) => (
                    <li key={index} className="flex items-start gap-4">
                        <CheckIcon className="w-6 h-6 text-green-500" />
                        <div className="flex flex-col sm:flex-row sm:justify-between w-full border-b border-gray-200 pb-3">
                            <span className="font-medium">{item.label}</span>
                            {item.label === "Hora" ? (
                                <div className="flex gap-2">
                                    {(Array.isArray(time) ? time : [time]).map((t) => (
                                        <span key={t}>{t}</span>
                                    ))}
                                </div>
                            ) : (
                                <span className="text-gray-600">{String(item.value)}</span>
                            )}
                        </div>
                    </li>
                ))}
            </ul>

            {errorMsg && (
                <div className="px-10 mt-4">
                    <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-red-700 text-sm">
                        {errorMsg}
                    </div>
                </div>
            )}

            <div className="text-center w-full px-10">
                <div className="text-center">
                    <BookingNavButtons
                        backHref="/booking/agreement"
                        showContinue
                        onContinue={handleContinue}
                    // si ya añadiste la prop disabled al componente, puedes pasarla:
                    // disabled={submitting}
                    />
                </div>
            </div>
        </section>
    );
}
