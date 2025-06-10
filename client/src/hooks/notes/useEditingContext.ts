import { useContext } from 'react';
import { EditingContext } from '@/contexts/EditingContext';

export const useEditingContext = () => {
  const ctx = useContext(EditingContext);
  if (!ctx) throw new Error('useEditingContext must be used within <EditingProvider>');
  return ctx;
};
