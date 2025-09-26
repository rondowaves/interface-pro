# Script PowerShell pour build Interface Pro - IONOS
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   INTERFACE PRO - BUILD POUR IONOS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Fonction pour afficher les étapes
function Write-Step {
    param($Message)
    Write-Host "🔄 $Message" -ForegroundColor Yellow
}

function Write-Success {
    param($Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Write-Error {
    param($Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

try {
    # Étape 1: Nettoyage
    Write-Step "Nettoyage des anciens builds..."
    if (Test-Path "out") { Remove-Item -Recurse -Force "out" }
    if (Test-Path ".next") { Remove-Item -Recurse -Force ".next" }
    Write-Success "Nettoyage terminé"

    # Étape 2: Installation des dépendances
    Write-Step "Vérification des dépendances..."
    if (-not (Test-Path "node_modules")) {
        Write-Step "Installation des dépendances..."
        npm install
        if ($LASTEXITCODE -ne 0) { throw "Erreur lors de l'installation des dépendances" }
    }
    Write-Success "Dépendances OK"

    # Étape 3: Build
    Write-Step "Création du build statique pour IONOS..."
    npm run build
    if ($LASTEXITCODE -ne 0) { throw "Erreur lors du build" }

    # Étape 4: Vérification
    if (Test-Path "out\index.html") {
        Write-Success "Build réussi !"
        Write-Host ""
        Write-Host "📁 Fichiers générés dans le dossier 'out\'" -ForegroundColor Cyan
        Write-Host "📤 Uploadez tout le contenu de 'out\' sur votre serveur IONOS" -ForegroundColor Cyan
        Write-Host ""
        
        # Afficher la structure
        Write-Host "🌐 Structure générée :" -ForegroundColor Cyan
        Get-ChildItem "out" | ForEach-Object { 
            if ($_.PSIsContainer) {
                Write-Host "  📁 $($_.Name)/" -ForegroundColor Blue
            } else {
                Write-Host "  📄 $($_.Name)" -ForegroundColor White
            }
        }
        
        Write-Host ""
        Write-Host "📋 Prochaines étapes :" -ForegroundColor Cyan
        Write-Host "   1. Connectez-vous à votre FTP IONOS" -ForegroundColor White
        Write-Host "   2. Uploadez tout le contenu de 'out\' vers /htdocs/" -ForegroundColor White
        Write-Host "   3. Testez votre site : https://votredomaine.com" -ForegroundColor White
        Write-Host ""
        Write-Host "📞 Support Interface Pro :" -ForegroundColor Cyan
        Write-Host "   WhatsApp: +237 673 010 098" -ForegroundColor White
        Write-Host "   Email: interfacepro40@gmail.com" -ForegroundColor White
        
    } else {
        Write-Error "Le fichier index.html n'a pas été généré !"
        throw "Build incomplet"
    }

} catch {
    Write-Error "Erreur: $($_.Exception.Message)"
    Write-Host ""
    Write-Host "🆘 Besoin d'aide ?" -ForegroundColor Yellow
    Write-Host "   - Vérifiez que Node.js est installé" -ForegroundColor White
    Write-Host "   - Vérifiez votre connexion internet" -ForegroundColor White
    Write-Host "   - Contactez le support Interface Pro" -ForegroundColor White
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Read-Host "Appuyez sur Entrée pour continuer"
