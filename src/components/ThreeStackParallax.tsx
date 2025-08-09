"use client";

import { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useReducedMotion,
    type MotionValue,
} from "framer-motion";
import Image from "next/image";

export type ParallaxImage = {
    src: string;
    alt: string;
    priority?: boolean;
    className?: string;
};

export type ThreeStackParallaxProps = {
    /** [arriba-izq, arriba-der, abajo-centro] */
    images: [ParallaxImage, ParallaxImage, ParallaxImage];
    /** Distancias de parallax horizontal en px */
    offsets?: { left?: number; right?: number; bottom?: number };
    className?: string;
    radiusClass?: string;
};

/** Custom hook: del centro (0) → hacia afuera (to) a partir de START */
function useFromCenter(
    scrollYProgress: MotionValue<number>,
    prefersReduced: boolean,
    to: number,
    START = 0.45
): MotionValue<number> {
    return useTransform(
        scrollYProgress,
        [0, START, 1],
        prefersReduced ? [0, 0, 0] : [0, 0, to]
    );
}

type CardStyle = { x?: MotionValue<number> };

export default function ThreeStackParallax({
    images,
    offsets = { left: 18, right: 18, bottom: 22 },
    className = "",
    radiusClass = "rounded-2xl",
}: ThreeStackParallaxProps) {
    const prefersReduced = useReducedMotion() ?? false;

    const ref = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 90%", "end 10%"],
    });

    // Direcciones: izq negativa, der positiva
    const xLeft = useFromCenter(scrollYProgress, prefersReduced, -(offsets.left ?? 18));
    const xRight = useFromCenter(scrollYProgress, prefersReduced, +(offsets.right ?? 18));
    const xBottom = useFromCenter(scrollYProgress, prefersReduced, +(offsets.bottom ?? 22));

    // Tamaños de las tarjetas (cuadradas y consistentes)
    const tileW = "w-[224px] sm:w-[256px] lg:w-[220px]";

    const Card = ({
        img,
        style,
        extra = "",
    }: {
        img: ParallaxImage;
        style: CardStyle;
        extra?: string;
    }) => (
        <motion.div
            style={{ ...style, willChange: "transform" }}
            className={`relative ${tileW} overflow-hidden ${radiusClass} shadow-md bg-neutral-100/60 ${extra}`}
        >
            <div className="aspect-square" />
            <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={img.priority}
                className={`object-contain ${img.className ?? ""}`}
                sizes="(max-width: 640px) 224px, (max-width:1024px) 256px, 220px"
            />
        </motion.div>
    );

    return (
        <section
            ref={ref}
            className={
                "mx-auto select-none " +
                "max-w-[496px] sm:max-w-[544px] lg:max-w-[496px] " + // 2 arriba + gap
                (className ? ` ${className}` : "")
            }
            aria-label="Galería 2 arriba y 1 abajo (parallax horizontal)"
        >
            <div className="flex flex-col items-center gap-4">
                {/* Fila superior: 2 tarjetas */}
                <div className="flex items-center justify-center gap-4">
                    <Card img={images[0]} style={{ x: xLeft }} />
                    <Card img={images[1]} style={{ x: xRight }} />
                </div>

                {/* Fila inferior: 1 tarjeta centrada */}
                <div className="flex justify-center">
                    <Card img={images[2]} style={{ x: xBottom }} />
                </div>
            </div>
        </section>
    );
}
