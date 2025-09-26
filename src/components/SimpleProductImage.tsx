'use client';

import { useState } from 'react';

interface SimpleProductImageProps {
  productId: number;
  productName: string;
  className?: string;
  alt?: string;
}

export default function SimpleProductImage({ productId, productName, className = "", alt }: SimpleProductImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mapping simple des IDs vers les images disponibles
  const getImageSrc = (id: number) => {
    const imageMap: { [key: number]: string } = {
      1: "/images/Produit/hp-laserjet-4003dn.png", // HP LaserJet Pro 4003DN (copie créée)
      2: "/images/Produit/lenovo-ideapad3-slim.png", // Lenovo IdeaPad 3 Slim (existe)
      3: "/images/Produit/hp-desktop-290g9.png", // HP Desktop Core i3 290 G9 (copie créée)
      4: "/images/Produit/" + encodeURIComponent("Canon PIXMA MG2546S – Imprimante Multifonction Jet d'Encre Couleur.jpg"), // Canon PIXMA MG2546S
    };

    return imageMap[id] || "/images/placeholder-product.svg";
  };

  const handleImageError = () => {
    console.log(`Image error for product ${productId}: ${productName}`);
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    console.log(`Image loaded for product ${productId}: ${productName}`);
    setIsLoading(false);
    setImageError(false);
  };

  if (imageError) {
    return (
      <div className={`flex items-center justify-center bg-gray-200 ${className}`}>
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-2">📦</div>
          <div className="text-sm font-semibold">Interface Pro</div>
          <div className="text-xs">{productName}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="text-gray-400 text-sm">Chargement...</div>
        </div>
      )}
      <img
        src={getImageSrc(productId)}
        alt={alt || productName}
        className={`w-full h-full object-contain transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        loading="lazy"
      />
    </div>
  );
}
