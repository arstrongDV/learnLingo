import * as yup from 'yup';
import { LEARNING_REASON, type LearningReason } from '../types/user';

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

export const bookSchema = yup.object({
  reason: yup
    .mixed<LearningReason>()
    .oneOf(LEARNING_REASON, 'Please choose a reason')
    .required('Reason is required'),
  fullname: yup.string().trim().required('Full name is required'),
  email: yup.string().trim().email('Invalid email').required('Email is required'),
  phone: yup
    .string()
    .matches(/^\+?[0-9\s-]{10,15}$/, 'Invalid phone number')
    .required('Phone number is required'),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
export type RegisterFormData = yup.InferType<typeof registerSchema>;
export type BookFormData = yup.InferType<typeof bookSchema>;