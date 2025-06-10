import * as yup from 'yup';
import { emailField, passwordField } from './fields';

export const loginSchema = yup.object({
  email: emailField,
  password: passwordField,
});
