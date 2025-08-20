// app/booking/success/page.tsx
"use client";

import React, { Suspense, useEffect, useMemo } from "react";
import Image from "next/image";
import { CheckCircle2, CalendarCheck, Clock, MapPin, Home, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useBookingStore } from "@/stores/bookingStore";
import { useSearchParams } from "next/navigation";

function qp(sp: URLSearchParams, k: string) {
    return sp.get(k) ?? "";
}
function parseDateSafe(s?: string | null) {
    if (!s) return null;
    const d = new Date(s);
    return isNaN(d.getTime()) ? null : d;
}
function toICSDate(dt: Date) {
    return dt.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

export default function SuccessPage() {
    return (
        <Suspense
            fallback={
                <section className="min-h-screen flex items-center justify-center">
                    <p className="text-gray-600">Cargando detalles…</p>
                </section>
            }
        >
            <SuccessContent />
        </Suspense>
    );
}

function SuccessContent() {
    const searchParams = useSearchParams();
    const reset = useBookingStore((s) => s.reset);

    useEffect(() => {
        reset(); // limpia el store al volver de Stripe
    }, [reset]);

    const service = qp(searchParams, "svc") || "Sesión de masaje";
    const dtISO = qp(searchParams, "dt");
    const durationM = Number(qp(searchParams, "dur") || "60");
    const location = qp(searchParams, "loc") || "A domicilio";

    const start = parseDateSafe(dtISO);
    const end = start ? new Date(start.getTime() + (Number.isFinite(durationM) ? durationM : 60) * 60_000) : null;

    const icsHref = useMemo(() => {
        if (!start || !end) return undefined;
        const ics = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//Blessed Massage//Booking//ES",
            "BEGIN:VEVENT",
            `DTSTART:${toICSDate(start)}`,
            `DTEND:${toICSDate(end)}`,
            `SUMMARY:${service.replace(/\n/g, " ")}`,
            `LOCATION:${location.replace(/\n/g, " ")}`,
            "DESCRIPTION:Reserva confirmada",
            "END:VEVENT",
            "END:VCALENDAR",
        ].join("\r\n");
        return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
    }, [start, end, service, location]);

    const humanDate =
        start?.toLocaleString(undefined, {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
        }) ?? "—";

    return (
        <section className="bg-[#FFF8F2] min-h-screen flex items-center py-24">
            <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Izquierda */}
                    <div className="lg:col-span-7">
                        <div className="flex items-center gap-3 mb-3">
                            <CheckCircle2 className="text-[#275B59]" size={28} />
                            <p className="text-[#275B59] font-semibold">Pago recibido</p>
                        </div>

                        <h1 className="text-[#275B59] font-bold leading-tight text-3xl lg:text-4xl">
                            ¡Reserva confirmada!
                        </h1>
                        <p className="text-[#425958] mt-2">
                            Tu sesión quedó registrada. Te enviamos un correo con los detalles y el enlace
                            para gestionar o reprogramar si lo necesitas.
                        </p>

                        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <li className="rounded-2xl bg-white/70 shadow-sm p-4">
                                <div className="flex items-center gap-2 text-[#275B59] font-semibold">
                                    <CalendarCheck size={18} /> {service}
                                </div>
                                <p className="text-sm text-[#425958] mt-1">Cita confirmada</p>
                            </li>
                            <li className="rounded-2xl bg-white/70 shadow-sm p-4">
                                <div className="flex items-center gap-2 text-[#275B59] font-semibold">
                                    <Clock size={18} /> {humanDate}
                                </div>
                                <p className="text-sm text-[#425958] mt-1">
                                    Duración: {Number.isFinite(durationM) ? `${durationM} min` : "—"}
                                </p>
                            </li>
                            <li className="rounded-2xl bg-white/70 shadow-sm p-4">
                                <div className="flex items-center gap-2 text-[#275B59] font-semibold">
                                    <MapPin size={18} /> {location}
                                </div>
                                <p className="text-sm text-[#425958] mt-1">Servicio a domicilio</p>
                            </li>
                            <li className="rounded-2xl bg-white/70 shadow-sm p-4">
                                <div className="flex items-center gap-2 text-[#275B59] font-semibold">
                                    <ArrowRight size={18} /> Próximo paso
                                </div>
                                <p className="text-sm text-[#425958] mt-1">
                                    Prepara un espacio tranquilo. Nosotros llevamos todo.
                                </p>
                            </li>
                        </ul>

                        {/* Botones */}
                        <div className="mt-6 flex flex-wrap gap-3">
                            {icsHref ? (
                                <a
                                    href={icsHref}
                                    download="reserva.ics"
                                    className="rounded-2xl px-4 py-2 border border-[#275B59]/30 text-[#275B59] bg-white/70 shadow-sm"
                                >
                                    Agregar a Calendario
                                </a>
                            ) : (
                                <button
                                    aria-disabled
                                    className="rounded-2xl px-4 py-2 border border-[#275B59]/30 text-[#275B59] bg-white/70 shadow-sm opacity-60 cursor-not-allowed"
                                >
                                    Agregar a Calendario
                                </button>
                            )}

                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-[#FF8F7A] text-[#FFF8F2] shadow-sm"
                            >
                                <Home size={18} /> Inicio
                            </Link>
                            <Link
                                href="/booking"
                                className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 border border-[#275B59]/30 text-[#275B59] bg-white/70 shadow-sm"
                            >
                                <CalendarCheck size={18} /> Hacer otra reserva
                            </Link>
                        </div>
                    </div>

                    {/* Derecha: ilustración */}
                    <div className="lg:col-span-5">
                        <div className="relative rounded-2xl overflow-hidden shadow-md bg-[#FFF3EC]">
                            <div className="aspect-square sm:aspect-[4/4]" />
                            <Image
                                src="/img/caricatura/top.png"
                                alt="Reserva confirmada"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
