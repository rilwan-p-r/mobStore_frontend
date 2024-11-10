import { useState } from 'react';
import { TbArrowsShuffle } from "react-icons/tb";
import { RiShoppingCartLine } from "react-icons/ri";
import { GoHeart } from "react-icons/go";
import { LogOut, User } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { removeUserInfo } from '../../redux/slices/userSlice';
import AuthSlider from './AuthSlider';
import { useNavigate } from 'react-router-dom';
import { Popconfirm } from 'antd';
import { clearCart } from '../../redux/slices/cartSlice';

const Header = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const userInfo = useSelector((state: RootState) => state?.auth?.userInfo);
  const { cartCount, cartTotal } = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserAuthIcon = () => {
    setIsAuthOpen(true);
  };

  const handleCloseAuth = () => {
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    dispatch(removeUserInfo());
    dispatch(clearCart());
    navigate('/')
    console.log('Logging out...');
  };

  const handleCartClick = () => {
    if (userInfo) {
      navigate('/Cart');
    } else {
      setIsAuthOpen(true);
    }
  };

  return (
    <>
      <header className="bg-purple-200 w-full shadow relative z-10">
        <div className="container mx-auto py-2">
          <div className="flex items-center justify-between">
            {/* Categories Button */}
            <div className="flex items-center space-x-8">
              <button className="flex items-center space-x-1 bg-white rounded-full px-0.5 py-1">
                <div className="bg-purple-950 rounded-full p-1.5">
                  <div className="w-6 h-6 grid grid-cols-2 gap-0.5 p-0.5">
                    <div className="border border-yellow-500 rounded-sm"></div>
                    <div className="border border-yellow-500 rounded-sm"></div>
                    <div className="border border-yellow-500 rounded-sm"></div>
                    <div className="border border-yellow-500 rounded-sm"></div>
                  </div>
                </div>
                <span className="px-1 text-gray-700 text-sm font-medium">All Categories</span>
              </button>

              <nav className="flex items-center space-x-6">
                <a href="/deals" className="text-gray-700 font-semibold hover:text-gray-900">
                  Deals
                </a>
                <a href="/shop" className="text-gray-700 font-semibold hover:text-gray-900">
                  Shop
                </a>
                <a href="/contacts" className="text-gray-700 font-semibold hover:text-gray-900">
                  Our Contacts
                </a>
                <a href="/stores" className="text-gray-700 font-semibold hover:text-gray-900">
                  Stores
                </a>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              {userInfo ? (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center bg-white px-3 py-2 rounded-full">
                    <User className="h-5 w-5 text-gray-600 mr-2" />
                    <span className="text-gray-700 font-medium">Welcome {userInfo.name}</span>
                  </div>
                  <Popconfirm
                    title="Logout"
                    description="Are you sure you want to logout?"
                    onConfirm={handleLogout}
                    okText="Yes"
                    cancelText="No"
                    okButtonProps={{ danger: true }}
                  >
                    <button
                      className="focus:outline-none bg-white p-2 rounded-full hover:bg-red-100 transition-colors"
                    >
                      <LogOut className="h-5 w-5 text-red-600" />
                    </button>
                  </Popconfirm>
                </div>
              ) : (
                <button
                  className="focus:outline-none bg-white p-2 rounded-full"
                  onClick={handleUserAuthIcon}
                >
                  <User className="h-6 w-6" />
                </button>
              )}
              <button className="focus:outline-none bg-white p-2 rounded-full relative">
                <TbArrowsShuffle className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium border-2 border-purple-200">
                  0
                </span>
              </button>
              <button className="focus:outline-none bg-white p-2 rounded-full relative">
                <GoHeart className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium border-2 border-purple-200">
                  0
                </span>
              </button>
              <button onClick={handleCartClick} className="focus:outline-none bg-purple-950 p-2 rounded-full relative">
                <RiShoppingCartLine className="h-6 w-6 text-yellow-500" />
                <span className="absolute -top-1 -right-1 bg-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium border-2 border-purple-200">
                  {cartCount}
                </span>
              </button>
              <span className="text-gray-600 font-medium">₹{cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </header>

      <AuthSlider isOpen={isAuthOpen} onClose={handleCloseAuth} />
    </>
  );
};

export default Header;