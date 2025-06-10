import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '@/services/axios';
import type { AxiosError } from 'axios';

interface SignupData {
  name: string;
  email: string;
  password: string;
}

export const useSignUp = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: SignupData) => api.post('/auth/signup', data),
    onSuccess: () => navigate('/auth/login'),
    onError: (err: AxiosError<{ message?: string }>) => {
      alert(err.response?.data?.message ?? 'Signup failed');
    },
  });
};
