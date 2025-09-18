"use client";
const steps = [
    {
        Icon: CalendarCheck,
        title: "Efficient Booking (2 Minutes)",
        copy:
            "Our online booking system is fast, intuitive, and secure. Choose your service and schedule your session without calls or waiting, directly from your phone.",
    },
    {
        Icon: Bed,
        title: "Elite Therapy, Zero Logistical Stress",
        copy:
            "We arrive on time with all the professional equipment: medical-grade table, disposable linens, and a calming atmosphere. You don’t have to worry about a thing.",
    },
    {
        Icon: TrendingUp,
        title: "Measurable Results for Your Performance",
        copy:
            "The goal is that by the end you feel tangible relief, a clearer mind, and renewed energy. It’s a physical and mental reset so you can keep operating at your peak.",
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
  lg:overflow-hidden               /* desktop only */
  /* no flex on mobile */
  lg:flex lg:justify-center lg:items-center mb-20 md:mb-0 overflow-hidden
">
            <div className="
    mx-auto w-full max-w-6xl
    grid grid-cols-1 lg:grid-cols-12  /* 1 column on mobile */
    gap-8
    items-start lg:items-center
    py-10 lg:py-0
    min-w-0                           /* prevents text clipping */
  ">

                {/* Left column: title + steps */}
                <div className="lg:col-span-7 flex flex-col justify-center gap-8">
                    <header className="text-center lg:text-left mb-10">
                        <h2 className="font-bold text-[#275B59] leading-tight
                           text-2xl sm:text-3xl lg:text-4xl">
                            Less Friction, Maximum Impact.
                            <br className="hidden sm:block" />
                            Your 3-Step Recovery Plan
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

                {/* Right column: image stack */}
                <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
                    {/* Fade for mobile (improves readability when stacked) */}
                    <div className="block lg:hidden absolute inset-x-0 -top-2 h-16 bg-gradient-to-b from-[#FFF8F2] to-transparent pointer-events-none z-10" />
                    <ThreeStackParallax
                        images={[
                            { src: "/img/caricatura/top.png", alt: "Booking confirmed" },
                            { src: "/img/caricatura/middle.png", alt: "Therapist at home" },
                            { src: "/img/caricatura/bottom.png", alt: "Massage session" },
                        ]}
                        // Slight margins so everything fits visually on desktop
                        className="lg:mr-2"
                    />
                </div>
            </div>

            {/* Mobile layout tweaks: soft spacers below the image block */}
            <div className="lg:hidden h-6" />

            {/* Mobile cards for better visual scanning (optional; already above on desktop) */}
            <div className="lg:hidden max-w-3xl mx-auto grid gap-4 pb-8">
                {/** If you’d rather not duplicate content on mobile, remove this block.
            I left it as a readability enhancement for small screens. */}
            </div>
        </section>
    );
}
