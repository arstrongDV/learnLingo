import * as yup from 'yup';

export const loginSchema = yup.object({
    email: yup
    .string()
    .required('Email is required')
    .email('Invalid email address'),

    password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
});

export const registerSchema = yup.object({
    name: yup
    .string()
    .required('Username is required')
    .min(3, 'Must be at least 3 characters'),

    email: yup
    .string()
    .required('Email is required')
    .email('Invalid email address'),

    password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
export type RegisterFormData = yup.InferType<typeof registerSchema>;