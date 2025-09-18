"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navItems = [
    { label: "Home", href: "/" },
    // { label: "About us", href: "/about" },
    { label: "Services / Booking", href: "/booking", highlight: true },
    { label: "Contact", href: "/contact" },
];

export default function NavBar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="fixed top-0 z-99 w-full bg-[#FAF6F1]/90 backdrop-blur-sm shadow">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 h-16">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <Image
                        src="/img/BM_green_B_coralM_accessible_128.png"
                        alt="BM"
                        width={48} height={48}
                        className="block object-contain md:w-10 md:h-10"
                        priority
                    />

                    {/* MOBILE: simple text */}
                    <span className="font-brand text-lg tracking-[-0.01em] font-semibold whitespace-nowrap">
                        <span className="text-[#275B59]">Blessed</span>{" "}
                        <span className="text-[#E26755]">Massage</span>
                    </span>

                    {/* DESKTOP: M from the monogram */}
                </Link>

                {/* mobile short cta */}
                <Link
                    href="/booking"
                    className="md:hidden rounded-full bg-[#E26755] text-white px-3 py-1 text-sm"
                >
                    Book
                </Link>

                {/* desktop full cta */}

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
