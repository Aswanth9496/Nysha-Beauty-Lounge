"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: ""
    });
    const [submitting, setSubmitting] = useState(false);
    const [sent, setSent] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setSubmitting(false);
        setSent(true);
        setFormData({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
        setTimeout(() => setSent(false), 5000);
    };

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
                        Your Aesthetic <br /> <em className="italic text-gold not-italic">Journey</em> Begins Here
                    </h1>
                </ScrollReveal>
            </section>

            {/* Contact Grid */}
            <section className="py-20 sm:py-32 px-6 sm:px-14 max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    
                    {/* Left Side: Contact Form */}
                    <ScrollReveal className="space-y-12">
                        <div>
                            <h2 className="font-playfair text-[28px] sm:text-[34px] text-white mb-4">Send a Message</h2>
                            <p className="text-salon-gray text-[13px] leading-relaxed italic opacity-70">
                                Please complete the form below. Our concierge will reach out to you within 24 business hours to finalize your request.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-[2px] text-gold/60">Full Name</label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-b border-white/10 py-3 text-[13px] focus:border-gold outline-none transition-colors"
                                        placeholder="E.g. Isabella Rossi"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-[2px] text-gold/60">Email Address</label>
                                    <input 
                                        type="email" 
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-b border-white/10 py-3 text-[13px] focus:border-gold outline-none transition-colors"
                                        placeholder="isabella@example.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-[2px] text-gold/60">Phone Number</label>
                                    <input 
                                        type="tel" 
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-b border-white/10 py-3 text-[13px] focus:border-gold outline-none transition-colors"
                                        placeholder="+971 00 000 0000"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-[2px] text-gold/60">Subject</label>
                                    <select 
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-b border-white/10 py-3 text-[13px] focus:border-gold outline-none transition-colors appearance-none cursor-pointer"
                                    >
                                        <option className="bg-salon-bg" value="General Inquiry">General Inquiry</option>
                                        <option className="bg-salon-bg" value="Booking Request">Booking Request</option>
                                        <option className="bg-salon-bg" value="Partnership">Partnership</option>
                                        <option className="bg-salon-bg" value="Feedback">Feedback</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] uppercase tracking-[2px] text-gold/60">Your Message</label>
                                <textarea 
                                    name="message"
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-b border-white/10 py-3 text-[13px] focus:border-gold outline-none transition-colors resize-none"
                                    placeholder="Tell us about your beauty goals..."
                                />
                            </div>

                            <button 
                                type="submit"
                                disabled={submitting}
                                className="relative group overflow-hidden w-full sm:w-auto px-12 py-4 bg-gold text-black uppercase tracking-[4px] text-[10px] font-bold transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50"
                            >
                                <span className="relative z-10">{submitting ? "Sending..." : "Submit Inquiry"}</span>
                                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-[450ms]" />
                            </button>

                            {sent && (
                                <p className="text-gold text-[11px] italic animate-pulse">Thank you. Your message has been sent to our concierge.</p>
                            )}
                        </form>
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
                                <p className="text-salon-gray text-[13px] leading-relaxed italic opacity-70">
                                    Instagram: @nyshabeautylounge <br />
                                    WhatsApp: +971 50 XXX XXXX
                                </p>
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
