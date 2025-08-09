// stores/bookingStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Service = {
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
    agreementAccepted: boolean;
};

const emptyBooking: Omit<BookingData, "name" | "email" | "phone"> = {
    service: null,
    date: null,
    time: null,
    agreementAccepted: false,
    // name y email no van aquí a propósito
};



type BookingStore = {
    booking: BookingData;
    currentStep: number;
    hasHydrated: boolean;          // 👈 nueva
    setCurrentStep: (step: number) => void;
    setHasHydrated: () => void;    // 👈 nueva
    setService: (service: Service) => void;
    setDate: (date: string) => void;
    setTime: (time: string[]) => void;
    setName: (name: string) => void;
    setEmail: (email: string) => void;
    setPhone: (phone: string) => void;
    setAgreement: (accepted: boolean) => void;
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
            },
            currentStep: 1, // comienza en el paso 1
            hasHydrated: false,
            setHasHydrated: () => set({ hasHydrated: true }),
            setCurrentStep: (step) => set(() => ({ currentStep: step })),
            setService: (service) => set((state) => ({ booking: { ...state.booking, service } })),
            setDate: (date) => set((state) => ({ booking: { ...state.booking, date } })),
            setTime: (time: string[]) => set((s) => ({ booking: { ...s.booking, time } })),
            setName: (name) => set((state) => ({ booking: { ...state.booking, name } })),
            setEmail: (email) => set((state) => ({ booking: { ...state.booking, email } })),
            setPhone: (phone) => set((state) => ({ booking: { ...state.booking, phone } })),
            setAgreement: (accepted) => set((state) => ({ booking: { ...state.booking, agreementAccepted: accepted } })),
            reset: () =>
                set((state) => ({
                    booking: {
                        ...emptyBooking,
                        name: state.booking.name,   // 👈 conserva
                        email: state.booking.email, // 👈 conserva
                        phone: state.booking.phone,                // si quieres borrarlo
                    },
                    currentStep: 1,
                })),
        }),
        {
            name: "booking-storage",
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated();   // marca cuando terminó la re-hidratación
            },
        }
    )
);
