import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';

export const Cart = () => {
  const { state, dispatch } = useShop();

  const total = state.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart</h1>
          <p className="text-gray-600 mb-8">Your cart is empty</p>
          <Link
            to="/shop"
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          {state.cart.map(item => (
            <div
              key={item.id}
              className="flex items-center py-6 border-b border-gray-200 last:border-0"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1 ml-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() =>
                    dispatch({
                      type: 'UPDATE_QUANTITY',
                      payload: { id: item.id, quantity: Math.max(1, item.quantity - 1) },
                    })
                  }
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Minus className="h-5 w-5" />
                </button>
                <span className="text-gray-800 font-medium">{item.quantity}</span>
                <button
                  onClick={() =>
                    dispatch({
                      type: 'UPDATE_QUANTITY',
                      payload: { id: item.id, quantity: item.quantity + 1 },
                    })
                  }
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Plus className="h-5 w-5" />
                </button>
                <button
                  onClick={() =>
                    dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })
                  }
                  className="p-1 rounded-full hover:bg-gray-100 text-red-500"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
          <div className="mt-8 flex justify-between items-center">
            <div>
              <p className="text-gray-600">Total:</p>
              <p className="text-2xl font-bold text-gray-800">
                ${total.toFixed(2)}
              </p>
            </div>
            <Link
              to="/checkout"
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};