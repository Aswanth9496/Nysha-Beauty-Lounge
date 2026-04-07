import React from 'react';

interface AdminBadgeProps {
    children: React.ReactNode;
    variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
}

const AdminBadge: React.FC<AdminBadgeProps> = ({ children, variant = 'info' }) => {
    const variants = {
        success: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
        warning: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
        error: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
        info: 'bg-gold/10 text-gold border-gold/20',
        neutral: 'bg-white/10 text-salon-gray border-white/20',
    };

    return (
        <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-[2px] border ${variants[variant]}`}>
            {children}
        </span>
    );
};

export default AdminBadge;
