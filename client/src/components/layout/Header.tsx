"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
    const [isSolid, setIsSolid] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsSolid(window.scrollY > 70);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between transition-all duration-400 ease 
      ${isSolid
                    ? "bg-salon-bg/94 backdrop-blur-[22px] py-3 px-5 sm:px-14 border-b border-salon-border"
                    : "bg-gradient-to-b from-black/55 to-transparent py-7 px-5 sm:px-14"}`}
        >
            <Link href="/" className="flex flex-col gap-0.75 no-underline group cursor-pointer">
                <span className="font-playfair text-[23px] tracking-[4px] text-gold uppercase font-normal transition-colors group-hover:text-gold2">Nysha</span>
                <span className="text-[8px] tracking-[6px] text-[rgba(201,168,76,0.42)] uppercase">Beauty Lounge &nbsp;·&nbsp; Dubai</span>
            </Link>

            <div className="flex items-center gap-6 sm:gap-[26px]">
                <a
                    href="tel:+97145709468"
                    className="flex items-center gap-2 text-[12px] tracking-[0.8px] text-salon-gray hover:text-gold transition-colors no-underline hidden sm:flex"
                >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 015.11 12.92 19.79 19.79 0 012.04 4.29 2 2 0 014.03 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                    +971 4 570 9468
                </a>

                <button className="group relative overflow-hidden font-dm-sans text-[10px] font-light tracking-[3.5px] uppercase py-[11px] px-[27px] border border-gold text-gold bg-transparent cursor-pointer transition-colors duration-350 hover:text-[#080808]">
                    <span className="relative z-10">Book Appointment</span>
                    <div className="absolute inset-0 bg-gold -translate-x-[101%] transition-transform duration-380 cubic-bezier-[0.77,0,0.18,1] group-hover:translate-x-0" />
                </button>
            </div>
        </header>
    );
}
