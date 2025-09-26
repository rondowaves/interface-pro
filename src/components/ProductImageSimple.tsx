'use client';

interface ProductImageSimpleProps {
  productId: number;
  className?: string;
  alt?: string;
}

export default function ProductImageSimple({ productId, className = "", alt = "Produit Interface Pro" }: ProductImageSimpleProps) {
  
  // Correspondance exacte ID produit → image selon products.json
  const getImagePath = (id: number): string => {
    switch (id) {
      case 1:
        return "/images/produit1.png"; // HP LaserJet Pro 4003DN
      case 2:
        return "/images/produit1.png"; // HP LaserJet Pro 4103DW (même type d'imprimante)
      case 3:
        return "/images/produit4.jpg"; // Canon PIXMA MG2546S
      case 4:
        return "/images/produit5.png"; // HP DeskJet 2720e (utilise HP Laser 135W)
      case 5:
        return "/images/produit2.png"; // Lenovo IdeaPad 3 Slim
      case 6:
        return "/images/produit3.png"; // HP Desktop Pro 290 G9 Tower
      case 7:
        return "/images/produit3.png"; // Dell OptiPlex 3090 SFF (même type desktop)
      case 8:
        return "/images/produit2.png"; // ASUS VivoBook 15 (même type laptop)
      case 9:
        return "/images/produit6.png"; // Écran HP 24"
      case 10:
        return "/images/produit6.png"; // Écran HP 22" (même type)
      case 11:
        return "/images/produit6.png"; // Écran HP 27" (même type)
      case 12:
        return "/images/produit8.png"; // Cartouche HP 653 Couleur
      case 13:
        return "/images/produit8.png"; // Cartouche HP 653 Noir (même type)
      case 14:
        return "/images/produit8.png"; // Toner HP 106A (consommable)
      case 15:
        return "/images/placeholder-product.svg"; // Papier A4
      case 16:
        return "/images/produit7.jpg"; // Onduleur Premax UPS 1200
      case 17:
        return "/images/placeholder-product.svg"; // Disque Dur Externe
      case 18:
        return "/images/placeholder-product.svg"; // Clé USB 32GB
      case 19:
        return "/images/placeholder-product.svg"; // Souris HP Optique
      case 20:
        return "/images/placeholder-product.svg"; // Clavier HP Standard
      case 21:
        return "/images/placeholder-product.svg"; // Casque Audio HP
      case 22:
        return "/images/placeholder-product.svg"; // Webcam HD 1080p
      case 23:
        return "/images/produit9.png"; // Scanner Canon LiDE 300
      case 24:
        return "/images/placeholder-product.svg"; // Routeur Wi-Fi TP-Link
      case 25:
        return "/images/cable-hdmi.jpg"; // Câble HDMI 2m
      default:
        return "/images/placeholder-product.svg";
    }
  };

  return (
    <img
      src={getImagePath(productId)}
      alt={alt}
      className={className}
      onError={(e) => {
        // Si l'image échoue, utiliser le placeholder
        console.log(`Image failed for product ${productId}, using placeholder`);
        e.currentTarget.src = "/images/placeholder-product.svg";
      }}
      onLoad={() => {
        console.log(`Image loaded successfully for product ${productId}`);
      }}
    />
  );
}
