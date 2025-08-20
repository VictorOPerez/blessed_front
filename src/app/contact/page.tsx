import ContactForm from "@/components/ContactForm";
import { ClockIcon, DevicePhoneMobileIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contacto | Blessed Massage & Recovery",
    description:
        "Agenda tu sesión o consulta cualquier duda. Te responderemos lo antes posible.",
};

export default function ContactPage() {
    return (
        <section className="mx-auto max-w-5xl px-4 py-23 text-cocoa font-semibold   text-[#355C57] ">
            <h1 className="font-playfair text-4xl font-bold text-center mb-6">Contáctanos</h1>
            <p className="mx-auto max-w-2xl text-center mb-10 text-cocoa/80">
                Agenda tu masaje a domicilio o cuéntanos qué necesitas. Te respondemos rápido.
            </p>

            {/* Info + Form */}
            <div className="grid gap-8 md:grid-cols-[1fr,1.2fr]">
                {/* ===== ASIDE (columna izquierda) ===== */}
                <aside className="rounded-xl bg-cream-tint border border-cocoa/10 border-spa p-6 shadow-sm">
                    <h2 className="font-playfair text-xl font-semibold mb-4">Contacto directo</h2>

                    <ul className="space-y-3 text-sm">
                        <li className=" flex gap-1">
                            <DevicePhoneMobileIcon className="w-5 h-5 text-spa-prim" />
                            <a href="tel:+8134007493" className="underline hover:no-underline">
                                (813) 400-7493
                            </a>
                        </li>

                        <li className=" flex gap-1">
                            <EnvelopeIcon className="w-5 h-5 text-spa-prim" />
                            <span className="font-medium">Email:</span>{" "}
                            <a
                                href="mailto:contact@blessedfl.com"
                                className="underline hover:no-underline"
                            >
                                contact@blessedfl.com
                            </a>
                        </li>
                        <li className=" flex gap-1">
                            <MapPinIcon className="w-5 h-5 text-spa-prim" />

                            <span className="font-medium">Zona:</span> Tampa & alrededores</li>
                        <li className=" flex gap-1">
                            <ClockIcon className="w-5 h-5 text-spa-prim" />

                            <span className="font-medium">Horario:</span> Lun–Sáb, 7:00–19:00</li>
                    </ul>

                    {/* Botones de acción */}
                    <div className="mt-5 flex flex-wrap gap-3">
                        {/* WhatsApp */}
                        <a
                            href={
                                "https://wa.me/8134007493?text=" +
                                encodeURIComponent("Hola, me gustaría agendar un masaje a domicilio. ¿Tienen disponibilidad?")
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1DA851] text-white px-4 py-2 shadow"
                            aria-label="Contactar por WhatsApp"
                        >
                            {/* icono WhatsApp simple */}
                            <svg viewBox="0 0 32 32" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                                <path d="M19.11 17.57c-.3-.15-1.78-.88-2.05-.98-.27-.1-.47-.15-.66.15-.2.3-.76.98-.93 1.18-.17.2-.34.22-.64.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.67-2.06-.17-.3-.02-.47.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.66-1.59-.9-2.18-.24-.58-.48-.5-.66-.5h-.56c-.2 0-.53.08-.81.38-.27.3-1.06 1.04-1.06 2.54 0 1.5 1.09 2.95 1.24 3.15.15.2 2.15 3.29 5.21 4.6.73.31 1.29.49 1.73.63.73.23 1.39.2 1.91.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.07-.13-.27-.2-.57-.35z" />
                                <path d="M27.5 14.5c0-7.18-5.82-13-13-13S1.5 7.32 1.5 14.5c0 2.29.61 4.44 1.67 6.3L1 31l10.47-2.1a12.93 12.93 0 0 0 6.03 1.5c7.18 0 13-5.82 13-13zm-13 11.5c-2.23 0-4.29-.66-6.02-1.8l-.43-.28-6.06 1.22 1.25-5.9-.29-.45a11.46 11.46 0 1 1 11.55 7.21z" />
                            </svg>
                            WhatsApp
                        </a>

                        {/* Llamar */}
                        <a
                            href="tel:+8134007493"
                            className="inline-flex items-center gap-2 rounded-full bg-dorado text-cream px-4 py-2 shadow hover:shadow-md"
                        >
                            Llamar ahora
                        </a>

                        {/* SMS (opcional) */}
                        <a
                            href="sms:+8134007493"
                            className="inline-flex items-center gap-2 rounded-full border border-cocoa/20 px-4 py-2 hover:bg-white/60"
                        >
                            Enviar SMS
                        </a>
                    </div>
                </aside>

                {/* …tu aside con info va aquí si quieres… */}
                <ContactForm />
            </div>

            {/* JSON-LD opcional (mejor aquí en server) */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "HealthAndBeautyBusiness",
                        name: "Blessed Massage & Recovery",
                        telephone: "(000) 000-0000",
                        email: "hello@blessedmassage.com",
                        areaServed: "Tampa, FL",
                        url: "https://tusitio.com/contact",
                        sameAs: [],
                    }),
                }}
            />
        </section>
    );
}
