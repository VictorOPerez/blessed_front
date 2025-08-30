import { Suspense } from "react";
import CancelFlow from "@/components/CancelFlow";

export const dynamic = "force-dynamic";

type SP = Record<string, string | string[] | undefined>;
type SPIn = SP | Promise<SP>;

function isPromise<T>(v: unknown): v is Promise<T> {
    return typeof (v as { then?: unknown }).then === "function";
}

export default async function Page({
    searchParams,
}: {
    searchParams: SPIn;
}) {
    const sp: SP = isPromise<SP>(searchParams)
        ? await searchParams
        : searchParams;

    const bookingIdRaw = sp.bookingId;
    const tokenRaw = sp.token;

    const bookingId =
        Array.isArray(bookingIdRaw) ? bookingIdRaw[0] : bookingIdRaw ?? null;
    const token =
        Array.isArray(tokenRaw) ? tokenRaw[0] : tokenRaw ?? null;

    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center">Cargando...</div>}>
            <CancelFlow bookingId={bookingId} token={token} />
        </Suspense>
    );
}
