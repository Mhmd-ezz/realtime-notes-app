import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack } from '@mui/material';
import AuthField from './AuthField';
import { useSignIn } from '@/hooks/auth/useSignIn';
import type { InferType } from 'yup';
import { loginSchema } from '@/validators/loginSchema';

type LoginForm = InferType<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: yupResolver(loginSchema) });

  const mutation = useSignIn();

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
      <Stack spacing={3}>
        <AuthField label="Email" register={register('email')} error={errors.email?.message} />
        <AuthField
          label="Password"
          type="password"
          register={register('password')}
          error={errors.password?.message}
        />
        <Button type="submit" fullWidth variant="contained" disabled={mutation.isPending}>
          {mutation.isPending ? 'Logging in...' : 'Login'}
        </Button>
      </Stack>
    </form>
  );
}
