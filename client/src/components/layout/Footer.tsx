"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { apiClient } from "@/lib/api/apiClient";

interface HeaderContent {
    address?: string;
    latitude?: string;
    longitude?: string;
    phone_number?: string;
    secondary_phone_number?: string;
    email?: string;
}

export default function Footer() {
    const [header, setHeader] = useState<HeaderContent | null>(null);

    useEffect(() => {
        const fetchCMS = async () => {
            try {
                const result: any = await apiClient.get("/api/header");
                if (result.success && result.data && result.data.length > 0) {
                    setHeader(result.data[0]);
                }
            } catch (err) {
                console.error("Footer CMS load failed", err);
            }
        };
        fetchCMS();
    }, []);

    const addressLines = header?.address 
        ? header.address.split(',').map(line => line.trim()).slice(0, 3) 
        : ["Shop No-3, Rokane G25", "District-10, JVC", "Dubai, UAE"];

    const primaryPhone = header?.phone_number || "+971 4 570 9468";
    const secondaryPhone = header?.secondary_phone_number || "+971 52 203 8065";
    const officialEmail = header?.email || "nyshabeautylounge@gmail.com";

    // Dynamic Map URL Logic
    const mapUrl = (header?.latitude && header?.longitude)
        ? `https://www.google.com/maps?q=${header.latitude},${header.longitude}`
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(header?.address || "Shop No-3, Rokane G25, District-10, JVC, Dubai")}`;

    return (
        <footer className="bg-[#0f0f0f] border-t border-gold/20 py-17.5 px-5 sm:px-14 pb-9.5 text-white">
            <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-14.5 mb-13.5">

                {/* Brand */}
                <div className="flex flex-col">
                    <Link href="/" className="flex flex-col gap-0.75 mb-3.5 no-underline group cursor-pointer">
                        <span className="font-playfair text-[20px] tracking-[4px] text-gold uppercase font-normal transition-colors group-hover:text-gold2">Nysha</span>
                        <span className="text-[8px] tracking-[6px] text-[rgba(201,168,76,0.42)] uppercase">Beauty Lounge · Dubai</span>
                    </Link>
                    <p className="text-[12px] text-salon-gray leading-[1.9] max-w-[230px]">
                        Where sophistication meets warmth — making every client feel like royalty. Walk in. Glow out.
                    </p>
                </div>

                {/* Location */}
                <div className="flex flex-col">
                    <h4 className="text-[8px] tracking-[5px] text-gold uppercase mb-4.25 font-normal">Visit Us</h4>
                    <p className="text-[12px] text-salon-gray leading-[2.1]">
                        {addressLines[0]}<br />{addressLines[1]}{addressLines[1] && <br />}{addressLines[2]}
                    </p>
                    <a
                        href={mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-2.5 text-[10px] tracking-[2px] text-gold uppercase no-underline border-b border-gold/30 pb-0.5 w-max hover:border-gold transition-colors"
                    >
                        <svg className="w-[11px] h-[11px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        View on Map
                    </a>
                </div>

                {/* Contact */}
                <div className="flex flex-col">
                    <h4 className="text-[8px] tracking-[5px] text-gold uppercase mb-4.25 font-normal">Contact</h4>
                    <a href={`tel:${primaryPhone?.replace(/\s/g, '')}`} className="text-[12px] text-salon-gray leading-[2.1] no-underline hover:text-gold transition-colors block">
                        {primaryPhone}
                    </a>
                    <a href={`tel:${secondaryPhone?.replace(/\s/g, '')}`} className="text-[12px] text-salon-gray leading-[2.1] no-underline hover:text-gold transition-colors block">
                        {secondaryPhone}
                    </a>
                    <a href={`mailto:${officialEmail}`} className="text-[12px] text-salon-gray leading-[2.1] no-underline hover:text-gold transition-colors block opacity-90">
                        {officialEmail}
                    </a>

                    {/* Social Media Links */}
                    <div className="flex items-center gap-4.5 mt-5.5">
                        <a href="#" target="_blank" rel="noopener noreferrer" className="text-salon-gray hover:text-gold transition-colors duration-300 hover:-translate-y-0.5 transform" aria-label="Instagram">
                            <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="text-salon-gray hover:text-gold transition-colors duration-300 hover:-translate-y-0.5 transform" aria-label="Facebook">
                            <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                            </svg>
                        </a>
                        <a href="https://wa.me/97145709468" target="_blank" rel="noopener noreferrer" className="text-salon-gray hover:text-gold transition-colors duration-300 hover:-translate-y-0.5 transform" aria-label="WhatsApp">
                            <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                            </svg>
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="text-salon-gray hover:text-gold transition-colors duration-300 hover:-translate-y-0.5 transform" aria-label="LinkedIn">
                            <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                <rect x="2" y="9" width="4" height="12"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <div className="max-w-[1280px] mx-auto pt-7 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/20 tracking-[1px] gap-3.5 text-center">
                <span>© 2025 Nysha Beauty Lounge. All rights reserved.</span>
                <span>JVC · Dubai · UAE</span>
            </div>
        </footer>
    );
}
