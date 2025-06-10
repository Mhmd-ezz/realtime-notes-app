import { useMutation } from '@tanstack/react-query';
import api from '@/services/axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout as clearUser } from '@/features/auth/authSlice';

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => api.post('/auth/logout'),
    onSuccess: () => {
      dispatch(clearUser());
      navigate('/auth/login');
    },
    onError: () => {
      alert('Logout failed');
    },
  });
};
