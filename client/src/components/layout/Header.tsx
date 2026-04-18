"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { apiClient } from "@/lib/api/apiClient";

interface HeaderData {
    logo?: string;
    phone_number?: string;
}

export default function Header() {
    const [isSolid, setIsSolid] = useState(false);
    const [headerData, setHeaderData] = useState<HeaderData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setIsSolid(window.scrollY > 70);
        };

        const fetchHeaderData = async () => {
            try {
                const response: any = await apiClient.get("/api/header");

                if (response.success && response.data?.length > 0) {
                    setHeaderData(response.data[0]);
                }
            } catch (error) {
                console.error("Failed to fetch header data:", error);
            } finally {
                setLoading(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        fetchHeaderData();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const displayPhone = headerData?.phone_number || "+971 4 570 9468";

    const logoUrl = headerData?.logo
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${headerData.logo}`
        : null;

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between transition-all duration-400 ease
            ${
                isSolid
                    ? "bg-salon-bg/94 backdrop-blur-[22px] h-[82px] sm:h-[92px] px-4 sm:px-14 border-b border-salon-border"
                    : "bg-gradient-to-b from-black/55 to-transparent h-[92px] sm:h-[110px] px-4 sm:px-14"
            }`}
        >
            {/* Logo */}
            <Link
                href="/"
                className="h-full flex items-center no-underline group cursor-pointer shrink-0"
            >
                {logoUrl ? (
                    <img
                        src={logoUrl}
                        alt="Nysha Beauty Lounge"
                        className="h-[78%] sm:h-[82%] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex flex-col justify-center h-full">
                        <span className="font-playfair text-[26px] sm:text-[34px] tracking-[4px] text-gold uppercase transition-colors duration-300 group-hover:text-gold2 leading-none">
                            Nysha
                        </span>

                        <span className="text-[8px] sm:text-[10px] tracking-[5px] text-[rgba(201,168,76,0.42)] uppercase mt-1">
                            Beauty Lounge · Dubai
                        </span>
                    </div>
                )}
            </Link>

            {/* Right Side */}
            <div
                className={`flex items-center gap-3 sm:gap-6 transition-opacity duration-500 ${
                    loading ? "opacity-50" : "opacity-100"
                }`}
            >
                {/* Phone */}
                <a
                    href={`tel:${displayPhone.replace(/\s/g, "")}`}
                    className="hidden lg:flex items-center gap-2 text-[12px] tracking-[0.8px] text-salon-gray hover:text-gold transition-colors no-underline"
                >
                    <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    >
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 015.11 12.92 19.79 19.79 0 012.04 4.29 2 2 0 014.03 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                    {displayPhone}
                </a>

                {/* Book Button */}
                <a
                    href="https://www.fresha.com/a/nysha-beauty-lounge-dubai-3654-j5p-dubai-jvc-25deg0332-7-n-55deg1219-6-e-dubai-htjn822h/all-offer?menu=true&share=true&pId=2805835"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden font-dm-sans text-[9px] sm:text-[10px] font-light tracking-[2px] sm:tracking-[3.5px] uppercase py-[10px] sm:py-[11px] px-[14px] sm:px-[27px] border border-gold text-gold bg-transparent cursor-pointer transition-colors duration-350 hover:text-[#080808] inline-flex items-center justify-center no-underline whitespace-nowrap"
                >
                    <span className="relative z-10">
                        Book Now
                    </span>

                    <div className="absolute inset-0 bg-gold -translate-x-[101%] transition-transform duration-380 ease-out group-hover:translate-x-0" />
                </a>
            </div>
        </header>
    );
}