"use client";

import { Service } from "@/types";
import ScrollReveal from "@/components/ui/ScrollReveal";

const hairServices: Service[] = [
    {
        id: "01",
        category: "Hair",
        name: "Bespoke Hair Cut",
        description: "Experience absolute precision. Our master stylists craft a custom silhouette tailored entirely to your face shape, lifestyle, and hair texture.",
        image: "/saloon/assets/images/hair service/hair cut.png",
    },
    {
        id: "02",
        category: "Hair",
        name: "Balayage & Colouring",
        description: "Transform your look with our premium vivid pigments. Whether it's a seamless sun-kissed balayage, dimensional highlights, or full color correction.",
        image: "/saloon/assets/images/hair service/hair colouring.png",
    },
    {
        id: "03",
        category: "Hair",
        name: "Luxury Extensions",
        description: "Achieve the cascading length and voluminous density you've always desired. We exclusively use 100% Remy human hair applied with gentle, invisible techniques.",
        image: "/saloon/assets/images/hair service/hair extensions.png",
    },
    {
        id: "04",
        category: "Hair",
        name: "Keratin Smoothing",
        description: "Banish frizz and restore your hair's natural vitality. Our advanced Keratin formula deeply penetrates the cuticle to deliver flawlessly smooth, glossy hair.",
        image: "/saloon/assets/images/hair service/keratin treatment.png",
    },
    {
        id: "05",
        category: "Hair",
        name: "Restorative Protein",
        description: "Rescue damaged, chemically-treated, or brittle hair. Our intensely nourishing protein complexes rebuild hair from within, locking in hydration.",
        image: "/saloon/assets/images/hair service/protein tratement.png",
    },
    {
        id: "06",
        category: "Hair",
        name: "Hair Botox",
        description: "The ultimate anti-aging treatment for your hair. A brilliant conditioning therapy packed with essential oils, vitamins, and collagen for mirror shine.",
        image: "/saloon/assets/images/hair service/hair botox.png",
    },
    {
        id: "07",
        category: "Hair",
        name: "Signature Scalp Ritual",
        description: "Great hair begins at the root. A luxurious detoxifying scrub combined with a deep moisture masque and Shiatsu head massage.",
        image: "/saloon/assets/images/hair service/hair treatment.png",
    },
];

export default function HairServiceList() {
    return (
        <section className="py-[70px] px-5 sm:px-14 max-w-[1280px] mx-auto">
            <ScrollReveal>
                <span className="text-[9px] tracking-[6px] text-gold uppercase mb-4 block">Our Menu</span>
                <h2 className="font-playfair text-[clamp(30px,3.6vw,50px)] font-normal leading-[1.12] mb-14 text-white">
                    Transformative <em className="italic text-gold not-italic">Perfection</em>
                </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hairServices.map((svc, i) => (
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
