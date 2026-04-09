"use client";

import React, { useState, useEffect } from "react";
import AdminStatsCard from "@/components/admin/AdminStatsCard";
import AdminCard from "@/components/admin/AdminCard";
import AdminTable from "@/components/admin/AdminTable";
import AdminBadge from "@/components/admin/AdminBadge";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { API_BASE_URL } from "@/lib/api/config";

interface Stats {
    categories: number;
    subcategories: number;
    services: number;
    variants: number;
}

interface RecentService {
    _id: string;
    title: string;
    categoryName: string;
    amount: number;
    createdAt: string;
    is_visible: boolean;
}

export default function DashboardPage() {
    const [stats, setStats] = useState<Stats>({ categories: 0, subcategories: 0, services: 0, variants: 0 });
    const [recentServices, setRecentServices] = useState<RecentService[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const [catRes, subRes, serRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/api/categories`),
                    fetch(`${API_BASE_URL}/api/subcategories`),
                    fetch(`${API_BASE_URL}/api/services`)
                ]);

                const categories = await catRes.json();
                const subcategories = await subRes.json();
                const services = await serRes.json();

                if (categories.success && subcategories.success && services.success) {
                    const servList = services.data || [];
                    const totalVariants = servList.reduce((acc: number, s: any) => acc + (s.variants?.length || 0), 0);

                    setStats({
                        categories: categories.data?.length || 0,
                        subcategories: subcategories.data?.length || 0,
                        services: servList.length,
                        variants: totalVariants
                    });

                    // Get recent 5 services
                    const sorted = [...servList].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
                    
                    const mapped = sorted.map((s: any) => {
                        // Find category name from subcategory
                        const sub = subcategories.data.find((sub: any) => sub._id === (typeof s.subCategoryId === 'string' ? s.subCategoryId : s.subCategoryId?._id));
                        const cat = categories.data.find((c: any) => c._id === (typeof sub?.categoryId === 'string' ? sub?.categoryId : sub?.categoryId?._id));
                        
                        return {
                            _id: s._id,
                            title: s.title,
                            categoryName: cat?.name || "Unknown",
                            amount: s.amount || (s.variants && s.variants.length > 0 ? Math.min(...s.variants.map((v: any) => v.amount)) : 0),
                            createdAt: new Date(s.createdAt).toLocaleDateString(),
                            is_visible: s.is_visible
                        };
                    });
                    setRecentServices(mapped);
                }
            } catch (err) {
                console.error("Dashboard data fetch failed", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 opacity-50">
                <div className="w-8 h-8 border-2 border-gold/10 border-t-gold animate-spin" />
                <p className="text-[10px] uppercase tracking-[3px] italic">Synchronizing Management Core...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 lg:space-y-8">
            <AdminPageHeader
                title="Management Overview"
                subtitle="Live catalog metrics & content synchronization"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <AdminStatsCard 
                    title="Active Categories" 
                    value={stats.categories.toString()} 
                    icon="📂" 
                />
                <AdminStatsCard 
                    title="Global Sub-Categories" 
                    value={stats.subcategories.toString()} 
                    icon="🏷️" 
                />
                <AdminStatsCard 
                    title="Total Services" 
                    value={stats.services.toString()} 
                    icon="✨" 
                />
                <AdminStatsCard 
                    title="Service Variations" 
                    value={stats.variants.toString()} 
                    icon="🔄" 
                />
            </div>

            <AdminCard title="Recently Added Services">
                <AdminTable headers={['Service Name', 'Parent Category', 'Base Price', 'Date Added', 'Status']}>
                    {recentServices.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="px-5 py-20 text-center opacity-30 italic text-[11px] tracking-widest">
                                No inventory records found in the database.
                            </td>
                        </tr>
                    ) : (
                        recentServices.map((service) => (
                            <tr key={service._id} className="group hover:bg-white/5 transition-colors text-[10px] sm:text-[11px]">
                                <td className="px-4 py-3 sm:px-5 sm:py-4">
                                    <span className="font-bold text-white tracking-widest uppercase truncate max-w-[150px] block">{service.title}</span>
                                    <p className="text-[8px] text-salon-gray mt-0.5">{service._id.slice(-6).toUpperCase()}</p>
                                </td>
                                <td className="px-4 py-3 sm:px-5 sm:py-4 text-salon-white font-light uppercase tracking-[1px]">
                                    {service.categoryName}
                                </td>
                                <td className="px-4 py-3 sm:px-5 sm:py-4 text-gold/80 italic font-playfair font-medium">
                                    AED {service.amount}
                                </td>
                                <td className="px-4 py-3 sm:px-5 sm:py-4 text-salon-gray">
                                    {service.createdAt}
                                </td>
                                <td className="px-4 py-3 sm:px-5 sm:py-4">
                                    <AdminBadge variant={service.is_visible ? 'success' : 'neutral'}>
                                        {service.is_visible ? 'Published' : 'Hidden'}
                                    </AdminBadge>
                                </td>
                            </tr>
                        ))
                    )}
                </AdminTable>

                <div className="mt-4 sm:mt-6 text-center pt-4 sm:pt-6 border-t border-salon-border/30">
                    <button className="text-[9px] tracking-[3px] text-gold uppercase hover:underline decoration-gold/30 underline-offset-6 transition-all">
                        Manage Full Catalog &rarr;
                    </button>
                </div>
            </AdminCard>
        </div>
    );
}
