"use client";

import { useEffect, useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface Expert {
    _id: string;
    role: string;
    description?: string;
    image: string;
}

export default function Experts() {
    const [experts, setExperts] = useState<Expert[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExperts = async () => {
            try {
                // Fetch only active experts
                const res = await fetch('http://localhost:5000/api/experts?isActive=true');
                const data = await res.json();
                if (data.success) {
                    setExperts(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch experts:", error);
                // Fallback state if server is down, keep design alive
                setExperts([
                    { _id: "1", role: "Senior Hair Artist", description: "Specializes in color", image: "https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&q=80&w=400&h=533" },
                    { _id: "2", role: "Makeup Specialist", description: "Bridal makeup expert", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=533" },
                    { _id: "3", role: "Men's Grooming Expert", description: "Classic cuts & fades", image: "https://images.unsplash.com/photo-1543132220-3ec99c6094dc?auto=format&fit=crop&q=80&w=400&h=533" },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchExperts();
    }, []);

    // Combine for smooth infinite scrolling even if we have only a few
    const displayExperts = experts.length > 0 ? [...experts, ...experts, ...experts] : [];

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

                {!loading && experts.length > 0 && (
                    <div className="flex gap-4.5 w-max py-1.5 animate-strip-scroll group-hover/strip:animation-play-state-paused">
                        {displayExperts.map((exp, i) => {
                            // Support external links or static uploads (node server)
                            const imageUrl = exp.image?.startsWith('http')
                                ? exp.image
                                : exp.image ? `http://localhost:5000${exp.image}` : 'https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&q=80&w=400&h=533'; // Default fallback image

                            return (
                                <div key={`${exp._id}-${i}`} className="group relative w-[210px] flex-shrink-0 border border-white/5 overflow-hidden cursor-pointer transition-all duration-350 hover:border-gold/40 hover:-translate-y-[7px]">
                                    <div className="w-full aspect-[3/4] relative overflow-hidden">
                                        <img
                                            src={imageUrl}
                                            alt={exp.role}
                                            className="w-full h-full object-cover object-top filter brightness-85 saturate-105 transition-all duration-550 ease group-hover:scale-106 group-hover:brightness-105 group-hover:saturate-115 block"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-bottom from-transparent from-[52%] via-transparent to-[#141414]/97" />
                                        <div className="absolute inset-2.5 border border-gold/10 pointer-events-none transition-all duration-350 group-hover:border-gold/32" />
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-4 pb-4 z-[2]">
                                        <p className="font-playfair text-[15px] font-normal mb-0.75 text-gold">{exp.role}</p>
                                        {exp.description && <p className="text-[8.5px] tracking-[2px] text-salon-gray uppercase mt-1">{exp.description}</p>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
