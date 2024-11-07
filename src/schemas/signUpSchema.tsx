import * as yup from 'yup';

export const signupSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters long')
    .matches(/^(?!\s*$).+/, 'Name cannot contain only spaces')
    .max(50, 'Name cannot be more than 50 characters long'),
  
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
    .matches(/\d/, 'Password must contain at least one number'),
  
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm password is required')
});
