import React, { useState } from 'react';
import { Product } from '../../interfaces/Product.interface';
import Header from '../../components/userComponents/Header';
import Sidebar from '../../components/userComponents/Sidebar';
import ProductCard from '../../components/userComponents/ProductCard';



const products: Product[] = [
  {
    _id: '1',
    name: 'GadPro Flash Series Two-for-Three Data Cable',
    imageUrl: 'https://images.unsplash.com/photo-1630080644615-0b157f1574ec?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 499.0,
    
  },
  {
    _id: '2',
    name: 'Dr Vaku Clear Bolt 10000 mAh Powerbank 20W Fast',
    imageUrl: 'https://img.freepik.com/free-photo/top-view-virtual-reality-headset-white-headphones_23-2148912738.jpg?t=st=1730987766~exp=1730991366~hmac=44e9bfa0beca88c92b47192de0a56de65ecff009b2cdc1502942c5c01d1c01fe&w=740',
    price: 1349.0,

  },
  {
    _id: '3',
    name: 'LDNIO Z4 6AMAX Universal Plug (ABS VO)',
    imageUrl: 'https://img.freepik.com/free-psd/technological-headphones-isolated_23-2151209589.jpg?t=st=1730987785~exp=1730991385~hmac=178db41244d249423d199a11350a49c2ccbe46536f754715017cf46088ff6b5d&w=826',
    price: 399.0,
  },
  {
    _id: '4',
    name: 'JBL Tune 205BT by Harman Wireless Earbud',
    imageUrl: 'https://img.freepik.com/free-photo/top-view-hearing-aids-kit_23-2149706002.jpg?t=st=1730987821~exp=1730991421~hmac=d069a81298020a5a36146f9f762d9c4d2052ee9b42d141256e3528aaafb5d380&w=826',
    price: 1999.0,
  },
];

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
          <ProductCard products={products} />
        </div>
      </div>
    </div>
  );
};

export default Home;