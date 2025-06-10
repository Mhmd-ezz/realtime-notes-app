import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser, logout } from '@/features/auth/authSlice';
import api from '@/services/axios';
import type { User } from '@/types/user';

export const useAuthBootstrap = () => {
  const ranOnce = useRef(false); // prevent double run in dev
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (ranOnce.current) return;
    ranOnce.current = true;

    const checkAuth = async () => {
      try {
        const res = await api.get('/auth/me');
        const user = res.data.user;

        dispatch(setUser({ id: user._id, name: user.name, email: user.email } as User));
      } catch {
        dispatch(logout());
        navigate('/auth/login');
      }
    };

    checkAuth();
  }, [dispatch, navigate]);
};
