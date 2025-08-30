import CancelFlow from "@/components/Cancel-flow";
import { Suspense } from "react";

export const dynamic = "force-dynamic"; // evita SSG de "/"

export default function Page({
    searchParams,
}: {
    searchParams: { bookingId?: string; token?: string };
}) {
    const bookingId = searchParams?.bookingId ?? null;
    const token = searchParams?.token ?? null;

    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center">Cargando...</div>}>
            <CancelFlow bookingId={bookingId} token={token} />
        </Suspense>
    );
}
