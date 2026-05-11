"use client";

import React from "react";

/**
 * A floating WhatsApp button that remains fixed on the screen.
 * Provides a direct link to chat with the business.
 */
export default function WhatsAppButton() {
    return (
        <a
            href="https://wa.me/971522038065"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-[9999] flex items-center justify-center w-[60px] h-[60px] bg-[#25D366] text-white rounded-full shadow-[0_10px_25px_rgba(37,211,102,0.3)] transition-all duration-500 hover:scale-110 hover:shadow-[0_15px_35px_rgba(37,211,102,0.5)] group overflow-hidden"
            aria-label="Chat on WhatsApp"
        >
            {/* Soft Pulse Ripple Effect */}
            <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:animate-ping opacity-10 transition-opacity" />
            
            {/* Outer Glow Animation */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse opacity-40 scale-110 -z-10 group-hover:opacity-0 transition-opacity" />

            <svg 
                className="w-8 h-8 relative z-10 transition-transform duration-500 group-hover:rotate-[12deg]" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            
            {/* Subtle Reflection Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
        </a>
    );
}
