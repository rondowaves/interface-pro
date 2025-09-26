'use client';

import { useState } from 'react';
import Link from "next/link";
import ProductModal from './ProductModal';
import ProductImageSimple from './ProductImageSimple';

// Produits en vedette (exemples basés sur les images disponibles)
const featuredProducts = [
  {
    id: 1,
    name: "HP LaserJet Pro 4003DN",
    category: "Imprimantes",
    price: "À partir de 250,000 FCFA",
    image: "/images/hp-laserjet-pro-4003dn.png",
    description: "Imprimante laser monochrome professionnelle",
    whatsappMessage: "Bonjour, je suis intéressé par l'imprimante HP LaserJet Pro 4003DN"
  },
  {
    id: 2,
    name: "Lenovo IdeaPad 3 Slim",
    category: "Ordinateurs portables",
    price: "À partir de 450,000 FCFA",
    image: "/images/lenovo-ideapad3-slim.png",
    description: "Intel Core i5-13420H, 8GB RAM, 256GB SSD",
    whatsappMessage: "Bonjour, je suis intéressé par le Lenovo IdeaPad 3 Slim"
  },
  {
    id: 3,
    name: "HP Desktop Core i3 290 G9",
    category: "Ordinateurs de bureau",
    price: "À partir de 350,000 FCFA",
    image: "/images/hp-desktop-i3-290g9.png",
    description: "Ordinateur de bureau complet avec écran",
    whatsappMessage: "Bonjour, je suis intéressé par le HP Desktop Core i3 290 G9"
  },
  {
    id: 4,
    name: "Canon PIXMA MG2546S",
    category: "Imprimantes",
    price: "À partir de 85,000 FCFA",
    image: "/images/canon-pixma-mg2546s.jpg",
    description: "Imprimante multifonction jet d'encre couleur",
    whatsappMessage: "Bonjour, je suis intéressé par l'imprimante Canon PIXMA MG2546S"
  }
];

export default function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleWhatsAppContact = (productMessage: string) => {
    const message = encodeURIComponent(productMessage);
    window.open(`https://wa.me/237673010098?text=${message}`, '_blank');
  };

  const handleProductClick = (product: any) => {
    // Convertir le produit au format attendu par le modal
    const modalProduct = {
      ...product,
      priceRange: product.price,
      features: [
        product.description,
        "Produit de qualité professionnelle",
        "Garantie constructeur",
        "Support technique disponible"
      ],
      specifications: {
        marque: product.name.split(' ')[0],
        categorie: product.category,
        prix: product.price
      },
      inStock: true,
      featured: true
    };
    setSelectedProduct(modalProduct);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Nos Produits Populaires
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                <ProductImageSimple
                  productId={product.id}
                  className="w-full h-full p-4 group-hover:scale-105 transition-transform duration-300 object-contain"
                  alt={product.name}
                />
              </div>
              
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-sm text-blue-600 font-medium">{product.category}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-red-600">
                    {product.price}
                  </span>
                </div>
                
                <div className="mt-4 space-y-2">
                  <button
                    onClick={() => handleWhatsAppContact(product.whatsappMessage)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    <span>Commander</span>
                  </button>
                  
                  <a
                    href={`mailto:interfacepro40@gmail.com?subject=Demande d'information - ${product.name}`}
                    className="w-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-2 px-4 rounded-lg text-center transition-colors block"
                  >
                    Plus d'infos
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal pour les détails du produit */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
