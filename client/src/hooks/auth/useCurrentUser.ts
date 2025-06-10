import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

export const useCurrentUser = () => {
  return useSelector((state: RootState) => state.auth.user);
};