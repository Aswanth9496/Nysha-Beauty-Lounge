"use client";

import { Service } from "@/types";
import ScrollReveal from "@/components/ui/ScrollReveal";

const lashNailServices: Service[] = [
    {
        id: "01",
        category: "Lash",
        name: "Lash Lamination",
        description: "Elevate your natural lashes with a lifting treatment that creates striking curl and vivid volume, lasting weeks.",
        image: "/saloon/assets/images/Lash, Brow & Nail Services/LashLamination.png",
    },
    {
        id: "02",
        category: "Lash",
        name: "Eyelash Extensions",
        description: "Meticulously applied individual or volume extensions tailored to your eye shape for dramatic, flawless flutter.",
        image: "/saloon/assets/images/Lash, Brow & Nail Services/eyelash_extensions.png",
    },
    {
        id: "03",
        category: "Brow",
        name: "Microblading",
        description: "Semi-permanent eyebrow styling creating hyper-realistic, hair-like strokes for naturally dense and perfectly arched brows.",
        image: "/saloon/assets/images/Lash, Brow & Nail Services/Microblading.png",
    },
    {
        id: "04",
        category: "Brow",
        name: "Nano Blading",
        description: "The next evolution in brow artistry. Using ultra-fine nano needles for unparalleled precision and a completely undetectable finish.",
        image: "/saloon/assets/images/Lash, Brow & Nail Services/Nano blading.png",
    },
    {
        id: "05",
        category: "Lip",
        name: "Lip Tinting",
        description: "Enhance your natural lip color and shape with a semi-permanent blush effect that yields a perfectly soft, bitten look.",
        image: "/saloon/assets/images/Lash, Brow & Nail Services/Lip Tinting.png",
    },
    {
        id: "06",
        category: "Nail",
        name: "Luxurious Manicure",
        description: "A complete therapeutic ritual for your hands featuring premium polishing, cuticle care, and deep hydration.",
        image: "/saloon/assets/images/Lash, Brow & Nail Services/Manicure.png",
    },
    {
        id: "07",
        category: "Nail",
        name: "Bespoke Pedicure",
        description: "Revitalize your feet with essential oils, thorough exfoliation, and expert toenail sculpting for lasting elegance.",
        image: "/saloon/assets/images/Lash, Brow & Nail Services/pedicure.png",
    },
];

export default function LashNailServiceList() {
    return (
        <section className="py-[70px] px-5 sm:px-14 max-w-[1280px] mx-auto">
            <ScrollReveal>
                <span className="text-[9px] tracking-[6px] text-gold uppercase mb-4 block">Our Menu</span>
                <h2 className="font-playfair text-[clamp(30px,3.6vw,50px)] font-normal leading-[1.12] mb-14 text-white">
                    Refined <em className="italic text-gold not-italic">Artistry</em>
                </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lashNailServices.map((svc, i) => (
                    <ScrollReveal
                        key={svc.name}
                        delay={i % 3 === 0 ? "" : i % 3 === 1 ? "d1" : "d2"}
                        className="group flex flex-col bg-white/[0.02] border border-white/[0.04] rounded-[4px] overflow-hidden transition-all duration-400 hover:translate-y-[-5px] hover:border-gold/30 hover:bg-white/[0.03] hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                    >
                        <div className="w-full aspect-[16/10] overflow-hidden relative">
                            <img
                                src={svc.image}
                                alt={svc.name}
                                className="w-full h-full object-cover object-center filter brightness-[0.85] saturate-[1.1] transition-transform duration-600 ease group-hover:scale-[1.07]"
                            />
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <h3 className="font-playfair text-[22px] font-normal text-white mb-2">
                                {svc.name}
                            </h3>
                            <p className="text-[12px] text-salon-gray leading-[1.6] mb-0 flex-1">
                                {svc.description}
                            </p>
                            <div className="mt-6">
                                <a
                                    href="#book"
                                    className="group relative overflow-hidden font-dm-sans text-[9px] font-light tracking-[2.5px] uppercase py-[10px] px-[26px] border border-gold text-gold bg-transparent cursor-pointer transition-colors duration-[0.35s] hover:text-[#080808] inline-block no-underline"
                                >
                                    <span className="relative z-10">Book Now</span>
                                    <div className="absolute inset-0 bg-gold -translate-x-[101%] transition-transform duration-[0.38s] cubic-bezier-[0.77,0,0.18,1] group-hover:translate-x-0" />
                                </a>
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    );
}
