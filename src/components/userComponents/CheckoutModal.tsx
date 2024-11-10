import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { checkout } from '../../Api/user/checkout';
import { addressSchema } from '../../schemas/address.schema';
import { Product } from '../../interfaces/Product.interface';
import { useNavigate } from 'react-router-dom';

interface CartProduct {
    productId: Product;
    quantity: number;
}
interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    totalAmount: number;
    products: CartProduct[];
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, totalAmount, products }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();
    const userInfo = useSelector((state: RootState) => state?.auth?.userInfo);

    const formik = useFormik({
        initialValues: {
            fullName: userInfo?.name || '',
            emailId: userInfo?.email || '',
            phoneNumber: '',
            streetAddress: '',
            city: '',
            state: '',
            pincode: '',
            landmark: '',
            addressType: 'home'
        },
        validationSchema: addressSchema,
        onSubmit: async (values) => {
            try {
                setIsProcessing(true);
                
                const summary = {
                    customerDetails: values,
                    orderDetails: {
                        totalAmount,
                        products: products.map(item => ({
                            productId: item.productId._id,
                            name: item.productId.name,
                            price: item.productId.price,
                            imageUrl: item.productId.imageUrl,
                            quantity: item.quantity,
                        })),
                        deliveryFee: 'Free', 
                    }
                };

            
                const response = await checkout(summary);
                if (response.success) {
                    formik.resetForm();
                    onClose();
                }
            } catch (error) {
                console.error('Checkout failed:', error);
            } finally {
                setIsProcessing(false);
                navigate('/order-success')
            }
        }
    });

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>

            <div className="relative min-h-screen flex items-center justify-center p-4">
                <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900">Complete Your Order</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500 focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                        {/* Product Summary Section */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                <div className="space-y-4">
                                    {products.map((item) => (
                                        <div key={item.productId._id} className="flex items-center space-x-4">
                                            {item.productId.imageUrl && (
                                                <img
                                                    src={item.productId.imageUrl}
                                                    alt={item.productId.name}
                                                    className="w-16 h-16 object-cover rounded-md"
                                                />
                                            )}
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium text-gray-900">{item.productId.name}</h4>
                                                <div className="flex justify-between mt-1">
                                                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {formatCurrency(item.productId.price * item.quantity)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Subtotal</span>
                                        <span className="text-sm font-medium text-gray-900">{formatCurrency(totalAmount)}</span>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <span className="text-sm text-gray-600">Delivery</span>
                                        <span className="text-sm font-medium text-green-600">Free</span>
                                    </div>
                                    <div className="flex justify-between mt-2 pt-2 border-t border-gray-200">
                                        <span className="text-base font-medium text-gray-900">Total</span>
                                        <span className="text-base font-bold text-purple-600">{formatCurrency(totalAmount)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Address Form Section */}
                        <form onSubmit={formik.handleSubmit}>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Address</h3>
                            <div className="space-y-4">
                                {/* Full Name */}
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.fullName}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                    />
                                    {formik.touched.fullName && formik.errors.fullName && (
                                        <div className="mt-1 text-sm text-red-600">{formik.errors.fullName}</div>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                                        Email Id
                                    </label>
                                    <input
                                        type="text"
                                        id="emailId"
                                        name="emailId"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.emailId}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                    />
                                    {formik.touched.emailId && formik.errors.emailId && (
                                        <div className="mt-1 text-sm text-red-600">{formik.errors.emailId}</div>
                                    )}
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.phoneNumber}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                    />
                                    {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                                        <div className="mt-1 text-sm text-red-600">{formik.errors.phoneNumber}</div>
                                    )}
                                </div>

                                {/* Street Address */}
                                <div>
                                    <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">
                                        Street Address
                                    </label>
                                    <input
                                        type="text"
                                        id="streetAddress"
                                        name="streetAddress"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.streetAddress}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                    />
                                    {formik.touched.streetAddress && formik.errors.streetAddress && (
                                        <div className="mt-1 text-sm text-red-600">{formik.errors.streetAddress}</div>
                                    )}
                                </div>

                                {/* City and State */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.city}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                        />
                                        {formik.touched.city && formik.errors.city && (
                                            <div className="mt-1 text-sm text-red-600">{formik.errors.city}</div>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                                            State
                                        </label>
                                        <input
                                            type="text"
                                            id="state"
                                            name="state"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.state}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                        />
                                        {formik.touched.state && formik.errors.state && (
                                            <div className="mt-1 text-sm text-red-600">{formik.errors.state}</div>
                                        )}
                                    </div>
                                </div>

                                {/* Pincode and Landmark */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                                            Pincode
                                        </label>
                                        <input
                                            type="text"
                                            id="pincode"
                                            name="pincode"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.pincode}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                        />
                                        {formik.touched.pincode && formik.errors.pincode && (
                                            <div className="mt-1 text-sm text-red-600">{formik.errors.pincode}</div>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="landmark" className="block text-sm font-medium text-gray-700">
                                            Landmark (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            id="landmark"
                                            name="landmark"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.landmark}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                        />
                                    </div>
                                </div>

                                {/* Address Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Address Type
                                    </label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="addressType"
                                                value="home"
                                                onChange={formik.handleChange}
                                                checked={formik.values.addressType === 'home'}
                                                className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                                            />
                                            <span className="ml-2">Home</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="addressType"
                                                value="work"
                                                onChange={formik.handleChange}
                                                checked={formik.values.addressType === 'work'}
                                                className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                                            />
                                            <span className="ml-2">Work</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="mt-6 flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isProcessing || !formik.isValid}
                                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isProcessing ? (
                                        <div className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </div>
                                    ) : (
                                        'Confirm Order (Cash on Delivery)'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutModal;