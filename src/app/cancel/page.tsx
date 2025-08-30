import { CancelFlow } from "@/components/Cancel-flow";
import { Suspense } from "react";

export default function Page() {
    return (
        <Suspense
            fallback={
                <div className="flex h-screen items-center justify-center">Cargando...</div>
            }
        >
            <CancelFlow />
        </Suspense>
    );
}
