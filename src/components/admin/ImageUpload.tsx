'use client';

import { useState, useRef } from 'react';
import { PhotoIcon, XMarkIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';

interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (imageUrl: string) => void;
  className?: string;
}

export default function ImageUpload({ currentImage, onImageChange, className = '' }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentImage || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Convertir un fichier en base64 pour l'affichage et le stockage
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  // Gérer la sélection de fichier
  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner un fichier image (JPG, PNG, GIF, etc.)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB max
      alert('L\'image ne doit pas dépasser 5MB');
      return;
    }

    setUploading(true);
    try {
      const base64 = await convertToBase64(file);
      setPreviewUrl(base64);
      onImageChange(base64);
    } catch (error) {
      console.error('Erreur lors du traitement de l\'image:', error);
      alert('Erreur lors du traitement de l\'image');
    } finally {
      setUploading(false);
    }
  };

  // Gérer le drag & drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  // Gérer le clic sur l'input file
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  // Supprimer l'image
  const removeImage = () => {
    setPreviewUrl('');
    onImageChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Gérer l'URL manuelle
  const handleUrlChange = (url: string) => {
    setPreviewUrl(url);
    onImageChange(url);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Image du produit
      </label>

      {/* Zone de prévisualisation */}
      {previewUrl && (
        <div className="relative">
          <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
            <img
              src={previewUrl}
              alt="Aperçu du produit"
              className="w-full h-full object-contain"
              onError={() => {
                setPreviewUrl('');
                onImageChange('');
              }}
            />
          </div>
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Zone d'upload */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
          dragActive
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="text-center">
          {uploading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
              <p className="text-sm text-gray-600">Traitement de l'image...</p>
            </div>
          ) : (
            <>
              <PhotoIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
                    Cliquez pour sélectionner
                  </span>
                  {' '}ou glissez-déposez une image
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF jusqu'à 5MB
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Input URL manuelle */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Ou saisissez une URL d'image
        </label>
        <div className="flex space-x-2">
          <input
            type="url"
            value={previewUrl.startsWith('data:') ? '' : previewUrl}
            onChange={(e) => handleUrlChange(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://exemple.com/image.jpg"
          />
          <button
            type="button"
            onClick={() => handleUrlChange('')}
            className="px-3 py-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Effacer
          </button>
        </div>
      </div>

      {/* Images d'exemple Interface Pro */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Images d'exemple Interface Pro
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            '/images/hp-laserjet-pro-4003dn.png',
            '/images/canon-pixma-mg2546s.jpg',
            '/images/laptop-hp-pavilion.jpg',
            '/images/router-tp-link.jpg'
          ].map((imagePath, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleUrlChange(imagePath)}
              className="relative h-16 bg-gray-100 rounded border-2 border-transparent hover:border-blue-400 transition-colors overflow-hidden"
            >
              <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                Exemple {index + 1}
              </div>
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500">
          💡 Conseil : Placez vos images dans le dossier <code className="bg-gray-100 px-1 rounded">public/images/</code> de votre projet
        </p>
      </div>
    </div>
  );
}
