"use client";

import React from 'react';
import AdminCard from '@/components/admin/AdminCard';
import AdminTable from '@/components/admin/AdminTable';
import AdminBadge from '@/components/admin/AdminBadge';
import AdminPageHeader from '@/components/admin/AdminPageHeader';

const bookings = [
    { id: '#B001', customer: 'Anjali Sharma', service: 'Bridal Makeup', expert: 'Bonnie Bennett', date: 'Mar 15, 2024', time: '10:00 AM', status: 'Confirmed' },
    { id: '#B002', customer: 'Priya Verma', service: 'Hair Spa', expert: 'Damon Salvatore', date: 'Mar 15, 2024', time: '11:30 AM', status: 'Pending' },
    { id: '#B003', customer: 'Neha Singh', service: 'Manicure', expert: 'Caroline Forbes', date: 'Mar 15, 2024', time: '01:00 PM', status: 'Completed' },
    { id: '#B004', customer: 'Riya Kapoor', service: 'Facial Glow', expert: 'Stefan Salvatore', date: 'Mar 16, 2024', time: '02:30 PM', status: 'Cancelled' },
    { id: '#B005', customer: 'Sonia Das', service: 'Hair Styling', expert: 'Elena Gilbert', date: 'Mar 16, 2024', time: '04:00 PM', status: 'Confirmed' },
    { id: '#B006', customer: 'Meera Iyer', service: 'Pedicure', expert: 'Caroline Forbes', date: 'Mar 17, 2024', time: '10:00 AM', status: 'Pending' },
    { id: '#B007', customer: 'Alia Bhatt', service: 'Keratin', expert: 'Elena Gilbert', date: 'Mar 18, 2024', time: '01:30 PM', status: 'Confirmed' },
];

export default function BookingsPage() {
    return (
        <div className="space-y-8 lg:space-y-12">
            <AdminPageHeader
                title="Salon Bookings"
                subtitle="Appointments and scheduling oversight"
                action={{
                    label: "Create Manual Booking",
                    onClick: () => { }
                }}
                showSearch={true}
            />

            <AdminCard>
                <AdminTable headers={['Booking ID', 'Customer Name', 'Service', 'Expert', 'Date & Time', 'Status', 'Actions']}>
                    {bookings.map((booking, idx) => (
                        <tr key={idx} className="group hover:bg-white/5 transition-colors">
                            <td className="px-6 sm:px-8 py-4 sm:py-6 font-bold text-gold/60 tracking-[2px] text-[10px] uppercase italic min-w-[100px]">{booking.id}</td>
                            <td className="px-6 sm:px-8 py-4 sm:py-6">
                                <span className="text-[11px] font-bold text-white tracking-widest uppercase truncate block max-w-[150px]">{booking.customer}</span>
                            </td>
                            <td className="px-6 sm:px-8 py-4 sm:py-6 text-[10px] sm:text-[11px] text-salon-white font-light uppercase tracking-[1px]">{booking.service}</td>
                            <td className="px-6 sm:px-8 py-4 sm:py-6 text-[10px] sm:text-[11px] text-gold/80 italic font-playfair">{booking.expert}</td>
                            <td className="px-6 sm:px-8 py-4 sm:py-6">
                                <div className="space-y-0.5">
                                    <p className="text-[10px] sm:text-[11px] font-bold text-white tracking-widest uppercase">{booking.date}</p>
                                    <p className="text-[9px] text-salon-gray uppercase font-light">{booking.time}</p>
                                </div>
                            </td>
                            <td className="px-6 sm:px-8 py-4 sm:py-6">
                                <AdminBadge variant={
                                    booking.status === 'Confirmed' ? 'success' :
                                        booking.status === 'Pending' ? 'warning' :
                                            booking.status === 'Completed' ? 'neutral' : 'error'
                                }>
                                    {booking.status}
                                </AdminBadge>
                            </td>
                            <td className="px-6 sm:px-8 py-4 sm:py-6 whitespace-nowrap">
                                <div className="flex space-x-4">
                                    <button className="text-[9px] tracking-[2px] text-white hover:text-gold uppercase transition-all duration-300">Details</button>
                                    <button className="text-[9px] tracking-[2px] text-salon-gray hover:text-rose-500 uppercase transition-all duration-300">Cancel</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </AdminTable>
            </AdminCard>
        </div>
    );
}
