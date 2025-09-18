// components/Footer.tsx
import Link from "next/link";
import {
    Phone,
    Mail,
    MapPin,
    Instagram,
    Linkedin,
} from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#275B59] text-[#FFF8F2] pt-14 pb-8 px-6 sm:px-10
+                 w-full flex-none z-99">
            {/* ─────────────────────────── Main grid */}
            <div className="mx-auto max-w-6xl grid gap-12 sm:gap-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {/* Brand */}
                <div>
                    <h3 className="text-2xl font-extrabold tracking-wide">Blessed</h3>
                    <p className="mt-3 text-sm leading-relaxed max-w-xs">
                        At-home therapeutic massage that turns self-care into an
                        accelerator for your performance.
                    </p>
                </div>

                {/* Navegación rápida */}
                <nav>
                    <h4 className="mb-3 font-semibold text-lg">Navigation</h4>
                    <ul className="space-y-2 text-sm">
                        {[
                            ["Home", "#inicio"],
                            ["Booking", "#booking"],
                            ["Contact", "#contacto"],
                        ].map(([label, href]) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className="hover:text-[#FF8A7B] transition-colors"
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Contacto */}
                <div>
                    <h4 className="mb-3 font-semibold text-lg">Contact</h4>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-[#FF8A7B]" />
                            <a href="tel:+18134007493" className="hover:text-[#FF8A7B]">
                                +1&nbsp;(813)&nbsp;400-7493
                            </a>
                        </li>
                        <li className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-[#FF8A7B]" />
                            <a
                                href="mailto:info@blessedmassage.com"
                                className="hover:text-[#FF8A7B]"
                            >
                                info@blessedfl.com
                            </a>
                        </li>
                        <li className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 mt-[2px] text-[#FF8A7B]" />
                            <span>Downtown Tampa, FL</span>
                        </li>
                    </ul>
                </div>

                {/* Social / licencias */}
                <div>
                    <h4 className="mb-3 font-semibold text-lg">Follow us</h4>
                    <div className="flex gap-4 mb-6">
                        <Link
                            href="https://instagram.com/"
                            aria-label="Instagram"
                            className="p-2 rounded-full bg-[#FF8A7B]/20 hover:bg-[#FF8A7B]/30 transition"
                        >
                            <Instagram className="w-5 h-5" />
                        </Link>
                        <Link
                            href="https://linkedin.com/"
                            aria-label="LinkedIn"
                            className="p-2 rounded-full bg-[#FF8A7B]/20 hover:bg-[#FF8A7B]/30 transition"
                        >
                            <Linkedin className="w-5 h-5" />
                        </Link>
                    </div>

                </div>
            </div>

            {/* ─────────────────────────── Divider */}
            <div className="mt-12 h-px bg-[#FFF8F2]/20" />

            {/* ─────────────────────────── Small print */}
            <div className="mt-6 text-center text-xs text-[#FFF8F2]/80">
                Privacy Policy &nbsp;|&nbsp; Terms of Service
            </div>
        </footer>
    );
}
