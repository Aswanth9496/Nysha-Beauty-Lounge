"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

export default function CTA() {
    return (
        <section className="py-32.5 px-5 sm:px-14 text-center relative overflow-hidden bg-gradient-to-bottom from-salon-bg to-salon-bg3">
            {/* Background glow effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_50%,rgba(201,168,76,0.07)_0%,transparent_70%)]" />
            <div className="absolute top-0 left-[14%] right-[14%] h-0.25 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

            <ScrollReveal className="relative z-[1]">
                <h2 className="font-playfair text-[clamp(38px,5vw,70px)] font-normal leading-[1.1] mb-3.5 text-white">
                    Ready for Your<br /><em className="italic text-gold not-italic">Transformation?</em>
                </h2>
                <p className="text-[10px] tracking-[6px] text-salon-gray uppercase mb-13">
                    Dubai's premier beauty destination
                </p>
                <a
  href="https://www.fresha.com/a/nysha-beauty-lounge-dubai-3654-j5p-dubai-jvc-25deg0332-7-n-55deg1219-6-e-dubai-htjn822h/all-offer?menu=true&share=true&pId=2805835"
  target="_blank"
  rel="noopener noreferrer"
  className="group relative overflow-hidden font-dm-sans text-[10px] font-light tracking-[4.5px] uppercase py-[17px] px-13.5 border border-gold text-gold bg-transparent cursor-pointer transition-colors duration-350 hover:text-[#080808] inline-flex items-center justify-center no-underline"
>
  <span className="relative z-10">Book Appointment</span>
  <div className="absolute inset-0 bg-gold -translate-x-[101%] transition-transform duration-380 cubic-bezier-[0.77,0,0.18,1] group-hover:translate-x-0" />
</a>
            </ScrollReveal>
        </section>
    );
}
