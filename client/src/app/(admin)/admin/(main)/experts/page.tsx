"use client";

import React, { useState, useEffect } from 'react';
import AdminCard from '@/components/admin/AdminCard';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminBadge from '@/components/admin/AdminBadge';

interface Expert {
    _id: string;
    role: string;
    description?: string;
    image: string;
}

export default function ExpertsPage() {
    const [experts, setExperts] = useState<Expert[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentExpertId, setCurrentExpertId] = useState<string | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        role: '',
        description: '',
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const fetchExperts = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/experts`);
            const data = await res.json();
            if (data.success) {
                setExperts(data.data);
            }
        } catch (error) {
            console.error('Error fetching experts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExperts();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImageFile(e.target.files[0]);
        }
    };

    const openModalForAdd = () => {
        setFormData({
            role: '',
            description: '',
        });
        setImageFile(null);
        setIsEditing(false);
        setCurrentExpertId(null);
        setIsModalOpen(true);
    };

    const openModalForEdit = (expert: Expert) => {
        setFormData({
            role: expert.role || '',
            description: expert.description || '',
        });
        setImageFile(null);
        setIsEditing(true);
        setCurrentExpertId(expert._id);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validation: Photo is required when adding a new expert
        if (!isEditing && !imageFile) {
            alert('Please select a photo for the new expert.');
            return;
        }

        setSubmitting(true);

        const uploadData = new FormData();
        uploadData.append('role', formData.role);
        uploadData.append('description', formData.description);
        
        if (imageFile) {
            uploadData.append('image', imageFile);
        }

        try {
            const url = isEditing && currentExpertId
                ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/experts/${currentExpertId}`
                : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/experts`;
            
            const method = isEditing ? 'PATCH' : 'POST';

            const res = await fetch(url, {
                method,
                body: uploadData,
                credentials: 'include'
            });

            const data = await res.json();
            if (data.success) {
                setIsModalOpen(false);
                fetchExperts(); // Refresh
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Failed to save expert');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to remove this expert?')) return;
        
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/experts/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            const data = await res.json();
            if (data.success) {
                fetchExperts(); // Refresh list
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete expert');
        }
    };

    return (
        <div className="space-y-6 lg:space-y-8 relative">
            <AdminPageHeader
                title="Our Experts"
                subtitle="Team of professional beauty masters"
                action={{
                    label: "Add Expert",
                    onClick: openModalForAdd
                }}
            />

            {loading ? (
                <div className="text-gold italic font-playfair animate-pulse">Loading experts...</div>
            ) : experts.length === 0 ? (
                <div className="text-gray-500 font-playfair italic">No experts found. Please add some.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {experts.map((expert) => (
                        <AdminCard key={expert._id} className="hover:border-gold/30 transition-all duration-300">
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="w-16 h-16 border border-gold/20 p-1 bg-gold/5 flex items-center justify-center text-2xl italic font-playfair shadow-xl relative overflow-hidden">
                                    {expert.image ? (
                                        <img className="w-full h-full object-cover" src={expert.image.startsWith('http') ? expert.image : `${process.env.NEXT_PUBLIC_API_BASE_URL}${expert.image}`} alt={expert.role} />
                                    ) : (
                                        <span className="text-gold/40">{expert.role.charAt(0)}</span>
                                    )}
                                    <div className="absolute -bottom-1 -right-1 w-4 h-px bg-gold/50" />
                                </div>

                                <div className="space-y-1">
                                    <p className="font-playfair tracking-[2px] text-lg text-gold uppercase">{expert.role}</p>
                                    {expert.description && <p className="text-xs text-salon-gray pt-2">{expert.description}</p>}
                                </div>

                                <div className="flex w-full gap-2 pt-4 border-t border-salon-border/40 mt-auto">
                                    <button onClick={() => openModalForEdit(expert)} className="flex-1 text-[8px] tracking-[2px] border border-white/10 py-2 uppercase text-salon-gray hover:text-white hover:bg-white/5 transition-all outline-none">Edit</button>
                                    <button onClick={() => handleDelete(expert._id)} className="flex-1 text-[8px] tracking-[2px] border border-rose-500/10 py-2 uppercase text-rose-500/60 hover:text-rose-500 hover:bg-rose-500/5 transition-all outline-none">Remove</button>
                                </div>
                            </div>
                        </AdminCard>
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#1a1a1a] border border-gold/20 p-6 sm:p-8 max-w-lg w-full relative">
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-salon-gray hover:text-white"
                        >
                            ✕
                        </button>
                        <h2 className="font-playfair text-2xl text-white italic mb-6">
                            {isEditing ? 'Edit Expert' : 'Add New Expert'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] text-gold uppercase tracking-wider">Role</label>
                                <input required name="role" placeholder="e.g. Senior Stylist" value={formData.role} onChange={handleInputChange} className="w-full bg-black border border-white/10 p-2 text-white text-sm outline-none focus:border-gold/50" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] text-gold uppercase tracking-wider">Description</label>
                                <textarea name="description" placeholder="A brief description of this expert..." value={formData.description} onChange={handleInputChange as any} className="w-full bg-black border border-white/10 p-2 text-white text-sm outline-none focus:border-gold/50 resize-y min-h-20" />
                            </div>

                            <div className="space-y-1 mt-4">
                                <label className="text-[10px] text-gold uppercase tracking-wider">
                                    Profile Photo {isEditing ? '(Optional)' : <span className="text-rose-500">*</span>}
                                </label>
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    required={!isEditing} 
                                    onChange={handleFileChange} 
                                    className="w-full bg-black border border-white/10 p-2 text-white text-sm outline-none focus:border-gold/50 file:mr-4 file:py-1 file:px-3 file:border-0 file:text-[10px] file:tracking-wider file:uppercase file:bg-gold/10 file:text-gold hover:file:bg-gold/20" 
                                />
                                {!imageFile && isEditing && <p className="text-[10px] text-salon-gray italic mt-1">Leave blank to keep existing image</p>}
                            </div>

                            <button 
                                type="submit" 
                                disabled={submitting}
                                className="w-full bg-gold/10 hover:bg-gold/20 border border-gold/30 text-gold py-3 uppercase tracking-[2px] text-xs font-semibold transition-all mt-6"
                            >
                                {submitting ? 'Saving...' : 'Save Expert'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
