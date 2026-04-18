"use client";

import React, { useState, useEffect } from "react";

import ScrollReveal from "@/components/ui/ScrollReveal";

interface Category {
    _id: string;
    name: string;
    description: string;
    photo: string;
}

const defaultServices = [
    {
        id: "01",
        category: "Hair",
        name: "Hair Services",
        description: "Precision cuts, bespoke color & luxurious styling by master artisans.",
        image: "/saloon/assets/images/Hair service-1.png",
        link: "/services?category=hair-services",
        transitionDelay: "0s",
    },
    {
        id: "02",
        category: "Skin",
        name: "Skin & Beauty Services",
        description: "Advanced facial rituals and premium skincare for a healthy, luminous glow.",
        image: "/saloon/assets/images/Skin and Beauty.png",
        link: "/services?category=skin-beauty-services",
        transitionDelay: "0.15s",
    },
    {
        id: "03",
        category: "Details",
        name: "Lash, Brow & Nail Services",
        description: "Impeccable manicures, pedicures, and expert lash & brow sculpting.",
        image: "/saloon/assets/images/nail-1.png",
        link: "/services?category=lash-brow-nail-services",
        transitionDelay: "0.3s",
    },
    {
        id: "04",
        category: "Glam",
        name: "Makeup & Wellness",
        description: "Editorial glam, bridal elegance, and holistic wellness treatments.",
        image: "/saloon/assets/images/bridelmakeup.png",
        link: "/services?category=makeup-wellness",
        transitionDelay: "0.45s",
    },
];

const slugify = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
};

const mapLabel = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('hair')) return 'Hair';
    if (n.includes('skin')) return 'Skin';
    if (n.includes('lash') || n.includes('nail')) return 'Details';
    if (n.includes('makeup') || n.includes('wellness')) return 'Glam';
    return name.split(' ')[0] || 'Salon';
};

export default function Services() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`);
                const result = await res.json();
                if (result.success && result.data && result.data.length > 0) {
                    setCategories(result.data);
                }
            } catch (err) {
                console.error("Categories fetch failed", err);
            }
        };
        fetchCategories();
    }, []);

    const displayServices = categories.length > 0
        ? categories.map((cat, idx) => ({
            id: `0${idx + 1}`.slice(-2),
            category: mapLabel(cat.name),
            name: cat.name,
            description: cat.description,
            image: cat.photo.startsWith('http') ? cat.photo : `${process.env.NEXT_PUBLIC_API_BASE_URL}${cat.photo}`,
            link: `/services?category=${slugify(cat.name)}`,
            transitionDelay: `${(idx % 4) * 0.15}s`,
        }))
        : defaultServices;

    return (
        <section className="py-20 sm:py-[108px] px-5 sm:px-14 max-w-[1440px] mx-auto overflow-hidden">
            <ScrollReveal className="flex flex-col sm:flex-row items-baseline sm:items-end justify-between mb-12 sm:mb-14 gap-6 sm:gap-8">
                <div>
                    <span className="text-[9px] tracking-[5px] sm:tracking-[6px] text-gold uppercase mb-3 sm:mb-4 block">What We Offer</span>
                    <h2 className="font-playfair text-[32px] sm:text-[clamp(30px,3.6vw,50px)] font-normal leading-[1.12] text-white">
                        Our Premium<br /><em className="italic text-gold not-italic">Services</em>
                    </h2>
                </div>
                <p className="max-w-[340px] text-[12px] sm:text-[13px] text-salon-gray leading-[1.8] sm:leading-[1.85] text-left sm:text-right">
                    Crafted for those who demand the very finest — each treatment a ritual, every visit an experience.
                </p>
            </ScrollReveal>

            {/* Mobile Carousel / Desktop Grid */}
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-10 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-3.5 no-scrollbar scroll-smooth">
                {displayServices.map((svc) => (
                    <ScrollReveal
                        key={svc.id}
                        style={{ transitionDelay: svc.transitionDelay }}
                        className="group relative h-full flex-shrink-0 w-[82vw] sm:w-auto snap-center"
                    >
                        <div className="relative block h-full overflow-hidden bg-[#181818] border border-white/5 transition-all duration-[0.45s] cubic-bezier-[0.4,0,0.2,1] hover:border-gold/45 sm:hover:-translate-y-[9px] sm:hover:shadow-[0_24px_60px_rgba(0,0,0,0.55),0_0_0_1px_rgba(201,168,76,0.1)]">
                            <a 
                                href="https://www.fresha.com/a/nysha-beauty-lounge-dubai-3654-j5p-dubai-jvc-25deg0332-7-n-55deg1219-6-e-dubai-htjn822h/all-offer?menu=true&share=true&pId=2805835" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute inset-0 z-[1] cursor-pointer" 
                                aria-label={`Book ${svc.name}`} 
                            />

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

                            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-[16px] pb-6 sm:pb-[16px] z-[2] pointer-events-none">
                                <h3 className="font-playfair text-xl sm:text-base font-normal text-white leading-tight">
                                    {svc.name}
                                </h3>
                                <div className="max-h-[60px] sm:max-h-0 overflow-hidden opacity-100 sm:opacity-0 mt-2 sm:mt-0 transition-all duration-[0.45s] ease group-hover:max-h-[60px] group-hover:opacity-100 group-hover:mt-2">
                                    <p className="text-[11px] text-salon-white/45 leading-[1.65]">
                                        {svc.description}
                                    </p>
                                </div>
                                <div className="mt-6">
                                    <div className="group/btn relative overflow-hidden font-dm-sans text-[9px] font-light tracking-[2.5px] uppercase py-[10px] px-[26px] border border-gold text-gold bg-transparent transition-colors duration-[0.35s] group-hover:text-black group-hover/btn:text-black inline-block">
                                        <span className="relative z-10 font-medium">Book Now</span>
                                        <div className="absolute inset-0 bg-gold -translate-x-[101%] transition-transform duration-[0.38s] cubic-bezier-[0.77,0,0.18,1] group-hover/btn:translate-x-0 group-hover:translate-x-0" />
                                    </div>
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold to-gold2 scale-x-0 origin-left transition-transform duration-500 cubic-bezier-[0.77,0,0.18,1] group-hover:scale-x-100" />
                        </div>
                    </ScrollReveal>
                ))}
            </div>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </section>
    );
}
