import { CalendarCheck, Bed, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
export function CTASection() {
    return (
        <section className="bg-[#FF8A7B]/10 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#275B59] mb-4">
                    ¿Listo para Invertir en tu Activo más Importante?
                </h2>
                <p className="text-[#425958] max-w-xl mx-auto mb-10">
                    Elige la sesión que se alinea con tus objetivos. El alivio está a solo un par de clics de distancia.
                </p>

                {/* Oferta destacada */}
                <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 flex flex-col gap-6 sm:flex-row items-center justify-between max-w-2xl mx-auto">
                    {/* Detalles servicio */}
                    <div className="text-left">
                        <h3 className="text-lg font-bold text-[#275B59] mb-4">Recuperaciones Terapéuticas incluyen</h3>
                        <p className="text-sm text-[#425958] mb-2">60 o 90 Minutos · Desde <span className="font-semibold">$129</span></p>
                        <p className="text-sm text-[#425958]">Incluyen evaluación postural, tratamiento personalizado y recomendaciones de autocuidado.</p>
                    </div>
                    {/* CTA */}
                    <Link
                        href="/booking" // ajusta a tu ancla o ruta de reservas
                        className="inline-flex items-center gap-2 bg-[#FF8A7B] hover:bg-[#ff7665] transition-colors text-white font-semibold px-6 py-3 rounded-full whitespace-nowrap shadow-md"
                    >
                        Reservar mi Sesión Ahora <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>

                {/* Microcopy urgencia */}
                <p className="text-xs text-[#275B59] mt-4">Plazas limitadas cada semana para garantizar la máxima calidad.</p>
            </div>
        </section>
    );
}