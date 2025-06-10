import LoginForm from '@/components/auth/LoginForm';
import AuthFormLayout from '@/components/auth/AuthFormLayout';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <AuthFormLayout title="Login">
      <LoginForm />
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Don't have an account? <Link to="/auth/signup">Sign up</Link>
      </Typography>
    </AuthFormLayout>
  );
}
