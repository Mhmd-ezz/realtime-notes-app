import { useEffect } from 'react';
import { type Theme } from '@/features/theme/themeSlice';

export function useTailwindTheme(mode: Theme) {
  useEffect(() => {
    const root = document.documentElement;

    const apply = (resolvedMode: 'light' | 'dark') => {
      root.classList.toggle('dark', resolvedMode === 'dark');
    };

    if (mode === 'system') {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => apply(media.matches ? 'dark' : 'light');

      handleChange(); 
      media.addEventListener('change', handleChange);

      return () => media.removeEventListener('change', handleChange);
    }

    apply(mode); 
  }, [mode]);
}
