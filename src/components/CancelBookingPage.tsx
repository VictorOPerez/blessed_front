"use client";

import Link from "next/link";

type CancelCardProps = {
    brandName?: string;
    serviceTitle: string;
    dateText: string;
    timeText: string;
    eligibleForRefund?: boolean;
    onConfirm: () => void;
    loading?: boolean;
    primaryHex?: string;
    bgHex?: string;
};

export function CancelBookingPage({
    brandName = "Blessed Massage & Recovery",
    serviceTitle,
    dateText,
    timeText,
    eligibleForRefund = true,
    onConfirm,
    loading = false,
    primaryHex = "#E26755",
    bgHex = "#E26755",
}: CancelCardProps) {
    return (
        <div className="min-h-svh w-full pt-12" style={{ backgroundColor: bgHex }}>
            <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
                {/* Card */}
                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
                    {/* Título */}
                    <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                        Confirmar Cancelación de Reserva
                    </h1>

                    {/* Resumen */}
                    <div className="mt-6 rounded-xl border border-neutral-200 bg-neutral-50/60 p-4 sm:p-5">
                        <div className="text-base font-semibold text-neutral-900">
                            {serviceTitle}
                        </div>
                        <div className="mt-1 text-neutral-600">
                            {dateText}
                            <br />
                            {timeText}
                        </div>
                    </div>

                    {/* Mensaje */}
                    {eligibleForRefund ? (
                        <div className="mt-6 flex items-start gap-3 text-neutral-800">
                            <span
                                className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100"
                                aria-hidden="true"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                    style={{ color: "#059669" }}
                                >
                                    <path
                                        d="M20 6L9 17l-5-5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                            <p className="leading-relaxed">
                                Eres elegible para un{" "}
                                <span className="font-semibold">reembolso completo</span> porque
                                estás cancelando con suficiente antelación.
                            </p>
                        </div>
                    ) : (
                        <div className="mt-6 flex items-start gap-3 text-neutral-800">
                            <span
                                className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-100"
                                aria-hidden="true"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                    style={{ color: "#B45309" }}
                                >
                                    <path
                                        d="M12 9v4m0 4h.01M10.29 3.86l-8 14A2 2 0 004 21h16a2 2 0 001.71-3.14l-8-14a2 2 0 00-3.42 0z"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                            <p className="leading-relaxed">
                                Estás cancelando con menos de 24 horas.{" "}
                                <span className="font-semibold">No aplica reembolso</span>, pero
                                tu reserva se cancelará igualmente.
                            </p>
                        </div>
                    )}

                    {/* Acciones */}
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <button
                            type="button"
                            onClick={onConfirm}
                            disabled={loading}
                            className="inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-base font-semibold text-white shadow-sm transition disabled:opacity-70 sm:w-auto cursor-pointer"
                            style={{ backgroundColor: primaryHex }}
                        >
                            {loading ? (
                                <span className="inline-flex items-center gap-2">
                                    <Spinner />
                                    Procesando…
                                </span>
                            ) : eligibleForRefund ? (
                                "Sí, Cancelar y Reembolsar"
                            ) : (
                                "Sí, Cancelar"
                            )}
                        </button>

                        <Link
                            className="inline-flex w-full items-center justify-center rounded-xl border px-5 py-3 text-base font-semibold transition hover:bg-neutral-50 sm:w-auto cursor-pointer"
                            style={{ color: primaryHex, borderColor: primaryHex }}
                            href={"/?status=safe"}
                        >
                            No, mantener mi reserva
                        </Link>
                    </div>
                </div>

                {/* Nota tiempos bancarios */}
                <p className="mt-4 text-sm text-neutral-500">
                    Si corresponde reembolso, tu banco puede tardar entre 5 y 10 días
                    hábiles en reflejarlo.
                </p>
            </div>
        </div>
    );
}

function Spinner() {
    return (
        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth={4}
                fill="none"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
        </svg>
    );
}
