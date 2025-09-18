
import Image from "next/image";
import { User2, ShieldCheck, BadgeCheck, Shield } from "lucide-react";
import Link from "next/link";


const icono = [
    // { Icon: User2, text: "Licensed Therapist\n#MA XXXXX" },
    { Icon: Shield, text: "Fully Insured\nfor Your Peace of Mind" },
    { Icon: BadgeCheck, text: "4+ Years of\nClinical Experience" },
    { Icon: ShieldCheck, text: "Strict Hygiene\nProtocols" },
]


export default function Hero() {
    return (
        <section className="relative bg-[#FAF6F1] h-[90vh]">
            {/* decorative bar */}

            <div className="container md:px-6 mx-auto grid lg:grid-cols-5 items-start md:items-center relative justify-center gap-12 h-full">
                {/* Illustration */}
                <div className=" md:block absolute md:relative h-[85%]  w-full lg:col-span-2 z-20  overflow-hidden ">
                    <div className=" block md:hidden absolute inset-x-0  h-[20%] bg-gradient-to-b  from-[#FAF6F1] via-[#FAF6F1]/95 to-transparent pointer-events-none z-10 top-[163px]
    "
                    />
                    <Image
                        src="/img/hero1.jpg" // sustituye con la ruta real de tu SVG/PNG
                        alt="Masajista aplicando terapia de espalda en un ambiente hogareño minimalista"
                        fill
                        className="object-contain object-start translate-y-38 md:translate-y-0  "
                        priority
                    />
                </div>
                {/* Copy block */}
                <div className=" flex flex-col md:gap-0 gap-6  md:space-y-6 lg:pr-10 lg:col-span-3 z-21 pt-7">
                    <h1 className="text-3xl md:text-5xl px-6 md:px-0 leading-tight font-extrabold text-[#355C57]">
                        Therapeutic Massages<br />At Home in Tampa
                    </h1>

                    <p className="text-lg md:text-xl text-[#355C57]/80 max-w-lg px-6 md:px-0">
                        Restore your performance, relieve chronic pain, and optimize your most valuable asset: your time.
                    </p>

                    {/* <Button
                        borderRadius="1.75rem"
                        className="text-base w-max "
                    >Agendar mi Sesión de Alivio</Button> */}
                    <Link href={"/booking"} className=" text-base bg-[#FF8F7A]  w-max p-3 rounded-full text-white hidden md:block">
                        Book My Relief Session
                    </Link>

                    {/* Trust badges */}
                    <ul className=" absolute -bottom-8 md:relative
  grid grid-cols-2 md:grid-cols-3 gap-1 auto-rows-fr text-sm font-medium text-[#355C57] ">
                        {icono.map(({ Icon, text }) => (
                            <li key={text} className=" h-full
        grid grid-cols-[40px_1fr] gap-2 items-start /* icono arriba, texto arriba */
        px-3 py-1 rounded-2xl ">
                                <Icon className="w-10 h-10 bg-[#FF8C7C] md:bg-transparent text-white rounded-full p-1 md:rounded-none md:p-0 md:text-[#FF8C7C] " strokeWidth={1.5} />
                                <span className="whitespace-pre-line">
                                    {text}



                                </span>
                            </li>
                        ))}
                    </ul>
                </div>


            </div>
        </section>
    );
}
