import { Suspense } from "react";
import CancelFlow from "@/components/CancelFlow";

export const dynamic = "force-dynamic"; // evita prerender de esta ruta

type SP = Record<string, string | string[] | undefined>;
type MaybePromise<T> = T | Promise<T>;

export default async function Page({
    searchParams,
}: {
    // En Next 15, puede venir como Promise
    searchParams: MaybePromise<SP>;
}) {
    const sp: SP =
        typeof (searchParams as any)?.then === "function"
            ? await (searchParams as Promise<SP>)
            : ((searchParams as SP) ?? {});

    const bookingIdRaw = sp.bookingId;
    const tokenRaw = sp.token;

    const bookingId = Array.isArray(bookingIdRaw) ? bookingIdRaw[0] : bookingIdRaw ?? null;
    const token = Array.isArray(tokenRaw) ? tokenRaw[0] : tokenRaw ?? null;

    return (
        <Suspense
            fallback={
                <div className="flex h-screen items-center justify-center">
                    Cargando...
                </div>
            }
        >
            <CancelFlow bookingId={bookingId} token={token} />
        </Suspense>
    );
}
