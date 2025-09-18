'use client';
import { useRouter } from 'next/navigation';
import { useBookingStore } from "@/stores/bookingStore";
import Link from 'next/link';
import Image from 'next/image';

interface Service {
    slug: string;
    name: string;
    description: string;
    duration: string;
    resultado: string,
    price: string;
    icon: string;
}

const services: Service[] = [
    {
        slug: 'masaje-de-tejido-profundo',   // ← coincide con la BD
        name: 'Deep Tissue Massage',
        description: 'This is not simple relaxation; it’s a precise intervention to dismantle chronic tension built up from long hours of work. We focus on releasing knots and adhesions in the deepest layers of muscle, restoring mobility and easing persistent pain.',
        resultado: 'Effective relief from tech-neck and lower back pain. Noticeable improvement in posture and flexibility. Release of tension that causes headaches.',
        duration: '60 min',
        price: '$90',
        icon: '/img/1.png'
    },
    {
        slug: 'masaje-sueco',                 // ← coincide con la BD
        name: 'Swedish Massage',
        description: 'Designed for overloaded minds in need of a strategic pause. Through fluid, rhythmic strokes, we calm the nervous system, reduce cortisol levels (the stress hormone), and promote a state of deep mental calm, essential for clear decision-making.',
        resultado: 'Decreased feelings of anxiety and stress. Improved sleep quality and restorative rest. Increased mental clarity and focus.',
        duration: '60 min',
        price: '$80',
        icon: '/img/2.png'
    },
    {
        slug: 'masaje-con-piedras-calientes', // ← coincide con la BD
        name: 'Hot Stone Massage',
        description: 'We maximize the efficiency of your session. The therapeutic heat of basalt stones penetrates the muscles, allowing for a faster, deeper release of tension. The smart choice for those seeking maximum impact in minimum time.',
        resultado: `"Melts away" stubborn muscle tension. Speeds up circulation and the recovery process. Provides a total sense of comfort and wellbeing.`,
        duration: '60 min',
        price: '$90',
        icon: '/img/3.png'
    },
    {
        slug: 'terapia-de-ventosas-cupping',  // ← coincide con la BD
        name: 'Cupping Therapy',
        description: 'An advanced technique to tackle the most stubborn knots and chronic pain areas. Through suction, we create a decompression effect that lifts tissue, releases adhesions, increases blood flow, and promotes faster healing of the affected area.',
        resultado: `Powerful relief for localized, persistent pain. Significant improvement in range of motion. Stimulates circulation for optimal recovery.`,
        duration: '60 min',
        price: '$90',
        icon: '/img/4.png'
    },
    {
        slug: 'masaje-de-pies',               // ← coincide con la BD
        name: 'Foot Massage',
        description: 'Your feet are the map of your body. This massage not only relieves local fatigue but also stimulates key reflex points connected to your entire system. An incredibly effective treatment to revitalize after a long trip or an exhausting day.',
        resultado: `Immediate relief from heaviness and tired legs. A renewed sense of energy throughout the body. A quick way to rebalance and "ground" your system.`,
        duration: '60 min',
        price: '$70',
        icon: '/img/5.png'
    }
];

export default function BookingHome() {
    const router = useRouter();
    const setService = useBookingStore((state) => state.setService);
    const setStep = useBookingStore((state) => state.setCurrentStep);

    const handleSelect = (service: typeof services[0]) => {
        setService(service);
        setStep(2);
        router.push("/booking/date");
    };

    return (
        <section className="mx-auto max-w-6xl px-4 text-cocoa py-5 mb-10">
            <h1 className="font-playfair text-4xl font-bold text-center mb-6">Our Therapeutic Services</h1>
            <p className="mx-auto max-w-xl text-center mb-12 text-lg text-cocoa/80">
                Every session includes a brief mobility assessment and is delivered in the comfort of your
                home or office.
            </p>

            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                    <li
                        key={service.slug}
                        className="group relative border-spa bg-[#F8F5F0] flex flex-col rounded-xl bg-cream-tint
             border border-cocoa/10 p-6 shadow-sm
             hover:shadow-md hover:shadow-cocoa/10
             hover:-translate-y-0.5 active:translate-y-0
             transition-[shadow,transform]"
                    >
                        {/* Gold side accent */}
                        <span
                            className="absolute inset-y-0 left-0 w-1 rounded-l-md
               bg-dorado/80 group-hover:bg-dorado"
                            aria-hidden
                        />

                        {/* Image */}
                        <div className="relative aspect-[4/5] w-3/4 mx-auto mb-4">
                            <Image
                                src={service.icon}
                                alt={service.name}
                                fill
                                sizes="(min-width:1024px) 25vw,
             (min-width:640px) 38vw,
             75vw"
                                className="rounded-xl object-cover"
                            />
                        </div>

                        {/* Content */}
                        <h2 className="font-playfair text-xl font-semibold mb-4 text-cocoa">
                            {service.name}
                        </h2>
                        <p className="text-sm leading-relaxed text-cocoa/70 mb-4 font-medium">
                            {service.description}
                        </p>
                        <ul className="list-disc space-y-1 text-sm text-cocoa flex-1 mb-4">
                            {service.resultado.split(".").slice(0, -1).map((text, i) => (
                                <li key={i}>
                                    {text}
                                </li>
                            ))}
                        </ul>
                        {/* Price/duration */}
                        <div className="mt-auto text-sm font-medium text-cocoa">
                            <span className="text-xl"><strong>{service.price} · {service.duration}</strong></span>
                        </div>

                        {/* Button */}
                        <Link
                            href={`/booking/date`}
                            onClick={() => handleSelect(service)}
                            className="mt-6 bg-dorado 
               text-sm text-cream 
               hover:shadow-lg focus-visible:ring-2
               focus-visible:ring-dorado/70 transition-shadow inline-flex items-center gap-2 bg-[#FF8A7B] hover:bg-[#ff7665] text-white font-semibold px-6 py-3 rounded-full whitespace-nowrap shadow-md"
                        >
                            Book now
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
