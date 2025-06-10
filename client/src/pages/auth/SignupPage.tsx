import SignupForm from '@/components/auth/SignupForm';
import AuthFormLayout from '@/components/auth/AuthFormLayout';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function SignupPage() {
  return (
    <AuthFormLayout title="Sign Up">
      <SignupForm />
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Already have an account? <Link to="/auth/login">Log in</Link>
      </Typography>
    </AuthFormLayout>
  );
}
