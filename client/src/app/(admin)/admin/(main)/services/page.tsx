"use client";

import React from 'react';
import AdminCard from '@/components/admin/AdminCard';
import AdminTable from '@/components/admin/AdminTable';
import AdminBadge from '@/components/admin/AdminBadge';
import AdminPageHeader from '@/components/admin/AdminPageHeader';

const services = [
    { name: 'Haircut & Styling', category: 'Hair', duration: '60 min', price: '$80', status: 'Active' },
    { name: 'Hair Coloring', category: 'Hair', duration: '120 min', price: '$220', status: 'Active' },
    { name: 'Hydra Facial', category: 'Skin', duration: '45 min', price: '$150', status: 'Active' },
    { name: 'Keratin Treatment', category: 'Hair', duration: '180 min', price: '$350', status: 'Active' },
    { name: 'Gel Manicure', category: 'Nails', duration: '45 min', price: '$65', status: 'Paused' },
    { name: 'Full Glam Makeup', category: 'Makeup', duration: '90 min', price: '$180', status: 'Active' },
];

export default function ServicesPage() {
    return (
        <div className="space-y-6 lg:space-y-8">
            <AdminPageHeader
                title="Salon Services"
                subtitle="Manage your treatment menu and pricing"
                action={{
                    label: "Add Service",
                    onClick: () => { }
                }}
                showSearch={true}
            />

            <AdminCard>
                <AdminTable headers={['Service Name', 'Category', 'Duration', 'Price', 'Status', 'Actions']}>
                    {services.map((service, idx) => (
                        <tr key={idx} className="group hover:bg-white/5 transition-colors text-[10px] sm:text-[11px]">
                            <td className="px-4 py-3 sm:px-5 sm:py-4 font-bold text-white tracking-widest uppercase min-w-[150px]">{service.name}</td>
                            <td className="px-4 py-3 sm:px-5 sm:py-4">
                                <span className="text-[9px] tracking-[1px] text-salon-gray uppercase font-light italic">{service.category}</span>
                            </td>
                            <td className="px-4 py-3 sm:px-5 sm:py-4 text-salon-white font-light">{service.duration}</td>
                            <td className="px-4 py-3 sm:px-5 sm:py-4 text-gold font-bold">{service.price}</td>
                            <td className="px-4 py-3 sm:px-5 sm:py-4">
                                <AdminBadge variant={service.status === 'Active' ? 'success' : 'warning'}>
                                    {service.status}
                                </AdminBadge>
                            </td>
                            <td className="px-4 py-3 sm:px-5 sm:py-4 whitespace-nowrap">
                                <div className="flex space-x-3">
                                    <button className="text-[9px] tracking-[1px] text-white hover:text-gold uppercase transition-all duration-300">Edit</button>
                                    <button className="text-[9px] tracking-[1px] text-white/40 hover:text-rose-500 uppercase transition-all duration-300">Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </AdminTable>
            </AdminCard>
        </div>
    );
}
