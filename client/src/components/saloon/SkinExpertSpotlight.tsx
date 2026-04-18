"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

export default function SkinExpertSpotlight() {
    return (
        <section className="py-27 px-5 sm:px-14 bg-salon-bg2 border-t border-salon-border border-b">
            <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row items-center gap-[70px]">
                <ScrollReveal className="w-full md:w-[380px] flex-shrink-0 aspect-[3/4] relative">
                    <img
                        src="/saloon/assets/images/model_female_3.png"
                        alt="Senior Aesthetician"
                        className="w-full h-full object-cover filter brightness-[0.85] saturate-[1.05]"
                    />
                    <div className="absolute inset-[-15px] border border-gold/20 pointer-events-none hidden sm:block" />
                </ScrollReveal>

                <div className="flex flex-col">
                    <ScrollReveal delay="d1">
                        <span className="text-[9px] tracking-[6px] text-gold uppercase mb-4 block">The Specialist</span>
                        <h2 className="font-playfair text-[clamp(30px,3.6vw,50px)] font-normal leading-[1.12] mb-6 text-white">
                            Meet Your<br /><em className="italic text-gold not-italic">Aesthetician</em>
                        </h2>
                    </ScrollReveal>

                    <ScrollReveal delay="d2">
                        <p className="font-playfair text-[22px] text-white mb-1">Elena Rostova</p>
                        <p className="text-[9px] tracking-[3px] text-gold uppercase mb-[42px]">Lead Skin Specialist</p>
                    </ScrollReveal>

                    <ScrollReveal delay="d3">
                        <p className="text-[13px] text-salon-gray leading-[1.9] mb-[34px]">
                            &quot;True radiance comes from healthy, resilient skin. My approach blends cutting-edge dermal science with holistic relaxation to give you an unmistakable, lit-from-within glow.&quot;
                        </p>
                        <p className="text-[13px] text-salon-gray leading-[1.9]">
                            Specializing in non-invasive skin rejuvenation and advanced facials, Elena tailors every treatment precisely to your specific dermal needs, ensuring optimal vitality.
                        </p>

                        <div className="mt-10">
                            <a
                                href="https://www.fresha.com/a/nysha-beauty-lounge-dubai-3654-j5p-dubai-jvc-25deg0332-7-n-55deg1219-6-e-dubai-htjn822h/all-offer?menu=true&share=true&pId=2805835"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative overflow-hidden font-dm-sans text-[10px] font-light tracking-[3.5px] uppercase py-[15px] px-[44px] border border-gold text-gold bg-transparent cursor-pointer transition-colors duration-[0.35s] hover:text-[#080808] inline-block no-underline"
                            >
                                <span className="relative z-10">Book with Elena</span>
                                <div className="absolute inset-0 bg-gold -translate-x-[101%] transition-transform duration-[0.38s] cubic-bezier-[0.77,0,0.18,1] group-hover:translate-x-0" />
                            </a>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
