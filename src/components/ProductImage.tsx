'use client';

import { useState, useEffect } from 'react';

interface ProductImageProps {
  productName: string;
  productId: number;
  className?: string;
  alt?: string;
}

export default function ProductImage({ productName, productId, className = "", alt }: ProductImageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Liste des chemins d'images possibles basés sur le nom du produit
  const getImagePaths = (name: string, id: number) => {
    const basePath = "/images/Produit/";
    const paths = [];

    // Correspondances exactes produit → image disponible (priorité aux noms simples)
    const imageMap: { [key: number]: string[] } = {
      // IMPRIMANTES
      1: ["hp-laserjet-pro-4003dn.png", "IMPRIMANTE HP LASER JET PRO 4003DN.png"], // HP LaserJet Pro 4003DN
      2: ["hp-laserjet-pro-4103dw.png", "IMPRIMANTE HP LASER JET PRO 4103 DW.png"], // HP LaserJet Pro 4103DW
      3: ["Canon PIXMA MG2546S – Imprimante Multifonction Jet d'Encre Couleur.jpg"], // Canon PIXMA MG2546S
      4: ["hp-laser-135w.png", "HP LASER 135W IMPRIMANTE MULTIFONCTION LASER MONOCHROME.png"], // HP DeskJet 2720e (utilise HP 135W)
      
      // ORDINATEURS
      5: ["lenovo-ideapad3-slim.png", "LAPTOP LENOVO IDEAPAD3 SLIM  intel core i5-13420h (2,1 GHz).png"], // Lenovo IdeaPad 3 Slim
      6: ["DESKTOP COMPLET HP CORE I3 290 G9.png"], // HP Desktop Pro 290 G9 Tower
      7: ["Unité centrale HP Pro 290 G9 Tower i5-12400 Ram.png"], // Dell OptiPlex 3090 SFF (utilise HP Tower)
      8: ["Ordinateur portable Lenovo intel celeron dual core.png"], // ASUS VivoBook 15 (utilise Lenovo)
      
      // ÉCRANS
      9: ["ÉCRAN  HP 24''.png"], // Écran HP 24"
      10: ["ÉCRAN  HP 20''.png"], // Écran HP 22" (utilise HP 20")
      11: ["ÉCRAN  HP 24''.png"], // Écran HP 27" (utilise HP 24")
      
      // CONSOMMABLES
      12: ["Cartouche HP 653 (3YM74AE) couleur de 200 pages.png"], // Cartouche HP 653 Couleur
      13: ["Cartouche d'encre 653 Ink Advantage trois couleurs HP authentique.png"], // Cartouche HP 653 Noir
      14: ["HP 963 Cartouche d'encre noire authentique .png"], // Toner HP 106A (utilise HP 963)
      15: ["HP LASER 107A IMPRIMANTE LASER MONOCHROME MONOFONCTION.png"], // Papier A4 (utilise HP 107A)
      
      // RÉSEAUX & PÉRIPHÉRIQUES
      16: ["Onduleur Premax UPS PM-UPS 1200.jpg", "Onduleur Premax UPS PM-UPS 1500.jpg"], // Onduleur Premax UPS 1200
      17: ["Unité centrale HP Pro 290 G9 Tower i5-12400 Ram.png"], // Disque Dur Externe (utilise Unité centrale)
      18: ["HP LASER 135W IMPRIMANTE MULTIFONCTION LASER MONOCHROME.png"], // Clé USB 32GB
      19: ["IMPRIMANTE HP LASER JET MFP M141A.png"], // Souris HP Optique
      20: ["IMPRIMANTE HP LASERJET MULTIFONCTION 137FNW.png"], // Clavier HP Standard
      21: ["IMPRIMANTE MULTIFONCTION HP COLOR LASER JET PRO 4303 DW.png"], // Casque Audio HP
      22: ["IMPRIMANTE Canon i-SENSYS MF655Cdw.png"], // Webcam HD 1080p
      
      // SCANNERS
      23: ["Canon CanoScan LiDE 300 Scanner à plat 2400 x 2400 DPI.png"], // Scanner Canon LiDE 300
      
      // AUTRES
      24: ["CANON IMAGERUNNER 2224 – PHOTOCOPIEUR LASER N&B A3 – 24 PPM – COPIE  IMPRESSION  SCAN – USB 2.0 – 600 FEUILLES.png"], // Routeur Wi-Fi TP-Link (utilise Canon ImageRunner)
      25: ["Câble HDMI 2m.jpg"] // Câble HDMI 2m
    };

    // Ajouter d'abord l'image placeholder pour test
    paths.push("/images/placeholder-product.svg");

    if (imageMap[id]) {
      imageMap[id].forEach(imageName => {
        paths.push(basePath + imageName);
      });
    }

    return paths;
  };

  const imagePaths = getImagePaths(productName, productId);

  useEffect(() => {
    setCurrentImageIndex(0);
    setImageError(false);
    setIsLoading(true);
  }, [productName, productId]);

  const handleImageError = () => {
    if (currentImageIndex < imagePaths.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setImageError(true);
      setIsLoading(false);
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setImageError(false);
  };

  if (imageError && currentImageIndex >= imagePaths.length - 1) {
    return (
      <div className={`flex items-center justify-center bg-gray-200 ${className}`}>
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-2">📦</div>
          <div className="text-sm">Interface Pro</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-gray-400">Chargement...</div>
        </div>
      )}
      <img
        src={imagePaths[currentImageIndex]}
        alt={alt || productName}
        className={`w-full h-full object-contain ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        loading="lazy"
      />
    </div>
  );
}
