"use client";

import BookingNavButtons from "@/components/BookingNavButtons";
import { useBookingStore } from "@/stores/bookingStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar"
import { ClockIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner"
const hours = [
    "07:00 AM", "8:00 AM", "9:00 AM",
    "10:00 PM", "11:00 PM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"
];

export default function BookingDatePage() {
    const router = useRouter();

    // Zustand store
    const selectedService = useBookingStore((state) => state.booking.service);
    const storeDate = useBookingStore((s) => s.booking.date); // string|null
    const setDate = useBookingStore((state) => state.setDate);
    const setTime = useBookingStore((state) => state.setTime);
    const setStep = useBookingStore((state) => state.setCurrentStep);


    /** 2) estado local */
    // ⬇️ si no hay dato guardado, usa hoy mismo
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        storeDate ? new Date(storeDate) : new Date()
    );
    const [selectedTime, setSelectedTimes] = useState<string[]>([]);
    // toggle de selección

    const toggleTime = (t: string) =>
        setSelectedTimes((prev) =>
            prev.includes(t) ? prev.filter((h) => h !== t) : [...prev, t]
        );

    // Redirige si no hay servicio seleccionado
    useEffect(() => {
        if (!selectedService) {
            router.replace("/booking");
        }
    }, [selectedService, router]);


    const handleContinue = () => {
        if (!selectedDate || selectedTime.length === 0) {
            toast("debe seleccioinal una hora")
            return;
        }

        // guarda como ISO (ej. "2025-08-12")
        setDate(selectedDate.toISOString());
        setTime(selectedTime);   // nuevo setter
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
                    <h1 className="text-3xl font-semibold tracking-tight text-spa-prim ">Select a date and time</h1>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-5 md:gap-10  justify-center lex h-auto  md:h-[293px] items-stretch ">
                {/* Calendario falso */}

                <div className="flex-1 flex justify-center">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="bg-white border border-spa-prim50 rounded-lg shadow "
                    />
                </div>
                {/* ------- HORAS ------- */}

                {/* Vista móvil → matriz */}
                <div className="block md:hidden w-full bg-spa-prim50 px-2 py-2 font-semibold rounded-2xl  ">
                    <div className="grid grid-cols-4 gap-2">
                        {hours.map((h) => (
                            <button
                                key={h}
                                className={
                                    selectedTime.includes(h)
                                        ? "aspect-[4/2] rounded-md bg-spa-prim text-spa "
                                        : "aspect-[4/2] rounded-xl text-spa  hover:bg-spa-prim/90 transition"
                                }
                                onClick={() => toggleTime(h)}
                            >
                                {h}
                            </button>
                        ))}
                    </div>
                </div>
                {/* Lista de horas */}
                <div className="hidden md:block bg-spa-prim50 text-spa-prim font-semibold rounded-2xl px-2 py-4 shadow-md w-[160px] h-full">
                    <div className="flex flex-col gap-3 h-full overflow-auto scrollbar-brand">
                        {hours.map((h) => (
                            <button
                                key={h}
                                className={`text-sm px-3 py-1 rounded-md cursor-pointer transition-all
          ${selectedTime.includes(h)
                                        ? "bg-spa-prim text-spa font-semibold"          /* ✔ seleccionado */
                                        : "text-spa  hover:bg-spa-prim/90"   /* estado normal + hover */
                                    }`}
                                onClick={() => toggleTime(h)}
                            >
                                {h}
                            </button>
                        ))}
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
