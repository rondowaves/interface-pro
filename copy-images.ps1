# Script pour copier les images avec des noms simples
$sourceDir = "public\images\Produit"
$targetDir = "public\images\products"

# Créer le dossier de destination s'il n'existe pas
if (!(Test-Path $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir
}

# Copier les images avec des noms simples
Copy-Item "$sourceDir\IMPRIMANTE HP LASER JET PRO 4003DN.png" "$targetDir\hp-laserjet-pro-4003dn.png" -ErrorAction SilentlyContinue
Copy-Item "$sourceDir\IMPRIMANTE HP LASER JET PRO 4103 DW.png" "$targetDir\hp-laserjet-pro-4103dw.png" -ErrorAction SilentlyContinue
Copy-Item "$sourceDir\Canon PIXMA MG2546S – Imprimante Multifonction Jet d'Encre Couleur.jpg" "$targetDir\canon-pixma-mg2546s.jpg" -ErrorAction SilentlyContinue
Copy-Item "$sourceDir\HP LASER 135W IMPRIMANTE MULTIFONCTION LASER MONOCHROME.png" "$targetDir\hp-laser-135w.png" -ErrorAction SilentlyContinue
Copy-Item "$sourceDir\LAPTOP LENOVO IDEAPAD3 SLIM  intel core i5-13420h (2,1 GHz).png" "$targetDir\lenovo-ideapad3-slim.png" -ErrorAction SilentlyContinue
Copy-Item "$sourceDir\DESKTOP COMPLET HP CORE I3 290 G9.png" "$targetDir\hp-desktop-290g9.png" -ErrorAction SilentlyContinue
Copy-Item "$sourceDir\Unité centrale HP Pro 290 G9 Tower i5-12400 Ram.png" "$targetDir\hp-pro-290g9-tower.png" -ErrorAction SilentlyContinue
Copy-Item "$sourceDir\Ordinateur portable Lenovo intel celeron dual core.png" "$targetDir\lenovo-celeron.png" -ErrorAction SilentlyContinue
Copy-Item "$sourceDir\ÉCRAN  HP 24''.png" "$targetDir\ecran-hp-24.png" -ErrorAction SilentlyContinue
Copy-Item "$sourceDir\ÉCRAN  HP 20''.png" "$targetDir\ecran-hp-20.png" -ErrorAction SilentlyContinue
Copy-Item "$sourceDir\Cartouche HP 653 (3YM74AE) couleur de 200 pages.png" "$targetDir\cartouche-hp-653-couleur.png" -ErrorAction SilentlyContinue
Copy-Item "$sourceDir\Cartouche d'encre 653 Ink Advantage trois couleurs HP authentique.png" "$targetDir\cartouche-hp-653-noir.png" -ErrorAction SilentlyContinue
Copy-Item "$sourceDir\HP 963 Cartouche d'encre noire authentique .png" "$targetDir\cartouche-hp-963.png" -ErrorAction SilentlyContinue
Copy-Item "$sourceDir\HP LASER 107A IMPRIMANTE LASER MONOCHROME MONOFONCTION.png" "$targetDir\hp-laser-107a.png" -ErrorAction SilentlyContinue
Copy-Item "$sourceDir\Onduleur Premax UPS PM-UPS 1200.jpg" "$targetDir\onduleur-premax-1200.jpg" -ErrorAction SilentlyContinue
Copy-Item "$sourceDir\IMPRIMANTE HP LASER JET MFP M141A.png" "$targetDir\hp-laserjet-m141a.png" -ErrorAction SilentlyContinue
Copy-Item "$sourceDir\IMPRIMANTE HP LASERJET MULTIFONCTION 137FNW.png" "$targetDir\hp-laserjet-137fnw.png" -ErrorAction SilentlyContinue
Copy-Item "$sourceDir\IMPRIMANTE MULTIFONCTION HP COLOR LASER JET PRO 4303 DW.png" "$targetDir\hp-color-laserjet-4303dw.png" -ErrorAction SilentlyContinue
Copy-Item "$sourceDir\Canon CanoScan LiDE 300 Scanner à plat 2400 x 2400 DPI.png" "$targetDir\canon-lide-300.png" -ErrorAction SilentlyContinue
Copy-Item "$sourceDir\IMPRIMANTE Canon i-SENSYS MF655Cdw.png" "$targetDir\canon-mf655cdw.png" -ErrorAction SilentlyContinue
Copy-Item "$sourceDir\Photocopieur Canon iR 2425I – Monochrome Réseau .jpg" "$targetDir\canon-ir-2425i.jpg" -ErrorAction SilentlyContinue

Write-Host "Images copiées avec succès dans le dossier $targetDir"
