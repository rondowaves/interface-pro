'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import ProductImage from './ProductImage';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  priceRange: string;
  image: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  inStock: boolean;
  featured: boolean;
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleWhatsAppContact = () => {
    if (!product) return;
    const message = encodeURIComponent(
      `Bonjour, je suis intéressé par le produit: ${product.name}\nPrix: ${product.price}\n\nPouvez-vous me donner plus d'informations ?`
    );
    window.open(`https://wa.me/237673010098?text=${message}`, '_blank');
  };

  const handleEmailContact = () => {
    if (!product) return;
    const subject = encodeURIComponent(`Demande d'information - ${product.name}`);
    const body = encodeURIComponent(
      `Bonjour,\n\nJe suis intéressé par le produit suivant :\n\nNom: ${product.name}\nPrix: ${product.price}\nDescription: ${product.description}\n\nPouvez-vous me donner plus d'informations sur ce produit ?\n\nCordialement`
    );
    window.open(`mailto:interfacepro40@gmail.com?subject=${subject}&body=${body}`, '_blank');
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header avec bouton fermer */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-2xl">
            <h2 className="text-2xl font-bold text-gray-900 truncate pr-4">
              {product.name}
            </h2>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <XMarkIcon className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image du produit */}
              <div className="space-y-4">
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden relative">
                  <ProductImage
                    productName={product.name}
                    productId={product.id}
                    className="w-full h-full p-6"
                    alt={product.name}
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 space-y-2">
                    {product.inStock && (
                      <span className="bg-green-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                        ✓ En stock
                      </span>
                    )}
                    {product.featured && (
                      <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                        ⭐ Produit vedette
                      </span>
                    )}
                  </div>
                </div>

                {/* Prix */}
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">
                    {product.priceRange}
                  </div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">
                    {product.category.replace('-', ' ')}
                  </div>
                </div>
              </div>

              {/* Détails du produit */}
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Caractéristiques principales */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Caractéristiques principales</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">•</span>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Spécifications techniques */}
                {Object.keys(product.specifications).length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Spécifications techniques</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <dl className="space-y-2">
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <div key={key} className="flex flex-col sm:flex-row">
                            <dt className="font-medium text-gray-900 sm:w-1/3 capitalize">
                              {key.replace('_', ' ')} :
                            </dt>
                            <dd className="text-gray-600 sm:w-2/3">{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                )}

                {/* Boutons d'action */}
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleWhatsAppContact}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg flex items-center justify-center space-x-3 transition-colors font-semibold"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    <span>Commander sur WhatsApp</span>
                  </button>
                  
                  <button
                    onClick={handleEmailContact}
                    className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-3 px-6 rounded-lg transition-colors font-semibold"
                  >
                    Demander plus d'informations
                  </button>

                  <div className="text-center pt-2">
                    <p className="text-sm text-gray-500">
                      📍 Disponible à la boutique B3-3, Espace commercial le MFOUNDI
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Entre le marché central et face Hilton • Yaoundé
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
