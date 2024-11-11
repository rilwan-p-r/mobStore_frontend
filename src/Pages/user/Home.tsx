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
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Container - Changed lg: to md: breakpoint */}
          <aside className="w-full md:w-1/4 xl:w-1/5">
            <div className="sticky top-4">
              <Sidebar />
            </div>
          </aside>

          {/* Main Content - Removed ml-20 and adjusted responsive classes */}
          <main className="flex-1 w-full">
            {/* Header Section */}
            <div className="space-y-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Mobile Accessories</h1>

                {/* Controls Container - Improved responsive layout */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  {/* Items Per Page */}
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2 whitespace-nowrap">Show:</span>
                    <div className="flex items-center space-x-1">
                      {['9', '12', '18', '24'].map((num, index) => (
                        <div key={num} className="flex items-center">
                          <button
                            onClick={() => handleItemsClick(num)}
                            className={`px-1 hover:text-purple-600 transition-colors ${
                              itemsPerPage === num ? 'text-purple-600 font-medium' : 'text-gray-600'
                            }`}
                          >
                            {num}
                          </button>
                          {index < 3 && <span className="text-gray-400">/</span>}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* View Mode - Improved spacing */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-1.5 rounded-md transition-colors ${
                        viewMode === 'list' ? 'text-purple-600 bg-purple-50' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <CiMenuBurger className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('grid-3')}
                      className={`p-1.5 rounded-md transition-colors ${
                        viewMode === 'grid-3' ? 'text-purple-600 bg-purple-50' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <TbGridDots className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('grid-4')}
                      className={`p-1.3 rounded-md transition-colors ${
                        viewMode === 'grid-4' ? 'text-purple-600' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <ViewCompactIcon sx={{ fontSize: 30 }} />
                    </button>
                  </div>

                  {/* Sort Dropdown - Improved mobile width */}
                  <div className="w-full sm:w-auto">
                    <select
                      value={sortBy}
                      onChange={handleSortChange}
                      className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="popularity">Sort by popularity</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="w-full">
              <ProductCard />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;