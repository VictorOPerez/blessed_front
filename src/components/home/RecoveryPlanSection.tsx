
"use client";
const steps = [
    {
        Icon: CalendarCheck,
        title: "Reserva Eficiente (2 Minutos)",
        copy:
            "Nuestro sistema de reserva online es rápido, intuitivo y seguro. Elige tu servicio y agenda tu sesión sin llamadas ni esperas, directamente desde tu móvil.",
    },
    {
        Icon: Bed,
        title: "Terapia de Élite, Cero Estrés Logístico",
        copy:
            "Llegamos puntualmente con todo el equipo profesional: camilla de grado médico, lencería desechable y un ambiente de calma. Tú no te preocupas por nada.",
    },
    {
        Icon: TrendingUp,
        title: "Resultados Medibles para tu Rendimiento",
        copy:
            "El objetivo es que, al terminar, sientas un alivio tangible, una mente más clara y la energía renovada. Es un 'reseteo' físico y mental para que sigas operando a tu máximo nivel.",
    },
];


import { CalendarCheck, Bed, TrendingUp } from "lucide-react";
import ThreeStackParallax from "../ThreeStackParallax";

export default function RecoveryPlanSection() {


    return (
        <section className="
  relative bg-[#FFF8F2]
  px-4 sm:px-6 lg:px-8
  lg:min-h-[88svh] lg:max-h-[92svh]
  lg:overflow-hidden               /* solo en desktop */
  /* sin flex en mobile */
  lg:flex lg:justify-center lg:items-center mb-20 md:mb-0 overflow-hidden
">
            <div className="
    mx-auto w-full max-w-6xl
    grid grid-cols-1 lg:grid-cols-12  /* 1 columna en mobile */
    gap-8
    items-start lg:items-center
    py-10 lg:py-0
    min-w-0                           /* evita recortes de texto */
  ">

                {/* Col izquierda: título + pasos */}
                <div className="lg:col-span-7 flex flex-col justify-center gap-8">
                    <header className="text-center lg:text-left mb-10">
                        <h2 className="font-bold text-[#275B59] leading-tight
                           text-2xl sm:text-3xl lg:text-4xl">
                            Menos Fricción, Máximo Impacto.
                            <br className="hidden sm:block" />
                            Tu Plan de Recuperación en 3 Pasos
                        </h2>
                    </header>

                    <div className="flex flex-col gap-10">
                        {steps.map(({ Icon, title, copy }) => (
                            <article key={title} className="flex items-start gap-4">
                                <span className="w-10 h-10 shrink-0 rounded-full bg-[#FF8A7B]/15 flex items-center justify-center shadow-sm">
                                    <Icon className="w-6 h-6 text-[#275B59]" />
                                </span>
                                <div>
                                    <h3 className="text-base sm:text-lg font-bold text-[#275B59] mb-1">
                                        {title}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-[#425958]">
                                        {copy}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                {/* Col derecha: stack de imágenes */}
                <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
                    {/* Fade para mobile (mejora la lectura cuando se apila) */}
                    <div className="block lg:hidden absolute inset-x-0 -top-2 h-16 bg-gradient-to-b from-[#FFF8F2] to-transparent pointer-events-none z-10" />
                    <ThreeStackParallax
                        images={[
                            { src: "/img/caricatura/top.png", alt: "Reserva confirmada" },
                            { src: "/img/caricatura/middle.png", alt: "Terapeuta a domicilio" },
                            { src: "/img/caricatura/bottom.png", alt: "Sesión de masaje" },
                        ]}
                        // Ligeros para que quepa visualmente todo en desktop
                        className="lg:mr-2"
                    />
                </div>
            </div>

            {/* Mobile layout tweaks: separadores suaves debajo del bloque de imágenes */}
            <div className="lg:hidden h-6" />

            {/* Cards en mobile para mejor escaneo visual (opcional; ya están arriba en desktop) */}
            <div className="lg:hidden max-w-3xl mx-auto grid gap-4 pb-8">
                {/** Si prefieres no duplicar contenido en mobile, elimina este bloque.
            Lo dejo como mejora de legibilidad en pantallas chicas. */}
            </div>
        </section>
    );
}
