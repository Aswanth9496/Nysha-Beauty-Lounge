"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-salon-bg text-salon-white selection:bg-gold selection:text-salon-bg">
            <CustomCursor />
            <Header />

            {/* Hero Section */}
            <section className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-[url('/saloon/assets/images/salon_interior.png')] bg-cover bg-center brightness-[0.3] scale-105" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-salon-bg" />
                
                <ScrollReveal className="relative z-10 text-center px-6">
                    <span className="text-[10px] tracking-[6px] text-gold uppercase mb-4 block">Connect With Us</span>
                    <h1 className="font-playfair text-[40px] sm:text-[clamp(45px,6vw,85px)] font-normal leading-tight text-white">
                        Your Aesthetic Journey <br /> Begins Here
                    </h1>
                </ScrollReveal>
            </section>

            {/* Contact Grid */}
            <section className="py-20 sm:py-32 px-6 sm:px-14 max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    
                    {/* Left Side: Contact Form */}
                    <ScrollReveal className="relative group">
                        <div className="relative h-full min-h-[550px] flex flex-col items-center justify-center text-center p-10 border border-gold/15 bg-[#0a0a0a] overflow-hidden">
                            {/* Background Image with subtle zoom & luxury filter */}
                            <div className="absolute inset-0 z-0">
                                <img 
                                    src="/saloon/assets/images/model_female_1.png" 
                                    alt="Beauty & Elegance" 
                                    className="w-full h-full object-cover opacity-25 grayscale group-hover:grayscale-0 transition-all duration-[2000ms] group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-salon-bg via-transparent to-salon-bg" />
                                <div className="absolute inset-0 bg-gold/5" />
                            </div>

                            {/* Quote Content */}
                            <div className="relative z-10 max-w-[420px]">
                                <span className="text-gold text-5xl mb-8 block font-playfair opacity-30 animate-pulse">"</span>
                                <h2 className="font-playfair text-[32px] sm:text-[40px] text-white leading-tight mb-8">
                                    Beauty begins the moment you decide to be <span className="text-gold">yourself.</span>
                                </h2>
                                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mb-8" />
                                <p className="text-[10px] tracking-[5px] uppercase text-gold/60 font-medium">
                                    Coco Chanel
                                </p>
                            </div>

                            {/* Decorative Corners */}
                            <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-gold/20" />
                            <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-gold/20" />
                        </div>
                    </ScrollReveal>

                    {/* Right Side: Contact Info & Map */}
                    <ScrollReveal className="space-y-16">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <span className="text-gold text-2xl">✧</span>
                                <h3 className="text-[10px] uppercase tracking-[3px] font-bold">Lounge Location</h3>
                                <p className="text-salon-gray text-[13px] leading-relaxed italic opacity-70">
                                    B-103, Binghatti Gate, <br />
                                    Jumeirah Village Circle (JVC), <br />
                                    Dubai, UAE
                                </p>
                            </div>
                            <div className="space-y-4">
                                <span className="text-gold text-2xl">✧</span>
                                <h3 className="text-[10px] uppercase tracking-[3px] font-bold">Operating Hours</h3>
                                <p className="text-salon-gray text-[13px] leading-relaxed italic opacity-70">
                                    Monday – Sunday <br />
                                    10:00 AM – 10:00 PM <br />
                                    <span className="text-gold/40 text-[11px]">Open 7 days a week</span>
                                </p>
                            </div>
                            <div className="space-y-4">
                                <span className="text-gold text-2xl">✧</span>
                                <h3 className="text-[10px] uppercase tracking-[3px] font-bold">Direct Contact</h3>
                                <p className="text-salon-gray text-[13px] leading-relaxed italic opacity-70">
                                    +971 4 570 9468 <br />
                                    hello@nyshabeauty.ae
                                </p>
                            </div>
                            <div className="space-y-4">
                                <span className="text-gold text-2xl">✧</span>
                                <h3 className="text-[10px] uppercase tracking-[3px] font-bold">Social Connection</h3>
                                <div className="flex flex-col gap-2.5">
                                    <a href="https://www.instagram.com/nysha_beauty_lounge?igsh=MWFqMGJ1dGZibXg2MA%3D%3D" target="_blank" rel="noopener noreferrer" className="text-salon-gray hover:text-gold transition-colors text-[13px] italic opacity-70 no-underline">
                                        Instagram: @nysha_beauty_lounge
                                    </a>
                                    <a href="https://www.facebook.com/share/18DcSzK2VK/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-salon-gray hover:text-gold transition-colors text-[13px] italic opacity-70 no-underline">
                                        Facebook: Nysha Beauty Lounge
                                    </a>
                                    <a href="https://wa.me/971522038065" target="_blank" rel="noopener noreferrer" className="text-salon-gray hover:text-gold transition-colors text-[13px] italic opacity-70 no-underline">
                                        WhatsApp: +971 52 203 8065
                                    </a>
                                    <a href="https://snapchat.com/t/I9dMkeni" target="_blank" rel="noopener noreferrer" className="text-salon-gray hover:text-gold transition-colors text-[13px] italic opacity-70 no-underline">
                                        Snapchat: Nysha Lounge
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Map Holder */}
                        <div className="relative w-full aspect-video bg-salon-bg2 border border-white/5 overflow-hidden group">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.568285514068!2d55.201726!3d25.0332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6e8000000001%3A0x0!2zMjXCsDAxJzU5LjUiTiA1NcKwMTInMDYuMiJF!5e0!3m2!1sen!2sae!4v1715264000000!5m2!1sen!2sae" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(1.2)" }} 
                                allowFullScreen 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                className="transition-all duration-700 group-hover:filter-none opacity-60 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 pointer-events-none border border-gold/10" />
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <Footer />
        </main>
    );
}
