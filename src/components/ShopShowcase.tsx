'use client';

import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function ShopShowcase() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const shopImages = [
    {
      src: '/images/boutique-test.svg',
      alt: 'Interface Pro - Boutique B3-3 MFOUNDI'
    },
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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Découvrez notre boutique Interface Pro
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Située au B3-3, Espace commercial le MFOUNDI à Yaoundé, notre boutique vous accueille 
            dans un environnement moderne et professionnel pour tous vos besoins informatiques.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Carrousel d'images */}
          <div className="relative">
            <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden shadow-lg">
              {!imageError ? (
                <img
                  src={shopImages[currentImageIndex].src}
                  alt={shopImages[currentImageIndex].alt}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                  onLoad={() => setImageError(false)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-2">🏪</div>
                    <div className="text-lg font-semibold">Interface Pro</div>
                    <div className="text-sm">B3-3, Espace MFOUNDI</div>
                  </div>
                </div>
              )}
              
              {/* Contrôles du carrousel */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
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
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentImageIndex
                      ? 'bg-blue-600'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Informations de la boutique */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-red-600 rounded-xl p-6 text-white">
              <h3 className="text-2xl font-bold mb-4">Interface Pro</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="text-2xl mr-3">📍</div>
                  <div>
                    <p className="font-semibold">Localisation</p>
                    <p className="text-blue-100">B3-3, Espace commercial le MFOUNDI</p>
                    <p className="text-blue-100">Entre marché central et face Hilton</p>
                    <p className="text-blue-100">Yaoundé, Cameroun</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-2xl mr-3">📞</div>
                  <div>
                    <p className="font-semibold">Contacts</p>
                    <p className="text-blue-100">Tel: 698 597 466</p>
                    <p className="text-blue-100">WhatsApp: 673 010 098</p>
                    <p className="text-blue-100">Email: interfacepro40@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-3xl mb-2">💻</div>
                <h4 className="font-semibold text-gray-900">Ordinateurs</h4>
                <p className="text-sm text-gray-600">PC, Laptops, Accessoires</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-3xl mb-2">🖨️</div>
                <h4 className="font-semibold text-gray-900">Imprimantes</h4>
                <p className="text-sm text-gray-600">Laser, Jet d'encre, Multifonctions</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-3xl mb-2">🖥️</div>
                <h4 className="font-semibold text-gray-900">Écrans</h4>
                <p className="text-sm text-gray-600">Moniteurs HD, 4K, Gaming</p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <div className="text-3xl mb-2">🔌</div>
                <h4 className="font-semibold text-gray-900">Accessoires</h4>
                <p className="text-sm text-gray-600">Câbles, Souris, Claviers</p>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/237673010098"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-semibold text-center transition-colors flex items-center justify-center"
              >
                <span className="mr-2">📱</span>
                Contacter sur WhatsApp
              </a>
              
              <a
                href="/produits"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold text-center transition-colors"
              >
                Voir nos produits
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
