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
    description: string;
    photo?: string;
    isActive: boolean;
    servicesCount?: number;
    createdAt?: string;
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    // Form states
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);
    const [isActive, setIsActive] = useState(true);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`, {
                credentials: 'include'
            });
            const result = await response.json();
            if (result.success) {
                setCategories(result.data);
            }
        } catch (err) {
            console.error('Failed to fetch categories:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Clear success message after 3 seconds
    useEffect(() => {
        if (successMsg) {
            const timer = setTimeout(() => setSuccessMsg(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [successMsg]);

    const resetForm = () => {
        setName('');
        setDescription('');
        setPhoto(null);
        setIsActive(true);
        setError(null);
        setIsEditMode(false);
        setSelectedCategory(null);
    };

    const handleView = (category: Category) => {
        setSelectedCategory(category);
        setIsViewModalOpen(true);
    };

    const handleEdit = (category: Category) => {
        setSelectedCategory(category);
        setName(category.name);
        setDescription(category.description || '');
        setIsActive(category.isActive);
        setIsEditMode(true);
        setIsFormModalOpen(true);
    };

    const handleDeleteClick = (category: Category) => {
        setSelectedCategory(category);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedCategory) return;
        setSubmitting(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories/${selectedCategory._id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            const result = await response.json();
            if (result.success) {
                setSuccessMsg('Category deleted successfully');
                setIsDeleteModalOpen(false);
                fetchCategories();
            } else {
                setError(result.message || 'Failed to delete category');
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

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('isActive', String(isActive));
            if (photo) {
                formData.append('photo', photo);
            }

            const url = isEditMode && selectedCategory 
                ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories/${selectedCategory._id}` 
                : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`;
            
            const method = isEditMode ? 'PATCH' : 'POST';

            const response = await fetch(url, {
                method,
                body: formData,
                credentials: 'include'
            });

            const result = await response.json();
            if (result.success) {
                setSuccessMsg(isEditMode ? 'Category updated successfully' : 'Category created successfully');
                setIsFormModalOpen(false);
                resetForm();
                fetchCategories();
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

    return (
        <div className="space-y-6 lg:space-y-8">
            <AdminPageHeader
                title="Service Categories"
                subtitle="Manage your primary service categories"
                action={{
                    label: "Add Category",
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
                {loading ? (
                    <div className="py-20 text-center">
                        <div className="inline-block w-8 h-8 border-2 border-gold/20 border-t-gold animate-spin mb-4" />
                        <p className="text-[10px] uppercase tracking-[3px] text-salon-gray italic">Loading luxury categories...</p>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table View - Hidden on mobile */}
                        <div className="hidden md:block">
                            <AdminTable headers={['Category Name', 'Photo', 'Description', 'Status', 'Actions']}>
                                {categories.map((category) => (
                                    <tr key={category._id} className="group hover:bg-white/5 transition-colors text-[10px] sm:text-[11px]">
                                        <td className="px-4 py-3 sm:px-5 sm:py-4 font-bold text-white tracking-widest uppercase min-w-[150px]">
                                            {category.name}
                                        </td>
                                        <td className="px-4 py-3 sm:px-5 sm:py-4">
                                            <div className="w-10 h-10 border border-gold/10 overflow-hidden bg-salon-bg2 flex items-center justify-center">
                                                {category.photo ? (
                                                    <img 
                                                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${category.photo}`} 
                                                        alt={category.name} 
                                                        className="w-full h-full object-cover transition-all duration-500"
                                                    />
                                                ) : (
                                                    <span className="text-[10px] text-gold/20 font-playfair italic">No Image</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 sm:px-5 sm:py-4 tracking-[0.5px]">
                                            <span className="text-[9px] text-salon-gray font-light max-w-[280px] truncate block italic">
                                                {category.description || 'No description provided'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 sm:px-5 sm:py-4">
                                            <AdminBadge variant={category.isActive ? 'success' : 'warning'}>
                                                {category.isActive ? 'Active' : 'Paused'}
                                            </AdminBadge>
                                        </td>
                                        <td className="px-4 py-3 sm:px-5 sm:py-4 whitespace-nowrap">
                                            <div className="flex space-x-3">
                                                <button onClick={() => handleView(category)} className="text-[9px] tracking-[1px] text-white/60 hover:text-white uppercase transition-all duration-300">View</button>
                                                <button onClick={() => handleEdit(category)} className="text-[9px] tracking-[1px] text-white hover:text-gold uppercase transition-all duration-300">Edit</button>
                                                <button onClick={() => handleDeleteClick(category)} className="text-[9px] tracking-[1px] text-white/40 hover:text-rose-500 uppercase transition-all duration-300">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </AdminTable>
                        </div>

                        {/* Mobile Stacked View - Visible only on small screens */}
                        <div className="md:hidden divide-y divide-salon-border/30">
                            {categories.map((category) => (
                                <div key={category._id} className="p-4 space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 border border-gold/10 overflow-hidden bg-salon-bg2 flex shrink-0 items-center justify-center">
                                            {category.photo ? (
                                                <img 
                                                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${category.photo}`} 
                                                    alt={category.name} 
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-[10px] text-gold/20 font-playfair italic">N/A</span>
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center justify-between mb-0.5">
                                                <h4 className="font-bold text-white tracking-widest uppercase text-[10px] truncate">{category.name}</h4>
                                                <AdminBadge variant={category.isActive ? 'success' : 'warning'}>
                                                    {category.isActive ? 'Active' : 'Paused'}
                                                </AdminBadge>
                                            </div>
                                            <p className="text-[9px] text-salon-gray italic truncate font-light">
                                                {category.description || 'No description'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 pt-1">
                                        <button 
                                            onClick={() => handleView(category)}
                                            className="flex-1 py-2 border border-salon-border text-white/60 text-[8px] uppercase tracking-[2px] transition-all hover:bg-white/5"
                                        >
                                            View
                                        </button>
                                        <button 
                                            onClick={() => handleEdit(category)}
                                            className="flex-1 py-2 border border-gold/20 text-gold text-[8px] uppercase tracking-[2px] transition-all hover:bg-gold/5"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteClick(category)}
                                            className="flex-1 py-2 border border-rose-500/10 text-rose-500/50 text-[8px] uppercase tracking-[2px] transition-all hover:bg-rose-500/5"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {categories.length === 0 && (
                            <div className="py-20 text-center text-salon-gray italic text-[10px] tracking-widest uppercase opacity-40">
                                No categories found. Start by adding one.
                            </div>
                        )}
                    </>
                )}
            </AdminCard>

            <AdminModal 
                isOpen={isFormModalOpen} 
                onClose={() => { setIsFormModalOpen(false); resetForm(); }} 
                title={isEditMode ? "Edit Category" : "Add New Category"}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] tracking-wider uppercase font-medium">
                            {error}
                        </div>
                    )}
                    
                    <div className="space-y-1.5">
                        <label className="text-[9px] uppercase tracking-[2px] text-salon-gray font-semibold ml-1">Name</label>
                        <input
                            required
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Hair Services"
                            className="w-full bg-salon-bg2 border border-salon-border px-4 py-3 text-white font-dm-sans text-[11px] tracking-widest uppercase outline-none focus:border-gold transition-all"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[9px] uppercase tracking-[2px] text-salon-gray font-semibold ml-1">Description</label>
                        <textarea
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Provide a brief description of this category..."
                            className="w-full bg-salon-bg2 border border-salon-border px-4 py-3 text-white font-dm-sans text-[11px] tracking-wider outline-none focus:border-gold transition-all resize-none"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[9px] uppercase tracking-[2px] text-salon-gray font-semibold ml-1">Category Photo</label>
                        <div className="flex items-center gap-4">
                            <label className="flex-1 flex flex-col items-center justify-center border border-dashed border-salon-border bg-salon-bg2/50 py-4 cursor-pointer hover:border-gold/30 hover:bg-gold/5 transition-all group">
                                <span className="text-xl mb-1 group-hover:scale-110 transition-transform">🖼️</span>
                                <span className="text-[8px] uppercase tracking-widest text-salon-gray group-hover:text-gold transition-colors">
                                    {photo ? photo.name : isEditMode ? 'Change Photo (Optional)' : 'Upload Luxury Image'}
                                </span>
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden" 
                                    onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                                />
                            </label>
                            {photo && (
                                <button 
                                    type="button" 
                                    onClick={() => setPhoto(null)}
                                    className="px-3 text-[9px] uppercase tracking-widest text-rose-500 border border-rose-500/20 py-4"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                        {isEditMode && selectedCategory?.photo && !photo && (
                            <p className="text-[8px] italic text-salon-gray mt-1">Current photo will be kept if none uploaded.</p>
                        )}
                    </div>

                    <div className="flex items-center space-x-3 py-2">
                        <div 
                            className={`w-10 h-5 p-1 flex items-center cursor-pointer transition-colors duration-300 ${isActive ? 'bg-gold/80' : 'bg-salon-border/50'}`}
                            onClick={() => setIsActive(!isActive)}
                        >
                            <div className={`w-3 h-3 bg-white transition-transform duration-300 ${isActive ? 'translate-x-5' : 'translate-x-0'}`} />
                        </div>
                        <span className="text-[9px] uppercase tracking-[2px] text-salon-gray">Visible publicly</span>
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
                            {submitting ? 'Creating...' : isEditMode ? 'Save Changes' : 'Create Category'}
                        </button>
                    </div>
                </form>
            </AdminModal>

            {/* View Modal */}
            <AdminModal 
                isOpen={isViewModalOpen} 
                onClose={() => { setIsViewModalOpen(false); setSelectedCategory(null); }} 
                title="Category Details"
            >
                {selectedCategory && (
                    <div className="space-y-4">
                        <div className="mb-4 -mx-4 sm:-mx-6 -mt-4 sm:-mt-6">
                            <div className="w-full h-64 bg-salon-bg2 border-b border-salon-border flex items-center justify-center overflow-hidden p-3">
                                {selectedCategory.photo ? (
                                    <img 
                                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${selectedCategory.photo}`} 
                                        alt={selectedCategory.name} 
                                        className="max-w-full max-h-full object-contain pointer-events-none"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center space-y-2 opacity-20">
                                        <span className="text-6xl italic font-playfair text-gold">{selectedCategory.name.charAt(0)}</span>
                                        <span className="text-[10px] tracking-[4px] uppercase text-gold">Project Nysha</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-t border-salon-border/30 pt-4">
                            <div>
                                <p className="text-[8px] uppercase tracking-[2px] text-salon-gray mb-1">Name</p>
                                <p className="text-[10px] font-bold text-white uppercase tracking-widest">{selectedCategory.name}</p>
                            </div>
                            <div>
                                <p className="text-[8px] uppercase tracking-[2px] text-salon-gray mb-1">Status</p>
                                <AdminBadge variant={selectedCategory.isActive ? 'success' : 'warning'}>
                                    {selectedCategory.isActive ? 'Active' : 'Paused'}
                                </AdminBadge>
                            </div>
                            <div className="col-span-2">
                                <p className="text-[8px] uppercase tracking-[2px] text-salon-gray mb-1">Description</p>
                                <p className="text-[10px] text-salon-white italic leading-relaxed">{selectedCategory.description || 'No description provided.'}</p>
                            </div>
                            <div>
                                <p className="text-[8px] uppercase tracking-[2px] text-salon-gray mb-1">Category ID</p>
                                <p className="text-[9px] font-mono text-gold/60">{selectedCategory._id}</p>
                            </div>
                            <div>
                                <p className="text-[8px] uppercase tracking-[2px] text-salon-gray mb-1">Created On</p>
                                <p className="text-[10px] text-white/80">
                                    {selectedCategory.createdAt ? new Date(selectedCategory.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric', month: 'long', day: 'numeric'
                                    }) : 'Unknown'}
                                </p>
                            </div>
                        </div>

                        <div className="pt-6 text-center">
                            <button 
                                onClick={() => { setIsViewModalOpen(false); handleEdit(selectedCategory); }}
                                className="text-[9px] tracking-[4px] text-gold uppercase hover:underline decoration-gold/30 underline-offset-8"
                            >
                                Edit Category &rarr;
                            </button>
                        </div>
                    </div>
                )}
            </AdminModal>

            {/* Delete Confirmation Modal */}
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
                            Delete <span className="text-white font-bold">{selectedCategory?.name}</span>? This cannot be undone.
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
