import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

const services = [
    {
        id: "01",
        category: "Hair",
        name: "Hair Services",
        description: "Precision cuts, bespoke color & luxurious styling by master artisans.",
        image: "/saloon/assets/images/Hair service-1.png",
        link: "/hair-services",
        delay: "",
    },
    {
        id: "02",
        category: "Skin",
        name: "Skin & Beauty Services",
        description: "Advanced facial rituals and premium skincare for a healthy, luminous glow.",
        image: "/saloon/assets/images/Skin and Beauty.png",
        link: "/skin-services",
        delay: "d1",
    },
    {
        id: "03",
        category: "Details",
        name: "Lash, Brow & Nail Services",
        description: "Impeccable manicures, pedicures, and expert lash & brow sculpting.",
        image: "/saloon/assets/images/nail-1.png",
        link: "/lash-nail-services",
        delay: "d2",
    },
    {
        id: "04",
        category: "Glam",
        name: "Makeup & Wellness",
        description: "Editorial glam, bridal elegance, and holistic wellness treatments.",
        image: "/saloon/assets/images/bridelmakeup.png",
        link: "/makeup-wellness",
        delay: "d3",
    },
];

export default function Services() {
    return (
        <section className="py-[108px] px-5 sm:px-14 max-w-[1440px] mx-auto overflow-hidden">
            <ScrollReveal className="flex flex-col sm:flex-row items-baseline sm:items-end justify-between mb-14 gap-8">
                <div>
                    <span className="text-[9px] tracking-[6px] text-gold uppercase mb-4 block">What We Offer</span>
                    <h2 className="font-playfair text-[clamp(30px,3.6vw,50px)] font-normal leading-[1.12] text-white">
                        Our Premium<br /><em className="italic text-gold not-italic">Services</em>
                    </h2>
                </div>
                <p className="max-w-[300px] text-[13px] text-salon-gray leading-[1.85] text-left sm:text-right">
                    Crafted for those who demand the very finest — each treatment a ritual, every visit an experience.
                </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {services.map((svc) => (
                    <ScrollReveal
                        key={svc.id}
                        delay={svc.delay}
                        className="group"
                    >
                        <Link href={svc.link} className="relative block overflow-hidden bg-[#181818] border border-white/5 cursor-pointer transition-all duration-[0.45s] cubic-bezier-[0.4,0,0.2,1] hover:border-gold/45 hover:-translate-y-[9px] hover:shadow-[0_24px_60px_rgba(0,0,0,0.55),0_0_0_1px_rgba(201,168,76,0.1)] no-underline">
                            <div className="w-full aspect-[3/4] relative overflow-hidden">
                                <img
                                    src={svc.image}
                                    alt={svc.name}
                                    className="w-full h-full object-cover object-top filter brightness-[0.85] saturate-[1.05] transition-all duration-[0.65s] cubic-bezier-[0.4,0,0.2,1] group-hover:scale-[1.09] group-hover:brightness-[1.05] group-hover:saturate-[1.15] block"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[28%] via-salon-bg/40 via-[60%] to-salon-bg/95" />

                                <span className="absolute top-3 left-3 z-[3] text-[7.5px] tracking-[3px] uppercase text-gold bg-salon-bg/75 backdrop-blur-md px-[10px] py-1 border border-gold/30">
                                    {svc.category}
                                </span>
                                <span className="absolute top-3 right-[13px] z-[3] font-playfair text-[11px] text-gold/32 italic">
                                    {svc.id}
                                </span>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-[16px] pb-[16px] z-[2]">
                                <h3 className="font-playfair text-base font-normal text-white leading-tight">
                                    {svc.name}
                                </h3>
                                <div className="max-h-0 overflow-hidden opacity-0 mt-0 transition-all duration-[0.45s] ease group-hover:max-h-[60px] group-hover:opacity-100 group-hover:mt-2">
                                    <p className="text-[11px] text-salon-white/45 leading-[1.65]">
                                        {svc.description}
                                    </p>
                                </div>
                                <div className="mt-6">
                                    <span className="group relative overflow-hidden font-dm-sans text-[9px] font-light tracking-[2.5px] uppercase py-[10px] px-[26px] border border-gold text-gold bg-transparent cursor-pointer transition-colors duration-[0.35s] hover:text-[#080808] inline-block">
                                        <span className="relative z-10">Book Now</span>
                                        <div className="absolute inset-0 bg-gold -translate-x-[101%] transition-transform duration-[0.38s] cubic-bezier-[0.77,0,0.18,1] group-hover:translate-x-0" />
                                    </span>
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold to-gold2 scale-x-0 origin-left transition-transform duration-500 cubic-bezier-[0.77,0,0.18,1] group-hover:scale-x-100" />
                        </Link>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    );
}
