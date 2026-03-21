import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import HairHero from "@/components/saloon/HairHero";
import HairServiceList from "@/components/saloon/HairServiceList";
import ExpertSpotlight from "@/components/saloon/ExpertSpotlight";
import HairCTA from "@/components/saloon/HairCTA";

export const metadata = {
    title: "Hair Services – Nysha Beauty Lounge",
    description: "Precision cuts, bespoke color & luxurious styling by master artisans at Nysha Beauty Lounge, Dubai.",
};

export default function HairServicesPage() {
    return (
        <main className="min-h-screen bg-salon-bg text-salon-white selection:bg-gold selection:text-salon-bg">
            <CustomCursor />
            <Header />
            <HairHero />
            <HairServiceList />
            <ExpertSpotlight />
            <HairCTA />
            <Footer />
        </main>
    );
}
