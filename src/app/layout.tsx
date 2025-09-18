// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-brand",
});

export const metadata: Metadata = {
  title: "Blessed Massage – Therapeutic Massages in Tampa",
  description:
    "Restore your performance, relieve chronic pain, and optimize your most valuable asset: your time.",
  icons: {
    icon: [{ url: "/favicon.ico?v=3", sizes: "any" }],
    apple: "/apple-touch-icon.png?v=3",
  },
  manifest: "/site.webmanifest?v=3",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased flex flex-col bg-spa text-spa`}
      >
        <NavBar />
        <Toaster position="top-center" richColors />

        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
