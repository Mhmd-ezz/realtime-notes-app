import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '@/features/auth/authSlice';
import api from '@/services/axios';
import type { AxiosError } from 'axios';

interface LoginData {
  email: string;
  password: string;
}

export const useSignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginData) => api.post('/auth/login', data),
    onSuccess: (res) => {
      dispatch(setUser(res.data.user));
      navigate('/');
    },
    onError: (err: AxiosError<{ message: string }>) => {
      alert(err.response?.data?.message ?? 'Login failed');
    },
  });
};
