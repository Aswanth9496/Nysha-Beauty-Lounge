import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import SkinHero from "@/components/saloon/SkinHero";
import SkinServiceList from "@/components/saloon/SkinServiceList";
import SkinExpertSpotlight from "@/components/saloon/SkinExpertSpotlight";
import SkinCTA from "@/components/saloon/SkinCTA";

export const metadata = {
    title: "Skin & Beauty Services – Nysha Beauty Lounge",
    description: "Advanced facial rituals and premium skincare for a healthy, luminous glow at Nysha Beauty Lounge, Dubai.",
};

export default function SkinServicesPage() {
    return (
        <main className="min-h-screen bg-salon-bg text-salon-white selection:bg-gold selection:text-salon-bg">
            <CustomCursor />
            <Header />
            <SkinHero />
            <SkinServiceList />
            <SkinExpertSpotlight />
            <SkinCTA />
            <Footer />
        </main>
    );
}
