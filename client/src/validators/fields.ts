import * as yup from 'yup';

export const emailField = yup.string().email('Invalid email').required('Email is required');
export const passwordField = yup.string().min(6, 'Password must be at least 6 characters').required('Password is required');
export const nameField = yup.string().min(2).max(50).required('Name is required');
