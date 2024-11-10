import { useState, useEffect, useCallback } from 'react';
import { Loader2, X, ShoppingCart, Package, AlertCircle } from 'lucide-react';
import { viewUserCart } from '../../Api/admin/viewUserCart';
import { Cart} from '../../interfaces/CartInterface';

interface UserViewCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  userName: string;
}

const UserViewCartModal = ({ isOpen, onClose, userId, userName }: UserViewCartModalProps) => {
  const [cartItems, setCartItems] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCartItems = useCallback(async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await viewUserCart(userId);
      if (response?.success) {
        setCartItems(response.data);
      }
    } catch (error) {
      setError('Failed to fetch cart items');
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (isOpen && userId) {
      fetchCartItems();
    }
  }, [isOpen, userId, fetchCartItems]);

  if (!isOpen) return null;

  const calculateTotalItems = () => {
    return cartItems?.products?.reduce((total, item) => total + item.quantity, 0) || 0;
  };

  const calculateTotalAmount = () => {
    const totalAmount = cartItems?.products?.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    ) || 0;
  
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(totalAmount);
  };
  

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          className="relative w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative border-b border-gray-100 bg-gray-50 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ShoppingCart className="h-6 w-6 text-purple-600" />
                <h2 className="text-xl font-semibold text-gray-800">
                  {userName}'s Cart
                </h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-1 hover:bg-gray-100 transition-colors duration-200"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto px-6 py-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-10 w-10 animate-spin text-purple-600" />
                <p className="mt-4 text-sm text-gray-500">Loading cart items...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-12">
                <AlertCircle className="h-12 w-12 text-red-500" />
                <p className="mt-4 text-red-600">{error}</p>
              </div>
            ) : !cartItems?.products?.length ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Package className="h-16 w-16 text-gray-300" />
                <p className="mt-4 text-gray-500">Cart is empty</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Cart Items */}
                <div className="rounded-xl border border-gray-100 overflow-hidden">
                  <div className="divide-y divide-gray-100">
                    {cartItems.products.map((item) => (
                      <div 
                        key={item.productId._id}
                        className="group relative flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-gray-100">
                            <img 
                              src={item.productId.imageUrl || "/api/placeholder/64/64"}
                              alt={item.productId.name}
                              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-110"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {item.productId.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                          ₹{(item.productId.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                          ₹{item.productId.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total Items</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {calculateTotalItems()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {calculateTotalAmount()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {!loading && !error && cartItems?.products?.length > 0 && (
            <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">
              <div className="flex justify-end">
                <button
                  onClick={onClose}
                  className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserViewCartModal;