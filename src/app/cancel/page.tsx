// app/cancel/page.tsx
import CancelUI from "./ui";

export const dynamic = "force-dynamic";

type SP = Record<string, string | string[] | undefined>;

export default async function Page({
  // 👇 En esta versión, Next tipa searchParams como Promise<any> | undefined
  searchParams,
}: {
  searchParams?: Promise<SP>;
}) {
  // Espera el Promise y cae a {} si viene undefined
  const sp: SP = (await searchParams) ?? {};

  const bookingIdRaw = sp.bookingId;
  const tokenRaw = sp.token;

  const bookingId =
    Array.isArray(bookingIdRaw) ? bookingIdRaw[0] : bookingIdRaw ?? null;
  const token = Array.isArray(tokenRaw) ? tokenRaw[0] : tokenRaw ?? null;

  return <CancelUI bookingId={bookingId} token={token} />;
}
