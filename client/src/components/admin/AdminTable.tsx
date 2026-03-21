"use client";

import React from 'react';

interface AdminTableProps {
    headers: string[];
    children: React.ReactNode;
}

const AdminTable: React.FC<AdminTableProps> = ({ headers, children }) => {
    return (
        <div className="w-full relative">
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gold/20 scrollbar-track-transparent">
                <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                        <tr className="border-b border-salon-border">
                            {headers.map((header, idx) => (
                                <th
                                    key={idx}
                                    className="px-4 sm:px-5 py-3 sm:py-4 text-[8px] sm:text-[9px] font-black text-salon-gray uppercase tracking-[2px]"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-salon-border/50">
                        {children}
                    </tbody>
                </table>
            </div>

            {/* Visual indicator for horizontal scroll on mobile */}
            <div className="lg:hidden absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent pointer-events-none" />
        </div>
    );
};

export default AdminTable;
