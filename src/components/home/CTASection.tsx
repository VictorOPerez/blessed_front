import { CalendarCheck, Bed, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
export function CTASection() {
    return (
        <section className="bg-[#FF8A7B]/10 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#275B59] mb-4">
                    Ready to Invest in Your Most Important Asset?
                </h2>
                <p className="text-[#425958] max-w-xl mx-auto mb-10">
                    Choose the session that aligns with your goals. Relief is just a couple of clicks away.
                </p>

                {/* Featured offer */}
                <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 flex flex-col gap-6 sm:flex-row items-center justify-between max-w-2xl mx-auto">
                    {/* Service details */}
                    <div className="text-left">
                        <h3 className="text-lg font-bold text-[#275B59] mb-4">Therapeutic Recoveries include</h3>
                        <p className="text-sm text-[#425958] mb-2">60 or 90 Minutes · From <span className="font-semibold">$70</span></p>
                        <p className="text-sm text-[#425958]">Includes postural assessment, personalized treatment, and self-care recommendations.</p>
                    </div>
                    {/* CTA */}
                    <Link
                        href="/booking" // adjust to your booking anchor or route
                        className="inline-flex items-center gap-2 bg-[#FF8A7B] hover:bg-[#ff7665] transition-colors text-white font-semibold px-6 py-3 rounded-full whitespace-nowrap shadow-md"
                    >
                        Book My Session Now <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>

                {/* Urgency microcopy */}
                <p className="text-xs text-[#275B59] mt-4">Limited spots each week to ensure the highest quality.</p>
            </div>
        </section>
    );
}
