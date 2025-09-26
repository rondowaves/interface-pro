import Header from "@/components/Header";
import HeroShowcase from "@/components/HeroShowcase";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Section Hero + Boutique - Présentation complète Interface Pro */}
      <HeroShowcase />
      
      {/* Section Produits Vedettes - Sélection populaire */}
      <FeaturedProducts />
      
      <Footer />
      
      {/* Composants UX */}
      <ScrollToTop />
    </div>
  );
}
