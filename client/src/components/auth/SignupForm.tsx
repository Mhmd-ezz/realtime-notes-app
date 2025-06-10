import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack } from '@mui/material';
import type { InferType } from 'yup';
import AuthField from './AuthField';
import { signupSchema } from '@/validators/signupSchema';
import { useSignUp } from '@/hooks/auth/useSignUp';

type SignupForm = InferType<typeof signupSchema>;

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({ resolver: yupResolver(signupSchema) });

  const mutation = useSignUp();

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
      <Stack spacing={3}>
        <AuthField label="Name" register={register('name')} error={errors.name?.message} />
        <AuthField label="Email" register={register('email')} error={errors.email?.message} />
        <AuthField
          label="Password"
          type="password"
          register={register('password')}
          error={errors.password?.message}
        />
        <Button type="submit" fullWidth variant="contained" disabled={mutation.isPending}>
          {mutation.isPending ? 'Signing up...' : 'Sign Up'}
        </Button>
      </Stack>
    </form>
  );
}
