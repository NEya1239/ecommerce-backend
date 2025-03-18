import React from 'react';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useShop } from '../context/ShopContext';

export const Shop = () => {
  const { state } = useShop();
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(state.searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">All Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};