"use client";

import React, { useState, useEffect } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface Category {
    _id: string;
    name: string;
    photo: string;
}

export default function LashNailHero() {
    const [category, setCategory] = useState<Category | null>(null);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/categories');
                const result = await res.json();
                if (result.success && result.data && result.data.length > 0) {
                    const found = result.data.find((c: any) => c.name.toLowerCase().includes('lash') || c.name.toLowerCase().includes('nail'));
                    if (found) setCategory(found);
                }
            } catch (err) {
                console.error("Lash & Nail Category fetch failed", err);
            }
        };
        fetchCategory();
    }, []);

    const heroImg = category?.photo ? `http://localhost:5000${category.photo}` : "/saloon/assets/images/nail-1.png";

    return (
        <section className="relative w-full h-[35vh] flex items-center justify-center bg-salon-bg2 overflow-hidden">
            <img
                src={heroImg}
                alt="Lash, Brow & Nail Services Background"
                className="absolute inset-0 w-full h-full object-cover object-[center_30%] filter brightness-[0.55] saturate-[1.1] animate-[heroZoom_15s_ease_infinite_alternate]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-[#141414]/95 z-[1]" />

            <ScrollReveal className="relative z-[2] text-center pt-[60px]">
                <span className="text-[9px] tracking-[6px] text-gold uppercase mb-4 block">Precision & Perfection</span>
                <h1 className="font-playfair text-[clamp(40px,6vw,70px)] font-normal leading-[1.1] text-white">
                    Details & <em className="italic text-gold not-italic">Finesse</em>
                </h1>
            </ScrollReveal>

            <style jsx global>{`
        @keyframes heroZoom {
          from { transform: scale(1); }
          to { transform: scale(1.05); }
        }
      `}</style>
        </section>
    );
}
