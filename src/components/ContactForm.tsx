"use client";
import { useState } from "react";

export default function ContactForm() {
    const [state, setState] = useState({
        name: "", email: "", phone: "",
        service: "", date: "", message: "", website: ""
    });
    const [loading, setLoading] = useState(false);
    const [ok, setOk] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const onChange =
        (k: keyof typeof state) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
                setState(s => ({ ...s, [k]: e.target.value }));

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setOk(null); setError(null);
        if (state.website) return;               // honeypot
        if (!state.name || !state.email || !state.message) {
            setError("Por favor completa nombre, email y mensaje.");
            return;
        }
        try {
            setLoading(true);
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(state),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || "No se pudo enviar el mensaje.");
            setOk("¡Gracias! Hemos recibido tu mensaje.");
            setState(s => ({ ...s, message: "", date: "", service: "" })); // conserva nombre/email
        } catch (err: any) {
            setError(err.message || "Error inesperado.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={onSubmit} className="relative border-spa rounded-xl bg-cream-tint border border-cocoa/10 p-6 shadow-sm">
            {/* campos… */}
            {/* Nombre */}
            <label htmlFor="name" className="block text-sm font-medium mb-1">Nombre*</label>
            <input id="name" type="text" autoComplete="name" required
                className="w-full bg-white border border-cocoa/15 rounded-md px-3 py-2 mb-4"
                value={state.name} onChange={onChange("name")} />
            {/* Email */}
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email*</label>
            <input id="email" type="email" autoComplete="email" required
                className="w-full bg-white border border-cocoa/15 rounded-md px-3 py-2 mb-4"
                value={state.email} onChange={onChange("email")} />
            {/* Tel */}
            <label htmlFor="phone" className="block text-sm font-medium mb-1">Teléfono</label>
            <input id="phone" type="tel" autoComplete="tel"
                className="w-full bg-white border border-cocoa/15 rounded-md px-3 py-2 mb-4"
                value={state.phone} onChange={onChange("phone")} />
            {/* resto de campos… */}
            <textarea id="message" required rows={5}
                className="w-full bg-white border border-cocoa/15 rounded-md px-3 py-2"
                value={state.message} onChange={onChange("message")}
                placeholder="Cuéntanos tu objetivo, dolencias, horarios, ubicación…" />

            {/* Honeypot */}
            <input type="text" name="website" value={state.website} onChange={onChange("website")}
                className="hidden" tabIndex={-1} autoComplete="off" />

            {ok && <p className="mt-4 text-green-700 text-sm">{ok}</p>}
            {error && <p className="mt-4 text-red-600 text-sm">{error}</p>}
            <button type="submit" disabled={loading}
                className="mt-6 inline-flex items-center gap-2 rounded-full
                         bg-[#FF8A7B] hover:bg-[#ff7665] text-white
                         font-semibold px-6 py-3 shadow-md disabled:opacity-60">
                {loading ? "Enviando…" : "Enviar mensaje"}
            </button>
        </form>
    );
}
