import { ShoppingBag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'

const EmptyCart = () => {
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate('/')
    }
    return (
        <>
        <Header/>
            <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-50">
                <ShoppingBag className="w-16 h-16 text-gray-400 mb-4" />
                <h2 className="text-3xl font-bold text-gray-700">Your cart is empty</h2>
                <p className="text-gray-500 mt-2 text-lg">Start adding some products to your cart!</p>
                <button onClick={handleNavigate} className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    Continue Shopping
                </button>
            </div>
        </>
    )
}

export default EmptyCart
