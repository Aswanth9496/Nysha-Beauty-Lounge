"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api/apiClient';

interface AdminSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await apiClient.post('/api/auth/logout');
            
            // Redirect to login - cookies are cleared by the backend (HttpOnly)
            router.push('/admin/login');
        } catch (error) {
            console.error('Logout failed', error);
            // Fallback redirect
            router.push('/admin/login');
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <aside className={`
            fixed inset-y-0 left-0 z-50 w-64 bg-salon-bg2 text-salon-white flex flex-col border-r border-salon-border
            transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
            {/* Header info */}
            <div className="py-8 px-6 flex items-center justify-between border-b border-salon-border lg:border-none shrink-0">
                <h1 className="font-playfair text-xl font-normal text-white italic tracking-wide">
                    Nysha<span className="text-gold not-italic ml-1 text-lg">Admin</span>
                </h1>
                {/* Close button for mobile */}
                <button
                    onClick={onClose}
                    className="lg:hidden w-8 h-8 flex items-center justify-center text-salon-gray hover:text-white transition-colors"
                >
                    <span className="text-xl leading-none">✕</span>
                </button>
            </div>

            <nav className="flex-1 min-h-0 px-4 py-4 overflow-y-auto space-y-5">
                {/* Primary */}
                <div>
                    <Link
                        href="/admin/dashboard"
                        onClick={onClose}
                        className="flex items-center space-x-3 px-4 py-2.5 rounded-none border border-transparent hover:border-gold/30 hover:bg-gold/5 transition-all duration-300 group"
                    >
                        <span className="text-base grayscale group-hover:grayscale-0 transition-all opacity-80 group-hover:opacity-100 drop-shadow-sm">📊</span>
                        <span className="font-dm-sans text-[10.5px] font-light tracking-[2px] uppercase text-salon-gray group-hover:text-gold transition-colors">Dashboard</span>
                    </Link>
                </div>

                {/* MANAGEMENT */}
                <div className="space-y-1">
                    <p className="px-4 font-dm-sans text-[8.5px] font-semibold tracking-[3px] uppercase text-salon-gray/50 mb-2">Management</p>
                    {[
                        { name: 'Categories', href: '/admin/categories', icon: '📂' },
                        { name: 'Sub-Categories', href: '/admin/subcategories', icon: '🗂️' },
                        { name: 'Services', href: '/admin/services', icon: '✂️' },
                        { name: 'Gallery', href: '/admin/gallery', icon: '🖼️' },
                    ].map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={onClose}
                            className="flex items-center space-x-3 px-4 py-2.5 rounded-none border border-transparent hover:border-gold/30 hover:bg-gold/5 transition-all duration-300 group"
                        >
                            <span className="text-base grayscale group-hover:grayscale-0 transition-all opacity-80 group-hover:opacity-100 drop-shadow-sm">{item.icon}</span>
                            <span className="font-dm-sans text-[10.5px] font-light tracking-[2px] uppercase text-salon-gray group-hover:text-gold transition-colors">{item.name}</span>
                        </Link>
                    ))}
                </div>

                {/* CONTENT */}
                <div className="space-y-1 pt-2 border-t border-salon-border/40">
                    <p className="px-4 font-dm-sans text-[8.5px] font-semibold tracking-[3px] uppercase text-salon-gray/50 mb-2 mt-2">Content</p>
                    <Link
                        href="/admin/cms"
                        onClick={onClose}
                        className="flex items-center space-x-3 px-4 py-2.5 rounded-none border border-transparent hover:border-gold/30 hover:bg-gold/5 transition-all duration-300 group"
                    >
                        <span className="text-base grayscale group-hover:grayscale-0 transition-all opacity-80 group-hover:opacity-100 drop-shadow-sm">🖼️</span>
                        <span className="font-dm-sans text-[10.5px] font-light tracking-[2px] uppercase text-salon-gray group-hover:text-gold transition-colors">CMS / Header</span>
                    </Link>
                </div>

                {/* SETTINGS */}
                <div className="space-y-1 pt-2 border-t border-salon-border/40">
                    <p className="px-4 font-dm-sans text-[8.5px] font-semibold tracking-[3px] uppercase text-salon-gray/50 mb-2 mt-2">Settings</p>
                    <Link
                        href="/admin/settings"
                        onClick={onClose}
                        className="flex items-center space-x-3 px-4 py-2.5 rounded-none border border-transparent hover:border-gold/30 hover:bg-gold/5 transition-all duration-300 group"
                    >
                        <span className="text-base grayscale group-hover:grayscale-0 transition-all opacity-80 group-hover:opacity-100 drop-shadow-sm">⚙️</span>
                        <span className="font-dm-sans text-[10.5px] font-light tracking-[2px] uppercase text-salon-gray group-hover:text-gold transition-colors">Admin Settings</span>
                    </Link>
                </div>
            </nav>

            <div className="p-4 border-t border-salon-border bg-salon-bg2 mt-auto shrink-0">
                <button 
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="w-full flex items-center space-x-3 px-4 py-2.5 border border-transparent hover:border-rose-500/30 hover:bg-rose-500/5 text-salon-gray hover:text-rose-400 transition-all duration-300 disabled:opacity-50 group"
                >
                    <span className="text-base opacity-80 group-hover:opacity-100 transition-all drop-shadow-sm">🚪</span>
                    <span className="font-dm-sans text-[10.5px] font-light tracking-[2px] uppercase">
                        {isLoggingOut ? 'Logging out...' : 'Logout'}
                    </span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
