import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type Theme = 'light' | 'dark' | 'system';

const THEME_KEY = 'theme-mode';

const getSystemTheme = (): 'light' | 'dark' =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const getInitialMode = (): Theme => {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem(THEME_KEY) as Theme | null;
    if (saved === 'light' || saved === 'dark' || saved === 'system') return saved;
  }

  return 'system';
};

const initialState: { mode: Theme } = {
  mode: getInitialMode(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.mode = action.payload;
      localStorage.setItem(THEME_KEY, action.payload);
    },
    toggleTheme: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
      localStorage.setItem(THEME_KEY, state.mode);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
export { getSystemTheme };
export type { Theme };
