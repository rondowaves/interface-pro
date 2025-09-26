# 🚀 Guide de Déploiement Interface Pro sur IONOS

## 📋 Prérequis IONOS

### Types d'hébergement compatibles :
- ✅ **Hébergement Web** (Starter, Plus, Pro)
- ✅ **Hébergement WordPress** (avec accès FTP)
- ✅ **Serveur VPS** (recommandé pour performance)
- ✅ **Serveur Dédié**

## 🛠️ Étapes de Déploiement

### 1️⃣ **Préparation du Build**

```bash
# Installer les dépendances
npm install

# Créer le build statique pour IONOS
npm run build:static

# Le dossier 'out' contient les fichiers à uploader
```

### 2️⃣ **Structure des Fichiers Générés**

Après `npm run build:static`, vous obtenez :
```
out/
├── index.html              # Page d'accueil
├── produits/
│   └── index.html          # Page produits
├── contact/
│   └── index.html          # Page contact
├── admin/
│   └── index.html          # Dashboard admin
├── _next/                  # Assets Next.js
├── images/                 # Images Interface Pro
└── .htaccess              # Configuration Apache
```

### 3️⃣ **Upload via FTP/SFTP**

#### **Méthode 1 : FileZilla (Recommandée)**
1. **Téléchargez** [FileZilla](https://filezilla-project.org/)
2. **Connectez-vous** avec vos identifiants IONOS :
   - Hôte : `ftp.votredomaine.com` ou IP fournie
   - Utilisateur : Votre nom d'utilisateur IONOS
   - Mot de passe : Votre mot de passe IONOS
   - Port : 21 (FTP) ou 22 (SFTP)
3. **Naviguez** vers le dossier `/htdocs` ou `/public_html`
4. **Uploadez** tout le contenu du dossier `out/`

#### **Méthode 2 : Interface Web IONOS**
1. **Connectez-vous** à votre espace client IONOS
2. **Allez** dans "Hébergement Web" → "Gestionnaire de fichiers"
3. **Uploadez** les fichiers dans le dossier racine

### 4️⃣ **Configuration du Domaine**

#### **Domaine Principal :**
- Pointez votre domaine vers l'hébergement IONOS
- Les fichiers doivent être dans `/htdocs/` ou `/public_html/`

#### **Sous-domaine (Optionnel) :**
```
interface-pro.votredomaine.com
```

### 5️⃣ **Vérifications Post-Déploiement**

#### **✅ Tests à Effectuer :**
1. **Page d'accueil** : `https://votredomaine.com`
2. **Page produits** : `https://votredomaine.com/produits/`
3. **Page contact** : `https://votredomaine.com/contact/`
4. **Images produits** : Vérifier l'affichage des photos
5. **WhatsApp/Email** : Tester les liens de contact
6. **Google Maps** : Vérifier la carte sur la page contact
7. **Responsive** : Tester sur mobile/tablette

## 🔧 Configuration IONOS Spécifique

### **SSL/HTTPS (Recommandé)**
1. **Activez** le certificat SSL dans votre espace IONOS
2. **Forcez** HTTPS via le `.htaccess` (déjà configuré)

### **Performances**
- ✅ **Compression Gzip** activée via `.htaccess`
- ✅ **Cache navigateur** configuré (1 mois pour images)
- ✅ **Images optimisées** (unoptimized: true)

### **Sécurité**
- ✅ **Headers sécurité** configurés
- ✅ **Protection XSS** activée
- ✅ **Fichiers sensibles** protégés

## 📱 Fonctionnalités Déployées

### **🏪 Site Interface Pro Complet :**
- ✅ **Catalogue produits** avec 25+ articles
- ✅ **Filtres et recherche** fonctionnels
- ✅ **Contact WhatsApp** : +237 673 010 098
- ✅ **Email direct** : interfacepro40@gmail.com
- ✅ **Google Maps** : B3-3 MFOUNDI, Yaoundé
- ✅ **Dashboard admin** : `/admin` (admin/interfacepro2024)

### **📊 Analytics (Optionnel)**
Ajoutez Google Analytics dans votre espace IONOS :
1. **Créez** un compte Google Analytics
2. **Ajoutez** le code de suivi via l'interface IONOS
3. **Suivez** les visites et conversions

## 🆘 Dépannage

### **Problème : Pages 404**
- **Vérifiez** que `.htaccess` est bien uploadé
- **Activez** mod_rewrite dans IONOS (généralement activé par défaut)

### **Problème : Images ne s'affichent pas**
- **Vérifiez** les permissions des dossiers (755)
- **Vérifiez** que le dossier `images/` est bien uploadé

### **Problème : Site lent**
- **Activez** la compression dans IONOS
- **Vérifiez** que le cache est configuré

## 📞 Support

### **Interface Pro :**
- **WhatsApp** : +237 673 010 098
- **Email** : interfacepro40@gmail.com

### **IONOS :**
- **Support client** : Via votre espace client
- **Documentation** : [help.ionos.fr](https://help.ionos.fr)

---

**🎉 Votre boutique Interface Pro sera en ligne et accessible 24h/7j sur IONOS !**
