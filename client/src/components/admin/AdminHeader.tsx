"use client";

import React from 'react';

interface AdminHeaderProps {
    onMenuClick: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuClick }) => {
    return (
        <header className="h-20 border-b border-salon-border bg-salon-bg2/50 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 sticky top-0 z-40">
            <div className="flex items-center space-x-3">
                {/* Hamburger menu for mobile/tablet */}
                <button
                    onClick={onMenuClick}
                    className="lg:hidden w-9 h-9 flex items-center justify-center border border-salon-border text-gold bg-gold/5 hover:bg-gold/10 transition-colors"
                >
                    <span className="text-xl">☰</span>
                </button>

                <div className="hidden sm:flex items-center space-x-3">
                    <div className="h-px w-4 bg-gold/50" />
                    <h1 className="font-dm-sans text-[10px] font-light tracking-[3px] uppercase text-salon-gray">
                        Management
                    </h1>
                </div>
            </div>

            <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="text-right hidden xs:block">
                        <p className="text-[9px] sm:text-[10px] font-medium text-white tracking-[1px] leading-none uppercase">Admin User</p>
                        <p className="text-[7px] sm:text-[8px] text-gold mt-1 uppercase font-light tracking-[2px]">Super Admin</p>
                    </div>
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-none border border-gold/30 flex items-center justify-center text-gold bg-gold/5 shadow-inner">
                        <span className="font-playfair font-normal text-sm">A</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
