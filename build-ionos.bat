@echo off
echo ========================================
echo    INTERFACE PRO - BUILD POUR IONOS
echo ========================================
echo.

echo 1. Nettoyage des anciens builds...
if exist "out" rmdir /s /q "out"
if exist ".next" rmdir /s /q ".next"

echo 2. Installation des dependances...
call npm install

echo 3. Creation du build statique...
call npm run build

echo 4. Verification du build...
if exist "out\index.html" (
    echo ✅ Build reussi !
    echo.
    echo 📁 Fichiers generes dans le dossier 'out\'
    echo 📤 Uploadez tout le contenu de 'out\' sur votre serveur IONOS
    echo.
    echo 🌐 Structure generee :
    dir "out" /b
    echo.
    echo 📋 Prochaines etapes :
    echo    1. Connectez-vous a votre FTP IONOS
    echo    2. Uploadez tout le contenu de 'out\' vers /htdocs/
    echo    3. Testez votre site : https://votredomaine.com
    echo.
) else (
    echo ❌ Erreur lors du build !
    echo Verifiez les erreurs ci-dessus.
)

echo ========================================
pause
