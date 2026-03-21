"use client";

import React from 'react';
import AdminCard from '@/components/admin/AdminCard';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminBadge from '@/components/admin/AdminBadge';

const experts = [
    { name: 'Elena Gilbert', specialty: 'Master Hair Stylist', exp: '12 Years', rating: '5.0', availability: 'Available' },
    { name: 'Damon Salvatore', specialty: 'Senior Barber', exp: '10 Years', rating: '4.9', availability: 'Available' },
    { name: 'Stefan Salvatore', specialty: 'Skin Specialist', exp: '8 Years', rating: '5.0', availability: 'Busy' },
    { name: 'Caroline Forbes', specialty: 'Expert Nail Artist', exp: '6 Years', rating: '4.8', availability: 'Available' },
    { name: 'Bonnie Bennett', specialty: 'Master Makeup Artist', exp: '9 Years', rating: '4.9', availability: 'On Leave' },
];

export default function ExpertsPage() {
    return (
        <div className="space-y-6 lg:space-y-8">
            <AdminPageHeader
                title="Our Experts"
                subtitle="Team of professional beauty masters"
                action={{
                    label: "Add Expert",
                    onClick: () => { }
                }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {experts.map((expert, idx) => (
                    <AdminCard key={idx} className="hover:border-gold/30 transition-all duration-300">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-16 h-16 border border-gold/20 p-1 bg-gold/5 flex items-center justify-center text-2xl italic font-playfair shadow-xl relative">
                                <span className="text-gold/40">{expert.name.charAt(0)}</span>
                                <div className="absolute -bottom-1 -right-1 w-4 h-px bg-gold/50" />
                            </div>

                            <div className="space-y-1">
                                <h3 className="font-playfair text-lg text-white italic tracking-wide">{expert.name}</h3>
                                <p className="text-[8px] tracking-[2px] text-gold uppercase font-light">{expert.specialty}</p>
                            </div>

                            <div className="flex justify-between w-full pt-4 border-t border-salon-border/40 gap-2">
                                <div className="flex flex-col items-center flex-1">
                                    <span className="text-[8px] text-salon-gray uppercase tracking-widest mb-0.5">Exp</span>
                                    <span className="text-[10px] font-bold text-white uppercase">{expert.exp}</span>
                                </div>
                                <div className="h-6 w-px bg-salon-border/40" />
                                <div className="flex flex-col items-center flex-1">
                                    <span className="text-[8px] text-salon-gray uppercase tracking-widest mb-0.5">Trust</span>
                                    <span className="text-[10px] font-bold text-gold uppercase">Top Rated</span>
                                </div>
                            </div>

                            <div className="w-full pt-2">
                                <AdminBadge variant={
                                    expert.availability === 'Available' ? 'success' :
                                        expert.availability === 'Busy' ? 'warning' : 'neutral'
                                }>
                                    {expert.availability}
                                </AdminBadge>
                            </div>

                            <div className="flex w-full gap-2 pt-4">
                                <button className="flex-1 text-[8px] tracking-[2px] border border-white/10 py-2 uppercase text-salon-gray hover:text-white hover:bg-white/5 transition-all outline-none">Edit</button>
                                <button className="flex-1 text-[8px] tracking-[2px] border border-rose-500/10 py-2 uppercase text-rose-500/60 hover:text-rose-500 hover:bg-rose-500/5 transition-all outline-none">Remove</button>
                            </div>
                        </div>
                    </AdminCard>
                ))}
            </div>
        </div>
    );
}
