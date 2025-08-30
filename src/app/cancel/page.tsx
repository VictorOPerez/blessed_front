// src/app/cancel/page.tsx
import { Suspense } from "react";
import CancelFlow from "@/components/CancelFlow";

export const dynamic = "force-dynamic";

type SP = { [key: string]: string | string[] | undefined };

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<SP>;
}) {
    const sp = await searchParams;

    const bookingIdRaw = sp.bookingId;
    const tokenRaw = sp.token;

    const bookingId = Array.isArray(bookingIdRaw) ? bookingIdRaw[0] : bookingIdRaw ?? null;
    const token = Array.isArray(tokenRaw) ? tokenRaw[0] : tokenRaw ?? null;

    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center">Cargando...</div>}>
            <CancelFlow bookingId={bookingId} token={token} />
        </Suspense>
    );
}
