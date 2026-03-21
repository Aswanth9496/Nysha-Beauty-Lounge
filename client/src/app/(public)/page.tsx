import Header from "@/components/layout/Header";
import Hero from "@/components/saloon/Hero";
import Services from "@/components/saloon/Services";
import Experts from "@/components/saloon/Experts";
import CTA from "@/components/saloon/CTA";
import About from "@/components/saloon/About";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";

export default function Home() {
  return (
    <main className="min-h-screen bg-salon-bg text-salon-white selection:bg-gold selection:text-salon-bg">
      <CustomCursor />
      <Header />
      <Hero />
      <div className="h-0.25 bg-gradient-to-r from-transparent via-gold/22 to-transparent" />
      <Services />
      <div className="h-0.25 bg-gradient-to-r from-transparent via-gold/22 to-transparent" />
      <Experts />
      <CTA />
      <About />
      <Footer />
    </main>
  );
}
