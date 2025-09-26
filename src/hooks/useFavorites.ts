'use client';

import { useState, useEffect } from 'react';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  priceRange: string;
  image: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  inStock: boolean;
  featured: boolean;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Product[]>([]);

  // Charger les favoris depuis localStorage au démarrage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('interface-pro-favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Erreur lors du chargement des favoris:', error);
      }
    }
  }, []);

  // Sauvegarder les favoris dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('interface-pro-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (product: Product) => {
    setFavorites(prev => {
      const isAlreadyFavorite = prev.some(fav => fav.id === product.id);
      if (!isAlreadyFavorite) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromFavorites = (productId: number) => {
    setFavorites(prev => prev.filter(fav => fav.id !== productId));
  };

  const toggleFavorite = (product: Product) => {
    const isAlreadyFavorite = favorites.some(fav => fav.id === product.id);
    if (isAlreadyFavorite) {
      removeFromFavorites(product.id);
      return false; // Retiré des favoris
    } else {
      addToFavorites(product);
      return true; // Ajouté aux favoris
    }
  };

  const isFavorite = (productId: number) => {
    return favorites.some(fav => fav.id === productId);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    favoritesCount: favorites.length
  };
}
