import React from 'react';

interface AdminCardProps {
    children: React.ReactNode;
    title?: string;
    className?: string;
}

const AdminCard: React.FC<AdminCardProps> = ({ children, title, className = "" }) => {
    return (
        <div className={`bg-salon-bg2 border border-salon-border shadow-2xl relative overflow-hidden group ${className}`}>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_0%,rgba(201,168,76,0.03)_0%,transparent_70%)] pointer-events-none" />

            {title && (
                <div className="px-5 py-4 border-b border-salon-border flex items-center justify-between relative z-10">
                    <h3 className="font-dm-sans text-[10px] sm:text-[11px] font-bold tracking-[2px] sm:tracking-[3px] uppercase text-salon-gray">{title}</h3>
                    <div className="h-px w-6 bg-gold/20" />
                </div>
            )}

            <div className="p-4 sm:p-6 relative z-10">
                {children}
            </div>
        </div>
    );
};

export default AdminCard;
