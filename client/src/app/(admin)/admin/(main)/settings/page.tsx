"use client";

import React, { useState, useEffect } from 'react';
import AdminCard from '@/components/admin/AdminCard';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminBadge from '@/components/admin/AdminBadge';

interface AdminData {
    firstName: string;
    lastName: string;
    email: string;
}

export default function SettingsPage() {
    // Page state
    const [loading, setLoading] = useState(true);
    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const [isSavingSecurity, setIsSavingSecurity] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    // Form states
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    // Security states
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/me`, {
                credentials: 'include'
            });
            const result = await response.json();
            if (result.success) {
                setFirstName(result.data.firstName || '');
                setLastName(result.data.lastName || '');
                setEmail(result.data.email || '');
            }
        } catch (err) {
            console.error('Failed to fetch profile:', err);
            setError('Could not load profile details.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    useEffect(() => {
        if (successMsg || error) {
            const timer = setTimeout(() => {
                setSuccessMsg(null);
                setError(null);
            }, 3500);
            return () => clearTimeout(timer);
        }
    }, [successMsg, error]);

    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSavingProfile(true);
        setError(null);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/updatedetails`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email }),
                credentials: 'include'
            });
            const result = await response.json();
            if (result.success) {
                setSuccessMsg('Profile updated successfully');
            } else {
                setError(result.message || 'Update failed');
            }
        } catch (err) {
            setError('Connection error. Please try again.');
        } finally {
            setIsSavingProfile(false);
        }
    };

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('New passwords do not match');
            return;
        }

        setIsSavingSecurity(true);
        setError(null);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/updatepassword`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ currentPassword, newPassword }),
                credentials: 'include'
            });
            const result = await response.json();
            if (result.success) {
                setSuccessMsg('Security settings updated');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                setError(result.message || 'Security update failed');
            }
        } catch (err) {
            setError('Connection error.');
        } finally {
            setIsSavingSecurity(false);
        }
    };

    if (loading) {
        return (
            <div className="py-40 text-center">
                <div className="inline-block w-8 h-8 border-2 border-gold/20 border-t-gold animate-spin mb-4" />
                <p className="text-[10px] uppercase tracking-[3px] text-salon-gray italic">Loading administrative configuration...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 lg:space-y-8">
            <AdminPageHeader
                title="Admin Settings"
                subtitle="Configure your profile and system preferences"
            />

            {successMsg && (
                <div className="fixed top-24 right-8 z-[60] bg-gold text-salon-bg px-6 py-3 shadow-2xl animate-in slide-in-from-right duration-500 font-dm-sans text-[10px] tracking-[2px] uppercase font-bold">
                    ✨ {successMsg}
                </div>
            )}

            {error && (
                <div className="fixed top-24 right-8 z-[60] bg-rose-600 text-white px-6 py-3 shadow-2xl animate-in slide-in-from-right duration-500 font-dm-sans text-[10px] tracking-[2px] uppercase font-bold">
                    ⚠️ {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
                
                {/* Profile Settings */}
                <div className="lg:col-span-2 space-y-6">
                    <AdminCard title="Account Profile">
                        <form onSubmit={handleSaveProfile} className="space-y-5">
                            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center pb-4 border-b border-salon-border/30">
                                <div className="relative group">
                                    <div className="w-20 h-20 border-2 border-gold/30 p-1 flex items-center justify-center bg-salon-bg2 overflow-hidden shadow-lg">
                                        <span className="text-2xl font-playfair text-gold/40 italic">{firstName.charAt(0)}</span>
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gold text-salon-bg border border-white/20 flex items-center justify-center text-[10px] shadow-md opacity-40 cursor-not-allowed">
                                        📷
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-[11px] font-bold text-white tracking-[2px] uppercase">{firstName} {lastName}</h4>
                                    <div className="flex gap-2 items-center">
                                        <AdminBadge variant="success">Active Admin</AdminBadge>
                                        <span className="text-[9px] text-salon-gray italic">Managing {email}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-[9px] uppercase tracking-[2px] text-salon-gray font-semibold ml-1">First Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full bg-salon-bg2 border border-salon-border px-4 py-3 text-white font-dm-sans text-[10.5px] tracking-widest uppercase outline-none focus:border-gold transition-all"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[9px] uppercase tracking-[2px] text-salon-gray font-semibold ml-1">Last Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="w-full bg-salon-bg2 border border-salon-border px-4 py-3 text-white font-dm-sans text-[10.5px] tracking-widest uppercase outline-none focus:border-gold transition-all"
                                    />
                                </div>
                                <div className="space-y-1.5 sm:col-span-2">
                                    <label className="text-[9px] uppercase tracking-[2px] text-salon-gray font-semibold ml-1">Administrator Email</label>
                                    <input
                                        required
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-salon-bg2 border border-salon-border px-4 py-3 text-white font-dm-sans text-[10.5px] tracking-widest outline-none focus:border-gold transition-all"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSavingProfile}
                                    className="px-8 py-3 bg-gold text-salon-bg text-[10px] font-bold uppercase tracking-[3px] hover:bg-white transition-all disabled:opacity-50"
                                >
                                    {isSavingProfile ? 'Updating...' : 'Save Profile'}
                                </button>
                            </div>
                        </form>
                    </AdminCard>

                    <AdminCard title="Change Security Password">
                        <form onSubmit={handleUpdatePassword} className="space-y-5">
                            <div className="grid grid-cols-1 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-[9px] uppercase tracking-[2px] text-salon-gray font-semibold ml-1">Current Password</label>
                                    <input
                                        required
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-salon-bg2 border border-salon-border px-4 py-3 text-white font-dm-sans text-[10.5px] tracking-widest outline-none focus:border-gold transition-all"
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] uppercase tracking-[2px] text-salon-gray font-semibold ml-1">New Password</label>
                                        <input
                                            required
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="Min 6 characters"
                                            className="w-full bg-salon-bg2 border border-salon-border px-4 py-3 text-white font-dm-sans text-[10.5px] tracking-widest outline-none focus:border-gold transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] uppercase tracking-[2px] text-salon-gray font-semibold ml-1">Confirm New Password</label>
                                        <input
                                            required
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Match new password"
                                            className="w-full bg-salon-bg2 border border-salon-border px-4 py-3 text-white font-dm-sans text-[10.5px] tracking-widest outline-none focus:border-gold transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSavingSecurity}
                                    className="px-8 py-3 bg-transparent border border-gold/30 text-gold text-[10px] font-bold uppercase tracking-[3px] hover:bg-gold hover:text-salon-bg transition-all disabled:opacity-50"
                                >
                                    {isSavingSecurity ? 'Securing...' : 'Update Security'}
                                </button>
                            </div>
                        </form>
                    </AdminCard>
                </div>

                {/* System Settings Side Bar */}
                <div className="space-y-6">
                    <AdminCard title="System Info">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-salon-border/20">
                                <span className="text-[9px] uppercase tracking-wider text-salon-gray">Build Version</span>
                                <span className="text-[10px] text-white font-mono">1.1.0-prod</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-salon-border/20">
                                <span className="text-[9px] uppercase tracking-wider text-salon-gray">Connected DB</span>
                                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest text-right">MongoDB Cloud</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-[9px] uppercase tracking-wider text-salon-gray">API Status</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[10px] text-white/80 tracking-widest">ONLINE</span>
                                </div>
                            </div>
                        </div>
                    </AdminCard>

                    <AdminCard title="Admin Workspace">
                        <div className="space-y-4">
                            <p className="text-[8px] text-salon-gray leading-relaxed uppercase tracking-[2px] opacity-60">
                                This workspace allows you to manage the entire Salon Nysha ecosystem. For technical support, contact the digital team.
                            </p>
                            <div className="pt-2">
                                <div className="text-[9px] text-gold tracking-[3px] uppercase italic">#PremiumManagement</div>
                            </div>
                        </div>
                    </AdminCard>
                </div>

            </div>
        </div>
    );
}
