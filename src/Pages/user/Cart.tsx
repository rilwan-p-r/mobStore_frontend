import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { getCartProducts } from '../../Api/user/getCartProducts';
import type { Cart as CartType } from '../../interfaces/CartInterface';
import { message } from 'antd';
import EmptyCart from '../../components/userComponents/EmptyCart';
import Header from '../../components/userComponents/Header';
import { CartItem } from '../../components/userComponents/CartItems';
import { useNavigate } from 'react-router-dom';
import CheckoutModal from '../../components/userComponents/CheckoutModal';

const Cart = () => {
  const [cartProducts, setCartProducts] = useState<CartType | null>(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const userInfo = useSelector((state: RootState) => state?.auth?.userInfo);
  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const fetchCart = useCallback(async () => {
    if (!userInfo?._id) return;

    try {
      setLoading(true);
      const response = await getCartProducts(userInfo?._id);
      if (response?.success) {
        setCartProducts(response?.data);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      message.error('Failed to fetch cart items');
    } finally {
      setLoading(false);
    }
  }, [userInfo?._id]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleCartUpdate = (updatedCart: CartType) => {
    setCartProducts(updatedCart);
    console.log('updatedCart', updatedCart);

  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
      </div>
    );
  }

  if (!cartProducts?.products || cartProducts?.products.length === 0) {
    return <EmptyCart />;
  }

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Shopping Cart</h2>
          <p className="text-lg text-gray-600">
            {cartProducts?.products?.length} {cartProducts?.products?.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {cartProducts?.products?.map((item) => (
                <CartItem
                  key={item?.productId?._id}
                  item={item}
                  onCartUpdate={handleCartUpdate}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h3>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{cartProducts?.totalPrice || '0.00'}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="h-px bg-gray-200 my-4"></div>
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span>
                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(cartProducts?.totalPrice || 0)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckoutModalOpen(true)}
                className="w-full mt-8 bg-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-purple-700 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Proceed to Checkout
              </button>

              <p className="text-center text-gray-500 text-sm mt-4">
                Free shipping on all orders
              </p>
            </div>
          </div>
        </div>
      </div>
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        totalAmount={cartProducts?.totalPrice || 0}
        products={cartProducts?.products || []}
      />
    </>
  );
};

export default Cart;