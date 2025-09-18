// app/cancel/page.tsx
import CancelUI from "./ui";

export const dynamic = "force-dynamic";

// Tipos utilitarios
type SP = Record<string, string | string[] | undefined>;
type SPIn = SP | Promise<SP>;

export default async function Page({
  searchParams,
}: {
  searchParams: SPIn;
}) {
  // 👇 Espera searchParams (si ya es objeto, Promise.resolve lo deja igual)
  const sp: SP = await Promise.resolve(searchParams);

  const bookingIdRaw = sp.bookingId;
  const tokenRaw = sp.token;

  const bookingId =
    Array.isArray(bookingIdRaw) ? bookingIdRaw[0] : bookingIdRaw ?? null;
  const token =
    Array.isArray(tokenRaw) ? tokenRaw[0] : tokenRaw ?? null;

  return <CancelUI bookingId={bookingId} token={token} />;
}
