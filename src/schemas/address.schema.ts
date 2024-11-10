import * as Yup from 'yup';

export const addressSchema = Yup.object().shape({
    fullName: Yup.string()
        .required('Full name is required')
        .min(3, 'Name must be at least 3 characters')
        .test('no-only-spaces', 'Full name cannot be only spaces', (value) => value && value.trim().length > 0)
        .test('no-only-numbers', 'Full name cannot contain only numbers', (value) => value && !/^[0-9]+$/.test(value))
        .test('at-least-3-letters', 'Full name must contain at least 3 alphabetic characters', (value) =>
            value && (value.match(/[a-zA-Z]/g) || []).length >= 3),
    emailId: Yup
        .string()
        .email('Please enter a valid email')
        .required('Email is required')
        .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Email must be a valid Gmail address'),

    phoneNumber: Yup.string()
        .required('Phone number is required')
        .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),

    streetAddress: Yup.string()
        .required('Street address is required')
        .min(5, 'Address must be at least 5 characters')
        .test('no-only-spaces', 'Street address cannot be only spaces', (value) => value && value.trim().length > 0)
        .test('at-least-3-letters', 'Street address must contain at least 3 alphabetic characters', (value) =>
            !value || (value.match(/[a-zA-Z]/g) || []).length >= 3),

    city: Yup.string()
        .required('City is required')
        .min(2, 'City must be at least 2 characters')
        .test('no-only-spaces', 'City cannot be only spaces', (value) => value && value.trim().length > 0)
        .test('no-only-numbers', 'City cannot contain only numbers', (value) => value && !/^[0-9]+$/.test(value))
        .test('at-least-3-letters', 'City must contain at least 3 alphabetic characters', (value) =>
            value && (value.match(/[a-zA-Z]/g) || []).length >= 3),

    state: Yup.string()
        .required('State is required')
        .min(2, 'State must be at least 2 characters')
        .test('no-only-spaces', 'State cannot be only spaces', (value) => value && value.trim().length > 0)
        .test('no-only-numbers', 'State cannot contain only numbers', (value) => value && !/^[0-9]+$/.test(value))
        .test('at-least-3-letters', 'State must contain at least 3 alphabetic characters', (value) =>
            value && (value.match(/[a-zA-Z]/g) || []).length >= 3),

    pincode: Yup.string()
        .required('Pincode is required')
        .matches(/^[0-9]{6}$/, 'Pincode must be 6 digits'),

    landmark: Yup.string()
        .test('no-only-spaces', 'Landmark cannot be only spaces', (value) => !value || value.trim().length > 0),

    addressType: Yup.string()
        .required('Please select address type')
        .test('no-only-spaces', 'Address type cannot be only spaces', (value) => value && value.trim().length > 0)
});
