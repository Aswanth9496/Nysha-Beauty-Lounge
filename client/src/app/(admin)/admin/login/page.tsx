import type { Metadata } from 'next';
import AdminLoginForm from '@/components/admin/AdminLoginForm';

export const metadata: Metadata = {
    title: 'Admin Login | Nysha Beauty Lounge',
    description: 'Administrator access for Nysha Beauty Lounge management system.',
};

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-salon-bg flex items-center justify-center px-6 relative overflow-hidden">
            {/* Elegant Background Elements consistent with public site */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_50%,rgba(201,168,76,0.05)_0%,transparent_70%)]" />
            <div className="noise-overlay" />

            {/* Login Card */}
            <div className="w-full max-w-[440px] relative z-10">
                <div className="bg-salon-bg2 border border-salon-border p-10 sm:p-14 shadow-2xl backdrop-blur-sm">
                    <div className="text-center mb-12">
                        <h1 className="font-playfair text-4xl font-normal text-white mb-2 italic">
                            Nysha<span className="text-gold not-italic ml-1">Admin</span>
                        </h1>
                        <div className="flex items-center justify-center gap-4">
                            <div className="h-0.25 w-8 bg-gradient-to-r from-transparent to-gold/40" />
                            <p className="text-[10px] tracking-[4px] text-salon-gray uppercase font-light">
                                Administrator Access
                            </p>
                            <div className="h-0.25 w-8 bg-gradient-to-l from-transparent to-gold/40" />
                        </div>
                    </div>

                    <AdminLoginForm />
                </div>

                <div className="mt-8 text-center">
                    <p className="text-[9px] tracking-[3px] text-salon-gray/40 uppercase">
                        &copy; {new Date().getFullYear()} Nysha Beauty Lounge &bull; Dubai
                    </p>
                </div>
            </div>

            {/* Aesthetic Border Glows */}
            <div className="absolute top-0 left-1/4 right-1/4 h-0.25 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
            <div className="absolute bottom-0 left-1/4 right-1/4 h-0.25 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        </div>
    );
}
