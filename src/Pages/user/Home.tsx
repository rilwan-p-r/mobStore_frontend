import React, { useState } from 'react';
import Header from '../../components/userComponents/Header';
import Sidebar from '../../components/userComponents/Sidebar';
import ProductCard from '../../components/userComponents/ProductCard';


const Home: React.FC = () => {
  const [sortBy, setSortBy] = useState('popularity');

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto py-2 flex">
        <Sidebar />
        <div className="flex-1 ml-2">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-gray-900 font-bold text-2xl mt-4 mb-6">Mobile Accessories</h1>
            <div className="flex items-center">
              <span className="text-gray-600 mr-2">Show:</span>
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              >
                <option className='text-gray-600' value="popularity">Sort by popularity</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
          <ProductCard />
        </div>
      </div>
    </div>
  );
};

export default Home;