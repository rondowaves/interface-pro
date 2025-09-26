# Interface Pro - Site E-commerce

Site web e-commerce pour Interface Pro, boutique informatique située à Yaoundé, Cameroun.

## 🏪 À propos d'Interface Pro

**Localisation :** B3-3, Espace commercial le MFOUNDI (entre marché central et face Hilton)  
**Contact :** +237 673 010 098 (WhatsApp) | interfacepro40@gmail.com  
**Spécialités :** Vente de matériel informatique (PC, imprimantes, consommables, réseaux, accessoires)

## 🚀 Fonctionnalités

- ✅ Catalogue produits complet avec filtres et recherche
- ✅ Page contact avec Google Maps intégrée
- ✅ Actions WhatsApp et Email directes
- ✅ Design responsive mobile/desktop
- ✅ Système d'images optimisé
- ✅ Dashboard administrateur sécurisé

## 💻 Technologies

- **Framework :** Next.js 15
- **Styling :** Tailwind CSS 4
- **Language :** TypeScript
- **Icons :** Heroicons

## 🛠️ Installation

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.

## 🚀 Déploiement IONOS

### Build pour production :
```bash
npm run build:static
```

### Script automatisé :
```bash
# Windows
.\build-ionos.bat

# PowerShell
.\build-ionos.ps1
```

### Upload sur IONOS :
1. Uploadez le contenu du dossier `out/` vers `/htdocs/`
2. Configurez votre domaine
3. Activez SSL/HTTPS

📋 **Guide complet :** [DEPLOIEMENT-IONOS.md](./DEPLOIEMENT-IONOS.md)

## 📦 Structure

- `/src/app` - Pages principales
- `/src/components` - Composants réutilisables  
- `/src/data` - Données produits
- `/public/images` - Images produits et boutique

## 🎨 Design

Couleurs Interface Pro : Bleu (#3B82F6) et Rouge (#EF4444)
