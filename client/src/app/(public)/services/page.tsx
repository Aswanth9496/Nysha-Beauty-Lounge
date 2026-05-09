import { Metadata } from 'next';
import ServicesClient from './ServicesClient';
import { Suspense } from 'react';

// This is the "Server Component" part that handles SEO
export async function generateMetadata({ searchParams }: { searchParams: { category?: string } }): Promise<Metadata> {
    const categoryName = searchParams.category;
    
    if (!categoryName) {
        return {
            title: "Our Services | Nysha Beauty Lounge Dubai",
            description: "Explore our exclusive menu of beauty rituals, from hair styling to luxury facial treatments in JVC, Dubai.",
        };
    }

    try {
        // Fetch the specific category metadata from our new API
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories/name/${categoryName}`, {
            next: { revalidate: 3600 } // Cache for 1 hour
        });
        const result = await response.json();

        if (result.success && result.data.metadata) {
            const meta = result.data.metadata;
            return {
                title: meta.title || `${result.data.name} | Nysha Beauty Lounge`,
                description: meta.description || result.data.description,
                keywords: meta.keywords,
                openGraph: {
                    title: meta.title || result.data.name,
                    description: meta.description || result.data.description,
                    images: result.data.photo ? [`${process.env.NEXT_PUBLIC_API_BASE_URL}${result.data.photo}`] : [],
                }
            };
        }
    } catch (error) {
        console.error("Metadata fetch failed:", error);
    }

    return {
        title: "Our Services | Nysha Beauty Lounge",
    };
}

// The main page is now a Server Component
export default async function ServicesPage() {
    // We can pre-fetch data here on the server for better performance
    let initialCategories = [];
    let initialSubCategories = [];

    try {
        const [catRes, subRes] = await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`, { next: { revalidate: 3600 } }),
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/subcategories`, { next: { revalidate: 3600 } })
        ]);
        
        const catData = await catRes.json();
        const subData = await subRes.json();

        if (catData.success) initialCategories = catData.data;
        if (subData.success) initialSubCategories = subData.data;
    } catch (err) {
        console.error("Initial data fetch failed", err);
    }

    return (
        <Suspense fallback={
            <div className="min-h-screen bg-salon-bg flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-gold/20 border-t-gold animate-spin" />
            </div>
        }>
            <ServicesClient 
                initialCategories={initialCategories} 
                initialSubCategories={initialSubCategories} 
            />
        </Suspense>
    );
}
