import * as Yup from 'yup';

export const registerSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Please enter a valid email'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be at most 64 characters')
    .required('Password must be at least 8 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Passwords do not match'),
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Please enter a valid email'),
  password: Yup.string().required('Password is required'),
});
