import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../../Api/user/getProduct';
import { Product } from '../../interfaces/Product.interface';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import AuthSlider from './AuthSlider';
import { addProductToCart } from '../../Api/user/addProductToCart';
import { getCartProducts } from '../../Api/user/getCartProducts';
import ProductSkelton from './ProductSkelton';
import HoverButtons from './HoverButtons';
import { setCartInfo } from '../../redux/slices/cartSlice';

const ProductCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [products, setProducts] = useState<Product[]>([]);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [cartProductIds, setCartProductIds] = useState<string[]>([]);
  const [loadingProductIds, setLoadingProductIds] = useState<Set<string>>(new Set());
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const userInfo = useSelector((state: RootState) => state?.auth?.userInfo);

  const fetchCartProducts = useCallback(async () => {
    if (!userInfo?._id) {
      setCartProductIds([]);
      dispatch(setCartInfo({ count: 0, total: 0 }));
      return;
    }

    try {
      const response = await getCartProducts(userInfo?._id);
      if (response?.success && response?.data) {
        const cart = response?.data;
        const productIds = cart?.products?.map(item => item?.productId?._id);
        setCartProductIds(productIds);
        dispatch(setCartInfo({
          count: cart?.products?.length,
          total: cart?.totalPrice || 0
        }));
      } else {
        setCartProductIds([]);
        dispatch(setCartInfo({ count: 0, total: 0 }));
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartProductIds([]);
      dispatch(setCartInfo({ count: 0, total: 0 }));
    }
  }, [userInfo?._id, dispatch]);

  const initializeData = useCallback(async () => {
    setIsInitialLoading(true);
    try {
      if (userInfo?._id) {
        await fetchCartProducts();
      }

      const productsResponse = await getProducts();
      console.log(productsResponse);
      if (productsResponse?.success) {
        setProducts(productsResponse?.data);
      }
    } catch (error) {
      console.error('Error initializing data:', error);
    } finally {
      setIsInitialLoading(false);
    }
  }, [userInfo, fetchCartProducts]);

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  const handleAddToCart = async (productId: string) => {
    if (!userInfo) {
      setIsAuthOpen(true);
      return;
    }

    setLoadingProductIds(prev => new Set([...prev, productId]));

    try {
      const response = await addProductToCart(productId);
      if (response?.success) {
        setCartProductIds(prev => [...prev, productId]);
        await fetchCartProducts();
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      setCartProductIds(prev => prev?.filter(id => id !== productId));
    } finally {
      setLoadingProductIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  return (
    <>
      {isInitialLoading && <ProductSkelton />}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products?.map((product) => {
          const isInCart = cartProductIds?.includes(product?._id);
          const isLoading = loadingProductIds?.has(product?._id);

          return (
            <div
              key={product?._id}
              className="bg-white shadow-md rounded-lg overflow-hidden relative group"
            >
              <div className="relative">
                <img
                  src={product?.imageUrl}
                  alt={product?.name}
                  className="w-full h-48 object-cover transition-opacity group-hover:opacity-90"
                />
                <HoverButtons />
              </div>

              <div className="p-4">
                <h3 className="text-gray-900 font-bold text-base md:text-lg mb-2 line-clamp-2">
                  {product?.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-purple-950 font-bold text-sm md:text-base">
                    ₹{`${product?.price}.00`}
                  </span>
                </div>

                {isInCart ? (
                  <button
                    onClick={() => navigate('/cart')}
                    className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors duration-200 text-sm md:text-base"
                  >
                    Go to Cart
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddToCart(product?._id)}
                    disabled={isLoading}
                    className={`mt-4 w-full bg-purple-950 text-white py-2 px-4 rounded hover:bg-purple-900 transition-colors duration-200 text-sm md:text-base ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? 'Adding...' : 'Add To Cart'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <AuthSlider isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};
export default ProductCard;
