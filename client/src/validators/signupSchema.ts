import * as yup from 'yup';
import { nameField, emailField, passwordField } from './fields';

export const signupSchema = yup.object({
  name: nameField,
  email: emailField,
  password: passwordField,
});
