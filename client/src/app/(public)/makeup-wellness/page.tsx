import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import MakeupWellnessHero from "@/components/saloon/MakeupWellnessHero";
import MakeupWellnessServiceList from "@/components/saloon/MakeupWellnessServiceList";
import MakeupWellnessExpertSpotlight from "@/components/saloon/MakeupWellnessExpertSpotlight";
import MakeupWellnessCTA from "@/components/saloon/MakeupWellnessCTA";

export const metadata = {
    title: "Makeup & Wellness – Nysha Beauty Lounge",
    description: "Editorial glam, bridal elegance, and holistic wellness treatments at Nysha Beauty Lounge, Dubai.",
};

export default function MakeupWellnessPage() {
    return (
        <main className="min-h-screen bg-salon-bg text-salon-white selection:bg-gold selection:text-salon-bg">
            <CustomCursor />
            <Header />
            <MakeupWellnessHero />
            <MakeupWellnessServiceList />
            <MakeupWellnessExpertSpotlight />
            <MakeupWellnessCTA />
            <Footer />
        </main>
    );
}
