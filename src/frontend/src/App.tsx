import { Toaster } from "@/components/ui/sonner";
import CartDrawer from "./components/CartDrawer";
import CaseStudies from "./components/CaseStudies";
import Contact from "./components/Contact";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Industries from "./components/Industries";
import Pricing from "./components/Pricing";
import PrivilegeMembershipCard from "./components/PrivilegeMembershipCard";
import Services from "./components/Services";
import Stats from "./components/Stats";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
import WhySubscription from "./components/WhySubscription";
import { CartProvider } from "./context/CartContext";
import { useInitialize } from "./hooks/useQueries";

function AppContent() {
  useInitialize();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Services />
        <WhySubscription />
        <Industries />
        <CaseStudies />
        <Pricing />
        <PrivilegeMembershipCard />
        <Testimonials />
        <FAQ />
        <Team />
        <Contact />
      </main>
      <Footer />
      <Toaster />
      <CartDrawer />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
