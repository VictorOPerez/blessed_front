
import Image from "next/image";
import { User2, ShieldCheck, BadgeCheck, Shield } from "lucide-react";
import Link from "next/link";
import { BookingCTA } from "../BookingCTA";
import { Button } from "../ui/moving-border";


const icono = [
    { Icon: User2, text: "Terapeuta\nLicenciado #MA XXXXX" },
    { Icon: Shield, text: "Seguro de\nResponsabilidad Civil" },
    { Icon: BadgeCheck, text: "+4 Años de\nExperiencia Clínica" },
    { Icon: ShieldCheck, text: "Protocolo Higiene\nGarantizado" },
]

export default function Hero() {
    return (
        <section className="relative bg-[#FAF6F1] h-[90vh]">
            {/* decorative bar */}

            <div className="container md:px-6 mx-auto grid lg:grid-cols-5 items-start md:items-center relative justify-center gap-12 h-full">
                {/* Illustration */}
                <div className=" md:block absolute md:relative h-[90%]  w-full lg:col-span-2 z-20  ">
                    <div className=" block md:hidden absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b  from-[#FAF6F1] via-[#FAF6F1]/95 to-transparent pointer-events-none z-10
    "
                    />
                    <Image
                        src="/img/hero.png" // sustituye con la ruta real de tu SVG/PNG
                        alt="Masajista aplicando terapia de espalda en un ambiente hogareño minimalista"
                        fill
                        className="object-contain object-start   "
                        priority
                    />
                </div>
                {/* Copy block */}
                <div className=" flex flex-col md:gap-0 gap-6  md:space-y-6 lg:pr-10 lg:col-span-3 z-21 pt-7">
                    <h1 className="text-3xl md:text-5xl px-6 md:px-0 leading-tight font-extrabold text-[#355C57]">
                        Masajes Terapéuticos<br />a Domicilio en Tampa
                    </h1>

                    <p className="text-lg md:text-xl text-[#355C57]/80 max-w-lg px-6 md:px-0">
                        Recupera tu rendimiento, alivia el dolor crónico y optimiza tu activo más valioso: tu tiempo.
                    </p>

                    {/* <Button
                        borderRadius="1.75rem"
                        className="text-base w-max "
                    >Agendar mi Sesión de Alivio</Button> */}
                    <Link href={"/booking"} className=" text-base bg-[#FF8F7A]  w-max p-3 rounded-full text-white hidden md:block">
                        Agendar mi Sesión de Alivio
                    </Link>

                    {/* Trust badges */}
                    <ul className="absolute  -bottom-2 md:mt-10 grid grid-cols-2 md:grid-cols-4  text-sm font-medium text-[#355C57] md:relative ">
                        {icono.map(({ Icon, text }) => (
                            <li key={text} className="flex items-center gap-2 group justify-center  px-3 py-1 rounded-2xl ">
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
