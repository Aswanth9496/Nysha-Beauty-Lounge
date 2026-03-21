"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

const experts = [
    { name: "Aaliya Sharma", role: "Senior Hair Artist", image: "https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&q=80&w=400&h=533" },
    { name: "Rania Al-Farsi", role: "Makeup Specialist", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=533" },
    { name: "Karim Hassan", role: "Men's Grooming Expert", image: "https://images.unsplash.com/photo-1543132220-3ec99c6094dc?auto=format&fit=crop&q=80&w=400&h=533" },
    { name: "Priya Nair", role: "Skin Care Therapist", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=533" },
    { name: "Ahmed Khalil", role: "Beard & Style Artist", image: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?auto=format&fit=crop&q=80&w=400&h=533" },
    { name: "Sara Mansouri", role: "Color Specialist", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=533" },
    { name: "Lina Farouk", role: "Lash & Brow Expert", image: "https://images.unsplash.com/photo-1531123897727-8f129e1b4dce?auto=format&fit=crop&q=80&w=400&h=533" },
    { name: "Omar Al-Rashid", role: "Hair Texture Specialist", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400&h=533" },
];

export default function Experts() {
    return (
        <section className="py-27 bg-salon-bg2 border-t border-salon-border border-b overflow-hidden">
            <ScrollReveal className="px-5 sm:px-14 flex flex-col sm:flex-row items-start sm:items-end justify-between mb-13">
                <div>
                    <span className="text-[9px] tracking-[6px] text-gold uppercase mb-4 block">The Team</span>
                    <h2 className="font-playfair text-[clamp(30px,3.6vw,50px)] font-normal leading-[1.12]">
                        Meet Our <em className="italic text-gold not-italic">Experts</em>
                    </h2>
                </div>
                <p className="max-w-[260px] text-[12px] text-salon-gray tracking-[0.8px] text-left sm:text-right leading-[1.75] mt-4 sm:mt-0">
                    Dubai's finest beauty professionals — each with years of luxury salon mastery.
                </p>
            </ScrollReveal>

            <div className="relative group/strip">
                <div className="absolute top-0 bottom-0 left-0 w-27.5 z-[10] pointer-events-none bg-gradient-to-r from-salon-bg2 to-transparent" />
                <div className="absolute top-0 bottom-0 right-0 w-27.5 z-[10] pointer-events-none bg-gradient-to-l from-salon-bg2 to-transparent" />

                <div className="flex gap-4.5 w-max py-1.5 animate-strip-scroll group-hover/strip:animation-play-state-paused">
                    {/* Double the array for infinite feel */}
                    {[...experts, ...experts].map((exp, i) => (
                        <div key={i} className="group relative w-[210px] flex-shrink-0 border border-white/5 overflow-hidden cursor-pointer transition-all duration-350 hover:border-gold/40 hover:-translate-y-[7px]">
                            <div className="w-full aspect-[3/4] relative overflow-hidden">
                                <img
                                    src={exp.image}
                                    alt={exp.name}
                                    className="w-full h-full object-cover object-top filter brightness-85 saturate-105 transition-all duration-550 ease group-hover:scale-106 group-hover:brightness-105 group-hover:saturate-115 block"
                                />
                                <div className="absolute inset-0 bg-gradient-to-bottom from-transparent from-[52%] via-transparent to-[#141414]/97" />
                                <div className="absolute inset-2.5 border border-gold/10 pointer-events-none transition-all duration-350 group-hover:border-gold/32" />
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-4 pb-4 z-[2]">
                                <p className="font-playfair text-[15px] font-normal mb-0.75 text-white">{exp.name}</p>
                                <p className="text-[8.5px] tracking-[3px] text-gold uppercase">{exp.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
