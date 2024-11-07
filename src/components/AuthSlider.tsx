import { useState } from 'react';
import { LucideUser, LucideKey, X } from 'lucide-react';
import { signupSchema } from '../schemas/signUpSchema';
import { loginSchema } from '../schemas/loginSchema';
import { useFormik } from 'formik';
import { loginValues } from '../interfaces/signInValuesInterface';
import { SignupValues } from '../interfaces/SignupValuesInterface';



interface AuthSliderProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthSlider: React.FC<AuthSliderProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSliderChange = (loginState: boolean) => {
    setIsLogin(loginState);
  };

  const loginFormik = useFormik<loginValues>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log('Login submitted:', values);
    },
  });

  const signupFormik = useFormik<SignupValues>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      console.log('Signup submitted:', values);
    },
  });

  return (
    <div 
      className={`fixed inset-y-0 right-0 w-full md:w-[600px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } z-50`}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
      >
        <X className="h-6 w-6 text-gray-600" />
      </button>

      <div className="flex justify-center space-x-4 pt-8 border-b border-gray-200">
        <button
          onClick={() => handleSliderChange(true)}
          className={`pb-4 px-6 font-semibold text-lg transition-all duration-300 border-b-2 ${
            isLogin 
              ? 'text-purple-950 border-purple-950' 
              : 'text-gray-400 border-transparent hover:text-gray-600'
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => handleSliderChange(false)}
          className={`pb-4 px-6 font-semibold text-lg transition-all duration-300 border-b-2 ${
            !isLogin 
              ? 'text-purple-950 border-purple-950' 
              : 'text-gray-400 border-transparent hover:text-gray-600'
          }`}
        >
          Sign Up
        </button>
      </div>

      <div className="h-full flex justify-center items-center p-8 pt-0">
        <div className="w-full max-w-md transition-all duration-300 ease-in-out">
          {isLogin ? (
            <div className="flex flex-col items-center">
              <LucideKey className="text-6xl text-gray-500 mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
              <p className="text-gray-600 mb-6">Sign in to your account</p>
              <form className="w-full" onSubmit={loginFormik.handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={loginFormik.handleChange}
                    onBlur={loginFormik.handleBlur}
                    value={loginFormik.values.email}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      loginFormik.touched.email && loginFormik.errors.email ? 'border-red-500' : ''
                    }`}
                    placeholder="Enter your email"
                  />
                  {loginFormik.touched.email && loginFormik.errors.email && (
                    <p className="text-red-500 text-xs mt-1">{loginFormik.errors.email}</p>
                  )}
                </div>
                <div className="mb-6">
                  <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={loginFormik.handleChange}
                    onBlur={loginFormik.handleBlur}
                    value={loginFormik.values.password}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      loginFormik.touched.password && loginFormik.errors.password ? 'border-red-500' : ''
                    }`}
                    placeholder="Enter your password"
                  />
                  {loginFormik.touched.password && loginFormik.errors.password && (
                    <p className="text-red-500 text-xs mt-1">{loginFormik.errors.password}</p>
                  )}
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-purple-950 text-white py-2 px-6 rounded-full hover:bg-purple-900 transition-colors duration-300"
                >
                  Sign In
                </button>
              </form>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <LucideUser className="text-6xl text-gray-500 mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
              <p className="text-gray-600 mb-6">Join us today</p>
              <form className="w-full" onSubmit={signupFormik.handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={signupFormik.handleChange}
                    onBlur={signupFormik.handleBlur}
                    value={signupFormik.values.name}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      signupFormik.touched.name && signupFormik.errors.name ? 'border-red-500' : ''
                    }`}
                    placeholder="Enter your full name"
                  />
                  {signupFormik.touched.name && signupFormik.errors.name && (
                    <p className="text-red-500 text-xs mt-1">{signupFormik.errors.name}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={signupFormik.handleChange}
                    onBlur={signupFormik.handleBlur}
                    value={signupFormik.values.email}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      signupFormik.touched.email && signupFormik.errors.email ? 'border-red-500' : ''
                    }`}
                    placeholder="Enter your email"
                  />
                  {signupFormik.touched.email && signupFormik.errors.email && (
                    <p className="text-red-500 text-xs mt-1">{signupFormik.errors.email}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={signupFormik.handleChange}
                    onBlur={signupFormik.handleBlur}
                    value={signupFormik.values.password}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      signupFormik.touched.password && signupFormik.errors.password ? 'border-red-500' : ''
                    }`}
                    placeholder="Create a password"
                  />
                  {signupFormik.touched.password && signupFormik.errors.password && (
                    <p className="text-red-500 text-xs mt-1">{signupFormik.errors.password}</p>
                  )}
                </div>
                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={signupFormik.handleChange}
                    onBlur={signupFormik.handleBlur}
                    value={signupFormik.values.confirmPassword}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      signupFormik.touched.confirmPassword && signupFormik.errors.confirmPassword ? 'border-red-500' : ''
                    }`}
                    placeholder="Confirm your password"
                  />
                  {signupFormik.touched.confirmPassword && signupFormik.errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{signupFormik.errors.confirmPassword}</p>
                  )}
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-purple-950 text-white py-2 px-6 rounded-full hover:bg-purple-900 transition-colors duration-300"
                >
                  Create Account
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthSlider;