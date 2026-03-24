"use client";

import React, { useState, useEffect } from 'react';
import AdminCard from '@/components/admin/AdminCard';
import AdminTable from '@/components/admin/AdminTable';
import AdminBadge from '@/components/admin/AdminBadge';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminModal from '@/components/admin/AdminModal';

interface Category {
    _id: string;
    name: string;
}

interface SubCategory {
    _id: string;
    categoryId: Category | string;
    name: string;
}

interface Variant {
    label: string;
    experience?: string;
    amount: number;
    duration?: string;
    is_visible: boolean;
    sort_order: number;
}

interface Service {
    _id: string;
    subCategoryId: SubCategory | string;
    title: string;
    subtitle?: string;
    description?: string;
    duration?: string;
    amount?: number;
    has_variants: boolean;
    variants: Variant[];
    image_url?: string;
    whats_included?: string[];
    is_visible: boolean;
    sort_order: number;
    createdAt?: string;
}

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    // Filter state
    const [filterSubCategoryId, setFilterSubCategoryId] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Form states
    const [title, setTitle] = useState('');
    const [subCategoryId, setSubCategoryId] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [amount, setAmount] = useState('');
    const [hasVariants, setHasVariants] = useState(false);
    const [variants, setVariants] = useState<Variant[]>([]);
    const [whatsIncluded, setWhatsIncluded] = useState<string>('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isVisible, setIsVisible] = useState(true);
    const [sortOrder, setSortOrder] = useState('0');

    const fetchServices = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/api/services', { credentials: 'include' });
            const result = await response.json();
            if (result.success) setServices(result.data);
        } catch (err) {
            console.error('Failed to fetch services:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchDropdowns = async () => {
        try {
            const [catRes, subRes] = await Promise.all([
                fetch('http://localhost:5000/api/categories', { credentials: 'include' }),
                fetch('http://localhost:5000/api/subcategories', { credentials: 'include' })
            ]);
            const catResult = await catRes.json();
            const subResult = await subRes.json();
            if (catResult.success) setCategories(catResult.data);
            if (subResult.success) setSubCategories(subResult.data);
        } catch (err) {
            console.error('Failed to fetch dropdown data:', err);
        }
    };

    useEffect(() => {
        fetchServices();
        fetchDropdowns();
    }, []);

    useEffect(() => {
        if (successMsg) {
            const timer = setTimeout(() => setSuccessMsg(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [successMsg]);

    const resetForm = () => {
        setTitle('');
        setSubCategoryId('');
        setSubtitle('');
        setDescription('');
        setDuration('');
        setAmount('');
        setHasVariants(false);
        setVariants([]);
        setWhatsIncluded('');
        setImageFile(null);
        setIsVisible(true);
        setSortOrder('0');
        setError(null);
        setIsEditMode(false);
        setSelectedService(null);
    };

    const handleAddVariant = () => {
        setVariants([...variants, { label: '', experience: '', amount: 0, duration: '', is_visible: true, sort_order: variants.length }]);
    };

    const handleRemoveVariant = (index: number) => {
        setVariants(variants.filter((_, i) => i !== index));
    };

    const handleVariantChange = (index: number, field: keyof Variant, value: any) => {
        const newVariants = [...variants];
        (newVariants[index] as any)[field] = value;
        setVariants(newVariants);
    };

    const handleEdit = (service: Service) => {
        setSelectedService(service);
        setTitle(service.title);
        setSubCategoryId(typeof service.subCategoryId === 'object' ? service.subCategoryId._id : service.subCategoryId);
        setSubtitle(service.subtitle || '');
        setDescription(service.description || '');
        setDuration(service.duration || '');
        setAmount(String(service.amount || ''));
        setHasVariants(service.has_variants);
        setVariants(service.variants || []);
        setWhatsIncluded(service.whats_included?.join(', ') || '');
        setIsVisible(service.is_visible);
        setSortOrder(String(service.sort_order || 0));
        setIsEditMode(true);
        setIsFormModalOpen(true);
    };

    const handleDeleteClick = (service: Service) => {
        setSelectedService(service);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedService) return;
        setSubmitting(true);
        try {
            const response = await fetch(`http://localhost:5000/api/services/${selectedService._id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            const result = await response.json();
            if (result.success) {
                setSuccessMsg('Service deleted successfully');
                setIsDeleteModalOpen(false);
                fetchServices();
            } else {
                setError(result.message || 'Deletion failed');
            }
        } catch (err) {
            setError('Connection error');
        } finally {
            setSubmitting(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        if (!subCategoryId) {
            setError('Please select a sub-category');
            setSubmitting(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('subCategoryId', subCategoryId);
            formData.append('subtitle', subtitle);
            formData.append('description', description);
            formData.append('duration', duration);
            formData.append('has_variants', String(hasVariants));
            formData.append('is_visible', String(isVisible));
            formData.append('sort_order', sortOrder);
            
            if (hasVariants) {
                formData.append('variants', JSON.stringify(variants));
            } else {
                formData.append('amount', amount);
            }

            if (whatsIncluded) {
                const includedArray = whatsIncluded.split(',').map(item => item.trim()).filter(Boolean);
                formData.append('whats_included', JSON.stringify(includedArray));
            }

            if (imageFile) {
                formData.append('image_url', imageFile);
            }

            const url = isEditMode && selectedService 
                ? `http://localhost:5000/api/services/${selectedService._id}` 
                : 'http://localhost:5000/api/services';
            
            const method = isEditMode ? 'PATCH' : 'POST';

            const response = await fetch(url, {
                method,
                body: formData,
                credentials: 'include'
            });

            const result = await response.json();
            if (result.success) {
                setSuccessMsg(isEditMode ? 'Service updated' : 'Service created');
                setIsFormModalOpen(false);
                resetForm();
                fetchServices();
            } else {
                setError(result.message || 'Action failed');
            }
        } catch (err) {
            setError('An error occurred');
        } finally {
            setSubmitting(false);
        }
    };

    const getSubCategoryName = (sub: SubCategory | string) => {
        if (typeof sub === 'object') return sub.name;
        const found = subCategories.find(s => s._id === sub);
        return found ? found.name : 'Unknown';
    };

    const filteredServices = services.filter(s => {
        const matchesSub = filterSubCategoryId === 'all' || (typeof s.subCategoryId === 'object' ? s.subCategoryId._id : s.subCategoryId) === filterSubCategoryId;
        const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSub && matchesSearch;
    });

    return (
        <div className="space-y-6 lg:space-y-8">
            <AdminPageHeader
                title="Salon Services"
                subtitle="Manage individual treatment details and pricing"
                action={{
                    label: "Add Service",
                    onClick: () => setIsFormModalOpen(true)
                }}
                onSearch={setSearchTerm}
                showSearch={true}
            />

            {successMsg && (
                <div className="fixed top-24 right-8 z-[60] bg-gold text-salon-bg px-6 py-3 shadow-2xl font-dm-sans text-[10px] tracking-[2px] uppercase font-bold">
                    {successMsg}
                </div>
            )}

            <AdminCard>
                <div className="mb-6 flex flex-wrap items-center gap-6 border-b border-salon-border/30 pb-6 px-1">
                    <div className="space-y-1.5 flex-1 min-w-[240px] max-w-sm relative group">
                        <label className="text-[8px] uppercase tracking-[3px] text-salon-gray font-bold ml-1 flex items-center gap-2">
                             Filter by Menu
                            <span className="w-1.5 h-1.5 rounded-full bg-gold/40" />
                        </label>
                        <select
                            value={filterSubCategoryId}
                            onChange={(e) => setFilterSubCategoryId(e.target.value)}
                            className="w-full bg-salon-bg/20 border border-salon-border/50 px-4 py-3 text-white font-dm-sans text-[10px] tracking-[2px] uppercase outline-none focus:border-gold/50 transition-all appearance-none cursor-pointer hover:bg-white/5"
                        >
                            <option value="all" className="bg-salon-bg2">All Sub-Categories</option>
                            {subCategories.map(sub => (
                                <option key={sub._id} value={sub._id} className="bg-salon-bg2">{sub.name}</option>
                            ))}
                        </select>
                        <div className="absolute right-4 bottom-3.5 pointer-events-none opacity-40">
                            <svg className="w-3 h-3 fill-gold" viewBox="0 0 20 20">
                                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="py-20 text-center">
                        <div className="inline-block w-8 h-8 border-2 border-gold/10 border-t-gold animate-spin mb-4" />
                        <p className="text-[10px] uppercase tracking-[3px] text-salon-gray italic">Loading treatment catalog...</p>
                    </div>
                ) : (
                    <AdminTable headers={['Service', 'Menu', 'Price/Variants', 'Duration', 'Status', 'Actions']}>
                        {filteredServices.map((service) => (
                            <tr key={service._id} className="group hover:bg-white/5 transition-colors text-[10px] sm:text-[11px]">
                                <td className="px-4 py-3 sm:px-5 sm:py-4 font-bold text-white tracking-widest uppercase truncate max-w-[200px]">
                                    {service.title}
                                </td>
                                <td className="px-4 py-3 sm:px-5 sm:py-4 italic text-salon-gray">
                                    {getSubCategoryName(service.subCategoryId)}
                                </td>
                                <td className="px-4 py-3 sm:px-5 sm:py-4 text-gold/90 font-medium">
                                    {service.has_variants 
                                        ? `${service.variants?.length} Options` 
                                        : `AED ${service.amount}`}
                                </td>
                                <td className="px-4 py-3 sm:px-5 sm:py-4 text-white/60">
                                    {service.duration || 'N/A'}
                                </td>
                                <td className="px-4 py-3 sm:px-5 sm:py-4">
                                    <AdminBadge variant={service.is_visible ? 'success' : 'warning'}>
                                        {service.is_visible ? 'Visible' : 'Hidden'}
                                    </AdminBadge>
                                </td>
                                <td className="px-4 py-3 sm:px-5 sm:py-4 whitespace-nowrap">
                                    <div className="flex space-x-3">
                                        <button onClick={() => handleEdit(service)} className="text-[9px] tracking-[1px] text-white hover:text-gold uppercase transition-all duration-300">Edit</button>
                                        <button onClick={() => handleDeleteClick(service)} className="text-[9px] tracking-[1px] text-white/40 hover:text-rose-500 uppercase transition-all duration-300">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </AdminTable>
                )}
            </AdminCard>

            <AdminModal 
                isOpen={isFormModalOpen} 
                onClose={() => { setIsFormModalOpen(false); resetForm(); }} 
                title={isEditMode ? "Update Service Offer" : "Define New Service"}
            >
                <form onSubmit={handleSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto no-scrollbar px-1">
                    {error && (
                        <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] tracking-wider uppercase font-medium mb-4">
                            {error}
                        </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[8px] uppercase tracking-[2px] text-salon-gray font-bold">Parent Sub-Category (Menu)</label>
                            <select
                                required
                                value={subCategoryId}
                                onChange={(e) => setSubCategoryId(e.target.value)}
                                className="w-full bg-salon-bg2 border border-salon-border px-4 py-3 text-white font-dm-sans text-[11px] tracking-widest uppercase outline-none focus:border-gold transition-all appearance-none cursor-pointer"
                            >
                                <option value="" disabled>Select Menu</option>
                                {subCategories.map(sub => (
                                    <option key={sub._id} value={sub._id}>{sub.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[8px] uppercase tracking-[2px] text-salon-gray font-bold">Service Title</label>
                            <input
                                required
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Master Precision Cut"
                                className="w-full bg-salon-bg2 border border-salon-border px-4 py-3 text-white font-dm-sans text-[11px] tracking-widest uppercase outline-none focus:border-gold transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[8px] uppercase tracking-[2px] text-salon-gray font-bold">Subtitle / Tagline</label>
                        <input
                            type="text"
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                            placeholder="e.g. Luxurious styling by master artisans"
                            className="w-full bg-salon-bg2 border border-salon-border px-4 py-3 text-white font-dm-sans text-[11px] tracking-wide outline-none focus:border-gold transition-all"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[8px] uppercase tracking-[2px] text-salon-gray font-bold">Detailed Description</label>
                        <textarea
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe the clinical/aesthetic values of this treatment..."
                            className="w-full bg-salon-bg2 border border-salon-border px-4 py-3 text-white font-dm-sans text-[11px] outline-none focus:border-gold transition-all resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[8px] uppercase tracking-[2px] text-salon-gray font-bold">Pricing Type</label>
                            <div className="flex gap-4 p-1">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input type="radio" checked={!hasVariants} onChange={() => setHasVariants(false)} className="accent-gold h-3 w-3" />
                                    <span className={`text-[9px] uppercase tracking-widest ${!hasVariants ? 'text-gold' : 'text-salon-gray'}`}>Standard Price</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input type="radio" checked={hasVariants} onChange={() => setHasVariants(true)} className="accent-gold h-3 w-3" />
                                    <span className={`text-[9px] uppercase tracking-widest ${hasVariants ? 'text-gold' : 'text-salon-gray'}`}>Multiple Variants</span>
                                </label>
                            </div>
                        </div>

                        {!hasVariants ? (
                            <div className="space-y-1.5">
                                <label className="text-[8px] uppercase tracking-[2px] text-salon-gray font-bold">Base Amount (AED)</label>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="499"
                                    className="w-full bg-salon-bg2 border border-salon-border px-4 py-3 text-gold font-dm-sans text-[12px] outline-none focus:border-gold transition-all"
                                />
                            </div>
                        ) : (
                             <div className="space-y-1.5">
                                <label className="text-[8px] uppercase tracking-[2px] text-salon-gray font-bold">Default Duration</label>
                                <input
                                    type="text"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    placeholder="e.g. 60 mins"
                                    className="w-full bg-salon-bg2 border border-salon-border px-4 py-3 text-white font-dm-sans text-[11px] outline-none focus:border-gold transition-all"
                                />
                            </div>
                        )}
                    </div>

                    {hasVariants && (
                        <div className="space-y-3 p-4 border border-gold/10 bg-white/[0.01]">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="text-[9px] uppercase tracking-[3px] text-gold font-bold italic">Service Variants</h4>
                                <button type="button" onClick={handleAddVariant} className="text-[8px] tracking-[2px] uppercase text-gold hover:underline font-bold">+ Add Option</button>
                            </div>
                            
                            <div className="space-y-4">
                                {variants.map((v, idx) => (
                                    <div key={idx} className="p-4 bg-salon-bg2 border border-salon-border/30 relative group/v">
                                        <button 
                                            type="button" 
                                            onClick={() => handleRemoveVariant(idx)}
                                            className="absolute top-2 right-2 text-rose-500 opacity-0 group-hover/v:opacity-100 transition-opacity text-[10px]"
                                        >
                                            Remove
                                        </button>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="col-span-2 sm:col-span-1">
                                                <input 
                                                    placeholder="Level/Variant Label" 
                                                    value={v.label} 
                                                    onChange={(e) => handleVariantChange(idx, 'label', e.target.value)}
                                                    className="w-full bg-transparent border-b border-salon-border py-1 text-[10px] text-white uppercase tracking-wider outline-none focus:border-gold"
                                                />
                                            </div>
                                            <div className="col-span-2 sm:col-span-1">
                                                <input 
                                                    placeholder="Price (AED)" 
                                                    type="number"
                                                    value={v.amount} 
                                                    onChange={(e) => handleVariantChange(idx, 'amount', Number(e.target.value))}
                                                    className="w-full bg-transparent border-b border-salon-border py-1 text-[10px] text-gold font-bold outline-none focus:border-gold"
                                                />
                                            </div>
                                            <div className="col-span-2 sm:col-span-1">
                                                <input 
                                                    placeholder="Role (e.g. Senior Stylist)" 
                                                    value={v.experience} 
                                                    onChange={(e) => handleVariantChange(idx, 'experience', e.target.value)}
                                                    className="w-full bg-transparent border-b border-salon-border py-1 text-[9px] text-salon-gray italic outline-none focus:border-gold"
                                                />
                                            </div>
                                            <div className="col-span-2 sm:col-span-1">
                                                <input 
                                                    placeholder="Duration" 
                                                    value={v.duration} 
                                                    onChange={(e) => handleVariantChange(idx, 'duration', e.target.value)}
                                                    className="w-full bg-transparent border-b border-salon-border py-1 text-[9px] text-salon-gray outline-none focus:border-gold"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <label className="text-[8px] uppercase tracking-[2px] text-salon-gray font-bold">What&apos;s Included (Comma separated)</label>
                        <input
                            type="text"
                            value={whatsIncluded}
                            onChange={(e) => setWhatsIncluded(e.target.value)}
                            placeholder="Cleansing, Consultation, Styling, Polish..."
                            className="w-full bg-salon-bg2 border border-salon-border px-4 py-3 text-white font-dm-sans text-[11px] outline-none focus:border-gold transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[8px] uppercase tracking-[2px] text-salon-gray font-bold">Service Imagery</label>
                            <label className="flex flex-col items-center justify-center border border-dashed border-salon-border bg-salon-bg2/50 py-4 cursor-pointer hover:border-gold/30 hover:bg-gold/5 transition-all group">
                                <span className="text-xl mb-1">🖼️</span>
                                <span className="text-[8px] uppercase tracking-widest text-salon-gray group-hover:text-gold transition-colors">
                                    {imageFile ? imageFile.name : isEditMode ? 'Replace Image' : 'Upload Image'}
                                </span>
                                <input type="file" className="hidden" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
                            </label>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[8px] uppercase tracking-[2px] text-salon-gray font-bold">Publish Settings</label>
                            <div className="flex items-center gap-6 py-2">
                                <div className="flex items-center space-x-3">
                                    <div 
                                        className={`w-10 h-5 p-1 flex items-center cursor-pointer transition-colors duration-300 ${isVisible ? 'bg-gold/80' : 'bg-salon-border/50'}`}
                                        onClick={() => setIsVisible(!isVisible)}
                                    >
                                        <div className={`w-3 h-3 bg-white transition-transform duration-300 ${isVisible ? 'translate-x-5' : 'translate-x-0'}`} />
                                    </div>
                                    <span className="text-[9px] uppercase tracking-[2px] text-salon-gray">{isVisible ? 'Visible' : 'Hidden'}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-[8px] uppercase text-salon-gray">Sort:</span>
                                    <input type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="w-12 bg-transparent border-b border-salon-border text-[10px] text-center" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 pt-6 border-t border-salon-border/30">
                        <button type="button" onClick={() => { setIsFormModalOpen(false); resetForm(); }} className="flex-1 border border-salon-border py-4 text-[9px] uppercase tracking-[3px] text-salon-gray hover:text-white transition-all">Discard</button>
                        <button type="submit" disabled={submitting} className="flex-1 bg-gold text-black py-4 text-[9px] font-bold uppercase tracking-[3px] hover:bg-white transition-all disabled:opacity-50">
                            {submitting ? 'Authenticating...' : isEditMode ? 'Update Service' : 'Confirm Service'}
                        </button>
                    </div>
                </form>
            </AdminModal>

            {/* Delete Modal */}
            <AdminModal 
                isOpen={isDeleteModalOpen} 
                onClose={() => setIsDeleteModalOpen(false)} 
                title="Erase Service Record"
            >
                <div className="text-center space-y-4 py-2">
                    <div className="w-12 h-12 bg-rose-500/10 flex items-center justify-center mx-auto text-rose-500 text-xl border border-rose-500/20">⚠️</div>
                    <p className="text-[11px] text-salon-gray leading-relaxed font-light">
                        Are you certain you wish to remove <span className="text-white font-bold uppercase tracking-widest">{selectedService?.title}</span> from the active treatment menu? This action is permanent.
                    </p>
                    <div className="flex gap-2 pt-4">
                        <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 border border-salon-border text-salon-gray py-3 text-[9px] uppercase tracking-[3px] hover:text-white">Cancel</button>
                        <button 
                            onClick={confirmDelete}
                            disabled={submitting}
                            className="flex-1 bg-rose-600 text-white py-3 text-[9px] font-bold uppercase tracking-[3px] hover:bg-rose-500 transition-all disabled:opacity-50"
                        >
                            {submitting ? 'Removing...' : 'Permanently Delete'}
                        </button>
                    </div>
                </div>
            </AdminModal>
        </div>
    );
}
