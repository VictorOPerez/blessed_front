"use client";
import React from "react";
import {
    motion,
    useAnimationFrame,
    useMotionTemplate,
    useMotionValue,
    useTransform,
} from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function Button({
    borderRadius = "1.75rem",
    children,
    as: Component = "button",
    containerClassName,
    borderClassName,
    duration,
    className,
    ...otherProps
}: {
    borderRadius?: string;
    children: React.ReactNode;
    as?: any;
    containerClassName?: string;
    borderClassName?: string;
    duration?: number;
    className?: string;
    [key: string]: any;
}) {
    return (
        <Component
            className={cn(
                // ❌ quitamos h-16 w-40
                "relative inline-block overflow-hidden bg-transparent p-[2px] align-middle cursor-pointer",
                className
            )}
            style={{ borderRadius }}
            {...otherProps}
        >
            <div
                className="absolute inset-0 w-full h-full"
                style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
            >
                <MovingBorder duration={duration} rx="30%" ry="30%">
                    <div
                        className={cn(
                            "h-20 w-20 bg-[radial-gradient(#ff8a7b_40%,transparent_60%)] opacity-80",
                            borderClassName
                        )}
                    />
                </MovingBorder>
            </div>

            <Link href={"/booking"}
                className={cn(
                    // ✅ usa paddings y evita el wrap del texto
                    "relative z-10 flex items-center justify-center whitespace-nowrap " +
                    "border border-[#ffb0a6]/50 bg-[#f9d2cc] text-[#275B59] " +
                    "font-semibold px-5 py-3 rounded-[inherit] backdrop-blur-xl",

                )}
                style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
            >
                {children}
            </Link>
        </Component>
    );
}

export const MovingBorder = ({
    children,
    duration = 3000,
    rx,
    ry,
    ...otherProps
}: {
    children: React.ReactNode;
    duration?: number;
    rx?: string;
    ry?: string;
    [key: string]: any;
}) => {
    const pathRef = useRef<SVGRectElement | null>(null);
    const [pathLength, setPathLength] = React.useState(0);
    const progress = useMotionValue<number>(0);

    // 🔹 Calcular longitud una vez que el rect tenga tamaño
    React.useEffect(() => {
        if (pathRef.current) {
            const length = pathRef.current.getTotalLength();
            if (length > 0) setPathLength(length);
        }
    }, []);

    useAnimationFrame((time) => {
        if (pathLength > 0) {
            const pxPerMs = pathLength / duration;
            progress.set((time * pxPerMs) % pathLength);
        }
    });

    const x = useTransform(progress, (v) =>
        pathRef.current && pathLength > 0
            ? pathRef.current.getPointAtLength(v).x
            : 0
    );
    const y = useTransform(progress, (v) =>
        pathRef.current && pathLength > 0
            ? pathRef.current.getPointAtLength(v).y
            : 0
    );


    const transform = useMotionTemplate`
    translateX(${x}px) translateY(${y}px) 
    translateX(-50%) translateY(-50%)
  `;

    return (
        <div className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
                width="100%"
                height="100%"
                {...otherProps}
            >
                <rect
                    ref={pathRef}
                    fill="none"
                    width="100%"
                    height="100%"
                    rx={rx}
                    ry={ry}
                />
            </svg>

            {pathLength > 0 && (
                <motion.div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        display: "inline-block",
                        transform,
                    }}
                >
                    {children}
                </motion.div>
            )}
        </div>
    );
};
