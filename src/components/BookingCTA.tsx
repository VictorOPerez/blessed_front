import Link from "next/link";

export function BookingCTA() {
    return (
        <Link
            href="/booking"
            className="group relative inline-block rounded-full p-[2px] overflow-hidden w-max" // el padding es el grosor del borde
            aria-label="Reservar sesión"
        >
            {/* borde animado */}
            <span
                className="
          pointer-events-none absolute inset-0 rounded-full
          bg-[conic-gradient(from_0deg,#ff8a7b_0deg,#ff8a7b_80deg,transparent_140deg,transparent_300deg,#ff8a7b_340deg,#ff8a7b_360deg)]
          animate-spin motion-safe:[animation-duration:3.5s]
          opacity-80 blur-[1px] group-hover:opacity-100
        "
            />
            {/* botón real */}
            <span
                className="
          relative z-10 block rounded-full
          bg-[#FFF8F2] px-5 py-2 text-[#275B59] font-semibold
          shadow-[0_0_0_1px_rgba(255,138,123,0.35)]
          group-hover:shadow-[0_0_16px_rgba(255,138,123,0.55)]
          transition-shadow
        "
            >
                Agendar mi Sesión de Alivio
            </span>
        </Link>
    );
}
