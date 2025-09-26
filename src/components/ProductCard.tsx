'use client';

import { useState } from 'react';
import ProductImageSimple from './ProductImageSimple';

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

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

export default function ProductCard({ product, onProductClick }: ProductCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `Bonjour, je suis intéressé par le produit: ${product.name}\nPrix: ${product.price}\n\nPouvez-vous me donner plus d'informations ?`
    );
    window.open(`https://wa.me/237673010098?text=${message}`, '_blank');
  };

  const handleEmailContact = () => {
    const subject = encodeURIComponent(`Demande d'information - ${product.name}`);
    const body = encodeURIComponent(
      `Bonjour,\n\nJe suis intéressé par le produit suivant :\n\nNom: ${product.name}\nPrix: ${product.price}\nDescription: ${product.description}\n\nPouvez-vous me donner plus d'informations sur ce produit ?\n\nCordialement`
    );
    window.open(`mailto:interfacepro40@gmail.com?subject=${subject}&body=${body}`, '_blank');
  };


  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-2 hover:scale-105">
      {/* Image du produit - Cliquable */}
      <div 
        className="aspect-square bg-gray-100 relative overflow-hidden cursor-pointer"
        onClick={() => onProductClick(product)}
      >
        <ProductImageSimple
          productId={product.id}
          className="w-full h-full p-4 group-hover:scale-105 transition-transform duration-300 object-contain"
          alt={product.name}
        />
        
        {/* Badge en stock */}
        {product.inStock && (
          <div className="absolute top-2 left-2">
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              En stock
            </span>
          </div>
        )}
        
        {/* Badge produit vedette */}
        {product.featured && (
          <div className="absolute top-2 right-2">
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              ⭐ Vedette
            </span>
          </div>
        )}

      </div>

      {/* Contenu de la carte */}
      <div className="p-6">
        {/* Catégorie */}
        <div className="mb-2">
          <span className="text-sm text-blue-600 font-medium capitalize">
            {product.category.replace('-', ' ')}
          </span>
        </div>

        {/* Nom du produit */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Prix */}
        <div className="mb-4">
          <span className="text-xl font-bold text-red-600">
            {product.priceRange}
          </span>
        </div>

        {/* Bouton pour voir les détails */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full text-blue-600 hover:text-blue-800 text-sm font-medium mb-3 text-left flex items-center justify-between"
        >
          <span>{showDetails ? 'Masquer les détails' : 'Voir les détails'}</span>
          <svg
            className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Détails du produit */}
        {showDetails && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Caractéristiques principales :</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {product.features.slice(0, 4).map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  {feature}
                </li>
              ))}
              {product.features.length > 4 && (
                <li className="text-blue-600 text-xs">
                  +{product.features.length - 4} autres caractéristiques
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Boutons d'action */}
        <div className="space-y-2">
          <button
            onClick={() => onProductClick(product)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors font-medium"
          >
            Voir les détails
          </button>
          
          <button
            onClick={handleWhatsAppContact}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            <span>Commander</span>
          </button>
          
          <button
            onClick={handleEmailContact}
            className="w-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-2 px-4 rounded-lg transition-colors"
          >
            Plus d'infos
          </button>
        </div>
      </div>
    </div>
  );
}
