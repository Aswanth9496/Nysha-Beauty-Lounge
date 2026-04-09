"use client";

import React, { useState, useEffect } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { API_BASE_URL } from "@/lib/api/config";

interface Category {
    _id: string;
    name: string;
    photo: string;
}

export default function HairHero() {
    const [category, setCategory] = useState<Category | null>(null);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/categories`);
                const result = await res.json();
                if (result.success && result.data && result.data.length > 0) {
                    const found = result.data.find((c: any) => c.name.toLowerCase().includes('hair'));
                    if (found) setCategory(found);
                }
            } catch (err) {
                console.error("Hair Category fetch failed", err);
            }
        };
        fetchCategory();
    }, []);

    const heroImg = category?.photo ? `${API_BASE_URL}${category.photo}` : "/saloon/assets/images/Hair service-1.png";

    return (
        <section className="relative w-full h-[35vh] flex items-center justify-center bg-salon-bg2 overflow-hidden">
            <img
                src={heroImg}
                alt="Hair Services Background"
                className="absolute inset-0 w-full h-full object-cover object-[center_30%] filter brightness-[0.55] saturate-[1.1] animate-[heroZoom_15s_ease_infinite_alternate]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-[#141414]/95 z-[1]" />

            <ScrollReveal className="relative z-[2] text-center pt-[60px]">
                <span className="text-[9px] tracking-[6px] text-gold uppercase mb-4 block">Luxury Treatments</span>
                <h1 className="font-playfair text-[clamp(40px,6vw,70px)] font-normal leading-[1.1] text-white">
                    Hair <em className="italic text-gold not-italic">Services</em>
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
