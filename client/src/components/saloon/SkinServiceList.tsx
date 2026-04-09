"use client";

import React, { useState, useEffect } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { API_BASE_URL } from "@/lib/api/config";

interface SubCategory {
    _id: string;
    categoryId: string | { _id: string, name: string };
    name: string;
    description: string;
    cover_image: string;
}

const defaultSkinServices = [
    {
        id: "01",
        category: "Facial",
        name: "Advanced Facial",
        description: "Immersive facial rituals designed to cleanse, rejuvenate and restore your radiant complexion deeply.",
        image: "/saloon/assets/images/skin & Beauty care/facial.png",
    },
    {
        id: "02",
        category: "Waxing",
        name: "Body Waxing",
        description: "Gentle, precise hair removal using premium organic waxes that soothe as they smooth the skin.",
        image: "/saloon/assets/images/skin & Beauty care/body wax.png",
    },
    {
        id: "03",
        category: "Sculpting",
        name: "Eyebrow Sculpting",
        description: "Masterful shaping and tinting to perfectly frame your face and enhance your natural eye shape.",
        image: "/saloon/assets/images/skin & Beauty care/eyebrow.png",
    },
];

export default function SkinServiceList() {
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubCategories = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${API_BASE_URL}/api/subcategories`);
                const result = await res.json();
                if (result.success && result.data && result.data.length > 0) {
                    // Filter for "Skin & Beauty Services" (ID: 69bddfc1dee73b0def25d69e)
                    const filtered = result.data.filter((sub: any) => {
                        const cid = typeof sub.categoryId === 'object' ? sub.categoryId?._id : sub.categoryId;
                        return cid === '69bddfc1dee73b0def25d69e';
                    });
                    setSubCategories(filtered);
                }
            } catch (err) {
                console.error("Skin Sub-Categories fetch failed", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSubCategories();
    }, []);

    const displayServices = subCategories.length > 0
        ? subCategories.map((sub, i) => ({
            id: `0${i + 1}`.slice(-2),
            name: sub.name,
            description: sub.description,
            image: sub.cover_image ? `${API_BASE_URL}${sub.cover_image}` : "/saloon/assets/images/skin & Beauty care/facial.png",
            category: "Skin"
        }))
        : defaultSkinServices;

    return (
        <section className="py-[70px] px-5 sm:px-14 max-w-[1280px] mx-auto">
            <ScrollReveal>
                <span className="text-[9px] tracking-[6px] text-gold uppercase mb-4 block">Our Menu</span>
                <h2 className="font-playfair text-[clamp(30px,3.6vw,50px)] font-normal leading-[1.12] mb-14 text-white">
                    Advanced <em className="italic text-gold not-italic">Skincare</em>
                </h2>
            </ScrollReveal>

            {loading && subCategories.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 opacity-30">
                    <div className="w-8 h-8 border-2 border-gold/10 border-t-gold animate-spin mb-4" />
                    <p className="text-[10px] uppercase tracking-[3px] italic">Refreshing beauty rituals...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayServices.map((svc, i) => (
                        <ScrollReveal
                            key={svc.name}
                            delay={i % 3 === 0 ? "" : i % 3 === 1 ? "d1" as any : "d2" as any}
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
            )}
        </section>
    );
}
