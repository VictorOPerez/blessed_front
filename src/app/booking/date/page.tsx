"use client";

import BookingNavButtons from "@/components/BookingNavButtons";
import { useBookingStore } from "@/stores/bookingStore";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { ClockIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";

const hours = [
    "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"
];

export default function BookingDatePage() {
    const router = useRouter();

    // Zustand store
    const selectedService = useBookingStore((state) => state.booking.service);
    const storeDate = useBookingStore((s) => s.booking.date); // string|null
    const setDate = useBookingStore((state) => state.setDate);
    const setTime = useBookingStore((state) => state.setTime);
    const setStep = useBookingStore((state) => state.setCurrentStep);

    // Hoy a las 00:00 (para comparar solo por día)
    const todayStart = useMemo(() => {
        const d = new Date();
        return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    }, []);

    /** Estado local */
    // Si el store trae una fecha pasada, la "clamp-eamos" a hoy
    const initialDate = storeDate ? new Date(storeDate) : new Date();
    const safeInitialDate = initialDate < todayStart ? todayStart : initialDate;
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(safeInitialDate);

    // Mantén array para compatibilidad, pero fuerza selección única
    const [selectedTime, setSelectedTimes] = useState<string[]>([]);

    // Single-select: si vuelven a tocar la misma hora, la deselecciona; si tocan otra, la reemplaza
    const toggleTime = (t: string) =>
        setSelectedTimes((prev) => (prev[0] === t ? [] : [t]));

    // Redirige si no hay servicio seleccionado
    useEffect(() => {
        if (!selectedService) {
            router.replace("/booking");
        }
    }, [selectedService, router]);

    const handleContinue = () => {
        if (!selectedDate || selectedTime.length === 0) {
            toast("Please select a time"); // mantengo UI en inglés
            return;
        }

        // guarda como ISO
        setDate(selectedDate.toISOString());
        setTime(selectedTime); // sigue siendo array
        setStep(3);
        router.push("/booking/details");
    };

    if (!selectedService) return null;

    return (
        <div className=" booking-card   h-auto md:min-h-0 md:h-[550px]">
            {/* Icono y título */}
            <div className="flex flex-col justify-center items-center gap-2">
                {/* Título principal */}
                <div className="flex justify-center items-center gap-3">
                    <ClockIcon className=" w-5 h-5 text-spa-prim" />
                    <h1 className="text-3xl font-semibold tracking-tight text-spa-prim ">
                        Select a date and time
                    </h1>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-5 md:gap-10  justify-center lex h-auto  md:h-[293px] items-stretch ">
                {/* Calendario */}
                <div className="flex-1 flex justify-center">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={{ before: todayStart }}  // ❌ deshabilita días pasados
                        className="bg-white border border-spa-prim50 rounded-lg shadow "
                    />
                </div>

                {/* ------- HORAS ------- */}

                {/* Vista móvil → matriz */}
                <div className="block md:hidden w-full bg-spa-prim50 px-2 py-2 font-semibold rounded-2xl">
                    <div className="grid grid-cols-4 gap-2">
                        {hours.map((h) => {
                            const isSelected = selectedTime.includes(h);
                            const isBlocked = selectedTime.length > 0 && !isSelected; // bloquea otras cuando ya hay una
                            return (
                                <button
                                    key={h}
                                    disabled={isBlocked}
                                    className={`aspect-[4/2] rounded-md transition
                    ${isSelected
                                            ? "bg-spa-prim text-spa"
                                            : "text-spa hover:bg-spa-prim/90"}
                    disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed
                  `}
                                    onClick={() => toggleTime(h)}
                                >
                                    {h}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Lista de horas (desktop) */}
                <div className="hidden md:block bg-spa-prim50 text-spa-prim font-semibold rounded-2xl px-2 py-4 shadow-md w-[160px] h-full">
                    <div className="flex flex-col gap-3 h-full overflow-auto scrollbar-brand">
                        {hours.map((h) => {
                            const isSelected = selectedTime.includes(h);
                            const isBlocked = selectedTime.length > 0 && !isSelected;
                            return (
                                <button
                                    key={h}
                                    disabled={isBlocked}
                                    className={`text-sm px-3 py-1 rounded-md cursor-pointer transition-all
                    ${isSelected
                                            ? "bg-spa-prim text-spa font-semibold"
                                            : "text-spa hover:bg-spa-prim/90"}
                    disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed
                  `}
                                    onClick={() => toggleTime(h)}
                                >
                                    {h}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Botón de navegación */}
            <div className="text-center w-full px-2 md:px-10 mt-5">
                <div className=" text-center">
                    <BookingNavButtons backHref="/booking" showContinue onContinue={handleContinue} />
                </div>
            </div>
        </div>
    );
}
