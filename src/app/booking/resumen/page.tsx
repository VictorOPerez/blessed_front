"use client";

import BookingNavButtons from "@/components/BookingNavButtons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useBookingStore } from "@/stores/bookingStore";
import { CheckIcon } from "@heroicons/react/24/solid";
import { loadStripe } from "@stripe/stripe-js";

// Load Stripe only once
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK!);

// Tipos auxiliares para evitar `any`
type ServiceWithOptionalSlug = {
    slug?: string;
    name: string;
    duration: string;
    price: string;
    description: string;
};

type BookingApiResponse = {
    sessionId?: string;
    url?: string;
    error?: string;
    message?: string;
};

export default function BookingConfirmation() {
    const router = useRouter();
    const booking = useBookingStore((s) => s.booking);
    const { service, date, time } = booking;

    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // Redirect if data is missing (but not while submitting)
    useEffect(() => {
        if (!submitting && (!service || !date || !time)) {
            router.replace("/booking");
        }
    }, [service, date, time, router, submitting]);

    // ⚠️ No useMemo: simple variable (avoids hook order changes)
    const formattedDate =
        date
            ? new Date(date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            })
            : "";

    // If fields are missing, render nothing (hooks already called above)
    if (!service || !date || !time) return null;

    const details = [
        { label: "Service", value: service.name },
        { label: "Date", value: formattedDate },
        { label: "Time", value: time },
        { label: "Duration", value: service.duration },
        { label: "Price", value: service.price },
    ];

    const handleContinue = async () => {
        const { agreementSignatureDataURL } = booking;

        if (!booking.name || !booking.email || !booking.phone) {
            alert("Please complete your name, email, and phone.");
            return;
        }
        if (!service || !date || !time) {
            alert("Missing service/date/time.");
            return;
        }
        if (submitting) return;

        setSubmitting(true);
        setErrorMsg(null);

        // Normalize date to "YYYY-MM-DD"
        const d = new Date(date);
        const dateOnly = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
            d.getDate()
        ).padStart(2, "0")}`;

        // Ensure time is an array
        const timeArr: string[] = Array.isArray(time) ? time : [time];

        // Signature payload (without data: prefix)
        const signatureBase64 = agreementSignatureDataURL
            ? agreementSignatureDataURL.split(",")[1]
            : undefined;

        // Take slug safely, without `any`
        const svc = service as unknown as ServiceWithOptionalSlug;

        const payload = {
            booking: {
                service: {
                    slug: svc.slug, // key for DB lookup
                    name: service.name,
                },
                name: booking.name,
                email: booking.email,
                phone: booking.phone,
                date: dateOnly,
                time: timeArr,
                agreementAccepted: !!booking.agreementAccepted,
                signatureBase64,
                agreementPolicyVersion: booking.agreementPolicyVersion ?? "v1.0",
                acceptedAt: new Date().toISOString(),
            },
        };
        // --- AÑADE ESTO ---
        console.log("[PROD DEBUG] Preparando para enviar. Payload:", JSON.stringify(payload, null, 2));
        alert("Revisa la consola antes de enviar el fetch."); // Pausa temporal para que veas el log

        try {
            const res = await fetch(
                "https://servermasaje-production.up.railway.app/api/bookings",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                    cache: "no-store",
                }
            );

            const text = await res.text();
            const json: BookingApiResponse = (() => {
                try {
                    return JSON.parse(text) as BookingApiResponse;
                } catch {
                    return { message: text };
                }
            })();

            if (!res.ok) {
                console.error("Booking API error:", json);
                setSubmitting(false);
                setErrorMsg(json.error || json.message || "Could not create the payment session.");
                return;
            }

            if (json.sessionId) {
                const stripe = await stripePromise;
                const { error } = await stripe!.redirectToCheckout({ sessionId: json.sessionId });
                setSubmitting(false);
                setErrorMsg(error?.message || "Could not redirect to Stripe.");
                return;
            }

            if (json.url) {
                window.location.assign(json.url);
                return;
            }

            setSubmitting(false);
            setErrorMsg("The backend did not return a sessionId or url.");
        } catch (err) {
            console.error("Error in handleContinue:", err);
            setSubmitting(false);
            setErrorMsg("Payment could not be initiated. Please try again.");
        }
    };

    return (
        <section className="booking-card relative h-auto md:min-h-0 md:h-[550px] ">
            {submitting && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-lg px-8 py-10 flex flex-col items-center max-w-sm w-full">
                        {/* Spinner */}
                        <div className="w-12 h-12 border-4 border-gray-200 border-t-spa-prim rounded-full animate-spin mb-6"></div>

                        {/* Main message */}
                        <p className="text-lg font-semibold text-gray-800 text-center">
                            One moment, we’re securely preparing your payment…
                        </p>

                        {/* Secondary message */}
                        <p className="text-sm text-gray-500 text-center mt-3">
                            Please don’t close this window.
                        </p>
                    </div>
                </div>
            )}

            <h1 className="text-4xl text-center font-semibold text-spa-prim mb-6">
                Booking Summary
            </h1>

            <ul
                className={`space-y-5 w-full px-2 md:px-10 ${submitting ? "pointer-events-none opacity-50" : ""
                    }`}
            >
                {details.map((item, index) => (
                    <li key={index} className="flex items-start gap-4">
                        <CheckIcon className="w-6 h-6 text-green-500" />
                        <div className="flex flex-col sm:flex-row sm:justify-between w-full border-b border-gray-200 pb-3">
                            <span className="font-medium">{item.label}</span>
                            {item.label === "Time" ? (
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
                    />
                </div>
            </div>
        </section>
    );
}
