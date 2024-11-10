import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { getCartProducts } from '../../Api/user/getCartProducts';
import type { Cart } from '../../interfaces/CartInterface';
import { updateCart } from '../../Api/user/updateCart';


// Cart Component
const Cart = () => {
  const [cartProducts, setCartProducts] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const userInfo = useSelector((state: RootState) => state?.auth?.userInfo);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getCartProducts(userInfo?._id);
        if (response.success) {
          setCartProducts(response.data);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };
    if (userInfo) {
      fetchCart();
    }
  }, [userInfo]);

  const handleQuantityChange = async (productId: string, quantity: number) => {
    try {
      const response = await updateCart(productId,quantity);
      if (response?.success) {
        setCartProducts(response.data);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-950"></div>
      </div>
    );
  }

  if (!cartProducts || cartProducts.products.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-700">Your cart is empty</h2>
        <p className="text-gray-500 mt-2">Add some products to start shopping!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h2>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {cartProducts.products.map((item) => (
            <div key={item.productId._id} className="p-6 flex items-center">
              <img
                src={item.productId.imageUrl}
                alt={item.productId.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="ml-6 flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.productId.name}
                </h3>
                <p className="text-purple-950 font-bold mt-1">
                  ₹{item.productId.price.toFixed(2)}
                </p>
              </div>
              <div className="ml-6">
                <select
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.productId._id, Number(e.target.value))}
                  className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
              <div className="ml-6 text-right">
                <p className="text-lg font-semibold text-gray-900">
                  ₹{(item.productId.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 p-6">
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold text-gray-900">Total:</span>
            <span className="text-2xl font-bold text-purple-950">
              ₹{cartProducts.totalPrice.toFixed(2)}
            </span>
          </div>
          <button className="mt-4 w-full bg-purple-950 text-white py-3 px-4 rounded-md hover:bg-purple-900 transition-colors duration-200">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
