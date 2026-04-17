"use client";

import React, { useState, useEffect } from 'react';
import AdminCard from '@/components/admin/AdminCard';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { apiClient } from '@/lib/api/apiClient';
import { config } from '@/lib/api/config';

interface HeaderContent {
    _id: string;
    logo?: string;
    sub_title?: string;
    phone_number?: string;
    secondary_phone_number?: string;
    email?: string;
    address?: string;
    latitude?: string;
    longitude?: string;
    banner_images?: string[];
    banner_text?: string;
    shop_image_1?: string;
    shop_image_2?: string;
    isActive: boolean;
    createdAt?: string;
}

interface BannerItem {
    id: string;
    type: 'existing' | 'new';
    url: string;
    file?: File;
}

export default function CMSPage() {
    const [header, setHeader] = useState<HeaderContent | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    // Form states
    const [subTitle, setSubTitle] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [secondaryPhoneNumber, setSecondaryPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [bannerText, setBannerText] = useState('');
    const [isActive, setIsActive] = useState(true);

    // Image/Preview states
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);

    const [shopImage1File, setShopImage1File] = useState<File | null>(null);
    const [shopImage1Preview, setShopImage1Preview] = useState<string | null>(null);

    const [shopImage2File, setShopImage2File] = useState<File | null>(null);
    const [shopImage2Preview, setShopImage2Preview] = useState<string | null>(null);

    const [bannerItems, setBannerItems] = useState<BannerItem[]>([]);

    const fetchCMSData = async () => {
        try {
            setLoading(true);
            const result = await apiClient.get<{ success: boolean; data: HeaderContent[] }>('/api/header');
            if (result.success && result.data && result.data.length > 0) {
                const data = result.data[0];
                setHeader(data);
                setSubTitle(data.sub_title || '');
                setPhoneNumber(data.phone_number || '');
                setSecondaryPhoneNumber(data.secondary_phone_number || '');
                setEmail(data.email || '');
                setAddress(data.address || '');
                setLatitude(data.latitude || '');
                setLongitude(data.longitude || '');
                setBannerText(data.banner_text || '');
                setIsActive(data.isActive);

                if (data.logo) setLogoPreview(`${config.API_BASE_URL}${data.logo}`);
                if (data.shop_image_1) setShopImage1Preview(`${config.API_BASE_URL}${data.shop_image_1}`);
                if (data.shop_image_2) setShopImage2Preview(`${config.API_BASE_URL}${data.shop_image_2}`);

                if (data.banner_images) {
                    setBannerItems(data.banner_images.map((img: string, idx: number) => ({
                        id: `existing-${idx}`,
                        type: 'existing',
                        url: img
                    })));
                }
            }
        } catch (err: any) {
            setError(err.message || 'Connection failed');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCMSData();
    }, []);

    useEffect(() => {
        if (successMsg) {
            const timer = setTimeout(() => setSuccessMsg(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [successMsg]);

    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = (phone: string) => /^\+?[\d\s\-()]{7,20}$/.test(phone);

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setLogoFile(file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const handleShopImage1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setShopImage1File(file);
            setShopImage1Preview(URL.createObjectURL(file));
        }
    };

    const handleShopImage2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setShopImage2File(file);
            setShopImage2Preview(URL.createObjectURL(file));
        }
    };

    const removeBannerItem = (id: string) => {
        setBannerItems(bannerItems.filter(item => item.id !== id));
    };

    const handleBannerAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            const remaining = 2 - bannerItems.length;
            const toAdd = filesArray.slice(0, remaining);

            const newItems: BannerItem[] = toAdd.map(file => ({
                id: Math.random().toString(36).substr(2, 9),
                type: 'new',
                url: URL.createObjectURL(file),
                file: file
            }));

            setBannerItems([...bannerItems, ...newItems]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (email && !validateEmail(email)) return setError('Invalid email');
        if (phoneNumber && !validatePhone(phoneNumber)) return setError('Invalid primary phone');
        if (secondaryPhoneNumber && !validatePhone(secondaryPhoneNumber)) return setError('Invalid secondary phone');

        setSubmitting(true);

        try {
            const uploadData = new FormData();
            uploadData.append('sub_title', subTitle);
            uploadData.append('phone_number', phoneNumber);
            uploadData.append('secondary_phone_number', secondaryPhoneNumber);
            uploadData.append('email', email);
            uploadData.append('address', address);
            uploadData.append('latitude', latitude);
            uploadData.append('longitude', longitude);
            uploadData.append('banner_text', bannerText);
            uploadData.append('isActive', String(isActive));

            if (logoFile) uploadData.append('logo', logoFile);
            else if (!logoPreview && header?.logo) uploadData.append('logo', '');

            if (shopImage1File) uploadData.append('shop_image_1', shopImage1File);
            else if (!shopImage1Preview && header?.shop_image_1) uploadData.append('shop_image_1', '');

            if (shopImage2File) uploadData.append('shop_image_2', shopImage2File);
            else if (!shopImage2Preview && header?.shop_image_2) uploadData.append('shop_image_2', '');

            bannerItems.forEach(item => {
                if (item.type === 'existing') uploadData.append('banner_images', item.url);
                else if (item.file) uploadData.append('banner_images', item.file);
            });

            if (bannerItems.length === 0) uploadData.append('banner_images', '');

            const url = header
                ? `/api/header/${header._id}`
                : `/api/header`;

            const method = header ? 'PATCH' : 'POST';

            const result = await apiClient.request<{ success: boolean; data: HeaderContent; message?: string }>(url, {
                method,
                body: uploadData
            });

            if (result.success) {
                setSuccessMsg('Integrated successfully');
                const updatedData = result.data;
                setHeader(updatedData);
                setLogoFile(null);
                setShopImage1File(null);
                setShopImage2File(null);

                if (updatedData.logo) setLogoPreview(`${config.API_BASE_URL}${updatedData.logo}`);
                if (updatedData.shop_image_1) setShopImage1Preview(`${config.API_BASE_URL}${updatedData.shop_image_1}`);
                if (updatedData.shop_image_2) setShopImage2Preview(`${config.API_BASE_URL}${updatedData.shop_image_2}`);

                if (updatedData.banner_images) {
                    setBannerItems(updatedData.banner_images.map((img: string, idx: number) => ({
                        id: `existing-${Date.now()}-${idx}`,
                        type: 'existing',
                        url: img
                    })));
                } else setBannerItems([]);
            } else setError(result.message || 'Update failed');
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="w-8 h-8 border-2 border-gold/10 border-t-gold animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-4 max-w-6xl mx-auto pb-6">
            <AdminPageHeader
                title="CMS Management"
                subtitle="Streamlined platform architecture"
            />

            {successMsg && (
                <div className="fixed top-24 right-8 z-[60] bg-gold text-salon-bg px-6 py-2 shadow-2xl animate-in slide-in-from-right duration-500 font-bold uppercase text-[10px] tracking-widest">
                    {successMsg}
                </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-8 space-y-5">

                    <AdminCard title="Brand Identity & Contact">
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[9px] uppercase tracking-wider text-salon-gray font-bold">Brand Narrative</label>
                                <input
                                    type="text"
                                    value={subTitle}
                                    onChange={(e) => setSubTitle(e.target.value)}
                                    placeholder="Narrative subheading"
                                    className="w-full bg-salon-bg/30 border border-salon-border px-4 py-3 text-white text-[11px] outline-none focus:border-gold/30 transition-all font-light"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-wider text-salon-gray font-bold">Phone (Primary)</label>
                                    <input
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder="+1..."
                                        className="w-full bg-salon-bg/30 border border-salon-border px-4 py-3 text-white text-[11px] outline-none focus:border-gold/30 transition-all"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-wider text-salon-gray font-bold">Phone (Secondary)</label>
                                    <input
                                        type="tel"
                                        value={secondaryPhoneNumber}
                                        onChange={(e) => setSecondaryPhoneNumber(e.target.value)}
                                        placeholder="+1..."
                                        className="w-full bg-salon-bg/30 border border-salon-border px-4 py-3 text-white text-[11px] outline-none focus:border-gold/30 transition-all"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-wider text-salon-gray font-bold">Official Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="email@salon.com"
                                        className="w-full bg-salon-bg/30 border border-salon-border px-4 py-3 text-white text-[11px] outline-none focus:border-gold/30 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[9px] uppercase tracking-wider text-salon-gray font-bold">Physical Address</label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Full venue address"
                                    className="w-full bg-salon-bg/30 border border-salon-border px-4 py-3 text-white text-[11px] outline-none focus:border-gold/30 transition-all font-light"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-wider text-salon-gray font-bold">Latitude</label>
                                    <input
                                        type="text"
                                        value={latitude}
                                        onChange={(e) => setLatitude(e.target.value)}
                                        placeholder="25.04..."
                                        className="w-full bg-salon-bg/30 border border-salon-border px-4 py-3 text-white text-[11px] outline-none focus:border-gold/30 transition-all font-light"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-wider text-salon-gray font-bold">Longitude</label>
                                    <input
                                        type="text"
                                        value={longitude}
                                        onChange={(e) => setLongitude(e.target.value)}
                                        placeholder="55.21..."
                                        className="w-full bg-salon-bg/30 border border-salon-border px-4 py-3 text-white text-[11px] outline-none focus:border-gold/30 transition-all font-light"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[9px] uppercase tracking-wider text-salon-gray font-bold">Hero Narrative</label>
                                <textarea
                                    rows={3}
                                    value={bannerText}
                                    onChange={(e) => setBannerText(e.target.value)}
                                    placeholder="Main landing story"
                                    className="w-full bg-salon-bg/30 border border-salon-border px-4 py-3 text-white text-[11px] outline-none focus:border-gold/30 transition-all font-light resize-none italic"
                                />
                            </div>
                        </div>
                    </AdminCard>

                    <AdminCard title="Physical Venue Imagery">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { label: 'Entrance / Lobby', preview: shopImage1Preview, setFile: setShopImage1File, setPreview: setShopImage1Preview, id: 'shop1' },
                                { label: 'Treatment Space', preview: shopImage2Preview, setFile: setShopImage2File, setPreview: setShopImage2Preview, id: 'shop2' }
                            ].map((slot, i) => (
                                <div key={slot.id} className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-widest text-salon-gray font-bold">{slot.label}</label>
                                    <div className="aspect-video border border-gold/10 bg-salon-bg2 relative overflow-hidden group">
                                        {slot.preview ? (
                                            <>
                                                <img src={slot.preview} className="w-full h-full object-cover" alt={slot.label} />
                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                                                    <label className="px-3 py-1.5 bg-gold text-salon-bg text-[8px] font-bold tracking-widest uppercase cursor-pointer">Replace</label>
                                                    <button type="button" onClick={() => { slot.setFile(null); slot.setPreview(null); }} className="px-3 py-1.5 bg-rose-600 text-white text-[8px] font-bold tracking-widest uppercase">Remove</button>
                                                </div>
                                                <input type="file" accept="image/*" className="hidden" style={{ display: 'none' }} id={`${slot.id}-input`} onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) { slot.setFile(file); slot.setPreview(URL.createObjectURL(file)); }
                                                }} />
                                                <label htmlFor={`${slot.id}-input`} className="absolute inset-0 cursor-pointer hidden"></label>
                                            </>
                                        ) : (
                                            <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gold/5 transition-all">
                                                <span className="text-xl mb-1 opacity-20 group-hover:opacity-60 transition-all">📷</span>
                                                <span className="text-[8px] uppercase tracking-[2px] text-salon-gray font-bold">Upload Image</span>
                                                <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) { slot.setFile(file); slot.setPreview(URL.createObjectURL(file)); }
                                                }} />
                                            </label>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AdminCard>
                </div>

                <div className="lg:col-span-4 space-y-5">
                    <AdminCard title="Global Assets">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex-1 space-y-1">
                                    <label className="text-[8px] uppercase tracking-widest text-salon-gray font-bold">Logo</label>
                                    <div className="h-20 border border-gold/10 bg-white/5 flex items-center justify-center p-4 relative group">
                                        {logoPreview ? (
                                            <>
                                                <img src={logoPreview} className="max-h-full object-contain" alt="L" />
                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                                                    <button type="button" onClick={() => { setLogoFile(null); setLogoPreview(null); }} className="text-rose-500 text-[8px] font-bold uppercase">Discard</button>
                                                </div>
                                            </>
                                        ) : (
                                            <label className="w-full h-full flex items-center justify-center cursor-pointer hover:bg-gold/5 transition-all">
                                                <span className="text-xl opacity-20">🏺</span>
                                                <input type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
                                            </label>
                                        )}
                                    </div>
                                    {logoPreview && !logoFile && (
                                        <label className="block w-full text-center py-1.5 border border-gold/10 text-gold text-[7px] font-bold tracking-widest uppercase cursor-pointer hover:bg-gold/5">
                                            Update
                                            <input type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
                                        </label>
                                    )}
                                </div>
                                <div className="flex-1 space-y-1">
                                    <label className="text-[8px] uppercase tracking-widest text-salon-gray font-bold">Active</label>
                                    <div className="h-20 flex flex-col items-center justify-center space-y-2">
                                        <div
                                            className={`w-10 h-5 p-1 flex items-center cursor-pointer transition-all duration-300 ${isActive ? 'bg-gold shadow-[0_0_15px_rgba(212,175,55,0.2)]' : 'bg-salon-border/50'}`}
                                            onClick={() => setIsActive(!isActive)}
                                        >
                                            <div className={`w-3 h-3 bg-white transition-transform duration-300 ${isActive ? 'translate-x-5' : 'translate-x-0'}`} />
                                        </div>
                                        <span className="text-[7px] uppercase font-bold text-white">{isActive ? 'LIVE' : 'DRAFT'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-salon-border">
                                <label className="text-[9px] uppercase tracking-wider text-salon-gray font-bold">Hero Banners</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {bannerItems.map(item => (
                                        <div key={item.id} className="aspect-square border border-gold/10 bg-salon-bg2 relative overflow-hidden group">
                                            <img src={item.type === 'existing' ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.url}` : item.url} className="w-full h-full object-cover" alt="Banner" />
                                            <button type="button" onClick={() => removeBannerItem(item.id)} className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white text-[8px] flex items-center justify-center">✕</button>
                                        </div>
                                    ))}
                                    {bannerItems.length < 2 && (
                                        <label className="aspect-square border border-dashed border-salon-border flex items-center justify-center cursor-pointer hover:bg-gold/5 transition-all">
                                            <span className="text-xl opacity-20">+</span>
                                            <input type="file" accept="image/*" className="hidden" onChange={handleBannerAdd} />
                                        </label>
                                    )}
                                </div>
                            </div>
                        </div>
                    </AdminCard>

                    <div className="space-y-4">
                        {error && (
                            <div className="p-3 bg-rose-900/20 border-l-2 border-rose-500 text-rose-300 text-[10px] tracking-widest uppercase font-bold italic">
                                {error}
                            </div>
                        )}
                        <button
                            type="submit"
                            disabled={submitting}
                            className={`w-full py-4 text-[11px] font-black uppercase tracking-[5px] transition-all duration-500 ${submitting ? 'bg-salon-border text-salon-gray cursor-wait' : 'bg-gold text-salon-bg hover:bg-white'
                                }`}
                        >
                            {submitting ? 'SYNCING...' : 'SYNC ARCHIVE'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
