"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { API_BASE_URL } from "@/lib/api/config";

interface Category {
    _id: string;
    name: string;
    description: string;
    photo: string;
}

interface SubCategory {
    _id: string;
    categoryId: string | { _id: string, name: string };
    name: string;
    description: string;
    cover_image: string;
}

interface Variant {
    label: string;
    experience?: string;
    amount: number;
    description_1?: string;
    description_2?: string;
    duration?: string;
}

interface Service {
    _id: string;
    title: string;
    subtitle?: string;
    description?: string;
    description_2?: string;
    duration?: string;
    target_skin?: string;
    hair_length?: string;
    whats_included?: string[];
    whatsapp_message?: string;
    amount?: number;
    has_variants: boolean;
    variants: Variant[];
}

function ServicesContent() {
    const searchParams = useSearchParams();
    const [categories, setCategories] = useState<Category[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");
    const [loading, setLoading] = useState(true);

    // Modal States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [modalServices, setModalServices] = useState<Service[]>([]);
    const [selectedSubCategoryName, setSelectedSubCategoryName] = useState("");

    const slugify = (name: string) => {
        return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [catRes, subRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/api/categories`),
                    fetch(`${API_BASE_URL}/api/subcategories`)
                ]);
                
                const catData = await catRes.json();
                const subData = await subRes.json();

                if (catData.success) setCategories(catData.data);
                if (subData.success) setSubCategories(subData.data);

                // Handle initial category from URL
                const categoryParam = searchParams.get('category');
                if (categoryParam && catData.success) {
                    const matched = catData.data.find((c: Category) => slugify(c.name) === categoryParam);
                    if (matched) setSelectedCategoryId(matched._id);
                }
            } catch (err) {
                console.error("Data fetch failed", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [searchParams]);

    const openPriceModal = async (subId: string, subName: string) => {
        setSelectedSubCategoryName(subName);
        setIsModalOpen(true);
        setModalLoading(true);
        setModalServices([]);

        try {
            const res = await fetch(`${API_BASE_URL}/api/services?subCategoryId=${subId}&is_visible=true`);
            const result = await res.json();
            if (result.success) {
                // Sort by sort_order if available, or title
                const sorted = result.data.sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0));
                setModalServices(sorted);
            }
        } catch (err) {
            console.error("Pricing fetch failed", err);
        } finally {
            setModalLoading(false);
        }
    };

    const activeCategory = categories.find(c => c._id === selectedCategoryId);
    const filteredSubCategories = selectedCategoryId === "all" 
        ? subCategories 
        : subCategories.filter(sub => {
            const cid = typeof sub.categoryId === 'object' ? sub.categoryId?._id : sub.categoryId;
            return cid === selectedCategoryId;
        });

    return (
        <main className="min-h-screen bg-salon-bg text-salon-white selection:bg-gold selection:text-salon-bg">
            {/* Dynamic Hero */}
            <section className="relative w-full h-[40vh] sm:h-[45vh] flex items-center justify-center bg-salon-bg2 overflow-hidden border-b border-white/5">
                <img
                    src={activeCategory?.photo ? `${API_BASE_URL}${activeCategory.photo}` : "/saloon/assets/images/salon_interior.png"}
                    alt={activeCategory?.name || "Our Services"}
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.4] animate-[slowZoom_20s_ease_infinite_alternate]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-salon-bg/90 z-[1]" />
                <ScrollReveal className="relative z-[2] text-center pt-16 sm:pt-20 px-6">
                    <span className="text-[9px] sm:text-[10px] tracking-[5px] sm:tracking-[6px] text-gold uppercase mb-3 sm:mb-4 block">Tailored Excellence</span>
                    <h1 className="font-playfair text-[32px] sm:text-[clamp(40px,6vw,75px)] font-normal leading-[1.1] text-white">
                        {activeCategory ? activeCategory.name : "Exclusive Menu"}
                    </h1>
                    {activeCategory && (
                        <p className="max-w-xl mx-auto mt-4 text-salon-gray text-[11px] sm:text-[12px] leading-relaxed italic opacity-80 font-light px-4 sm:px-0">
                            {activeCategory.description}
                        </p>
                    )}
                </ScrollReveal>
            </section>

            {/* Sticky Filter Bar */}
            <div className="sticky top-16 z-30 bg-salon-bg/80 backdrop-blur-xl border-b border-white/5 py-3 sm:py-4 overflow-x-auto no-scrollbar scroll-smooth">
                <div className="container mx-auto px-6 sm:px-14 flex items-center justify-start md:justify-center gap-6 sm:gap-8 whitespace-nowrap min-w-max">
                    <button 
                        onClick={() => setSelectedCategoryId("all")}
                        className={`text-[8.5px] sm:text-[9px] tracking-[2.5px] uppercase transition-all duration-300 font-medium ${selectedCategoryId === "all" ? 'text-gold border-b border-gold/40 pb-0.5' : 'text-salon-gray hover:text-white'}`}
                    >
                        All Rituals
                    </button>
                    {categories.map(cat => (
                        <button 
                            key={cat._id}
                            onClick={() => setSelectedCategoryId(cat._id)}
                            className={`text-[8.5px] sm:text-[9px] tracking-[2.5px] uppercase transition-all duration-300 font-medium ${selectedCategoryId === cat._id ? 'text-gold border-b border-gold/40 pb-0.5' : 'text-salon-gray hover:text-white'}`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Service Grid */}
            <section className="py-12 sm:py-20 px-5 sm:px-14 max-w-[1400px] mx-auto min-h-[500px]">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 sm:py-40 opacity-30">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-gold/10 border-t-gold animate-spin mb-6" />
                        <p className="text-[10px] sm:text-[12px] uppercase tracking-[4px] italic text-center">Curating your beauty menu...</p>
                    </div>
                ) : filteredSubCategories.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 sm:py-40 border border-white/5 bg-white/5 rounded-sm px-6">
                        <span className="text-gold/20 text-5xl sm:text-6xl mb-6 sm:mb-8">✧</span>
                        <p className="text-salon-gray text-[10px] sm:text-[11px] uppercase tracking-[3px] text-center max-w-sm">
                            No specialized treatments found for this selection.<br />Check back soon for new additions.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                        {filteredSubCategories.map((sub, i) => (
                            <ScrollReveal 
                                key={sub._id}
                                style={{ transitionDelay: `${(i % 3) * 0.1}s` }}
                                className="group flex flex-col bg-[#181818] border border-white/5 overflow-hidden transition-all duration-500 hover:border-gold/30 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                            >
                                <div className="aspect-[16/10] sm:aspect-[4/3] overflow-hidden relative">
                                    <img 
                                        src={sub.cover_image ? `${API_BASE_URL}${sub.cover_image}` : "/saloon/assets/images/salon_interior.png"} 
                                        alt={sub.name}
                                        className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                </div>
                                <div className="p-6 sm:p-8 flex flex-col flex-1">
                                    <h3 className="font-playfair text-[20px] sm:text-[24px] font-normal text-white mb-3 group-hover:text-gold transition-colors duration-400">
                                        {sub.name}
                                    </h3>
                                    <p className="text-[12px] sm:text-[13px] text-salon-gray leading-relaxed line-clamp-4 font-light mb-auto opacity-70">
                                        {sub.description}
                                    </p>
                                    <div className="mt-8 flex flex-col sm:flex-row gap-3 items-center">
                                        <button
                                            onClick={() => openPriceModal(sub._id, sub.name)}
                                            className="group/pvd relative overflow-hidden w-full sm:flex-1 text-[9px] tracking-[4px] uppercase text-gold/80 py-[15px] px-8 border border-gold/20 bg-transparent transition-all duration-[450ms] hover:border-gold hover:text-gold no-underline text-center flex items-center justify-center gap-2 cursor-pointer"
                                        >
                                            <span className="relative z-10 font-light">Price Details</span>
                                            <span className="relative z-10 text-[7px] opacity-40 group-hover/pvd:translate-x-1 transition-transform duration-300">→</span>
                                            <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover/pvd:opacity-100 transition-opacity duration-[450ms]" />
                                        </button>
                                        
                                        <a 
                                            href={`https://wa.me/97145709468?text=${encodeURIComponent(`Hi Nysha Beauty Lounge, I would like to book the ${sub.name} treatment.`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group/book relative overflow-hidden w-full sm:flex-1 text-[9px] tracking-[4px] uppercase text-[#080808] py-[15px] px-8 bg-gold border border-gold transition-all duration-[450ms] hover:bg-transparent hover:text-gold no-underline text-center font-bold flex items-center justify-center"
                                        >
                                            <span className="relative z-10 flex items-center gap-2">
                                                Book Ritual
                                            </span>
                                            <div className="absolute inset-0 bg-[#080808] translate-y-full group-hover/book:translate-y-0 transition-transform duration-[450ms] cubic-bezier-[0.77,0,0.18,1]" />
                                        </a>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                )}
            </section>
            {/* Price Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[200] flex items-start justify-center px-4 sm:px-6 pt-24 sm:pt-32 pb-6 animate-[fadeIn_0.3s_ease_forwards]">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                        onClick={() => setIsModalOpen(false)}
                    />
                    
                    {/* Modal Content - Slid from top */}
                    <div className="relative w-full max-w-2xl bg-salon-bg border border-gold/30 shadow-[0_30px_100px_rgba(0,0,0,0.5)] flex flex-col max-h-[85vh] sm:max-h-[75vh] animate-[slideFromTop_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards] overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-white/5 bg-salon-bg sticky top-0 z-20">
                            <div className="flex flex-col gap-1">
                                <span className="text-[8px] tracking-[4px] text-gold/60 uppercase">Treatment Menu</span>
                                <h2 className="font-playfair text-xl sm:text-2xl text-white uppercase tracking-[4px] leading-tight">
                                    {selectedSubCategoryName}
                                </h2>
                            </div>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="w-10 h-10 -mr-2 flex items-center justify-center text-gold/40 hover:text-gold transition-colors text-2xl cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Service List */}
                        <div className="flex-1 overflow-y-auto no-scrollbar p-6 sm:p-8">
                            {modalLoading ? (
                                <div className="py-20 flex flex-col items-center justify-center opacity-40">
                                    <div className="w-8 h-8 border-2 border-gold/20 border-t-gold animate-spin mb-6" />
                                    <p className="text-[10px] uppercase tracking-[3px] text-center text-gold">Loading Menu...</p>
                                </div>
                            ) : modalServices.length === 0 ? (
                                <div className="py-20 text-center opacity-40 uppercase text-[10px] tracking-[3px]">Treatment data being curated...</div>
                            ) : (
                                <div className="space-y-12">
                                    {modalServices.map((svc) => (
                                        <div key={svc._id} className="group">
                                            {/* Standard Service (No Variants) */}
                                            {!svc.has_variants ? (
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2">
                                                    <div className="flex flex-col flex-1">
                                                        <h3 className="font-playfair text-[18px] sm:text-[20px] text-white group-hover:text-gold transition-colors duration-300">
                                                            {svc.title}
                                                        </h3>
                                                        {svc.subtitle && <p className="text-[10px] text-salon-gray italic mt-1 opacity-60">{svc.subtitle}</p>}
                                                    </div>
                                                    <div className="flex items-center gap-6 justify-between sm:justify-end">
                                                        <span className="text-gold font-playfair text-[18px] text-right whitespace-nowrap">
                                                            {svc.amount ? `AED ${svc.amount}` : "Consult"}
                                                        </span>
                                                        <a 
                                                            href={`https://wa.me/97145709468?text=${encodeURIComponent(svc.whatsapp_message || `Hi, I'm interested in the ${svc.title} ritual.`)}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-[9px] tracking-[2px] uppercase text-black bg-gold px-6 py-3 font-bold hover:bg-white transition-all duration-300 no-underline whitespace-nowrap"
                                                        >
                                                            Book Now
                                                        </a>
                                                    </div>
                                                </div>
                                            ) : (
                                                /* Service with Variants (Tiered Rituals) */
                                                <div className="flex flex-col">
                                                    <div className="mb-4">
                                                        <h3 className="font-playfair text-[18px] sm:text-[20px] text-white group-hover:text-gold transition-colors duration-300">
                                                            {svc.title}
                                                        </h3>
                                                        {svc.subtitle && <p className="text-[10px] text-salon-gray italic mt-1 opacity-60">{svc.subtitle}</p>}
                                                    </div>
                                                    <div className="space-y-3 mt-2 border-l border-gold/10 pl-6">
                                                        {svc.variants.map((v, i) => (
                                                            <div key={i} className="flex items-center justify-between gap-4 py-2 group/v">
                                                                <div className="flex flex-col">
                                                                    <span className="text-[11px] sm:text-[12px] uppercase tracking-[2px] text-white/90 font-medium">{v.label}</span>
                                                                    {v.experience && <span className="text-[9px] text-salon-gray/50 italic lowercase">{v.experience} Experience</span>}
                                                                </div>
                                                                <div className="flex items-center gap-4">
                                                                    <span className="text-gold font-playfair text-[15px] sm:text-[16px]">AED {v.amount}</span>
                                                                    <a 
                                                                        href={`https://wa.me/97145709468?text=${encodeURIComponent(`Hi, I'm interested in the ${svc.title} (${v.label}) ritual.`)}`}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-[8px] tracking-[1.5px] uppercase text-white hover:text-gold border border-white/10 hover:border-gold px-4 py-1.5 transition-all duration-300 no-underline"
                                                                    >
                                                                        Book
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Common CTA */}
            <section className="py-20 sm:py-32 px-5 sm:px-14 bg-[#0a0a0a] border-t border-white/5 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,183,93,0.04)_0%,transparent_65%)]" />
                <ScrollReveal className="relative z-[1] max-w-3xl mx-auto">
                    <h2 className="font-playfair text-[32px] sm:text-[clamp(40px,5vw,80px)] font-normal text-white mb-4 sm:mb-6">
                        Still <em className="italic text-gold not-italic">Undecided?</em>
                    </h2>
                    <p className="text-salon-gray text-[12px] sm:text-[14px] leading-relaxed mb-10 sm:mb-12 italic opacity-80 px-4 sm:px-0">
                        Consult with our master artisans to engineer the perfect aesthetic transformation tailored entirely to your unique features.
                    </p>
                    <a 
                        href="tel:+97145709468"
                        className="inline-block py-4 px-10 sm:px-12 bg-gold text-black uppercase tracking-[4px] sm:tracking-[5px] text-[10px] font-bold transition-all duration-300 hover:scale-105 active:scale-95 no-underline shadow-[0_15px_40px_rgba(212,183,93,0.2)]"
                    >
                        Call Our Concierge
                    </a>
                </ScrollReveal>
            </section>

            <style jsx global>{`
                @keyframes slowZoom {
                    from { transform: scale(1.1); }
                    to { transform: scale(1); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideFromTop {
                    from { transform: translateY(-30px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </main>
    );
}

export default function ServicesPage() {
    return (
        <>
            <CustomCursor />
            <Header />
            <Suspense fallback={
                <div className="min-h-screen bg-salon-bg flex items-center justify-center">
                    <div className="w-10 h-10 border-2 border-gold/20 border-t-gold animate-spin" />
                </div>
            }>
                <ServicesContent />
            </Suspense>
            <Footer />
        </>
    );
}
