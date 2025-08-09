"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
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

export default function ThreeStackParallax({
    images,
    offsets = { left: 18, right: 18, bottom: 22 },
    className = "",
    radiusClass = "rounded-2xl",
}: ThreeStackParallaxProps) {
    const prefersReduced = useReducedMotion();
    const ref = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 90%", "end 10%"],
    });

    // Punto donde ya quedan lado a lado (0..1). Ajusta 0.45–0.55 a tu gusto.
    // Empieza la animación cuando ya están lado a lado.
    // Sube o baja este número (0..1) según cuándo quieres que arranque.
    const START = 0.45;

    // Helper: del centro (0) → hacia afuera (to)
    const fromCenter = (to: number) =>
        useTransform(
            scrollYProgress,
            [0, START, 1],
            prefersReduced ? [0, 0, 0] : [0, 0, to]
        );

    // Direcciones: izquierda negativa, derecha positiva.
    // Cambia el signo si quieres que alguna salga hacia el otro lado.
    const xLeft = fromCenter(- (offsets.left ?? 18)); // arriba-izq sale a la IZQ
    const xRight = fromCenter((offsets.right ?? 18)); // arriba-der sale a la DER
    const xBottom = fromCenter((offsets.bottom ?? 22)); // abajo-centro → derecha (pon - para izquierda)


    // Tamaños de las tarjetas (cuadradas y consistentes)
    const tileW = "w-[224px] sm:w-[256px] lg:w-[220px]";

    const Card = ({
        img,
        style,
        extra = "",
    }: {
        img: ParallaxImage;
        style: any;
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
                // contenedor ancho justo para 2 tarjetas + gap
                "max-w-[496px] sm:max-w-[544px] lg:max-w-[496px] " +
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
