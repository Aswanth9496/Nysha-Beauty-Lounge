"use client";

import { Service } from "@/types";
import ScrollReveal from "@/components/ui/ScrollReveal";

const makeupWellnessServices: Service[] = [
    {
        id: "01",
        category: "Makeup",
        name: "Bridal Makeup",
        description: "Experience breathtaking bridal transformations using camera-ready techniques that ensure your look stays flawless throughout your special day.",
        image: "/saloon/assets/images/make up & wellness/bridal_makeup.png",
    },
    {
        id: "02",
        category: "Makeup",
        name: "Party & Glamour",
        description: "Turn heads with editorial-inspired, high-impact makeup designed to highlight your unique facial anatomy and stand out in any crowd.",
        image: "/saloon/assets/images/make up & wellness/party_makeup.png",
    },
    {
        id: "03",
        category: "Wellness",
        name: "Relaxation Massage",
        description: "Melt away stress and tension with our restorative, full-body therapies that promote deep muscular relaxation and energetic balance.",
        image: "/saloon/assets/images/make up & wellness/relaxation_massage.png",
    },
    {
        id: "04",
        category: "Wellness",
        name: "Seasonal Wellness",
        description: "Our targeted mind-and-body treatments combining aromatherapy, pressure points, and rhythmic manipulation tailored to your current energy needs.",
        image: "/saloon/assets/images/make up & wellness/seasonal_wellness.png",
    },
];

export default function MakeupWellnessServiceList() {
    return (
        <section className="py-[70px] px-5 sm:px-14 max-w-[1280px] mx-auto">
            <ScrollReveal>
                <span className="text-[9px] tracking-[6px] text-gold uppercase mb-4 block">Our Menu</span>
                <h2 className="font-playfair text-[clamp(30px,3.6vw,50px)] font-normal leading-[1.12] mb-14 text-white">
                    Unveil Your <em className="italic text-gold not-italic">Elegance</em>
                </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {makeupWellnessServices.map((svc, i) => (
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
