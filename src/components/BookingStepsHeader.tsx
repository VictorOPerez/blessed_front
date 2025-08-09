"use client";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const steps = [
    { label: "Servicio", path: "/booking" },
    { label: "Fecha", path: "/booking/date" },
    { label: "Tus Datos", path: "/booking/details" },
    { label: "Pdf", path: "/booking/agreement" },
    { label: "Resumen de reserva", path: "/booking/resumen" },
];

export default function BookingStepsHeader() {
    const pathname = usePathname();
    const currentIndex = steps.findIndex((s) => s.path === pathname);

    return (
        <nav className="flex flex-wrap md:justify-center md:items-center gap-4 px-4  text-sm text-gray-600 max-w-full overflow-x-auto">
            {steps.map((step, index) => {
                const isActive = index === currentIndex;
                const isCompleted = index < currentIndex;

                return (
                    <div key={step.label} className="flex items-center gap-2">
                        {/* Círculo con número */}
                        <div
                            className={clsx(
                                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border transition-all shrink-0",
                                (isActive || isCompleted)
                                    ? "bg-spa-accent text-white border-spa "
                                    : "border-gray-500 text-gray-500"
                            )}
                        >
                            {index + 1}
                        </div>

                        {/* Texto */}
                        <span
                            className={clsx(
                                "whitespace-nowrap transition-colors",
                                (isActive || isCompleted)
                                    ? "text-accent"
                                    : "text-gray-500"
                            )}
                        >
                            {step.label}
                        </span>

                        {/* Línea de conexión */}
                        {index < steps.length - 1 && (
                            <div
                                className={clsx(
                                    "w-4 md:w-8 h-px transition-colors",
                                    (isActive || isCompleted)
                                        ? "bg-spa-accent"
                                        : "bg-gray-500"
                                )}
                            />
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
