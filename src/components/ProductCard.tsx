import React from 'react';
import { Product } from '../interfaces/ProductInterface';


interface ProductGridProps {
  products: Product[];
}

const ProductCard: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white shadow-md rounded-lg overflow-hidden"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-gray-900 font-bold text-lg mb-2">
              {product.name}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-gray-900 font-bold text-xl">
                ₹{product.price.toFixed(2)}
              </span>
              <span className="text-red-500 font-medium text-sm">
                -{product.discount}%
              </span>
            </div>
            <button className="bg-purple-950 text-yellow-400 py-2 px-4 rounded-md mt-4 w-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;