"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SignaturePad from "signature_pad";
import { useBookingStore } from "@/stores/bookingStore";
import BookingNavButtons from "@/components/BookingNavButtons";
import { toast } from "sonner"

/**
 * ✅ Qué hace este componente
 * - Muestra RESUMEN + TÉRMINOS completos del consentimiento informado (mejorado)
 * - Captura la aceptación (checkbox) y la FIRMA dibujada del cliente
 * - (Frontend-only) Guarda en Zustand: accepted, signatureDataURL, policyVersion, policyHash
 * - Habilita "Continuar" solo si hay check + firma
 * - Botón "Imprimir / Guardar PDF" sin dependencias (abre el diálogo de impresión del navegador)
 *
 * 🧩 Requisitos mínimos en tu Zustand store (añade si no existen):
 * --------------------------------------------------------------
 * type BookingState = {
 *   booking: {
 *     service?: any, date?: string|null, time?: string|null,
 *     name?: string, email?: string,
 *     agreementAccepted: boolean,
 *     agreementSignatureDataURL?: string | null,
 *     agreementPolicyVersion?: string | null,
 *     agreementPolicyHash?: string | null,
 *   };
 *   setAgreement: (accepted: boolean) => void;
 *   setAgreementSignature?: (dataURL: string|null) => void; // ⬅️ nuevo
 *   setAgreementPolicyMeta?: (v: { version: string|null; hash: string|null }) => void; // ⬅️ nuevo
 *   setCurrentStep: (n: number) => void;
 * };
 * --------------------------------------------------------------
 * Si aún no tienes setAgreementSignature / setAgreementPolicyMeta, el componente funcionará
 * pero solo guardará la firma en memoria local hasta "Continuar" (y mostrará un console.warn).
 */

// === Config de política ===
const POLICY_VERSION = "v1.0";

// Texto canónico del consentimiento (ES).
// Puedes moverlo a un .md o a la BD; aquí lo dejamos inline por ahora.
const POLICY_HTML = `
  <h2 class="text-xl font-semibold mb-3">Consentimiento informado y exención de responsabilidad</h2>
  <p class="mb-2">El masaje que recibirá tiene fines de <strong>bienestar, reducción de estrés y alivio de tensión muscular</strong>. No constituye diagnóstico ni tratamiento médico y no sustituye la atención de un profesional de la salud. Informe siempre a su terapeuta sobre <strong>condiciones médicas, cirugías, medicamentos</strong> (incluidos anticoagulantes), <strong>alergias</strong> y cualquier cambio en su estado de salud.</p>

  <h3 class="font-semibold mt-4">Contraindicaciones y condiciones especiales</h3>
  <ul class="list-disc pl-5 space-y-1">
    <li>Fiebre, infección activa, heridas abiertas, trombosis, flebitis, quemaduras o lesiones agudas.</li>
    <li>Patologías cardiovasculares no controladas, cáncer en tratamiento, trastornos hemorrágicos o uso de anticoagulantes.</li>
    <li>Embarazo: se requieren técnicas y posiciones específicas. Informe su estado y semanas.</li>
    <li>Menores de edad: se requiere consentimiento del padre/madre/tutor y presencia en la instalación.</li>
  </ul>

  <h3 class="font-semibold mt-4">Retroalimentación durante la sesión</h3>
  <p class="mb-2">Si siente <strong>dolor, incomodidad, mareo o adormecimiento</strong>, informe inmediatamente para ajustar presión o técnica. Puede <strong>detener</strong> la sesión en cualquier momento. El terapeuta también puede finalizarla si detecta condiciones inseguras o conducta inapropiada.</p>

  <h3 class="font-semibold mt-4">Riesgos potenciales</h3>
  <ul class="list-disc pl-5 space-y-1">
    <li>Molestia temporal, agujetas o rigidez.</li>
    <li>Hematomas leves o sensibilidad localizada.</li>
    <li>Fatiga o somnolencia posterior.</li>
  </ul>
  <p class="mb-2">Acepto estos riesgos inherentes y libero de responsabilidad al centro y a sus terapeutas por <em>efectos menores previsibles</em> asociados a técnicas dentro de estándares profesionales, salvo negligencia comprobada.</p>

  <h3 class="font-semibold mt-4">Límites profesionales y conducta</h3>
  <ul class="list-disc pl-5 space-y-1">
    <li>El masaje es estrictamente <strong>no sexual</strong>. Cualquier conducta inapropiada resultará en la terminación inmediata.</li>
    <li>Se mantendrá el <strong>cubierto</strong> adecuado (drapeado) y solo se descubrirán áreas a tratar con su consentimiento.</li>
    <li>Higiene personal y puntualidad son requeridas para una sesión segura y respetuosa.</li>
  </ul>

  <h3 class="font-semibold mt-4">Política de citas, cancelaciones y retrasos</h3>
  <ul class="list-disc pl-5 space-y-1">
    <li>Cancelación con <strong>≥ 24 h</strong>: sin cargo.</li>
    <li>Cancelación con <strong>&lt; 24 h</strong>: puede aplicarse cargo hasta el <strong>50%</strong> del servicio.</li>
    <li>La <strong>tardanza</strong> reduce proporcionalmente el tiempo de la sesión para no afectar a la siguiente persona.</li>
  </ul>

  <h3 class="font-semibold mt-4">Privacidad y datos</h3>
  <p class="mb-2">La información proporcionada se usa para administrar su cita y personalizar el servicio. Se guardará de forma confidencial según la normativa aplicable. Puede solicitar acceso o corrección de sus datos. Autorizo el uso de mis datos de contacto para recordatorios de citas y comunicaciones relacionadas con mis reservas.</p>

  <h3 class="font-semibold mt-4">Declaración y consentimiento</h3>
  <p class="mb-2">Declaro que la información suministrada es veraz y que he leído y comprendido este consentimiento. He podido hacer preguntas y fueron respondidas a mi satisfacción. Comprendo que puedo revocar mi consentimiento en cualquier momento antes o durante la sesión.</p>
`;

// Resumen en bullets (lo más importante)
const SUMMARY_BULLETS = [
    "El masaje que recibirás es una terapia para la relajación y el alivio de la tensión muscular, no un tratamiento médico.",
    "Para una sesión segura y efectiva, por favor comparte cualquier condición médica, cirugía, medicación o alergia relevante.",
    "Si algo te incomoda durante la sesión, avísame de inmediato para ajustar la técnica. Tienes el control total y puedes detener el masaje en cualquier momento.",
    "La sesión es de naturaleza terapéutica. Se respetarán en todo momento tus límites personales y se utilizará un drapeado adecuado para garantizar tu privacidad.",
    "Agradecemos que nos notifiques cualquier cambio con al menos 24 horas de antelación. Las cancelaciones con poco aviso o las ausencias pueden generar cargos. Las llegadas tarde podrían acortar la duración de tu sesión.",
    "Tus datos personales se tratan con la máxima privacidad y se utilizan únicamente para la gestión de tus citas.",
];

export default function ConfidentialityAgreement() {
    const router = useRouter();

    // Store
    const booking = useBookingStore((s) => s.booking);
    const setAgreement = useBookingStore((s) => s.setAgreement);
    const setStep = useBookingStore((s) => s.setCurrentStep);
    const setAgreementSignature = useBookingStore((s: any) => s.setAgreementSignature);
    const setAgreementPolicyMeta = useBookingStore((s: any) => s.setAgreementPolicyMeta);

    const { service, date, time, name, email, agreementAccepted } = booking || {};

    // SignaturePad
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const padRef = useRef<SignaturePad | null>(null);
    const [sigDataURL, setSigDataURL] = useState<string | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const strokesStack = useRef<Array<any>>([]); // para "undo"

    // Redirigir si falta algún paso previo
    useEffect(() => {
        if (!service || !date || !time || !name || !email) {
            router.replace("/booking");
        }
    }, [service, date, time, name, email, router]);

    // Inicializar SignaturePad cuando el canvas exista (solo cliente)
    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;

        const resize = () => {
            const ratio = Math.max(window.devicePixelRatio || 1, 1);
            const width = canvas.parentElement ? canvas.parentElement.clientWidth : 600;
            const height = 220; // alto fijo agradable
            // Guardar firma actual para no perderla en el resize
            const prev = padRef.current && !padRef.current.isEmpty() ? padRef.current.toData() : null;

            canvas.width = Math.floor(width * ratio);
            canvas.height = Math.floor(height * ratio);
            canvas.style.width = width + "px";
            canvas.style.height = height + "px";

            const ctx = canvas.getContext("2d");
            if (ctx) ctx.scale(ratio, ratio);

            if (!padRef.current) {
                padRef.current = new SignaturePad(canvas, {
                    minWidth: 0.6,
                    maxWidth: 2.2,
                    penColor: "#111827", // gray-900
                });

                // Handlers de eventos (compatibilidad v3/v4)
                const handleBegin = () => setIsDrawing(true);
                const handleEnd = () => {
                    setIsDrawing(false);
                    if (!padRef.current) return;
                    const data = padRef.current.toData();
                    strokesStack.current = data; // snapshot para undo
                    setSigDataURL(padRef.current.isEmpty() ? null : padRef.current.toDataURL());
                };

                // v4+: eventos beginStroke / endStroke
                (padRef.current as any).addEventListener?.("beginStroke", handleBegin);
                (padRef.current as any).addEventListener?.("endStroke", handleEnd);
                // fallback v2/v3: propiedades onBegin / onEnd
                (padRef.current as any).onBegin = handleBegin;
                (padRef.current as any).onEnd = handleEnd;
            } else if (prev) {
                // restaurar trazos tras el resize
                padRef.current.clear();
                padRef.current.fromData(prev);
            }
        };

        resize();
        window.addEventListener("resize", resize);
        return () => {
            window.removeEventListener("resize", resize);
            // Limpieza básica (sin .off por compatibilidad)
            padRef.current?.clear();
            padRef.current = null;
        };
    }, []);

    // Calcular hash (SHA-256) del HTML de la política para dejarlo listo en el store
    useEffect(() => {
        const toHex = (buf: ArrayBuffer) =>
            Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");

        (async () => {
            const enc = new TextEncoder().encode(POLICY_HTML);
            const digest = await crypto.subtle.digest("SHA-256", enc);
            const hex = toHex(digest);
            if (typeof setAgreementPolicyMeta === "function") {
                setAgreementPolicyMeta({ version: POLICY_VERSION, hash: hex });
            } else {
                console.warn("[Consent] Falta setAgreementPolicyMeta en el store (opcional).");
            }
        })();
    }, [setAgreementPolicyMeta]);

    const handleClear = () => {
        padRef.current?.clear();
        strokesStack.current = [];
        setSigDataURL(null);
    };

    const handleUndo = () => {
        const pad = padRef.current;
        if (!pad) return;
        const data = pad.toData();
        if (data) {
            data.pop();
            pad.clear();
            pad.fromData(data);
            strokesStack.current = data;
            setSigDataURL(pad.isEmpty() ? null : pad.toDataURL());
        }
    };


    const canContinue = Boolean(agreementAccepted && sigDataURL);

    const handleContinue = () => {
        if (!agreementAccepted) {
            toast("Debes aceptar los términos para continuar.")

            return;
        }
        if (!sigDataURL) {
            toast("Por favor, firma en el recuadro para continuar.")
            return;
        }
        setAgreement(true);
        if (typeof setAgreementSignature === "function") {
            setAgreementSignature(sigDataURL);
        } else {
            console.warn("[Consent] Falta setAgreementSignature en el store (opcional).");
        }
        // Paso siguiente (resumen / pago) – ajusta al flujo que ya tienes
        useBookingStore.getState().setCurrentStep?.(5);
        router.push("/booking/resumen");
    };

    if (!service || !date || !time || !name || !email) return null;

    return (
        <div className="booking-card print:bg-white   h-auto ">
            <div className="w-full max-w-2xl rounded-lg">
                <main className="flex flex-col items-stretch gap-6">
                    {/* Título */}
                    <h1 className="text-3xl md:text-4xl text-center font-semibold text-spa-prim">
                        Consentimiento informado
                    </h1>

                    {/* RESUMEN en bullets */}
                    <section className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900">
                        <h2 className="font-semibold mb-2">Resumen (lee esto primero):</h2>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                            {SUMMARY_BULLETS.map((b, i) => (
                                <li key={i}>{b}</li>
                            ))}
                        </ul>
                    </section>

                    {/* Texto completo */}
                    <section className="rounded-md border border-gray-200 bg-white p-5 text-gray-700 shadow-sm print:border-0" aria-label="Términos completos del consentimiento">
                        <details className="group">
                            <summary className="cursor-pointer select-none text-base font-medium text-gray-900 focus:outline-none">
                                Ver términos completos
                                <span className="ml-2 text-sm text-gray-500 group-open:hidden">(clic para expandir)</span>
                                <span className="ml-2 text-sm text-gray-500 hidden group-open:inline">(clic para contraer)</span>
                            </summary>
                            <div className="prose prose-sm mt-3" dangerouslySetInnerHTML={{ __html: POLICY_HTML }} />
                        </details>
                    </section>

                    {/* Aceptación */}
                    <section className="flex items-start gap-3">
                        <input
                            id="agreement-checkbox"
                            type="checkbox"
                            checked={!!agreementAccepted}
                            onChange={(e) => setAgreement(e.target.checked)}
                            className="mt-1 h-5 w-5 cursor-pointer rounded border-gray-300 text-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/50"
                        />
                        <label htmlFor="agreement-checkbox" className="cursor-pointer select-none text-gray-800">
                            Declaro que he leído y acepto los términos del consentimiento informado.
                        </label>
                    </section>

                    {/* Firma */}
                    <section>
                        <h2 className="text-base font-semibold text-gray-900 mb-2">Firma</h2>
                        <div className="rounded-md border border-gray-300 bg-white p-3">
                            <div className="text-xs text-gray-500 mb-2">
                                Nombre: <span className="font-medium">{name}</span> &nbsp;•&nbsp; Fecha: {new Date().toLocaleDateString()}
                            </div>
                            <div className="relative">
                                <canvas ref={canvasRef} className="w-full rounded-md border border-dashed border-gray-300 bg-gray-50" />
                                {!sigDataURL && !isDrawing && (
                                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-gray-400">
                                        Firme dentro del recuadro…
                                    </div>
                                )}
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                                <button type="button" onClick={handleClear} className="px-3 py-1.5 rounded-md border text-sm hover:bg-gray-50">
                                    Limpiar
                                </button>
                                <button type="button" onClick={handleUndo} className="px-3 py-1.5 rounded-md border text-sm hover:bg-gray-50">
                                    Deshacer trazo
                                </button>
                            </div>
                        </div>
                    </section>


                    <div className="text-center w-full px-2 md:px-10">
                        <div className=" text-center">
                            <BookingNavButtons backHref="/booking/details" showContinue onContinue={handleContinue} />
                        </div>
                    </div>


                </main>
            </div>

            {/* Estilos de impresión mínimos */}
            <style jsx global>{`
        @media print {
          .booking-card { box-shadow: none !important; }
          summary { display: none; }
          details[open] > div { display: block !important; }
          a, button { display: none !important; }
        }
      `}</style>
        </div>
    );
}
