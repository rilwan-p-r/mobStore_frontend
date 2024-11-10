import { MinusCircle, PlusCircle, Trash2 } from "lucide-react";
import { updateCart } from "../../Api/user/updateCart";
import { message } from "antd";
import { removeProductFromCart } from "../../Api/user/removeProductFromCart";
import { Cart } from "../../interfaces/CartInterface";
import { setCartInfo } from "../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";

interface CartItemProps {
  item: any;
  onCartUpdate: (updatedCart: Cart) => void;
}

export const CartItem = ({ item, onCartUpdate }: CartItemProps) => {
  const dispatch = useDispatch()
  const productId = item?.productId?._id;
  const quantity = item?.quantity || 0;
  const price = item?.productId?.price || 0;
  const name = item?.productId?.name || '';
  const imageUrl = item?.productId?.imageUrl || '';

  const handleQuantityChange = async (productId?: string, quantity?: number) => {
    if (!productId) return;

    try {
      const response = await updateCart(productId, quantity ?? 0);
      if (response?.success) {
        onCartUpdate(response?.data);
        dispatch(setCartInfo({
          count: response?.data?.products?.length,
          total: response?.data?.totalPrice || 0
        }));
        message.success('Cart updated successfully');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      message.error('Failed to update quantity');
    }
  };

  const handleRemoveProduct = async (productId?: string) => {
    if (!productId) return;

    try {
      const response = await removeProductFromCart(productId);
      if (response?.success) {
        onCartUpdate(response?.data?.updatedCart);
        dispatch(setCartInfo({
          count: response?.data?.updatedCart?.products?.length,
          total: response?.data?.updatedCart?.totalPrice || 0
        }));
        message.success(response?.data?.message);
      }
    } catch (error) {
      console.error('Error removing product:', error);
      message.error('Failed to remove product');
    }
  };

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center space-x-6">
        <div className="relative group">
          <img
            src={imageUrl}
            alt={name}
            className="w-32 h-32 object-cover rounded-lg shadow-md transform transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex-1 space-y-2">
          <h3 className="text-xl font-semibold text-gray-900 hover:text-purple-600 transition-colors duration-200">
            {name}
          </h3>
          <p className="text-purple-600 text-lg font-bold">
            ₹{price}
          </p>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleQuantityChange(productId, Math.max(1, quantity - 1))}
                className="text-gray-500 hover:text-purple-600 transition-colors duration-200"
                disabled={quantity <= 1}
              > 
                <MinusCircle className={`w-6 h-6 ${quantity <= 1 ? 'opacity-50' : ''}`} />
              </button>
              <span className="w-8 text-center font-semibold text-lg">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(productId, Math.min(5, quantity + 1))}
                className="text-gray-500 hover:text-purple-600 transition-colors duration-200"
                disabled={quantity >= 5}
              >
                <PlusCircle className={`w-6 h-6 ${quantity >= 5 ? 'opacity-50' : ''}`} />
              </button>
            </div>

            <button
              onClick={() => handleRemoveProduct(productId)}
              className="text-gray-400 hover:text-red-500 transition-colors duration-200"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="text-right">
          <p className="text-lg font-bold text-gray-900">
            ₹{(price * quantity)}
          </p>
        </div>
      </div>
    </div>
  );
};