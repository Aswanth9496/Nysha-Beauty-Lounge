"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

export default function HairCTA() {
    return (
        <section className="py-32.5 px-5 sm:px-14 text-center relative overflow-hidden bg-gradient-to-bottom from-salon-bg to-salon-bg3" id="book">
            {/* Background glow effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_50%,rgba(212,183,93,0.07)_0%,transparent_70%)]" />

            <ScrollReveal className="relative z-[1]">
                <h2 className="font-playfair text-[clamp(38px,5vw,70px)] font-normal leading-[1.1] mb-3.5 text-white">
                    Ready to Reclaim Your<br /><em className="italic text-gold not-italic">Crown?</em>
                </h2>
                <p className="text-[10px] tracking-[6px] text-salon-gray uppercase mb-13">
                    Secure your appointment at Dubai&apos;s premier hair destination
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href="tel:+97145709468"
                        className="group relative overflow-hidden font-dm-sans text-[10px] font-light tracking-[4.5px] uppercase py-[17px] px-13.5 border border-gold text-gold bg-transparent cursor-pointer transition-colors duration-[0.35s] hover:text-[#080808] no-underline"
                    >
                        <span className="relative z-10">Call Us Now</span>
                        <div className="absolute inset-0 bg-gold -translate-x-[101%] transition-transform duration-[0.38s] cubic-bezier-[0.77,0,0.18,1] group-hover:translate-x-0" />
                    </a>
                </div>
            </ScrollReveal>
        </section>
    );
}
