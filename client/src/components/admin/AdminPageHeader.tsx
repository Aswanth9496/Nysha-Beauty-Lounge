"use client";

import React from 'react';

interface AdminPageHeaderProps {
    title: string;
    subtitle?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    showSearch?: boolean;
    onSearch?: (value: string) => void;
}

const AdminPageHeader: React.FC<AdminPageHeaderProps> = ({ title, subtitle, action, showSearch, onSearch }) => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 relative">
            <div className="relative z-10 space-y-2">
                <div className="flex items-center space-x-3">
                    <div className="h-0.25 w-6 bg-gold" />
                    <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-normal text-white italic leading-tight">
                        {title}
                    </h2>
                </div>
                {subtitle && (
                    <p className="text-[9px] sm:text-[10px] tracking-[3px] text-salon-gray uppercase font-light ml-9 max-w-lg leading-relaxed opacity-70">
                        {subtitle}
                    </p>
                )}
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {showSearch && (
                    <div className="relative w-full sm:w-56">
                        <input
                            type="text"
                            placeholder="Search..."
                            onChange={(e) => onSearch?.(e.target.value)}
                            className="w-full bg-salon-bg2/50 border border-salon-border px-4 py-2.5 text-salon-white font-dm-sans text-[9px] tracking-[2px] uppercase outline-none focus:border-gold transition-colors placeholder:text-salon-gray/40"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-salon-gray text-xs">🔍</span>
                    </div>
                )}

                {action && (
                    <button
                        onClick={action.onClick}
                        className="group relative overflow-hidden font-dm-sans text-[9px] font-medium tracking-[2px] uppercase py-2.5 px-6 border border-gold text-gold bg-transparent cursor-pointer transition-colors duration-350 hover:text-salon-bg"
                    >
                        <div className="absolute inset-0 bg-gold -translate-x-[101%] transition-transform duration-380 cubic-bezier-[0.77,0,0.18,1] group-hover:translate-x-0" />
                        <span className="relative z-10">{action.label}</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default AdminPageHeader;
