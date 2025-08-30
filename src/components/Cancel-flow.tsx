"use client";

import { useEffect, useState } from "react";
import { CancelBookingPage } from "@/components/CancelBookingPage";

type BookingValidationData = {
    serviceTitle: string;
    dateText: string;
    timeText: string;
    eligibleForRefund: boolean;
};

type ValidationState =
    | { status: "loading"; data: null; errorMessage: null }
    | { status: "success"; data: BookingValidationData; errorMessage: null }
    | { status: "error"; data: null; errorMessage: string };

type CancellationState = "idle" | "processing" | "success" | "failed";

function isRecord(v: unknown): v is Record<string, unknown> {
    return typeof v === "object" && v !== null;
}
function pickServerError(json: unknown, fallback: string): string {
    if (isRecord(json)) {
        const err = json["error"];
        if (typeof err === "string" && err.trim()) return err;
    }
    return fallback;
}

export default function CancelFlow({
    bookingId,
    token,
}: { bookingId: string | null; token: string | null }) {
    const [validationState, setValidationState] = useState<ValidationState>({ status: "loading", data: null, errorMessage: null });
    const [cancellationState, setCancellationState] = useState<CancellationState>("idle");

    useEffect(() => {
        if (!bookingId || !token) {
            setValidationState({ status: "error", data: null, errorMessage: "Faltan parámetros en la URL." });
            return;
        }
        const ac = new AbortController();
        (async () => {
            try {
                const url = `https://servermasaje-production.up.railway.app/api/bookings/cancel/validate?bookingId=${encodeURIComponent(bookingId)}&token=${encodeURIComponent(token)}`;
                const res = await fetch(url, { cache: "no-store", signal: ac.signal });
                const json: unknown = await res.json().catch(() => null);
                if (!res.ok) throw new Error(pickServerError(json, res.statusText) || "El enlace de cancelación no es válido o ha expirado.");
                setValidationState({ status: "success", data: json as BookingValidationData, errorMessage: null });
            } catch (err: unknown) {
                if (ac.signal.aborted) return;
                setValidationState({ status: "error", data: null, errorMessage: err instanceof Error ? err.message : "Error desconocido" });
            }
        })();
        return () => ac.abort();
    }, [bookingId, token]);

    const handleConfirmCancellation = async () => {
        if (!bookingId || !token) return;
        setCancellationState("processing");
        try {
            const res = await fetch("https://servermasaje-production.up.railway.app/api/bookings/cancel", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                cache: "no-store",
                body: JSON.stringify({ bookingId, token }),
            });
            const json: unknown = await res.json().catch(() => null);
            if (!res.ok) throw new Error(pickServerError(json, res.statusText) || "No se pudo procesar la cancelación.");
            setCancellationState("success");
        } catch {
            setCancellationState("failed");
        }
    };

    if (validationState.status === "loading") {
        return <div className="flex h-screen items-center justify-center">Verificando tu reserva...</div>;
    }
    if (validationState.status === "error") {
        return <div className="flex h-screen items-center justify-center text-red-600">{validationState.errorMessage}</div>;
    }
    if (cancellationState === "success") {
        return (
            <div className="flex h-screen items-center justify-center text-center px-6">
                <div>
                    <h1 className="text-2xl font-bold text-green-700">¡Reserva Cancelada!</h1>
                    <p className="mt-2">Tu reserva ha sido cancelada exitosamente. Te enviamos una confirmación por correo.</p>
                </div>
            </div>
        );
    }

    return (
        <CancelBookingPage
            brandName="Blessed Massage & Recovery"
            serviceTitle={validationState.data.serviceTitle}
            dateText={validationState.data.dateText}
            timeText={validationState.data.timeText}
            eligibleForRefund={validationState.data.eligibleForRefund}
            loading={cancellationState === "processing"}
            onConfirm={handleConfirmCancellation}
        />
    );
}
