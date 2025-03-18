import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { products } from "../data/products";

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <div className="text-center text-red-500">Product not found</div>;
  }

  const { state, dispatch } = useShop();
  const cartItem = state.cart.find((item) => item.id === product.id);
  const [quantity, setQuantity] = useState(cartItem?.quantity || 1);

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity },
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded" />
      <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
      <p className="text-gray-700 mt-2">{product.description}</p>
      <p className="text-xl font-semibold text-gray-900 mt-2">${product.price.toFixed(2)}</p>

      <div className="mt-4 flex items-center space-x-4">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="p-2 bg-gray-300 rounded"
        >
          -
        </button>
        <span className="text-lg">{quantity}</span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="p-2 bg-gray-300 rounded"
        >
          +
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};
