"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api/apiClient';

const AdminLoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        
        // Custom email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Invalid email format");
            return;
        }

        setIsLoading(true);

        try {
            const data = await apiClient.post<{ success: boolean; message?: string }>('/api/auth/login', { 
                email, 
                password 
            });

            if (data.success) {
                router.push("/admin/dashboard");
            } else {
                setError(data.message || "Invalid email or password");
                setIsLoading(false);
            }
        } catch (err: any) {
            // Specifically handle 401 Unauthorized for invalid credentials
            if (err.status === 401) {
                setError("Invalid email or password");
            } else {
                setError(err.message || "Unable to connect to server. Please try again.");
            }
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-none w-full">
                    <p className="text-red-500 font-dm-sans text-xs tracking-wide flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {error}
                    </p>
                </div>
            )}

            <div className="space-y-2">
                <label className="block font-dm-sans text-[10px] tracking-[3px] text-salon-gray uppercase ml-1">
                    Email Address
                </label>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@nysha.ae"
                    className={`w-full bg-salon-bg2 border ${error ? 'border-red-500/50' : 'border-salon-border'} px-5 py-4 text-salon-white font-dm-sans text-sm outline-none focus:border-gold transition-colors duration-300 placeholder:text-salon-gray/30`}
                />
            </div>

            <div className="space-y-2">
                <label className="block font-dm-sans text-[10px] tracking-[3px] text-salon-gray uppercase ml-1">
                    Password
                </label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full bg-salon-bg2 border ${error ? 'border-red-500/50' : 'border-salon-border'} px-5 py-4 text-salon-white font-dm-sans text-sm outline-none focus:border-gold transition-colors duration-300 placeholder:text-salon-gray/30`}
                />
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full overflow-hidden font-dm-sans text-[10px] font-light tracking-[4.5px] uppercase py-5 border border-gold text-gold bg-transparent cursor-pointer transition-colors duration-350 hover:text-salon-bg mt-4"
            >
                <div className={`absolute inset-0 bg-gold transition-transform duration-380 cubic-bezier-[0.77,0,0.18,1] ${isLoading ? 'translate-x-0' : '-translate-x-[101%] group-hover:translate-x-0'}`} />
                <span className="relative z-10">{isLoading ? 'Signing In...' : 'Sign In'}</span>
            </button>

            <div className="text-center pt-2">
                <p className="text-[10px] tracking-[2px] text-salon-gray uppercase font-light">
                    Protected secure access
                </p>
            </div>
        </form>
    );
};

export default AdminLoginForm;
