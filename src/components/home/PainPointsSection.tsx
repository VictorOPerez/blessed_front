import { CalendarX, BatteryCharging, Hand } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";

/**
 * PainPointsSection
 * ------------------------------------------------------------------
 * Responsive section that highlights the three core pain-points of
 * your target audience. Mobile-first: stacks vertically; on ≥lg
 * screens switches to a 3-column grid.
 */
export default function PainPointsSection() {
    const points = [
        {
            Icon: Hand,
            title: "Chronic Pain That Steals Your Focus",
            copy:
                "Neck, shoulder, and lower-back tension pulls you out of the zone. Reclaim your concentration and move without that constant ache.",
            url: "/img/dolorcuello.png"
        },
        {
            Icon: CalendarX,
            title: "Schedules With Zero Wiggle Room",
            copy:
                "Driving to a spa isn’t realistic. Get expert care at home—one focused hour, without turning it into a three-hour detour.",
            url: "/img/trafico.png"
        },
        {
            Icon: BatteryCharging,
            title: "Burnout—Body and Mind",
            copy:
                "Relentless stress drains your energy, disrupts your sleep, and fogs decision-making. Reset your system and wake up clear.",
            url: "/img/cansancio.png"
        },
    ];

    return (
        <section className="relative bg-[#FAF6F1] py-18 px-6">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#275B59] mb-12">
                    If this feels like your day, <br className="hidden sm:block" /> you’re in the right place.
                </h2>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 gap-12 lg:grid-cols-3">
                {points.map(({ Icon, title, copy, url }) => (
                    <article key={title} className="flex flex-col items-center text-center">
                        {/* Icon wrapper */}
                        <div className=" rounded-2xl bg-[#FF8A7B]/15 mb-6">
                            <Image src={url} // sustituye con la ruta real de tu SVG/PNG
                                alt="Massage therapist applying back therapy in a minimalist home environment"
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
