"use client";

import React from 'react';
import AdminStatsCard from '@/components/admin/AdminStatsCard';
import AdminCard from '@/components/admin/AdminCard';
import AdminTable from '@/components/admin/AdminTable';
import AdminBadge from '@/components/admin/AdminBadge';
import AdminPageHeader from '@/components/admin/AdminPageHeader';

const recentBookings = [
    { id: '#B1280', customer: 'Sarah Johnson', service: 'Full Hair Coloring', expert: 'Elena Gilbert', date: 'Mar 12, 2024', status: 'Confirmed' },
    { id: '#B1279', customer: 'Michael Chen', service: 'Premium Men\'s Cut', expert: 'Damon Salvatore', date: 'Mar 12, 2024', status: 'Pending' },
    { id: '#B1278', customer: 'Amara Okafor', service: 'Hydra Facial', expert: 'Stefan Salvatore', date: 'Mar 11, 2024', status: 'Completed' },
    { id: '#B1277', customer: 'Isabella Rossi', service: 'Keratin Treatment', expert: 'Elena Gilbert', date: 'Mar 11, 2024', status: 'Confirmed' },
    { id: '#B1276', customer: 'James Wilson', service: 'Beard Grooming', expert: 'Damon Salvatore', date: 'Mar 10, 2024', status: 'Cancelled' },
];

export default function DashboardPage() {
    return (
        <div className="space-y-6 lg:space-y-8">
            <AdminPageHeader
                title="Management Overview"
                subtitle="Live performance metrics & recent activity"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <AdminStatsCard title="Total Bookings" value="1,248" icon="📅" trend={{ value: "12%", isUp: true }} />
                <AdminStatsCard title="Today's Revenue" value="$3,520" icon="💰" trend={{ value: "8%", isUp: true }} />
                <AdminStatsCard title="Active Experts" value="14" icon="✨" />
                <AdminStatsCard title="Customer Rating" value="4.9" icon="⭐" trend={{ value: "0.1", isUp: true }} />
            </div>

            <AdminCard title="Recent Appointments Activity">
                <AdminTable headers={['Customer', 'Service', 'Expert', 'Date', 'Status']}>
                    {recentBookings.map((booking, idx) => (
                        <tr key={idx} className="group hover:bg-white/5 transition-colors text-[10px] sm:text-[11px]">
                            <td className="px-4 py-3 sm:px-5 sm:py-4">
                                <span className="font-bold text-white tracking-widest uppercase truncate max-w-[120px] block">{booking.customer}</span>
                                <p className="text-[8px] text-salon-gray mt-0.5">{booking.id}</p>
                            </td>
                            <td className="px-4 py-3 sm:px-5 sm:py-4 text-salon-white font-light uppercase tracking-[1px]">{booking.service}</td>
                            <td className="px-4 py-3 sm:px-5 sm:py-4 text-gold/80 italic font-playfair">{booking.expert}</td>
                            <td className="px-4 py-3 sm:px-5 sm:py-4 text-salon-gray">{booking.date}</td>
                            <td className="px-4 py-3 sm:px-5 sm:py-4">
                                <AdminBadge variant={
                                    booking.status === 'Confirmed' ? 'success' :
                                        booking.status === 'Pending' ? 'warning' :
                                            booking.status === 'Completed' ? 'neutral' : 'error'
                                }>
                                    {booking.status}
                                </AdminBadge>
                            </td>
                        </tr>
                    ))}
                </AdminTable>

                <div className="mt-4 sm:mt-6 text-center pt-4 sm:pt-6 border-t border-salon-border/30">
                    <button className="text-[9px] tracking-[3px] text-gold uppercase hover:underline decoration-gold/30 underline-offset-6 transition-all">
                        View All Bookings &rarr;
                    </button>
                </div>
            </AdminCard>
        </div>
    );
}
