"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CancelBookingPage } from "@/components/CancelBookingPage"; // Tu componente de UI

// Definimos una interfaz para los datos que esperamos del backend
interface BookingValidationData {
    serviceTitle: string;
    dateText: string;
    timeText: string;
    eligibleForRefund: boolean;
}

// Un componente interno para manejar la lógica principal
function CancelFlow() {
    const searchParams = useSearchParams();
    const bookingId = searchParams.get('bookingId');
    const token = searchParams.get('token');

    // Estados para manejar el ciclo de vida de la página
    const [validationState, setValidationState] = useState<{
        status: 'loading' | 'success' | 'error';
        data: BookingValidationData | null;
        errorMessage: string | null;
    }>({ status: 'loading', data: null, errorMessage: null });

    const [cancellationState, setCancellationState] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');

    // 1. EFECTO PARA VALIDAR EL TOKEN AL CARGAR LA PÁGINA
    useEffect(() => {
        if (!bookingId || !token) {
            setValidationState({ status: 'error', data: null, errorMessage: 'Faltan parámetros en la URL.' });
            return;
        }

        const validateToken = async () => {
            try {
                const response = await fetch(`https://servermasaje-production.up.railway.app/api/bookings/cancel/validate?bookingId=${bookingId}&token=${token}`);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'El enlace de cancelación no es válido o ha expirado.');
                }

                const data: BookingValidationData = await response.json();
                setValidationState({ status: 'success', data, errorMessage: null });

            } catch (err: any) {
                setValidationState({ status: 'error', data: null, errorMessage: err.message });
            }
        };

        validateToken();
    }, [bookingId, token]);


    // 2. FUNCIÓN PARA MANEJAR LA CONFIRMACIÓN DE CANCELACIÓN
    const handleConfirmCancellation = async () => {
        if (!bookingId || !token) return;

        setCancellationState('processing');

        try {
            const response = await fetch('/api/bookings/cancel', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bookingId, token }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'No se pudo procesar la cancelación.');
            }

            setCancellationState('success');

        } catch (err) {
            setCancellationState('failed');
            // Opcional: mostrar un mensaje de error más específico
        }
    };

    // --- RENDERIZADO CONDICIONAL DE LA PÁGINA ---

    if (validationState.status === 'loading') {
        return <div className="flex h-screen items-center justify-center">Verificando tu reserva...</div>;
    }

    if (validationState.status === 'error') {
        return <div className="flex h-screen items-center justify-center text-red-600">{validationState.errorMessage}</div>;
    }

    if (cancellationState === 'success') {
        return (
            <div className="flex h-screen items-center justify-center text-center">
                <div>
                    <h1 className="text-2xl font-bold text-green-700">¡Reserva Cancelada!</h1>
                    <p className="mt-2">Tu reserva ha sido cancelada exitosamente. Hemos enviado una confirmación a tu correo.</p>
                </div>
            </div>
        );
    }

    // Si la validación fue exitosa, muestra el componente principal
    if (validationState.status === 'success' && validationState.data) {
        return (
            <CancelBookingPage
                brandName="Blessed Massage & Recovery"
                serviceTitle={validationState.data.serviceTitle}
                dateText={validationState.data.dateText}
                timeText={validationState.data.timeText}
                eligibleForRefund={validationState.data.eligibleForRefund}
                loading={cancellationState === 'processing'}
                onConfirm={handleConfirmCancellation}
            // ...otros props como los colores
            />
        );
    }

    return null; // Fallback por si algo sale mal
}

// El componente Page principal que usa Suspense
export default function Page() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center">Cargando...</div>}>
            <CancelFlow />
        </Suspense>
    );
}