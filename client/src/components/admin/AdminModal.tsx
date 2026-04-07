"use client";

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface AdminModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, title, children }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !mounted) return null;

    const modalContent = (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/85 backdrop-blur-[2px] animate-in fade-in duration-300"
                onClick={onClose}
            />
            
            {/* Modal Content - Compact & Responsive */}
            <div className="relative w-full max-w-lg bg-salon-bg border border-salon-border shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col max-h-[92vh] overflow-hidden">
                {/* Header - Reduced padding */}
                <div className="px-4 py-3 border-b border-salon-border flex items-center justify-between bg-salon-bg2/80 sticky top-0 z-10">
                    <h3 className="font-playfair text-lg text-white italic tracking-wide">{title}</h3>
                    <button 
                        onClick={onClose}
                        className="w-7 h-7 flex items-center justify-center text-salon-gray hover:text-white transition-colors border border-transparent hover:border-gold/20 hover:bg-white/5"
                    >
                        <span className="text-lg leading-none">✕</span>
                    </button>
                </div>

                {/* Body - Scrollable if content too high, Compact padding */}
                <div className="p-4 sm:p-6 overflow-y-auto overflow-x-hidden custom-scrollbar">
                    {children}
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};

export default AdminModal;
