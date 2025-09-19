import { AnimatedTestimonials } from "../ui/animated-testimonials";
import Stars from "../Stars";

const testimonials = [
    {
        quote:
            "I sit for hours and had daily lower-back pain. After two sessions I felt a difference, and now I keep it every 3–4 weeks.",
        name: "Abram",
        designation: "Financial consultant",
        src: "/comentarios/Abram.jpg",
    }, {
        quote:
            "I booked it just to save time and was shocked how much better my back felt. Now I do it once a month and handle long computer days way better.",
        name: "Javier G.",
        designation: "Startup founder",
        src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        quote:
            "It’s not just a massage; I finish with a clear head. I get more done in the afternoon and sleep better that night.",
        name: "Sofía L.",
        designation: "Creative director",
        src: "/comentarios/sofia.jpg",
    },

    {
        quote:
            "I’m a physician and appreciate the clear explanations. Solid technique and careful hygiene. I recommend it to patients with neck tension.",
        name: "Ricardo",
        designation: "Family physician",
        src: "/comentarios/Ricardo.jpg",
    },
    {
        quote:
            "Between work and kids I’m always short on time. Having it at home saves me. One hour and my back feels new.",
        name: "Marcelo V.",
        designation: "Project manager",
        src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
];

export function TestimonialsSection() {
    return (
        <section className="bg-[#FFF8F2] md:py-22 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#275B59]">
                    What professionals like you in Tampa are saying
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
