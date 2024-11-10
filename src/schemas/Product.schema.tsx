import * as yup from 'yup';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const SUPPORTED_IMAGE_FORMATS = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/svg+xml'
];


export const productSchema = (isEditing: boolean) =>
  yup.object().shape({
    name: yup
      .string()
      .required('Product name is required')
      .min(3, 'Product name must be at least 3 characters long')
      .matches(/^(?=(?:.*[a-zA-Z]){3})[a-zA-Z0-9\s`~!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/]*$/, 'Product name must contain at least 3 alphabetic characters and can only contain letters, numbers, and special characters')
      .trim('Product name cannot have leading or trailing spaces'),

    price: yup
      .number()
      .required('Price is required')
      .min(10, 'Price must be at least 10 Rs')
      .integer('Price must be an integer')
      .typeError('Price must be a valid number'),

    image: yup.mixed()
      .nullable()
      .test('file-required', 'image is required', (value) => {
        // Ensure `true` if editing or if value exists for new posts
        return isEditing || Boolean(value);
      })
      .test('is-image', 'Please upload a valid image file', (value) => {
        // Optional if updating; otherwise, validate file type
        return !value || (value instanceof File && SUPPORTED_IMAGE_FORMATS.includes(value.type));
      })
      .test('file-size', 'File is too large. Max size is 5MB', (value) => {
        // Optional if updating; otherwise, validate file size
        return !value || (value instanceof File && value.size <= MAX_FILE_SIZE);
      }),
  });
