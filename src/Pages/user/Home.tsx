import { useState } from 'react';
import Header from '../../components/userComponents/Header';
import Sidebar from '../../components/userComponents/Sidebar';
import ProductCard from '../../components/userComponents/ProductCard';
import { TbGridDots } from "react-icons/tb";
import { CiMenuBurger } from "react-icons/ci";
import ViewCompactIcon from '@mui/icons-material/ViewCompact';

const Home = () => {
  const [sortBy, setSortBy] = useState('popularity');
  const [itemsPerPage, setItemsPerPage] = useState('12');
  const [viewMode, setViewMode] = useState('grid-4');

  const handleItemsClick = (value) => {
    setItemsPerPage(value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto py-2 px-4 lg:px-2">
        <div className="flex flex-col lg:flex-row relative">
          {/* Sidebar - always visible */}
          <div className="w-full lg:w-1/4 xl:w-1/5 mb-4 lg:mb-0">
            <Sidebar />
          </div>

          <div className="flex-1 lg:ml-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 space-y-4 sm:space-y-0">
              <h1 className="text-gray-900 font-bold text-xl sm:text-2xl">Mobile Accessories</h1>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                {/* Show Items Per Page */}
                <div className="flex items-center w-full sm:w-auto">
                  <span className="text-gray-600 mr-2 text-sm sm:text-base">Show : </span>
                  <div className="flex items-center space-x-1">
                    {['9', '12', '18', '24'].map((num) => (
                      <div key={num} className="flex items-center">
                        <button
                          onClick={() => handleItemsClick(num)}
                          className={`hover:text-purple-600 text-sm sm:text-base ${
                            itemsPerPage === num ? 'text-purple-600' : 'text-gray-600'
                          }`}
                        >
                          {num}
                        </button>
                        {num !== '24' && <span className="text-gray-400 mx-1">/</span>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* View Mode Buttons */}
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1 hover:text-purple-600 ${viewMode === 'list' ? 'text-purple-600' : 'text-gray-600'}`}
                  >
                    <CiMenuBurger className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  <button
                    onClick={() => setViewMode('grid-3')}
                    className={`p-1 hover:text-purple-600 ${viewMode === 'grid-3' ? 'text-purple-600' : 'text-gray-600'}`}
                  >
                    <TbGridDots className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  <button
                    onClick={() => setViewMode('grid-4')}
                    className={`p-1 hover:text-purple-600 ${viewMode === 'grid-4' ? 'text-purple-600' : 'text-gray-600'}`}
                  >
                    <ViewCompactIcon sx={{ fontSize: { xs: 24, sm: 33 } }} />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center w-full sm:w-auto">
                  <select
                    value={sortBy}
                    onChange={handleSortChange}
                    className="w-full sm:w-auto bg-white border text-gray-600 border-gray-300 rounded-md py-2 px-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                  >
                    <option value="popularity">Sort by popularity</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

              <ProductCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;