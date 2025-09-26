'use client';

import { useState, useEffect } from 'react';
import { useProducts, Product } from '@/hooks/useProducts';
import { XMarkIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import ImageUpload from './ImageUpload';
import ImageGuide from './ImageGuide';

interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
}

export default function ProductForm({ product, onClose }: ProductFormProps) {
  const { addProduct, updateProduct, getCategories } = useProducts();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // États du formulaire
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    priceRange: '',
    image: '',
    description: '',
    features: [''],
    specifications: {} as Record<string, string>,
    inStock: true,
    featured: false
  });

  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

  const categories = getCategories();
  const isEditing = !!product;

  // Charger les données du produit en mode édition
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price,
        priceRange: product.priceRange,
        image: product.image,
        description: product.description,
        features: product.features.length > 0 ? product.features : [''],
        specifications: product.specifications,
        inStock: product.inStock,
        featured: product.featured
      });
    }
  }, [product]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index: number) => {
    if (formData.features.length > 1) {
      const newFeatures = formData.features.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        features: newFeatures
      }));
    }
  };

  const addSpecification = () => {
    if (newSpecKey && newSpecValue) {
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [newSpecKey]: newSpecValue
        }
      }));
      setNewSpecKey('');
      setNewSpecValue('');
    }
  };

  const removeSpecification = (key: string) => {
    const newSpecs = { ...formData.specifications };
    delete newSpecs[key];
    setFormData(prev => ({
      ...prev,
      specifications: newSpecs
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validation
      if (!formData.name.trim()) {
        throw new Error('Le nom du produit est requis');
      }
      if (!formData.category) {
        throw new Error('La catégorie est requise');
      }
      if (!formData.price.trim()) {
        throw new Error('Le prix est requis');
      }

      // Nettoyer les features vides
      const cleanFeatures = formData.features.filter(f => f.trim() !== '');
      
      // Préparer les données
      const productData = {
        ...formData,
        features: cleanFeatures,
        priceRange: formData.priceRange || formData.price
      };

      if (isEditing && product) {
        updateProduct(product.id, productData);
      } else {
        addProduct(productData);
      }

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* En-tête */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {isEditing ? 'Modifier le produit' : 'Ajouter un produit'}
            </h2>
            <div className="mt-2">
              <ImageGuide />
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informations de base */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Informations de base</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du produit *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: HP LaserJet Pro 4003DN"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catégorie *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </option>
                  ))}
                  <option value="ordinateurs">Ordinateurs</option>
                  <option value="imprimantes">Imprimantes</option>
                  <option value="consommables">Consommables</option>
                  <option value="reseaux">Réseaux</option>
                  <option value="accessoires">Accessoires</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prix *
                </label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: À partir de 250,000 FCFA"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fourchette de prix (optionnel)
                </label>
                <input
                  type="text"
                  value={formData.priceRange}
                  onChange={(e) => handleInputChange('priceRange', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: 250,000 - 300,000 FCFA"
                />
              </div>

              {/* Upload d'image */}
              <ImageUpload
                currentImage={formData.image}
                onImageChange={(imageUrl) => handleInputChange('image', imageUrl)}
              />
            </div>

            {/* Description et options */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Description et options</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Description détaillée du produit..."
                />
              </div>

              <div className="flex items-center space-x-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => handleInputChange('inStock', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">En stock</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => handleInputChange('featured', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Produit vedette</span>
                </label>
              </div>
            </div>
          </div>

          {/* Caractéristiques */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Caractéristiques</h3>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: Impression recto-verso automatique"
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addFeature}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
              >
                <PlusIcon className="w-4 h-4" />
                <span>Ajouter une caractéristique</span>
              </button>
            </div>
          </div>

          {/* Spécifications techniques */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Spécifications techniques</h3>
            
            {/* Spécifications existantes */}
            <div className="space-y-2 mb-4">
              {Object.entries(formData.specifications).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2 bg-gray-50 p-2 rounded">
                  <span className="font-medium text-sm text-gray-700 capitalize">{key.replace('_', ' ')} :</span>
                  <span className="text-sm text-gray-600">{value}</span>
                  <button
                    type="button"
                    onClick={() => removeSpecification(key)}
                    className="p-1 text-red-600 hover:bg-red-100 rounded"
                  >
                    <TrashIcon className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Ajouter une spécification */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newSpecKey}
                onChange={(e) => setNewSpecKey(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nom (ex: processeur)"
              />
              <input
                type="text"
                value={newSpecValue}
                onChange={(e) => setNewSpecValue(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Valeur (ex: Intel Core i5)"
              />
              <button
                type="button"
                onClick={addSpecification}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Ajouter
              </button>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Enregistrement...' : (isEditing ? 'Modifier' : 'Ajouter')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
