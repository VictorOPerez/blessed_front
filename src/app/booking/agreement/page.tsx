"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SignaturePad from "signature_pad";
import { useBookingStore } from "@/stores/bookingStore";
import BookingNavButtons from "@/components/BookingNavButtons";
import { toast } from "sonner";

// === Policy config ===
const POLICY_VERSION = "v1.0";

// Canonical consent text (EN).
const POLICY_HTML = `
  <h2 class="text-xl font-semibold mb-3">Informed Consent and Liability Waiver</h2>
  <p class="mb-2">The massage you will receive is intended for <strong>wellbeing, stress reduction, and relief of muscular tension</strong>. It does not constitute a medical diagnosis or treatment and is not a substitute for care from a healthcare professional. Always inform your therapist about any <strong>medical conditions, surgeries, medications</strong> (including blood thinners), <strong>allergies</strong>, and any change in your health status.</p>

  <h3 class="font-semibold mt-4">Contraindications and Special Conditions</h3>
  <ul class="list-disc pl-5 space-y-1">
    <li>Fever, active infection, open wounds, thrombosis, phlebitis, burns, or acute injuries.</li>
    <li>Uncontrolled cardiovascular conditions, cancer under treatment, bleeding disorders, or use of anticoagulants.</li>
    <li>Pregnancy: specific techniques and positions are required. Please inform us of your status and weeks.</li>
    <li>Minors: parent/guardian consent is required and presence on-site.</li>
  </ul>

  <h3 class="font-semibold mt-4">Feedback During the Session</h3>
  <p class="mb-2">If you feel <strong>pain, discomfort, dizziness, or numbness</strong>, inform us immediately to adjust pressure or technique. You may <strong>stop</strong> the session at any time. The therapist may also end the session if unsafe conditions or inappropriate behavior are detected.</p>

  <h3 class="font-semibold mt-4">Potential Risks</h3>
  <ul class="list-disc pl-5 space-y-1">
    <li>Temporary soreness, muscle achiness, or stiffness.</li>
    <li>Mild bruising or localized tenderness.</li>
    <li>Post-session fatigue or drowsiness.</li>
  </ul>
  <p class="mb-2">I accept these inherent risks and release the studio and its therapists from liability for <em>foreseeable minor effects</em> associated with techniques within professional standards, except in cases of proven negligence.</p>

  <h3 class="font-semibold mt-4">Professional Boundaries and Conduct</h3>
  <ul class="list-disc pl-5 space-y-1">
    <li>The massage is strictly <strong>non-sexual</strong>. Any inappropriate conduct will result in immediate termination.</li>
    <li>Appropriate <strong>draping</strong> will be maintained and only areas to be treated will be undraped with your consent.</li>
    <li>Personal hygiene and punctuality are required for a safe and respectful session.</li>
  </ul>

  <h3 class="font-semibold mt-4">Appointments, Cancellations, and Delays</h3>
  <ul class="list-disc pl-5 space-y-1">
    <li>Cancellation with <strong>≥ 24 h</strong>: no charge.</li>
    <li>Cancellation with <strong>&lt; 24 h</strong>: a fee of up to <strong>50%</strong> of the service may apply.</li>
    <li><strong>Lateness</strong> proportionally reduces session time to avoid impacting the next client.</li>
  </ul>

  <h3 class="font-semibold mt-4">Privacy and Data</h3>
  <p class="mb-2">The information provided is used to manage your appointment and personalize the service. It will be kept confidential according to applicable regulations. You may request access to or correction of your data. I authorize the use of my contact details for appointment reminders and communications related to my bookings.</p>

  <h3 class="font-semibold mt-4">Statement and Consent</h3>
  <p class="mb-2">I declare the information provided is truthful and that I have read and understood this consent. I have been able to ask questions and they were answered to my satisfaction. I understand that I may revoke my consent at any time before or during the session.</p>
`;

// Bulleted summary (most important points)
const SUMMARY_BULLETS = [
    "The massage you will receive is for relaxation and relief of muscular tension, not a medical treatment.",
    "For a safe and effective session, please share any relevant medical condition, surgery, medication, or allergy.",
    "If anything feels uncomfortable during the session, tell me immediately to adjust the technique. You have full control and can stop the massage at any time.",
    "The session is therapeutic in nature. Your personal boundaries will be respected at all times and proper draping will be used to ensure your privacy.",
    "Please notify us of any change at least 24 hours in advance. Late cancellations or no-shows may incur fees. Late arrivals may shorten your session time.",
    "Your personal data is handled with the utmost privacy and used only to manage your appointments.",
];

// ===== SignaturePad types (without any) =====
type SigData = Parameters<SignaturePad["fromData"]>[0];      // PointGroup[]
type SignaturePadWithEvents = SignaturePad & {
    addEventListener?: (ev: "beginStroke" | "endStroke", cb: () => void) => void;
    onBegin?: () => void;
    onEnd?: () => void;
};

export default function ConfidentialityAgreement() {
    const router = useRouter();

    // Store
    const booking = useBookingStore((s) => s.booking);
    const setAgreement = useBookingStore((s) => s.setAgreement);
    const setAgreementSignature = useBookingStore((s) => s.setAgreementSignature);
    const setAgreementPolicyMeta = useBookingStore((s) => s.setAgreementPolicyMeta);

    const { service, date, time, name, email, agreementAccepted } = booking || {};

    // SignaturePad
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const padRef = useRef<SignaturePad | null>(null);
    const [sigDataURL, setSigDataURL] = useState<string | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const strokesStack = useRef<SigData | null>(null); // for "undo"

    // Redirect if any previous step is missing
    useEffect(() => {
        if (!service || !date || !time || !name || !email) {
            router.replace("/booking");
        }
    }, [service, date, time, name, email, router]);

    // Initialize SignaturePad when canvas exists (client only)
    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;

        const resize = () => {
            const ratio = Math.max(window.devicePixelRatio || 1, 1);
            const width = canvas.parentElement ? canvas.parentElement.clientWidth : 600;
            const height = 220; // pleasant fixed height

            // Save current signature before resizing
            const prev = padRef.current && !padRef.current.isEmpty()
                ? (padRef.current.toData() as SigData)
                : null;

            canvas.width = Math.floor(width * ratio);
            canvas.height = Math.floor(height * ratio);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            // 🔒 Needed on mobile so the canvas receives strokes
            canvas.style.touchAction = "none";

            const ctx = canvas.getContext("2d");
            if (ctx) ctx.scale(ratio, ratio);

            if (!padRef.current) {
                padRef.current = new SignaturePad(canvas, {
                    minWidth: 0.6,
                    maxWidth: 2.2,
                    penColor: "#111827",
                });

                // Event handlers (v3/v4 compatibility)
                const handleBegin = () => setIsDrawing(true);
                const handleEnd = () => {
                    setIsDrawing(false);
                    if (!padRef.current) return;
                    const data = padRef.current.toData() as SigData;
                    strokesStack.current = data; // snapshot for undo
                    setSigDataURL(padRef.current.isEmpty() ? null : padRef.current.toDataURL());
                };

                const padEvt = padRef.current as SignaturePadWithEvents;
                padEvt.addEventListener?.("beginStroke", handleBegin);
                padEvt.addEventListener?.("endStroke", handleEnd);
                padEvt.onBegin = handleBegin; // fallback v2/v3
                padEvt.onEnd = handleEnd;

                // iOS: prevent touch gestures from scrolling/zooming instead of drawing
                canvas.addEventListener(
                    "touchstart",
                    (e) => e.preventDefault(),
                    { passive: false }
                );
                canvas.addEventListener(
                    "touchmove",
                    (e) => e.preventDefault(),
                    { passive: false }
                );
            } else if (prev) {
                // restore strokes after resize
                padRef.current.clear();
                padRef.current.fromData(prev);
            }
        };

        resize();
        window.addEventListener("resize", resize);
        return () => {
            window.removeEventListener("resize", resize);
            padRef.current?.clear();
            padRef.current = null;
        };
    }, []);

    // Compute hash (SHA-256) of the policy HTML to store alongside
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
                console.warn("[Consent] Missing setAgreementPolicyMeta in store (optional).");
            }
        })();
    }, [setAgreementPolicyMeta]);

    const handleClear = () => {
        padRef.current?.clear();
        strokesStack.current = null;
        setSigDataURL(null);
    };

    const handleUndo = () => {
        const pad = padRef.current;
        if (!pad) return;
        const data = pad.toData() as SigData;
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
            toast("You must accept the terms to continue.");
            return;
        }
        if (!sigDataURL) {
            toast("Please sign in the box to continue.");
            return;
        }
        setAgreement(true);
        if (typeof setAgreementSignature === "function") {
            setAgreementSignature(sigDataURL);
        } else {
            console.warn("[Consent] Missing setAgreementSignature in store (optional).");
        }
        // Next step (summary / payment)
        useBookingStore.getState().setCurrentStep?.(5);
        router.push("/booking/resumen");
    };

    if (!service || !date || !time || !name || !email) return null;

    return (
        <div className="booking-card print:bg-white h-auto ">
            <div className="w-full max-w-2xl rounded-lg">
                <main className="flex flex-col items-stretch gap-6">
                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl text-center font-semibold text-spa-prim">
                        Informed Consent
                    </h1>

                    {/* BULLETED SUMMARY */}
                    <section className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900">
                        <h2 className="font-semibold mb-2">Summary (read this first):</h2>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                            {SUMMARY_BULLETS.map((b, i) => (
                                <li key={i}>{b}</li>
                            ))}
                        </ul>
                    </section>

                    {/* Full text */}
                    <section
                        className="rounded-md border border-gray-200 bg-white p-5 text-gray-700 shadow-sm print:border-0"
                        aria-label="Full consent terms"
                    >
                        <details className="group">
                            <summary className="cursor-pointer select-none text-base font-medium text-gray-900 focus:outline-none">
                                View full terms
                                <span className="ml-2 text-sm text-gray-500 group-open:hidden">(click to expand)</span>
                                <span className="ml-2 text-sm text-gray-500 hidden group-open:inline">(click to collapse)</span>
                            </summary>
                            <div className="prose prose-sm mt-3" dangerouslySetInnerHTML={{ __html: POLICY_HTML }} />
                        </details>
                    </section>

                    {/* Acceptance */}
                    <section className="flex items-start gap-3">
                        <input
                            id="agreement-checkbox"
                            type="checkbox"
                            checked={!!agreementAccepted}
                            onChange={(e) => setAgreement(e.target.checked)}
                            className="mt-1 h-5 w-5 cursor-pointer rounded border-gray-300 text-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/50"
                        />
                        <label htmlFor="agreement-checkbox" className="cursor-pointer select-none text-gray-800">
                            I declare that I have read and accept the terms of the informed consent.
                        </label>
                    </section>

                    {/* Signature */}
                    <section>
                        <div className="rounded-md border border-gray-300 bg-white p-3 ">
                            <div className="text-xs text-gray-500 mb-2">
                                Name: <span className="font-medium">{name}</span> &nbsp;•&nbsp; Date: {new Date().toLocaleDateString()}
                            </div>
                            <div className="relative">
                                <canvas
                                    ref={canvasRef}
                                    className="w-full rounded-md border border-dashed border-gray-300 bg-gray-50"
                                    style={{ touchAction: "none" }} // 👈 important on mobile
                                />
                                {!sigDataURL && !isDrawing && (
                                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-gray-400">
                                        Please sign inside the box…
                                    </div>
                                )}
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                                <button type="button" onClick={handleClear} className="px-3 py-1.5 rounded-md border text-sm hover:bg-gray-50">
                                    Clear
                                </button>
                                <button type="button" onClick={handleUndo} className="px-3 py-1.5 rounded-md border text-sm hover:bg-gray-50">
                                    Undo stroke
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

            {/* Minimal print styles */}
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
