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

export default function LashNailServiceList() {
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubCategories = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${API_BASE_URL}/api/subcategories`);
                const result = await res.json();
                if (result.success && result.data) {
                    // Filter for "Lash, Brow & Nail Services" (ID: 69bde091dee73b0def25d6a3)
                    const filtered = result.data.filter((sub: any) => {
                        const cid = typeof sub.categoryId === 'object' ? sub.categoryId?._id : sub.categoryId;
                        return cid === '69bde091dee73b0def25d6a3';
                    });
                    setSubCategories(filtered);
                }
            } catch (err) {
                console.error("Lash & Nail Sub-Categories fetch failed", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSubCategories();
    }, []);

    const displayServices = subCategories.map((sub, i) => ({
        id: `0${i + 1}`.slice(-2),
        name: sub.name,
        description: sub.description,
        image: sub.cover_image ? `${API_BASE_URL}${sub.cover_image}` : "/saloon/assets/images/Lash, Brow & Nail Services/LashLamination.png",
        category: "Details"
    }));

    return (
        <section className="py-[70px] px-5 sm:px-14 max-w-[1280px] mx-auto min-h-[400px]">
            <ScrollReveal>
                <span className="text-[9px] tracking-[6px] text-gold uppercase mb-4 block">Our Menu</span>
                <h2 className="font-playfair text-[clamp(30px,3.6vw,50px)] font-normal leading-[1.12] mb-14 text-white">
                    Refined <em className="italic text-gold not-italic">Artistry</em>
                </h2>
            </ScrollReveal>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 opacity-30">
                    <div className="w-8 h-8 border-2 border-gold/10 border-t-gold animate-spin mb-4" />
                    <p className="text-[10px] uppercase tracking-[3px] italic">Perfecting the details...</p>
                </div>
            ) : subCategories.length === 0 ? (
                <ScrollReveal className="flex flex-col items-center justify-center py-24 border border-white/[0.03] bg-white/[0.01] rounded-lg">
                    <div className="text-gold/20 text-4xl mb-6">✧</div>
                    <p className="text-salon-gray font-light tracking-[2px] uppercase text-[11px] text-center max-w-md px-6">
                        We are currently curating new bespoke treatments for this section. Please check back soon for our latest artisan offerings.
                    </p>
                </ScrollReveal>
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
