'use client';

import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function HeroShowcase() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const shopImages = [
    {
      src: '/images/examples/boutique-1.webp',
      alt: 'Interface Pro - Vue extérieure de la boutique'
    },
    {
      src: '/images/examples/boutique-2.webp',
      alt: 'Interface Pro - Intérieur boutique avec produits'
    },
    {
      src: '/images/examples/boutique-3.webp',
      alt: 'Interface Pro - Espace de vente et exposition'
    },
    {
      src: '/images/examples/boutique-4.webp',
      alt: 'Interface Pro - Rayons informatiques'
    },
    {
      src: '/images/examples/boutique-5.webp',
      alt: 'Interface Pro - Zone d\'accueil clients'
    },
    {
      src: '/images/examples/boutique-6.webp',
      alt: 'Interface Pro - Espace conseil et service'
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % shopImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + shopImages.length) % shopImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <section className="relative h-[70vh] bg-gradient-to-br from-blue-600 via-purple-600 to-red-600 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
          
          {/* Contenu Hero - Côté gauche */}
          <div className="text-white space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                Interface Pro
              </h1>
              
              <p className="text-base md:text-lg text-blue-100">
                Matériel informatique à Yaoundé
              </p>
            </div>

            {/* Localisation */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <div className="flex items-center">
                <span className="text-lg mr-2">📍</span>
                <div>
                  <h3 className="font-semibold text-sm">B3-3, Espace MFOUNDI</h3>
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href="/produits"
                className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-center text-sm"
              >
                Nos produits
              </a>
              
              <a
                href="https://wa.me/237673010098"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-center flex items-center justify-center text-sm"
              >
                <span className="mr-1">📱</span>
                WhatsApp
              </a>
            </div>

          </div>

          {/* Carrousel d'images - Côté droit */}
          <div className="relative">
            <div className="aspect-video bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-white/20">
              {!imageError ? (
                <img
                  src={shopImages[currentImageIndex].src}
                  alt={shopImages[currentImageIndex].alt}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                  onLoad={() => setImageError(false)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-white/20">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">🏪</div>
                    <div className="text-2xl font-bold">Interface Pro</div>
                    <div className="text-lg">B3-3, Espace MFOUNDI</div>
                  </div>
                </div>
              )}
              
              {/* Contrôles du carrousel */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>

            </div>

            {/* Indicateurs */}
            <div className="flex justify-center mt-4 space-x-2">
              {shopImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? 'bg-white shadow-lg'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
