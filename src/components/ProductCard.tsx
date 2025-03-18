import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { state, dispatch } = useShop();

  const isInWishlist = state.wishlist.some(item => item.id === product.id);
  const isInCart = state.cart.some(item => item.id === product.id);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden p-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{product.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() =>
                isInWishlist
                  ? dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id })
                  : dispatch({ type: 'ADD_TO_WISHLIST', payload: product })
              }
              className={`p-2 rounded-full ${
                isInWishlist ? 'bg-red-500 text-white' : 'bg-gray-100'
              }`}
            >
              <Heart className="h-5 w-5" />
            </button>
            <button
              onClick={() =>
                dispatch({ type: 'ADD_TO_CART', payload: product })
              }
              className={`p-2 rounded-full ${
                isInCart ? 'bg-green-500 text-white' : 'bg-gray-100'
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="mt-2">
          <Link
            to={`/product/${product.id}`}
            className="text-blue-500 hover:underline"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};
