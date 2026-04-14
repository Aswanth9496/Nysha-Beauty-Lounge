"use client";

import React, { useState, useEffect } from 'react';
import AdminCard from '@/components/admin/AdminCard';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminBadge from '@/components/admin/AdminBadge';
import { API_BASE_URL } from "@/lib/api/config";

interface GalleryItem {
    _id: string;
    images: string[];
    isActive: boolean;
    createdAt: string;
}

export default function GalleryPage() {
    const [galleries, setGalleries] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [submitting, setSubmitting] = useState(false);

    const fetchGalleries = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/gallery/admin`, {
                credentials: 'include'
            });

            if (res.status === 401) {
                // If unauthorized, redirect to login
                window.location.href = '/admin/login';
                return;
            }

            const data = await res.json();
            if (data.success) {
                setGalleries(data.data);
            }
        } catch (error) {
            console.error('Error fetching gallery:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGalleries();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            
            if (files.length + selectedFiles.length > 10) {
                alert('You can only upload a maximum of 10 images.');
                return;
            }

            const newFiles = [...selectedFiles, ...files];
            setSelectedFiles(newFiles);

            // Create previews
            const newPreviews = files.map(file => URL.createObjectURL(file));
            setPreviews([...previews, ...newPreviews]);
        }
    };

    const removeFile = (index: number) => {
        const newFiles = [...selectedFiles];
        newFiles.splice(index, 1);
        setSelectedFiles(newFiles);

        const newPreviews = [...previews];
        URL.revokeObjectURL(newPreviews[index]);
        newPreviews.splice(index, 1);
        setPreviews(newPreviews);
    };

    const openModal = () => {
        setSelectedFiles([]);
        setPreviews([]);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (selectedFiles.length === 0) {
            alert('Please select at least one image.');
            return;
        }

        setSubmitting(true);

        const formData = new FormData();
        selectedFiles.forEach(file => {
            formData.append('images', file);
        });

        try {
            const res = await fetch(`${API_BASE_URL}/api/gallery`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            const data = await res.json();
            if (data.success) {
                setIsModalOpen(false);
                fetchGalleries(); // Refresh
                // Clear previews
                previews.forEach(p => URL.revokeObjectURL(p));
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload images');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this gallery item and its images?')) return;
        
        try {
            const res = await fetch(`${API_BASE_URL}/api/gallery/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            const data = await res.json();
            if (data.success) {
                setGalleries(prev => prev.filter(item => item._id !== id));
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete gallery item');
        }
    };

    const handleToggleStatus = async (id: string) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/gallery/${id}/status`, {
                method: 'PATCH',
                credentials: 'include'
            });
            const data = await res.json();
            if (data.success) {
                setGalleries(prev => prev.map(item => 
                    item._id === id ? { ...item, isActive: data.data.isActive } : item
                ));
            }
        } catch (error) {
            console.error('Toggle status error:', error);
        }
    };

    return (
        <div className="space-y-6 lg:space-y-8 relative">
            <AdminPageHeader
                title="Gallery Management"
                subtitle="Manage your salon's portfolio and showcase images"
                action={{
                    label: "Add Images",
                    onClick: openModal
                }}
            />

            {loading ? (
                <div className="text-gold italic font-playfair animate-pulse">Loading gallery items...</div>
            ) : galleries.length === 0 ? (
                <div className="text-gray-500 font-playfair italic">No gallery items found. Please upload some beauty.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {galleries.map((item) => (
                        <AdminCard key={item._id} className="hover:border-gold/30 transition-all duration-300">
                            <div className="flex flex-col space-y-4">
                                {/* Image Preview Container */}
                                <div className="aspect-square border border-gold/20 p-1 bg-gold/5 relative overflow-hidden group">
                                    {item.images && item.images.length > 0 ? (
                                        <img 
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                                            src={`${API_BASE_URL}${item.images[0]}`} 
                                            alt="Gallery" 
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gold/20 italic">No image</div>
                                    )}
                                    
                                    {/* Multi-image indicator */}
                                    {item.images.length > 1 && (
                                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md border border-gold/20 px-2 py-0.5 text-[8px] text-gold uppercase tracking-widest">
                                            +{item.images.length - 1} more
                                        </div>
                                    ) }

                                    {/* Status Overlay */}
                                    <div className="absolute bottom-2 left-2">
                                        <AdminBadge variant={item.isActive ? 'success' : 'neutral'}>
                                            {item.isActive ? 'Active' : 'Hidden'}
                                        </AdminBadge>
                                    </div>
                                </div>

                                <div className="flex w-full gap-2 pt-2">
                                    <button 
                                        onClick={() => handleToggleStatus(item._id)} 
                                        className="flex-1 text-[8px] tracking-[2px] border border-white/10 py-2 uppercase text-salon-gray hover:text-white hover:bg-white/5 transition-all outline-none"
                                    >
                                        {item.isActive ? 'Hide' : 'Show'}
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(item._id)} 
                                        className="flex-1 text-[8px] tracking-[2px] border border-rose-500/10 py-2 uppercase text-rose-500/60 hover:text-rose-500 hover:bg-rose-500/5 transition-all outline-none"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </AdminCard>
                    ))}
                </div>
            )}

            {/* Upload Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#1a1a1a] border border-gold/20 p-6 sm:p-8 max-w-2xl w-full relative max-h-[90vh] overflow-hidden flex flex-col">
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-salon-gray hover:text-white"
                        >
                            ✕
                        </button>
                        
                        <div className="shrink-0">
                            <h2 className="font-playfair text-2xl text-white italic mb-2">
                                Upload Gallery Images
                            </h2>
                            <p className="text-xs text-salon-gray mb-6 italic">Select up to 10 professional images to showcase in your gallery.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6 overflow-y-auto pr-2 custom-scrollbar">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] text-gold uppercase tracking-wider block">Select Images (Max 10)</label>
                                    <div className="relative">
                                        <input 
                                            type="file" 
                                            multiple 
                                            accept="image/*" 
                                            onChange={handleFileChange} 
                                            className="hidden" 
                                            id="file-upload"
                                        />
                                        <label 
                                            htmlFor="file-upload"
                                            className="flex flex-col items-center justify-center w-full min-h-[120px] bg-gold/5 border border-dashed border-gold/30 hover:bg-gold/10 hover:border-gold/50 cursor-pointer transition-all p-4 group"
                                        >
                                            <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">📸</span>
                                            <span className="text-[10px] text-salon-gray uppercase tracking-widest group-hover:text-gold transition-colors">Click to select files</span>
                                            <span className="text-[8px] text-salon-gray/50 mt-1 italic">JPEG, PNG or WebP supported</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Preview Grid */}
                                {previews.length > 0 && (
                                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 pt-4">
                                        {previews.map((preview, index) => (
                                            <div key={index} className="aspect-square relative group bg-black border border-white/10">
                                                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                                <button 
                                                    type="button"
                                                    onClick={() => removeFile(index)}
                                                    className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] flex items-center justify-center rounded-none shadow-xl hover:bg-rose-600 transition-colors"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button 
                                type="submit" 
                                disabled={submitting || selectedFiles.length === 0}
                                className="w-full bg-gold/10 hover:bg-gold/20 border border-gold/30 text-gold py-3 uppercase tracking-[2px] text-xs font-semibold transition-all mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? 'Uploading...' : `Upload ${selectedFiles.length} Image${selectedFiles.length !== 1 ? 's' : ''}`}
                            </button>
                        </form>
                    </div>
                </div>
            )}
            
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(197, 161, 99, 0.3);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(197, 161, 99, 0.5);
                }
            `}</style>
        </div>
    );
}
