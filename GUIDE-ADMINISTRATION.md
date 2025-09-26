# 📋 Guide d'Administration - Interface Pro E-commerce

## 🎯 Comment ajouter/modifier des produits

### 📁 Fichier à modifier : `src/data/products.json`

Ce fichier contient tous les produits de votre catalogue. Voici comment l'utiliser :

## 🆕 Ajouter un nouveau produit

Pour ajouter un produit, ajoutez un objet comme celui-ci dans la section "products" :

```json
{
  "id": 50,
  "name": "HP LASER 107A IMPRIMANTE LASER MONOCHROME",
  "category": "imprimantes",
  "price": "95,000 FCFA",
  "priceRange": "À partir de 95,000 FCFA",
  "image": "/images/hp-laser-107a.png",
  "description": "Imprimante laser monochrome monofonction - Vitesse 21 ppm",
  "features": [
    "Fonction : imprimer",
    "Laser monochrome",
    "Vitesse : 21 ppm",
    "Résolution : 1200 x 1200 DPI",
    "Capacité : 150 feuilles (entrée), 100 feuilles (sortie)",
    "Connectivité : USB 2.0"
  ],
  "specifications": {
    "type": "Laser monochrome",
    "vitesse": "21 ppm",
    "resolution": "1200 x 1200 DPI",
    "connectivite": "USB 2.0",
    "capacite_papier": "150 feuilles"
  },
  "inStock": true,
  "featured": false
}
```

## 📂 Catégories disponibles

- `"imprimantes"` - Imprimantes & Scanners
- `"ordinateurs"` - Ordinateurs & Accessoires  
- `"consommables"` - Cartouches d'encre, toners
- `"reseaux"` - Onduleurs, périphériques
- `"ecrans"` - Moniteurs et écrans
- `"scanners"` - Scanners à plat

## 🖼️ Images des produits

1. Placez vos images dans le dossier : `public/images/`
2. Utilisez des noms simples sans caractères spéciaux
3. Formats supportés : `.jpg`, `.png`, `.webp`

## 📝 Liste complète des nouveaux produits à ajouter

### IMPRIMANTES (200,000 - 480,000 FCFA)
- HP LaserJet Pro 4003DN - 200,000 FCFA ✅ (déjà ajouté)
- HP LASER 107A - 95,000 FCFA
- Canon i-SENSYS MF655Cdw - 275,000 FCFA  
- Canon ImageRunner 2224 - 480,000 FCFA
- Canon i-SENSYS MF463DW - 340,000 FCFA
- HP LaserJet Pro 4003n - 190,000 FCFA
- HP LASER 135W - 160,000 FCFA
- HP LaserJet MF 137FNW - 210,000 FCFA
- HP LASER JET MFP M141A - 125,000 FCFA
- HP LASER JET PRO 4103 DW - 300,000 FCFA
- HP COLOR LASER JET PRO 4303 DW - 450,000 FCFA
- HP COLOR LASER JET PRO MFP M183FW - 280,000 FCFA
- HP COLOR LASER JET PRO 3303 SDW - 350,000 FCFA
- HP LASER JET TANK 1502 W - 150,000 FCFA
- HP OFFICE JET PRO 9720 - 220,000 FCFA
- HP 2875 - 60,000 FCFA
- Canon PIXMA MG2546S - 35,000 FCFA ✅ (déjà ajouté)
- Canon iR 2425I - 1,200,000 FCFA
- HP COLOR LASERJET PRO M182N - 280,000 FCFA

### ORDINATEURS PORTABLES (160,000 - 325,000 FCFA)
- Lenovo IdeaPad3 - 250,000 FCFA
- Lenovo IdeaPad3 Slim - 325,000 FCFA ✅ (déjà ajouté)
- Lenovo Celeron Dual Core - 160,000 FCFA

### ORDINATEURS DE BUREAU (280,000 - 350,000 FCFA)
- HP Pro 290 G9 Tower i5-12400 - 350,000 FCFA ✅ (déjà ajouté)
- HP Desktop Core i3 290 G9 - 280,000 FCFA ✅ (déjà ajouté)

### ÉCRANS (80,000 - 150,000 FCFA)
- HP 20'' - 80,000 FCFA
- HP 22'' - 99,000 FCFA  
- HP 24'' - 135,000 FCFA ✅ (déjà ajouté)
- HP 27'' - 150,000 FCFA

### SCANNERS (70,000 - 220,000 FCFA)
- Canon CanoScan LiDE 300 - 70,000 FCFA
- HP SCANJET PRO 2600 F1 - 220,000 FCFA

### ONDULEURS (35,000 - 65,000 FCFA)
- Premax UPS 900VA - 35,000 FCFA
- Premax UPS 1200 - 45,000 FCFA ✅ (déjà ajouté)
- Premax UPS 1500 - 65,000 FCFA

### CONSOMMABLES TONERS (40,000 - 90,000 FCFA)
- HP 207A Noir - 50,000 FCFA
- HP 207A Cyan/Magenta/Yellow - 55,000 FCFA chacun
- HP 415A Cyan/Magenta/Yellow - 85,000 FCFA chacun
- HP 415A Noir - 75,000 FCFA
- HP 216A Noir - 40,000 FCFA
- HP 216A Cyan/Magenta/Yellow - 45,000 FCFA chacun
- HP 117A Cyan/Magenta/Yellow - 40,000 FCFA chacun
- HP 119 Noir - 60,000 FCFA
- HP 119 Cyan/Magenta/Yellow - 60,000 FCFA chacun
- HP 136A Noir - 50,000 FCFA
- HP 30A Noir - 53,000 FCFA
- Canon 057 Noir - 80,000 FCFA
- Canon 052 Noir - 87,000 FCFA
- Canon 047H Noir - 55,000 FCFA
- Canon 067 Noir - 70,000 FCFA
- Canon 067 Cyan - 60,000 FCFA
- HP 106A Noir - 45,000/55,000 FCFA
- HP 151A Noir - 90,000 FCFA

### CONSOMMABLES CARTOUCHES (9,500 - 12,000 FCFA)
- HP 305 Noir - 9,500 FCFA
- HP 305 Couleur - 9,500 FCFA
- HP 938 Noir - Prix à définir
- HP 123 Couleur - 12,000 FCFA
- HP 123 Noir - 11,000 FCFA
- HP 963 Noir - Prix à définir
- HP 653 Couleur - 11,000/11,500 FCFA ✅ (déjà ajouté)

## 🚀 Mise à jour du site

Après avoir modifié le fichier `products.json`, le site se met à jour automatiquement !

## 📞 Support

Pour toute question sur l'administration du site :
- WhatsApp : 673 010 098
- Email : interfacepro40@gmail.com

---
*Guide créé pour Interface Pro - Boutique B3-3, Espace commercial le MFOUNDI*
