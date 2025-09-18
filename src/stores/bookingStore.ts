// stores/bookingStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Service = {
    slug?: string;
    name: string;
    duration: string;
    price: string;
    description: string;
};

type BookingData = {
    service: Service | null;
    date: string | null;
    time: string[] | null;
    name: string | null;
    email: string | null;
    phone: string | null;

    // Consentimiento
    agreementAccepted: boolean;
    agreementSignatureDataURL: string | null;   // ⬅️ nuevo
    agreementPolicyVersion: string | null;      // ⬅️ nuevo
    agreementPolicyHash: string | null;         // ⬅️ nuevo
};

const emptyBooking: Omit<BookingData, "name" | "email" | "phone"> = {
    service: null,
    date: null,
    time: null,
    agreementAccepted: false,
    agreementSignatureDataURL: null,  // ⬅️ nuevo
    agreementPolicyVersion: null,     // ⬅️ nuevo
    agreementPolicyHash: null,        // ⬅️ nuevo
};

type BookingStore = {
    booking: BookingData;
    currentStep: number;
    hasHydrated: boolean;
    setCurrentStep: (step: number) => void;
    setHasHydrated: () => void;

    setService: (service: Service) => void;
    setDate: (date: string) => void;
    setTime: (time: string[]) => void;
    setName: (name: string) => void;
    setEmail: (email: string) => void;
    setPhone: (phone: string) => void;

    setAgreement: (accepted: boolean) => void;
    setAgreementSignature: (dataURL: string | null) => void; // ⬅️ nuevo
    setAgreementPolicyMeta: (m: { version: string | null; hash: string | null }) => void; // ⬅️ nuevo

    reset: () => void;
};

export const useBookingStore = create<BookingStore>()(
    persist(
        (set) => ({
            booking: {
                service: null,
                date: null,
                time: [],
                name: null,
                email: null,
                phone: null,
                agreementAccepted: false,
                agreementSignatureDataURL: null, // ⬅️ nuevo
                agreementPolicyVersion: null,    // ⬅️ nuevo
                agreementPolicyHash: null,       // ⬅️ nuevo
            },
            currentStep: 1,
            hasHydrated: false,
            setHasHydrated: () => set({ hasHydrated: true }),
            setCurrentStep: (step) => set(() => ({ currentStep: step })),

            setService: (service) => set((s) => ({ booking: { ...s.booking, service } })),
            setDate: (date) => set((s) => ({ booking: { ...s.booking, date } })),
            setTime: (time: string[]) => set((s) => ({ booking: { ...s.booking, time } })),
            setName: (name) => set((s) => ({ booking: { ...s.booking, name } })),
            setEmail: (email) => set((s) => ({ booking: { ...s.booking, email } })),
            setPhone: (phone) => set((s) => ({ booking: { ...s.booking, phone } })),

            setAgreement: (accepted) =>
                set((s) => ({ booking: { ...s.booking, agreementAccepted: accepted } })),

            // ⬅️ nuevos setters
            setAgreementSignature: (dataURL) =>
                set((s) => ({ booking: { ...s.booking, agreementSignatureDataURL: dataURL } })),
            setAgreementPolicyMeta: ({ version, hash }) =>
                set((s) => ({
                    booking: {
                        ...s.booking,
                        agreementPolicyVersion: version,
                        agreementPolicyHash: hash,
                    },
                })),

            reset: () =>
                set((s) => ({
                    booking: {
                        ...emptyBooking,
                        name: s.booking.name,   // conserva
                        email: s.booking.email, // conserva
                        phone: s.booking.phone, // conserva (ajusta si quieres limpiar)
                    },
                    currentStep: 1,
                })),
        }),
        {
            name: "booking-storage",
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated();
            },
        }
    )
);
