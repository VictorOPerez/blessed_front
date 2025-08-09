// components/Stars.tsx
type StarsProps = {
    size?: number;      // tamaño en px (ancho/alto) – default 24
    className?: string; // clases extra por si necesitas margen, etc.
};

export default function Stars({ size = 24, className = "" }: StarsProps) {
    const starPath =
        "M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.402 8.182L12 18.896l-7.336 3.855 1.402-8.182L.132 9.211l8.2-1.193L12 .587z";

    return (
        <div className={`inline-flex gap-1 p-3 md:mt-7 ${className}`}>
            {Array.from({ length: 5 }).map((_, i) => (
                <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={size}
                    height={size}
                    className="text-yellow-400 fill-current"
                >
                    <path d={starPath} />
                </svg>
            ))}
        </div>
    );
}
