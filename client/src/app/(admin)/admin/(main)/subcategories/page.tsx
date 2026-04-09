"use client";

import React, { useState, useEffect } from 'react';
import AdminCard from '@/components/admin/AdminCard';
import AdminTable from '@/components/admin/AdminTable';
import AdminBadge from '@/components/admin/AdminBadge';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminModal from '@/components/admin/AdminModal';
import { API_BASE_URL } from "@/lib/api/config";

interface Category {
    _id: string;
    name: string;
}

interface SubCategory {
    _id: string;
    categoryId: Category | string;
    name: string;
    description?: string;
    cover_image?: string;
    images?: string[];
    is_visible: boolean;
    sort_order: number;
    createdAt?: string;
}

export default function SubCategoriesPage() {
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    // Filter state
    const [filterCategoryId, setFilterCategoryId] = useState<string>('all');

    // Form states
    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [description, setDescription] = useState('');
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [isVisible, setIsVisible] = useState(true);
    const [sortOrder, setSortOrder] = useState('0');

    const fetchSubCategories = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/api/subcategories`, {
                credentials: 'include'
            });
            const result = await response.json();
            if (result.success) {
                setSubCategories(result.data);
            }
        } catch (err) {
            console.error('Failed to fetch sub-categories:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/categories`, {
                credentials: 'include'
            });
            const result = await response.json();
            if (result.success) {
                setCategories(result.data);
            }
        } catch (err) {
            console.error('Failed to fetch categories:', err);
        }
    };

    useEffect(() => {
        fetchSubCategories();
        fetchCategories();
    }, []);

    useEffect(() => {
        if (successMsg) {
            const timer = setTimeout(() => setSuccessMsg(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [successMsg]);

    const resetForm = () => {
        setName('');
        setCategoryId('');
        setDescription('');
        setCoverImage(null);
        setIsVisible(true);
        setSortOrder('0');
        setError(null);
        setIsEditMode(false);
        setSelectedSubCategory(null);
    };

    const handleView = (subCategory: SubCategory) => {
        setSelectedSubCategory(subCategory);
        setIsViewModalOpen(true);
    };

    const handleEdit = (subCategory: SubCategory) => {
        setSelectedSubCategory(subCategory);
        setName(subCategory.name);
        setCategoryId(typeof subCategory.categoryId === 'object' ? subCategory.categoryId._id : subCategory.categoryId);
        setDescription(subCategory.description || '');
        setIsVisible(subCategory.is_visible);
        setSortOrder(String(subCategory.sort_order || 0));
        setIsEditMode(true);
        setIsFormModalOpen(true);
    };

    const handleDeleteClick = (subCategory: SubCategory) => {
        setSelectedSubCategory(subCategory);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedSubCategory) return;
        setSubmitting(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/subcategories/${selectedSubCategory._id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            const result = await response.json();
            if (result.success) {
                setSuccessMsg('Sub-category deleted successfully');
                setIsDeleteModalOpen(false);
                fetchSubCategories();
            } else {
                setError(result.message || 'Failed to delete sub-category');
            }
        } catch (err) {
            setError('Connection error. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        if (!categoryId) {
            setError('Please select a parent category');
            setSubmitting(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('categoryId', categoryId);
            formData.append('description', description);
            formData.append('is_visible', String(isVisible));
            formData.append('sort_order', sortOrder);
            if (coverImage) {
                formData.append('cover_image', coverImage);
            }

            const url = isEditMode && selectedSubCategory 
                ? `${API_BASE_URL}/api/subcategories/${selectedSubCategory._id}` 
                : `${API_BASE_URL}/api/subcategories`;
            
            const method = isEditMode ? 'PATCH' : 'POST';

            const response = await fetch(url, {
                method,
                body: formData,
                credentials: 'include'
            });

            const result = await response.json();
            if (result.success) {
                setSuccessMsg(isEditMode ? 'Sub-category updated successfully' : 'Sub-category created successfully');
                setIsFormModalOpen(false);
                resetForm();
                fetchSubCategories();
            } else {
                setError(result.message || 'Action failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    const getCategoryName = (cat: Category | string) => {
        if (typeof cat === 'object') return cat.name;
        const found = categories.find(c => c._id === cat);
        return found ? found.name : 'Unknown';
    };

    // Filtering logic
    const filteredSubCategories = filterCategoryId === 'all'
        ? subCategories
        : subCategories.filter(sub => {
            const catId = typeof sub.categoryId === 'object' ? sub.categoryId._id : sub.categoryId;
            return catId === filterCategoryId;
        });

    return (
        <div className="space-y-6 lg:space-y-8">
            <AdminPageHeader
                title="Service Sub-Categories"
                subtitle="Manage specialized collections under main categories"
                action={{
                    label: "Add Sub-Category",
                    onClick: () => setIsFormModalOpen(true)
                }}
                showSearch={true}
            />

            {successMsg && (
                <div className="fixed top-24 right-8 z-[60] bg-gold text-salon-bg px-6 py-3 shadow-2xl animate-in slide-in-from-right duration-500 font-dm-sans text-[10px] tracking-[2px] uppercase font-bold">
                    {successMsg}
                </div>
            )}

            <AdminCard>
                <div className="mb-6 flex flex-wrap items-center gap-6 border-b border-salon-border/30 pb-6 px-1">
                    <div className="space-y-1.5 flex-1 min-w-[240px] max-w-sm relative group">
                        <label className="text-[8px] uppercase tracking-[3px] text-salon-gray font-bold ml-1 flex items-center gap-2">
                             Parent Category Filter
                            <span className="w-1.5 h-1.5 rounded-full bg-gold/40" />
                        </label>
                        <select
                            value={filterCategoryId}
                            onChange={(e) => setFilterCategoryId(e.target.value)}
                            className="w-full bg-salon-bg/20 border border-salon-border/50 px-4 py-3 text-white font-dm-sans text-[10px] tracking-[2px] uppercase outline-none focus:border-gold/50 transition-all appearance-none cursor-pointer hover:bg-white/5"
                        >
                            <option value="all" className="bg-salon-bg2">All Categories (Global)</option>
                            {categories.map(cat => (
                                <option key={cat._id} value={cat._id} className="bg-salon-bg2">{cat.name}</option>
                            ))}
                        </select>
                        <div className="absolute right-4 bottom-3.5 pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity">
                            <svg className="w-3 h-3 fill-gold" viewBox="0 0 20 20">
                                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                        </div>
                    </div>

                    {filterCategoryId !== 'all' && (
                        <button 
                            onClick={() => setFilterCategoryId('all')}
                            className="mt-5 text-[8px] uppercase tracking-[2px] text-gold/60 hover:text-gold transition-colors underline underline-offset-4 decoration-gold/20"
                        >
                            Reset Filter
                        </button>
                    )}
                </div>

                {loading ? (
                    <div className="py-20 text-center">
                        <div className="inline-block w-8 h-8 border-2 border-gold/10 border-t-gold animate-spin mb-4" />
                        <p className="text-[10px] uppercase tracking-[3px] text-salon-gray italic">Loading refined categories...</p>
                    </div>
                ) : (
                    <>
                        <div className="hidden md:block">
                            <AdminTable headers={['Sub-Category', 'Parent Category', 'Cover Photo', 'Status', 'Actions']}>
                                {filteredSubCategories.map((sub) => (
                                    <tr key={sub._id} className="group hover:bg-white/5 transition-colors text-[10px] sm:text-[11px]">
                                        <td className="px-4 py-3 sm:px-5 sm:py-4 font-bold text-white tracking-widest uppercase min-w-[150px]">
                                            {sub.name}
                                        </td>
                                        <td className="px-4 py-3 sm:px-5 sm:py-4 font-dm-sans text-gold tracking-wider uppercase">
                                            {getCategoryName(sub.categoryId)}
                                        </td>
                                        <td className="px-4 py-3 sm:px-5 sm:py-4">
                                            <div className="w-10 h-10 border border-gold/10 overflow-hidden bg-salon-bg2 flex items-center justify-center">
                                                {sub.cover_image ? (
                                                    <img 
                                                        src={`${API_BASE_URL}${sub.cover_image}`} 
                                                        alt={sub.name} 
                                                        className="w-full h-full object-cover transition-all duration-500"
                                                    />
                                                ) : (
                                                    <span className="text-[10px] text-gold/20 font-playfair italic">No Image</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 sm:px-5 sm:py-4">
                                            <AdminBadge variant={sub.is_visible ? 'success' : 'warning'}>
                                                {sub.is_visible ? 'Visible' : 'Hidden'}
                                            </AdminBadge>
                                        </td>
                                        <td className="px-4 py-3 sm:px-5 sm:py-4 whitespace-nowrap">
                                            <div className="flex space-x-3">
                                                <button onClick={() => handleView(sub)} className="text-[9px] tracking-[1px] text-white/60 hover:text-white uppercase transition-all duration-300">View</button>
                                                <button onClick={() => handleEdit(sub)} className="text-[9px] tracking-[1px] text-white hover:text-gold uppercase transition-all duration-300">Edit</button>
                                                <button onClick={() => handleDeleteClick(sub)} className="text-[9px] tracking-[1px] text-white/40 hover:text-rose-500 uppercase transition-all duration-300">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </AdminTable>
                        </div>

                        {/* Mobile View */}
                        <div className="md:hidden divide-y divide-salon-border/30">
                            {filteredSubCategories.map((sub) => (
                                <div key={sub._id} className="p-4 space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 border border-gold/10 overflow-hidden bg-salon-bg2 flex shrink-0 items-center justify-center">
                                            {sub.cover_image ? (
                                                <img 
                                                    src={`${API_BASE_URL}${sub.cover_image}`} 
                                                    alt={sub.name} 
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-[10px] text-gold/20 font-playfair italic">N/A</span>
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center justify-between mb-0.5">
                                                <h4 className="font-bold text-white tracking-widest uppercase text-[10px] truncate">{sub.name}</h4>
                                                <AdminBadge variant={sub.is_visible ? 'success' : 'warning'}>
                                                    {sub.is_visible ? 'Visible' : 'Hidden'}
                                                </AdminBadge>
                                            </div>
                                            <p className="text-[8px] text-gold tracking-wider uppercase font-light">
                                                {getCategoryName(sub.categoryId)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 pt-1">
                                        <button 
                                            onClick={() => handleView(sub)}
                                            className="flex-1 py-2 border border-salon-border text-white/60 text-[8px] uppercase tracking-[2px] transition-all hover:bg-white/5"
                                        >
                                            View
                                        </button>
                                        <button 
                                            onClick={() => handleEdit(sub)}
                                            className="flex-1 py-2 border border-gold/20 text-gold text-[8px] uppercase tracking-[2px] transition-all hover:bg-gold/5"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteClick(sub)}
                                            className="flex-1 py-2 border border-rose-500/10 text-rose-500/50 text-[8px] uppercase tracking-[2px] transition-all hover:bg-rose-500/5"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredSubCategories.length === 0 && (
                            <div className="py-20 text-center text-salon-gray italic text-[10px] tracking-widest uppercase opacity-40">
                                {filterCategoryId !== 'all' ? 'No sub-categories found for this parent.' : 'No sub-categories found. Refine your catalog by adding one.'}
                            </div>
                        )}
                    </>
                )}
            </AdminCard>

            <AdminModal 
                isOpen={isFormModalOpen} 
                onClose={() => { setIsFormModalOpen(false); resetForm(); }} 
                title={isEditMode ? "Edit Sub-Category" : "Add New Sub-Category"}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] tracking-wider uppercase font-medium">
                            {error}
                        </div>
                    )}
                    
                    <div className="space-y-1.5">
                        <label className="text-[9px] uppercase tracking-[2px] text-salon-gray font-semibold ml-1">Parent Category</label>
                        <select
                            required
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            className="w-full bg-salon-bg2 border border-salon-border px-4 py-3 text-white font-dm-sans text-[11px] tracking-widest uppercase outline-none focus:border-gold transition-all appearance-none cursor-pointer"
                        >
                            <option value="" disabled className="bg-salon-bg2">Select Category</option>
                            {categories.map(cat => (
                                <option key={cat._id} value={cat._id} className="bg-salon-bg2">{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[9px] uppercase tracking-[2px] text-salon-gray font-semibold ml-1">Sub-Category Name</label>
                        <input
                            required
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Bridal Makeup"
                            className="w-full bg-salon-bg2 border border-salon-border px-4 py-3 text-white font-dm-sans text-[11px] tracking-widest uppercase outline-none focus:border-gold transition-all"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[9px] uppercase tracking-[2px] text-salon-gray font-semibold ml-1">Description</label>
                        <textarea
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe this sub-category..."
                            className="w-full bg-salon-bg2 border border-salon-border px-4 py-3 text-white font-dm-sans text-[11px] tracking-wider outline-none focus:border-gold transition-all resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[9px] uppercase tracking-[2px] text-salon-gray font-semibold ml-1">Sort Order</label>
                            <input
                                type="number"
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                className="w-full bg-salon-bg2 border border-salon-border px-4 py-3 text-white font-dm-sans text-[11px] tracking-widest outline-none focus:border-gold transition-all"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[9px] uppercase tracking-[2px] text-salon-gray font-semibold ml-1">Visibility</label>
                            <div className="flex items-center space-x-3 py-3">
                                <div 
                                    className={`w-10 h-5 p-1 flex items-center cursor-pointer transition-colors duration-300 ${isVisible ? 'bg-gold/80' : 'bg-salon-border/50'}`}
                                    onClick={() => setIsVisible(!isVisible)}
                                >
                                    <div className={`w-3 h-3 bg-white transition-transform duration-300 ${isVisible ? 'translate-x-5' : 'translate-x-0'}`} />
                                </div>
                                <span className="text-[9px] uppercase tracking-[2px] text-salon-gray">{isVisible ? 'Visible' : 'Hidden'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[9px] uppercase tracking-[2px] text-salon-gray font-semibold ml-1">Cover Photo</label>
                        <div className="flex items-center gap-4">
                            <label className="flex-1 flex flex-col items-center justify-center border border-dashed border-salon-border bg-salon-bg2/50 py-4 cursor-pointer hover:border-gold/30 hover:bg-gold/5 transition-all group">
                                <span className="text-xl mb-1 group-hover:scale-110 transition-transform">📸</span>
                                <span className="text-[8px] uppercase tracking-widest text-salon-gray group-hover:text-gold transition-colors">
                                    {coverImage ? coverImage.name : isEditMode ? 'Change Cover' : 'Upload Cover'}
                                </span>
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden" 
                                    onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                                />
                            </label>
                            {coverImage && (
                                <button 
                                    type="button" 
                                    onClick={() => setCoverImage(null)}
                                    className="px-3 text-[9px] uppercase tracking-widest text-rose-500 border border-rose-500/20 py-4"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                        <button
                            type="button"
                            onClick={() => { setIsFormModalOpen(false); resetForm(); }}
                            className="flex-1 bg-transparent border border-salon-border text-salon-gray py-3 text-[9px] uppercase tracking-[3px] hover:text-white hover:bg-white/5 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex-1 bg-gold text-salon-bg py-3 text-[9px] font-bold uppercase tracking-[3px] hover:bg-white transition-all disabled:opacity-50"
                        >
                            {submitting ? 'Processing...' : isEditMode ? 'Save Changes' : 'Create Sub-Category'}
                        </button>
                    </div>
                </form>
            </AdminModal>

            {/* View Modal */}
            <AdminModal 
                isOpen={isViewModalOpen} 
                onClose={() => { setIsViewModalOpen(false); setSelectedSubCategory(null); }} 
                title="Sub-Category Details"
            >
                {selectedSubCategory && (
                    <div className="space-y-4">
                        <div className="mb-4 -mx-4 sm:-mx-6 -mt-4 sm:-mt-6">
                            <div className="w-full h-64 bg-salon-bg2 border-b border-salon-border flex items-center justify-center overflow-hidden p-3">
                                {selectedSubCategory.cover_image ? (
                                    <img 
                                        src={`${API_BASE_URL}${selectedSubCategory.cover_image}`} 
                                        alt={selectedSubCategory.name} 
                                        className="max-w-full max-h-full object-contain pointer-events-none"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center space-y-2 opacity-20">
                                        <span className="text-6xl italic font-playfair text-gold">{selectedSubCategory.name.charAt(0)}</span>
                                        <span className="text-[10px] tracking-[4px] uppercase text-gold">Project Nysha</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-t border-salon-border/30 pt-4">
                            <div>
                                <p className="text-[8px] uppercase tracking-[2px] text-salon-gray mb-1">Name</p>
                                <p className="text-[10px] font-bold text-white uppercase tracking-widest">{selectedSubCategory.name}</p>
                            </div>
                            <div>
                                <p className="text-[8px] uppercase tracking-[2px] text-salon-gray mb-1">Parent Category</p>
                                <p className="text-[10px] font-bold text-gold uppercase tracking-wider">{getCategoryName(selectedSubCategory.categoryId)}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-[8px] uppercase tracking-[2px] text-salon-gray mb-1">Description</p>
                                <p className="text-[10px] text-salon-white italic leading-relaxed">{selectedSubCategory.description || 'No description provided.'}</p>
                            </div>
                            <div>
                                <p className="text-[8px] uppercase tracking-[2px] text-salon-gray mb-1">Visibility</p>
                                <AdminBadge variant={selectedSubCategory.is_visible ? 'success' : 'warning'}>
                                    {selectedSubCategory.is_visible ? 'Visible' : 'Hidden'}
                                </AdminBadge>
                            </div>
                            <div>
                                <p className="text-[8px] uppercase tracking-[2px] text-salon-gray mb-1">Created On</p>
                                <p className="text-[10px] text-white/80">
                                    {selectedSubCategory.createdAt ? new Date(selectedSubCategory.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric', month: 'long', day: 'numeric'
                                    }) : 'Unknown'}
                                </p>
                            </div>
                        </div>

                        <div className="pt-6 text-center">
                            <button 
                                onClick={() => { setIsViewModalOpen(false); handleEdit(selectedSubCategory); }}
                                className="text-[9px] tracking-[4px] text-gold uppercase hover:underline decoration-gold/30 underline-offset-8"
                            >
                                Edit Sub-Category &rarr;
                              
                            </button>
                        </div>
                    </div>
                )}
            </AdminModal>

            {/* Delete Modal */}
            <AdminModal 
                isOpen={isDeleteModalOpen} 
                onClose={() => setIsDeleteModalOpen(false)} 
                title="Confirm Deletion"
            >
                <div className="text-center space-y-4 py-1">
                    <div className="w-12 h-12 bg-rose-500/10 flex items-center justify-center mx-auto text-rose-500 text-xl mb-2">
                        ⚠️
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-[2px] text-rose-400 font-bold italic">Are you sure?</p>
                        <p className="text-[10px] text-salon-gray leading-relaxed px-2">
                            Delete <span className="text-white font-bold">{selectedSubCategory?.name}</span>? This cannot be undone.
                        </p>
                    </div>
                    
                    <div className="flex gap-2 pt-4">
                        <button
                            type="button"
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="flex-1 bg-transparent border border-salon-border text-salon-gray py-3 text-[9px] uppercase tracking-[3px] hover:text-white hover:bg-white/5 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmDelete}
                            disabled={submitting}
                            className="flex-1 bg-rose-600 text-white py-3 text-[9px] font-bold uppercase tracking-[3px] hover:bg-rose-500 transition-all disabled:opacity-50"
                        >
                            {submitting ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>
            </AdminModal>
        </div>
    );
}
