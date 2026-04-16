"use client";

import React, { useState, useEffect } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface HeaderContent {
    shop_image_1?: string;
    shop_image_2?: string;
}



export default function About() {
    const [header, setHeader] = useState<HeaderContent | null>(null);

    useEffect(() => {
        const fetchCMS = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/header`);
                const result = await res.json();
                if (result.success && result.data && result.data.length > 0) {
                    setHeader(result.data[0]);
                }
            } catch (err) {
                console.error("About CMS load failed", err);
            }
        };
        fetchCMS();
    }, []);

    const img1 = header?.shop_image_1 
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${header.shop_image_1}` 
        : "/saloon/assets/images/salon_interior.png";
        
    const img2 = header?.shop_image_2 
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${header.shop_image_2}` 
        : "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&q=80&w=500&h=667";

    return (
        <section className="py-27 px-5 sm:px-14 bg-salon-bg2 border-t border-salon-border">
            <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-22.5 items-center">

                {/* Left Column - Images */}
                <ScrollReveal>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 relative">
                        <div className="group relative overflow-hidden aspect-[3/4] mt-11 border border-gold/12">
                            <img
                                src={img1}
                                alt="Shop Gallery 1"
                                className="w-full h-full object-cover object-top filter brightness-90 saturate-105 transition-all duration-500 hover:scale-104 hover:brightness-105 hover:saturate-110 block"
                            />
                        </div>
                        <div className="group relative overflow-hidden aspect-[3/4] mb-11 border border-gold/12 hidden sm:block">
                            <img
                                src={img2}
                                alt="Shop Gallery 2"
                                className="w-full h-full object-cover object-top filter brightness-90 saturate-105 transition-all duration-500 hover:scale-104 hover:brightness-105 hover:saturate-110 block"
                            />
                            <div className="absolute -bottom-4 -right-4 w-22 h-22 bg-gold flex flex-col items-center justify-center z-[3] shadow-lg">
                                <span className="font-playfair text-[22px] text-[#080808] font-normal leading-none">5★</span>
                                <span className="text-[7px] tracking-[2px] text-[#080808]/62 uppercase text-center mt-0.75 leading-tight">Dubai<br />Luxury</span>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Right Column - Text Content */}
                <div className="flex flex-col">
                    <ScrollReveal>
                        <span className="text-[9px] tracking-[6px] text-gold uppercase mb-3 block">Our Story</span>
                    </ScrollReveal>

                    <ScrollReveal delay="d1">
                        <h2 className="font-playfair text-[clamp(30px,3.6vw,50px)] font-normal leading-[1.12] mb-7 text-white">
                            About <em className="italic text-gold not-italic">Nysha</em><br />Beauty Lounge
                        </h2>
                    </ScrollReveal>

                    <ScrollReveal delay="d2">
                        <p className="text-[13px] text-salon-gray leading-[1.9] mb-4.5">
                            Our vision is to redefine accessible luxury in the beauty industry — delivering a flawless, five-star experience where sophistication meets warmth, making every client feel like royalty. Walk in. Glow out.
                        </p>
                        <p className="text-[13px] text-salon-gray leading-[1.9] mb-4.5">
                            We provide our guests with a haven of relaxation and reinvention, using only the finest products and techniques, delivered by a team passionate about their craft.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal delay="d3" className="mt-4">
                        <div className="py-3.5 border-b border-white/5 grid grid-cols-[26px_1fr] gap-3.5 items-start">
                            <span className="font-playfair text-[12px] text-gold/45 italic mt-0.5">01</span>
                            <div className="text-[12px] text-salon-gray leading-[1.7]">
                                <strong className="text-white font-light block mb-0.5">Excellence</strong>
                                We pursue perfection in every detail, every time.
                            </div>
                        </div>
                        <div className="py-3.5 border-b border-white/5 grid grid-cols-[26px_1fr] gap-3.5 items-start">
                            <span className="font-playfair text-[12px] text-gold/45 italic mt-0.5">02</span>
                            <div className="text-[12px] text-salon-gray leading-[1.7]">
                                <strong className="text-white font-light block mb-0.5">Innovation</strong>
                                We lead trends, never follow them.
                            </div>
                        </div>
                        <div className="py-3.5 border-b border-white/5 grid grid-cols-[26px_1fr] gap-3.5 items-start">
                            <span className="font-playfair text-[12px] text-gold/45 italic mt-0.5">03</span>
                            <div className="text-[12px] text-salon-gray leading-[1.7]">
                                <strong className="text-white font-light block mb-0.5">Empowerment</strong>
                                We believe beauty is the ultimate confidence.
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
