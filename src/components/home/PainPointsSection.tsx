import { CalendarX, BatteryCharging, Hand } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";

/**
 * PainPointsSection
 * ------------------------------------------------------------------
 * Responsive section that highlights the three core pain‑points of
 * your target audience. Mobile‑first: stacks vertically; on ≥lg
 * screens switches to a 3‑column grid.
 */
export default function PainPointsSection() {
    const points = [
        {
            Icon: Hand,
            title: "Dolor Crónico que te Distrae",
            copy:
                "La tensión en cuello, hombros y espalda baja es una constante que te roba la concentración en las tareas importantes.",
            url: "/img/dolorcuello.png"
        },
        {
            Icon: CalendarX,
            title: "Agendas que no Perdonan",
            copy:
                "La idea de desplazarte a un spa es inviable. Un hueco de una hora no puede convertirse en una odisea de tres.",
            url: "/img/trafico.png"
        },
        {
            Icon: BatteryCharging,
            title: "Agotamiento Mental y Físico",
            copy:
                "El estrés constante te deja sin energía, afecta tu sueño y nubla la claridad mental que necesitas para tomar decisiones clave.",
            url: "/img/cansancio.png"
        },
    ];

    return (
        <section className="relative bg-[#FAF6F1] py-18 px-6">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#275B59] mb-12">
                    Si tu día a día se ve así, <br className="hidden sm:block" /> estás en el lugar correcto.
                </h2>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 gap-12 lg:grid-cols-3">
                {points.map(({ Icon, title, copy, url }) => (
                    <article key={title} className="flex flex-col items-center text-center">
                        {/* Icon wrapper */}
                        <div className=" rounded-2xl bg-[#FF8A7B]/15 mb-6">
                            <Image src={url} // sustituye con la ruta real de tu SVG/PNG
                                alt="Masajista aplicando terapia de espalda en un ambiente hogareño minimalista"
                                width={300}
                                height={300}
                                className="object-contain rounded-2xl "
                                priority />
                        </div>

                        <h3 className="text-xl font-bold text-[#275B59] mb-3 leading-snug max-w-xs">
                            {title}
                        </h3>

                        <p className="text-[#425958] text-sm font-semibold leading-relaxed max-w-xs">
                            {copy}
                        </p>
                    </article>
                ))}
            </div>
        </section>
    );
}

/*
====================================================================
Usage:

import PainPointsSection from "@/components/PainPointsSection";

<PainPointsSection />

– Icons are from lucide-react. Swap with your own SVGs/photos if needed.
– TailwindCSS colours match brand palette: #275B59 (green brand),
  #FF8A7B (coral accent), #FFF8F2 (warm cream background), #425958 (body text).
*/
