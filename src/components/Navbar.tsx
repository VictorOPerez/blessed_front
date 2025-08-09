"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
    { label: "Inicio", href: "/" },
    // { label: "Sobre nosotros", href: "/about" },
    { label: "Servicios / Booking", href: "/booking", highlight: true },
    { label: "Contacto", href: "/contact" },
];

export default function NavBar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="fixed top-0 z-99 w-full bg-[#FAF6F1]/90 backdrop-blur-sm shadow">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 h-16">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="inline-block h-7 w-7 rounded-full border-2 border-[#FF8C7C]" />
                    <span className="font-playfair text-xl font-semibold text-[#355C57]">
                        Blessed
                    </span>
                </Link>
                <Link href={"/booking"} className=" text-base bg-[#FF8F7A]  w-max p-3 rounded-full text-white block md:hidden">
                    Agendar mi Sesión
                </Link>

                {/* Hamburger mobile */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden rounded p-1 text-[#355C57] focus:outline-none"
                    aria-label="Toggle menu"
                >
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop menu */}
                <nav className="hidden md:flex gap-6 items-center">
                    {navItems.map(({ label, href, highlight }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`text-sm font-medium transition ${highlight
                                ? "rounded-full border-2 border-[#FF8C7C] px-4 py-2 text-[#355C57] hover:bg-[#e77b6d] hover:text-white"
                                : "text-[#355C57] hover:text-[#FF8C7C]"
                                }`}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Mobile dropdown */}
            {open && (
                <nav className="md:hidden bg-[#FAF6F1] border-t border-[#E9E1D7] shadow-inner">
                    {navItems.map(({ label, href, highlight }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setOpen(false)}
                            className={`block px-6 py-3 text-sm font-medium ${highlight
                                ? "bg-[#FF8C7C] text-white"
                                : "text-[#355C57] hover:bg-[#FFF1E9]"
                                }`}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>
            )}
        </header>
    );
}
