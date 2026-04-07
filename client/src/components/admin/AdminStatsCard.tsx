import React from 'react';

interface AdminStatsCardProps {
    title: string;
    value: string | number;
    icon: string;
    trend?: {
        value: string;
        isUp: boolean;
    };
}

const AdminStatsCard: React.FC<AdminStatsCardProps> = ({ title, value, icon, trend }) => {
    return (
        <div className="bg-salon-bg2 border border-salon-border p-8 relative overflow-hidden group hover:border-gold/30 transition-all duration-500">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_100%,rgba(201,168,76,0.02)_0%,transparent_70%)] pointer-events-none" />

            <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 border border-gold/20 flex items-center justify-center text-xl bg-gold/5 text-gold animate-pulse">
                    {icon}
                </div>
                {trend && (
                    <span className={`text-[10px] font-black uppercase tracking-widest ${trend.isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {trend.isUp ? '↑' : '↓'} {trend.value}
                    </span>
                )}
            </div>

            <div className="space-y-1">
                <h3 className="text-[10px] tracking-[3px] text-salon-gray uppercase font-light">
                    {title}
                </h3>
                <p className="text-3xl font-playfair italic text-white leading-none">
                    {value}
                </p>
            </div>

            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gold/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
        </div>
    );
};

export default AdminStatsCard;
