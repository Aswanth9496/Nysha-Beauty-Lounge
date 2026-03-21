"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

export default function LashNailHero() {
    return (
        <section className="relative w-full h-[35vh] flex items-center justify-center bg-salon-bg2 overflow-hidden">
            <img
                src="/saloon/assets/images/nail-1.png"
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
