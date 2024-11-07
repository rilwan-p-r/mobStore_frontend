import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email is required')
      .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Email must be a valid Gmail address'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
  })