'use client';

import { useState } from 'react';
import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function ImageGuide() {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
      >
        <InformationCircleIcon className="w-4 h-4 mr-1" />
        Guide d'utilisation des images
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Guide d'utilisation des images - Interface Pro
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Méthodes d'ajout */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              3 façons d'ajouter des images
            </h3>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">1. 📁 Glisser-déposer ou sélectionner</h4>
                <p className="text-sm text-blue-800">
                  Glissez votre image dans la zone ou cliquez pour sélectionner un fichier depuis votre ordinateur.
                  L'image sera automatiquement convertie et stockée.
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">2. 🌐 URL d'image en ligne</h4>
                <p className="text-sm text-green-800">
                  Copiez l'URL d'une image depuis internet (clic droit → "Copier l'adresse de l'image").
                </p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium text-purple-900 mb-2">3. 📂 Images locales du projet</h4>
                <p className="text-sm text-purple-800">
                  Placez vos images dans le dossier <code className="bg-purple-100 px-1 rounded">public/images/</code> 
                  puis utilisez le chemin <code className="bg-purple-100 px-1 rounded">/images/nom-image.jpg</code>
                </p>
              </div>
            </div>
          </div>

          {/* Recommandations */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              📋 Recommandations pour Interface Pro
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex items-start space-x-2">
                <span className="text-green-600 font-bold">✓</span>
                <span className="text-sm text-gray-700">
                  <strong>Format :</strong> JPG, PNG ou WebP (PNG recommandé pour la transparence)
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-600 font-bold">✓</span>
                <span className="text-sm text-gray-700">
                  <strong>Taille :</strong> Maximum 5MB par image
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-600 font-bold">✓</span>
                <span className="text-sm text-gray-700">
                  <strong>Dimensions :</strong> 800x800px minimum pour une bonne qualité
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-600 font-bold">✓</span>
                <span className="text-sm text-gray-700">
                  <strong>Fond :</strong> Fond blanc ou transparent pour un rendu professionnel
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-600 font-bold">✓</span>
                <span className="text-sm text-gray-700">
                  <strong>Nommage :</strong> Utilisez des noms descriptifs (ex: hp-laserjet-4003dn.jpg)
                </span>
              </div>
            </div>
          </div>

          {/* Organisation des images */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              📁 Organisation recommandée
            </h3>
            <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
              <div className="space-y-1">
                <div>📂 public/</div>
                <div className="ml-4">📂 images/</div>
                <div className="ml-8">📂 ordinateurs/</div>
                <div className="ml-12">📄 laptop-hp-pavilion.jpg</div>
                <div className="ml-12">📄 desktop-dell-optiplex.jpg</div>
                <div className="ml-8">📂 imprimantes/</div>
                <div className="ml-12">📄 hp-laserjet-pro-4003dn.png</div>
                <div className="ml-12">📄 canon-pixma-mg2546s.jpg</div>
                <div className="ml-8">📂 accessoires/</div>
                <div className="ml-12">📄 souris-logitech.jpg</div>
                <div className="ml-12">📄 clavier-hp.jpg</div>
              </div>
            </div>
          </div>

          {/* Conseils spécifiques Interface Pro */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              💡 Conseils spécifiques Interface Pro
            </h3>
            <div className="space-y-3">
              <div className="bg-yellow-50 p-3 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Photos produits :</strong> Prenez vos propres photos des produits en magasin 
                  pour montrer l'état réel et créer confiance avec vos clients camerounais.
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Images fabricant :</strong> Utilisez les images officielles des fabricants 
                  (HP, Canon, Dell, etc.) disponibles sur leurs sites web.
                </p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Cohérence :</strong> Gardez un style uniforme (même fond, même éclairage) 
                  pour un catalogue professionnel.
                </p>
              </div>
            </div>
          </div>

          {/* Bouton fermer */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Compris !
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
