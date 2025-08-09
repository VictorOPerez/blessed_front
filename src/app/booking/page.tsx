'use client';
import { useRouter } from 'next/navigation';
import { useBookingStore } from "@/stores/bookingStore";
import Link from 'next/link';
import Image from 'next/image';

interface Service {
    id: string;
    name: string;
    description: string;
    duration: string;
    resultado: string,
    price: string;
    icon: string; // SVG path or emoji placeholder
}

const services: Service[] = [
    {
        id: 'deep-tissue',
        name: 'Masaje de Tejido Profundo',
        description: 'Esta no es una simple relajación; es una intervención precisa para desmantelar la tensión crónica acumulada por largas horas de trabajo. Nos enfocamos en liberar los nudos y las adherencias en las capas más profundas del músculo, restaurando tu movilidad y aliviando el dolor persistente',
        resultado: "Alivio efectivo del tech-neck y el dolor lumbar. Mejora notable de la postura y la flexibilidad.Liberación de la tensión que causa dolores de cabeza.",
        duration: "60 min",
        price: "$90",
        icon: '/img/1.png'
    },
    {
        id: 'swedish',
        name: 'Masaje Sueco',
        description: 'Diseñado para mentes sobrecargadas que necesitan una pausa estratégica. A través de maniobras fluidas y rítmicas, calmamos el sistema nervioso, reducimos los niveles de cortisol (la hormona del estrés) y promovemos un estado de profunda calma mental, esencial para la toma de decisiones claras',
        resultado: "Disminución de la sensación de ansiedad y estrés. Mejora de la calidad del sueño y el descanso reparador.Aumento de la claridad mental y la concentración.",
        duration: "60 min",
        price: "$80",
        icon: '/img/2.png'
    },
    {
        id: 'hot-stone',
        name: ' Masaje con Piedras Calientes',
        description: 'Maximizamos la eficiencia de tu sesión. El calor terapéutico de las piedras de basalto penetra en los músculos, permitiendo una liberación de la tensión más rápida y profunda. Es la opción inteligente para quienes buscan el máximo impacto en el menor tiempo posible',
        resultado: `"Derrite" la tensión muscular más resistente. Acelera la circulación y el proceso de recuperación. Proporciona una sensación de confort y bienestar total.`,
        duration: "60 min",
        price: "$90",
        icon: '/img/3.png'
    },
    {
        id: 'cupping',
        name: 'Terapia de Ventosas (Cupping)',
        description: 'Una técnica avanzada para atacar los nudos más rebeldes y las zonas de dolor crónico. Mediante la succión, creamos un efecto de descompresión que levanta el tejido, libera adherencias, aumenta el flujo sanguíneo y promueve una curación más rápida del área afectada',
        resultado: `Alivio potente para el dolor localizado y persistente. Mejora significativa del rango de movimiento. Estimulación de la circulación para una recuperación óptima.`,
        duration: "60 min",
        price: "$90",
        icon: '/img/4.png'
    },
    {
        id: 'foot',
        name: 'Masaje de Pies ',
        description: 'Tus pies son el mapa de tu cuerpo. Este masaje no solo alivia la fatiga local, sino que estimula puntos reflejos clave que se conectan con todo tu organismo. Es un tratamiento increíblemente efectivo para revitalizarte después de un largo viaje o un día agotador',
        resultado: `Alivio inmediato de la pesadez y el cansancio en las piernas. Sensación de energía renovada en todo el cuerpo. Una forma rápida de reequilibrar y "aterrizar" tu sistema.`,
        duration: "60 min",
        price: "$70",
        icon: '/img/5.png'
    }
];


export default function BookingHome() {
    const router = useRouter();
    const setService = useBookingStore((state) => state.setService);
    const setStep = useBookingStore((state) => state.setCurrentStep);

    const handleSelect = (service: typeof services[0]) => {
        setService(service);
        setStep(2); // ✅ actualiza el paso actual
        router.push("/booking/date");
    };


    return (
        <section className="mx-auto max-w-6xl px-4  text-cocoa py-5 mb-10">
            <h1 className="font-playfair text-4xl font-bold text-center mb-6">Our Therapeutic Services</h1>
            <p className="mx-auto max-w-xl text-center mb-12 text-lg text-cocoa/80">
                Every session includes a brief mobility assessment and is delivered in the comfort of your
                home or office.
            </p>

            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                    <li
                        key={service.id}
                        className="group relative border-spa bg-[#F8F5F0] flex flex-col rounded-xl bg-cream-tint
             border border-cocoa/10 p-6 shadow-sm
             hover:shadow-md hover:shadow-cocoa/10
             hover:-translate-y-0.5 active:translate-y-0
             transition-[shadow,transform]"   /* smoother */
                    >
                        {/* Acento lateral dorado */}
                        <span
                            className="absolute inset-y-0 left-0 w-1 rounded-l-md
               bg-dorado/80 group-hover:bg-dorado"
                            aria-hidden
                        />

                        {/* Imagen */}
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

                        {/* Contenido */}
                        <h2 className="font-playfair text-xl font-semibold mb-4  text-cocoa">
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
                        {/* Precio/duración */}
                        <div className="mt-auto text-sm font-medium text-cocoa">

                            <span className=" text-xl"><strong>{service.price}  / {service.duration} </strong></span>
                        </div>

                        {/* Botón */}
                        <Link
                            href={`/booking/date`}
                            onClick={() => handleSelect(service)}
                            className="mt-6  bg-dorado 
               text-sm  text-cream 
               hover:shadow-lg focus-visible:ring-2
               focus-visible:ring-dorado/70 transition-shadow inline-flex items-center gap-2 bg-[#FF8A7B] hover:bg-[#ff7665]  text-white font-semibold px-6 py-3 rounded-full whitespace-nowrap shadow-md"
                        >
                            Book now
                        </Link>
                    </li>

                ))}
            </ul>
        </section>
    );
}
