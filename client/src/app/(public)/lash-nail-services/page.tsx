import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import LashNailHero from "@/components/saloon/LashNailHero";
import LashNailServiceList from "@/components/saloon/LashNailServiceList";
import LashNailExpertSpotlight from "@/components/saloon/LashNailExpertSpotlight";
import LashNailCTA from "@/components/saloon/LashNailCTA";

export const metadata = {
    title: "Lash, Brow & Nail Services – Nysha Beauty Lounge",
    description: "Impeccable manicures, pedicures, and expert lash & brow sculpting at Nysha Beauty Lounge, Dubai.",
};

export default function LashNailServicesPage() {
    return (
        <main className="min-h-screen bg-salon-bg text-salon-white selection:bg-gold selection:text-salon-bg">
            <CustomCursor />
            <Header />
            <LashNailHero />
            <LashNailServiceList />
            <LashNailExpertSpotlight />
            <LashNailCTA />
            <Footer />
        </main>
    );
}
