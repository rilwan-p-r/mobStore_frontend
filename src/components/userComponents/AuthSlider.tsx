import { useState } from 'react';
import { LucideUser, LucideKey, X } from 'lucide-react';
import { signupSchema } from '../../schemas/signUp.schema';
import { loginSchema } from '../../schemas/login.schema';
import { useFormik } from 'formik';
import { SignupValues } from '../../interfaces/SignupValues.interface';
import { message } from 'antd';
import { signIn, signUp } from '../../Api/user/userAuth';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../redux/slices/userSlice';
import { signInValues } from '../../interfaces/SignInValues.interface';

interface AuthSliderProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthSlider: React.FC<AuthSliderProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();

  const loginFormik = useFormik<signInValues>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await signIn(values);
        if (response.success && response.status === 200) {
          message.success('Logged in successfully');
          dispatch(setUserInfo(response?.data));
          resetForm();
          onClose();
        } else if (response.error) {
          message.error(response.error);
        }
      } catch (error) {
        console.error('Error during login:', error);
        message.error('An unexpected error occurred');
      }
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
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await signUp(values);
        if (response.status === 201) {
          message.success('Account created successfully');
          dispatch(setUserInfo(response?.data));
          resetForm();
          onClose();
        } else if (response.error) {
          message.error(response.error);
        }
      } catch (error) {
        console.error('Error during signup:', error);
        message.error('An unexpected error occurred');
      }
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
        className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
      >
        <X className="h-6 w-6 text-gray-600" />
      </button>

      <div className="flex justify-center space-x-4 pt-8 border-b border-gray-200">
        <button
          onClick={() => setIsLogin(true)}
          className={`pb-4 px-6 font-semibold text-lg border-b-2 ${
            isLogin ? 'text-purple-950 border-purple-950' : 'text-gray-400 border-transparent'
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`pb-4 px-6 font-semibold text-lg border-b-2 ${
            !isLogin ? 'text-purple-950 border-purple-950' : 'text-gray-400 border-transparent'
          }`}
        >
          Sign Up
        </button>
      </div>

      <div className="h-full flex justify-center items-center p-8 pt-0">
        <div className="w-full max-w-md">
          {isLogin ? (
            <div className="flex flex-col items-center">
              <LucideKey className="text-6xl text-gray-500 mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
              <p className="text-gray-600 mb-6">Sign in to your account</p>
              <form className="w-full" onSubmit={loginFormik.handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={loginFormik.handleChange}
                    onBlur={loginFormik.handleBlur}
                    value={loginFormik.values.email}
                    className={`shadow border rounded w-full py-2 px-3 text-gray-700 ${
                      loginFormik.touched.email && loginFormik.errors.email ? 'border-red-500' : ''
                    }`}
                    placeholder="Enter your email"
                  />
                  {loginFormik.touched.email && loginFormik.errors.email && (
                    <p className="text-red-500 text-xs mt-1">{loginFormik.errors.email}</p>
                  )}
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 font-bold mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={loginFormik.handleChange}
                    onBlur={loginFormik.handleBlur}
                    value={loginFormik.values.password}
                    className={`shadow border rounded w-full py-2 px-3 text-gray-700 ${
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
                  className="w-full bg-purple-950 text-white py-2 px-6 rounded-full hover:bg-purple-900"
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
                  <label className="block text-gray-700 font-bold mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    onChange={signupFormik.handleChange}
                    onBlur={signupFormik.handleBlur}
                    value={signupFormik.values.name}
                    className={`shadow border rounded w-full py-2 px-3 text-gray-700 ${
                      signupFormik.touched.name && signupFormik.errors.name ? 'border-red-500' : ''
                    }`}
                    placeholder="Enter your full name"
                  />
                  {signupFormik.touched.name && signupFormik.errors.name && (
                    <p className="text-red-500 text-xs mt-1">{signupFormik.errors.name}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={signupFormik.handleChange}
                    onBlur={signupFormik.handleBlur}
                    value={signupFormik.values.email}
                    className={`shadow border rounded w-full py-2 px-3 text-gray-700 ${
                      signupFormik.touched.email && signupFormik.errors.email ? 'border-red-500' : ''
                    }`}
                    placeholder="Enter your email"
                  />
                  {signupFormik.touched.email && signupFormik.errors.email && (
                    <p className="text-red-500 text-xs mt-1">{signupFormik.errors.email}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={signupFormik.handleChange}
                    onBlur={signupFormik.handleBlur}
                    value={signupFormik.values.password}
                    className={`shadow border rounded w-full py-2 px-3 text-gray-700 ${
                      signupFormik.touched.password && signupFormik.errors.password ? 'border-red-500' : ''
                    }`}
                    placeholder="Create a password"
                  />
                  {signupFormik.touched.password && signupFormik.errors.password && (
                    <p className="text-red-500 text-xs mt-1">{signupFormik.errors.password}</p>
                  )}
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 font-bold mb-2">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    onChange={signupFormik.handleChange}
                    onBlur={signupFormik.handleBlur}
                    value={signupFormik.values.confirmPassword}
                    className={`shadow border rounded w-full py-2 px-3 text-gray-700 ${
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
                  className="w-full bg-purple-950 text-white py-2 px-6 rounded-full hover:bg-purple-900"
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