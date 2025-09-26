'use client';

import { useState, useEffect } from 'react';
import productsData from '@/data/products.json';

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

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Charger les produits au démarrage
  useEffect(() => {
    const savedProducts = localStorage.getItem('interface-pro-products');
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
        setProducts(productsData.products);
      }
    } else {
      setProducts(productsData.products);
    }
    setLoading(false);
  }, []);

  // Sauvegarder les produits dans localStorage
  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem('interface-pro-products', JSON.stringify(newProducts));
  };

  // Ajouter un produit
  const addProduct = (product: Omit<Product, 'id'>) => {
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    const newProduct: Product = {
      ...product,
      id: newId
    };
    const updatedProducts = [...products, newProduct];
    saveProducts(updatedProducts);
    return newProduct;
  };

  // Modifier un produit
  const updateProduct = (id: number, updatedProduct: Partial<Product>) => {
    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, ...updatedProduct } : product
    );
    saveProducts(updatedProducts);
    return updatedProducts.find(p => p.id === id);
  };

  // Supprimer un produit
  const deleteProduct = (id: number) => {
    const updatedProducts = products.filter(product => product.id !== id);
    saveProducts(updatedProducts);
    return true;
  };

  // Obtenir un produit par ID
  const getProduct = (id: number) => {
    return products.find(product => product.id === id);
  };

  // Obtenir les produits par catégorie
  const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category === category);
  };

  // Obtenir les catégories uniques
  const getCategories = () => {
    const categories = [...new Set(products.map(product => product.category))];
    return categories;
  };

  // Statistiques
  const getStats = () => {
    return {
      total: products.length,
      inStock: products.filter(p => p.inStock).length,
      outOfStock: products.filter(p => !p.inStock).length,
      featured: products.filter(p => p.featured).length,
      categories: getCategories().length
    };
  };

  // Réinitialiser aux données par défaut
  const resetToDefault = () => {
    saveProducts(productsData.products);
  };

  return {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getProductsByCategory,
    getCategories,
    getStats,
    resetToDefault
  };
}
