import Image from "next/image";
import { CalendarCheck, Bed, TrendingUp, Quote } from "lucide-react";
import { AnimatedTestimonials } from "../ui/animated-testimonials";
import Stars from "../Stars";


const testimonials = [
    {
        quote: "Lo probé por eficiencia y la calidad técnica me sorprendió. Es mi 'reseteo' mensual para aguantar las largas horas de pantalla. Imprescindible para mi productividad.",
        name: "Javier G.",
        designation: "Fundador de Startup Tecnológica",
        src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        quote:
            "Más que un masaje, es una terapia que me desbloquea la mente. La claridad y energía que me da después de cada sesión son vitales para mi trabajo creativo.",
        name: "Sofía L.",
        designation: "Directora Creativa",
        src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        quote:
            "Increíble alivio para el dolor de espalda por estar sentado. El servicio es cómodo y la técnica, impecable. Ojalá hubiera llamado hace meses.",
        name: "Carlos M.",
        designation: "Consultor Financiero:",
        src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        quote:
            "Soy médico y puedo confirmar el nivel clínico de este servicio. El conocimiento de la anatomía es excelente. Es mi recuperación de confianza después de cada guardia.",
        name: "Dra. Isabel Peña",
        designation: "Médico de Familia",
        src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        quote:
            "Sin tiempo entre el trabajo y los niños, este servicio a domicilio es un salvavidas. Una hora de alivio en casa que me recarga de energía para poder con todo. Esencial.",
        name: "Marcela V.",
        designation: "Gerente de Proyectos",
        src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
];


export function TestimonialsSection() {
    return (
        <section className="bg-[#FFF8F2] md:py-22 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#275B59]">
                    Profesionales como tú en Tampa están diciendo
                </h2>
            </div>

            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md  sm:p-10 flex flex-col sm:flex-row gap-6 items-start border border-[#275B59]/20">

                <div className="text-left flex-1">
                    <AnimatedTestimonials testimonials={testimonials} />
                    <Stars size={20} className="mb-2" />
                </div>
            </div>
        </section>
    );
}