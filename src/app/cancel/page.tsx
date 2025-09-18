// app/cancel/page.tsx
import CancelUI from "./ui";

export const dynamic = "force-dynamic";

type SP = Record<string, string | string[] | undefined>;

export default async function Page({
  // acepta ambas: objeto o Promise del objeto
  searchParams,
}: {
  searchParams?: SP | Promise<SP>;
}) {
  const sp: SP = (await Promise.resolve(searchParams)) ?? {};

  const bookingIdRaw = sp.bookingId;
  const tokenRaw = sp.token;

  const bookingId =
    Array.isArray(bookingIdRaw) ? bookingIdRaw[0] : bookingIdRaw ?? null;
  const token =
    Array.isArray(tokenRaw) ? tokenRaw[0] : tokenRaw ?? null;

  return <CancelUI bookingId={bookingId} token={token} />;
}
