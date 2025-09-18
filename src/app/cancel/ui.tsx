// app/cancel/ui.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type ValidateData = {
    serviceTitle: string;
    dateText: string;
    timeText: string;
    eligibleForRefund: boolean;
};

type Validation =
    | { status: "idle" | "loading"; data?: undefined; error?: undefined }
    | { status: "ready"; data: ValidateData; error?: undefined }
    | { status: "error"; error: string; data?: undefined };

type CancelState = "idle" | "processing" | "done" | "failed";

export default function CancelUI({
    bookingId,
    token,
}: {
    bookingId: string | null;
    token: string | null;
}) {
    const [validation, setValidation] = useState<Validation>({ status: "idle" });
    const [cancelState, setCancelState] = useState<CancelState>("idle");

    useEffect(() => {
        if (!bookingId || !token) {
            setValidation({ status: "error", error: "Faltan parámetros en el enlace." });
            return;
        }
        (async () => {
            try {
                setValidation({ status: "loading" });
                const url =
                    `https://servermasaje-production.up.railway.app/api/bookings/cancel/validate` +
                    `?bookingId=${encodeURIComponent(bookingId)}&token=${encodeURIComponent(token)}`;
                const res = await fetch(url, { cache: "no-store" });

                const json: ValidateData | { error?: string } = await res.json();

                if (!res.ok) {
                    const msg = "error" in json && json.error ? json.error : "El enlace no es válido o expiró.";
                    throw new Error(msg);
                }

                setValidation({ status: "ready", data: json as ValidateData });
            } catch (e: unknown) {
                const message = e instanceof Error ? e.message : "Error verificando la reserva.";
                setValidation({ status: "error", error: message });
            }
        })();
    }, [bookingId, token]);

    const confirm = async () => {
        if (!bookingId || !token) return;
        setCancelState("processing");
        try {
            const res = await fetch(
                "https://servermasaje-production.up.railway.app/api/bookings/cancel",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    cache: "no-store",
                    body: JSON.stringify({
                        bookingId: Number(bookingId),
                        token,
                    }),
                }
            );
            const json: { error?: string } = await res.json().catch(() => ({} as { error?: string }));

            if (!res.ok) {
                const msg = json.error ?? "No se pudo cancelar la reserva.";
                throw new Error(msg);
            }

            setCancelState("done");
        } catch (_e: unknown) {
            setCancelState("failed");
        }
    };

    // UI
    return (
        <main className="min-h-[70svh] bg-[#FFF8F2] flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-xl bg-white border border-[#275B59]/15 rounded-2xl shadow-sm p-8 md:p-10">
                <h1 className="text-2xl md:text-3xl font-bold text-[#275B59] text-center">
                    Cancelar reserva
                </h1>

                {validation.status === "loading" && (
                    <p className="mt-6 text-center text-[#425958]">Verificando tu enlace…</p>
                )}

                {validation.status === "error" && (
                    <div className="mt-6 text-center text-red-600">{validation.error}</div>
                )}

                {validation.status === "ready" && (
                    <>
                        <div className="mt-6 grid gap-3">
                            <Info label="Servicio" value={validation.data.serviceTitle} />
                            <Info label="Fecha" value={validation.data.dateText} />
                            <Info label="Hora" value={validation.data.timeText} />
                            <Info
                                label="Reembolso"
                                value={
                                    validation.data.eligibleForRefund
                                        ? "Con derecho a reembolso (≥ 24h antes)"
                                        : "Sin derecho a reembolso (< 24h)"
                                }
                            />
                        </div>

                        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={confirm}
                                disabled={cancelState === "processing"}
                                className="rounded-full bg-[#FF8A7B] hover:bg-[#ff7665] text-white font-semibold px-6 py-3 disabled:opacity-60"
                            >
                                {cancelState === "processing" ? "Cancelando…" : "Confirmar cancelación"}
                            </button>
                            <Link
                                href="/"
                                className="rounded-full border border-[#275B59] text-[#275B59] hover:bg-[#275B59] hover:text-white font-semibold px-6 py-3 text-center"
                            >
                                Volver al inicio
                            </Link>
                        </div>

                        {cancelState === "done" && (
                            <p className="mt-4 text-center text-green-700">
                                ¡Listo! Tu reserva ha sido cancelada.
                            </p>
                        )}
                        {cancelState === "failed" && (
                            <p className="mt-4 text-center text-red-600">
                                No se pudo cancelar. Intenta nuevamente.
                            </p>
                        )}
                    </>
                )}
            </div>
        </main>
    );
}

function Info({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-lg bg-[#FF8A7B]/8 p-4">
            <p className="text-sm font-semibold text-[#275B59]">{label}</p>
            <p className="text-sm text-[#425958]">{value}</p>
        </div>
    );
}
