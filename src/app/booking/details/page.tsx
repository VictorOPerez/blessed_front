"use client";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/stores/bookingStore";
import { useEffect } from "react";
import BookingNavButtons from "@/components/BookingNavButtons";
// 📦 IMPORTA estos iconos:
import {
    BookmarkIcon,         // Servicio
    CalendarIcon,         // Fecha
    ClockIcon,            // Hora
    CheckCircleIcon,      // Duración (puedes cambiarlo si quieres)
    CurrencyDollarIcon    // Precio
} from "@heroicons/react/24/outline";
export default function BookingInfoPage() {
    const router = useRouter();

    const booking = useBookingStore((state) => state.booking);
    const setName = useBookingStore((state) => state.setName);
    const setEmail = useBookingStore((state) => state.setEmail);
    const setPhone = useBookingStore((state) => state.setPhone);
    const setStep = useBookingStore((state) => state.setCurrentStep);
    const { service, date, time, name, email, phone } = booking;

    // Redirige si no hay información previa
    useEffect(() => {
        if (!service || !date || !time) {
            router.replace("/booking");
        }
    }, [service, date, time, router]);


    const handleContinue = () => {
        if (!name || !email) {
            alert("Por favor completa todos los campos.");
            return;
        }
        setStep(4);
        router.push("/booking/agreement");
    };

    if (!service || !date || !time) return null;

    return (
        <div className="booking-card">
            <h1 className="text-2xl font-semibold text-center text-spa-prim">
                3. Tus datos personales
            </h1>

            <div className="booking-summary-card flex flex-col justify-center px-4">

                <ul className="text-sm flex flex-col gap-1 py-2">
                    <li className="flex items-start gap-2">
                        <BookmarkIcon className="w-5 h-5 text-spa-prim" />
                        <span><span className="font-medium">Servicio:</span> {service.name}</span>
                    </li>

                    <li className="flex items-start gap-2">
                        <CalendarIcon className="w-5 h-5 text-spa-prim" />
                        <span><span className="font-medium">Fecha:</span> {new Date(date).toLocaleDateString()}</span>
                    </li>

                    <li className="flex items-start gap-2">
                        <ClockIcon className="w-5 h-5 text-spa-prim" />
                        <div className=" flex gap-2">
                            <span className="font-medium">Hora:</span>
                            {time.map((t) => <span key={t}>{t}</span>)}
                        </div>
                    </li>

                    <li className="flex items-start gap-2">
                        <CheckCircleIcon className="w-5 h-5 text-spa-prim" />
                        <span><span className="font-medium">Duración:</span> {service.duration}</span>
                    </li>

                    <li className="flex items-start gap-2">
                        <CurrencyDollarIcon className="w-5 h-5 text-spa-prim" />
                        <span><span className="font-medium">Precio:</span> {service.price}</span>
                    </li>
                </ul>
            </div>

            <div className="space-y-4  w-full max-w-[350px] md:min-w-[350px]">
                <div>
                    <label className="block text-sm font-medium">Nombre</label>
                    <input
                        type="text"
                        className="w-full border bg-white  px-3 py-2 rounded"
                        value={name || ""}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tu nombre"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        className="w-full bg-white border  px-3 py-2 rounded"
                        value={email || ""}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tucorreo@example.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Phone</label>
                    <input
                        type="phone"
                        className="w-full bg-white border  px-3 py-2 rounded"
                        value={phone || ""}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="000-000-0000"
                    />
                </div>
            </div>

            <div className="text-center w-full px-2 md:px-10">
                <div className=" text-center">
                    <BookingNavButtons backHref="/booking/date" showContinue onContinue={handleContinue} />
                </div>
            </div>
        </div>
    );
}
