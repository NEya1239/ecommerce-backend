import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';

export const Categories = () => {
  const categories = [
    {
      id: 'electronics',
      name: 'Electronics',
      description: 'Latest gadgets and electronic devices',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661',
    },
    {
      id: 'fashion',
      name: 'Fashion',
      description: 'Trendy clothing and accessories',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050',
    },
    {
      id: 'home',
      name: 'Home & Living',
      description: 'Beautiful items for your home',
      image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a',
    },
  ];

  const [selectedCategory, setSelectedCategory] = React.useState(categories[0].id);

  const filteredProducts = products.filter(
    product => product.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shop by Category</h1>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`relative overflow-hidden rounded-lg group transition ${
                selectedCategory === category.id
                  ? 'ring-2 ring-blue-600'
                  : 'hover:ring-2 hover:ring-blue-400'
              }`}
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={category.image}
                  alt={category.name}
                  className="object-cover w-full h-48"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white p-4">
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-sm text-center">{category.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {categories.find(c => c.id === selectedCategory)?.name} Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};