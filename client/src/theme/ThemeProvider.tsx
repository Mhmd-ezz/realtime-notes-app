import { useSelector } from 'react-redux';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router-dom';
import { getMuiTheme } from './index';
import { useTailwindTheme } from './useTailwindTheme';
import { router } from '@/app/router';
import { EditingProvider } from '@/contexts/EditingProvider';
import type { RootState } from '@/store/store';
import { getSystemTheme } from '@/features/theme/themeSlice';
import type { JSX } from 'react';


export default function ThemeProvider(): JSX.Element {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const resolvedMode = mode === 'system' ? getSystemTheme() : mode;
  const muiTheme = getMuiTheme(resolvedMode);

  useTailwindTheme(mode); 

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <EditingProvider>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme={resolvedMode}
          toastClassName="rounded-lg shadow-md"
        />
      </EditingProvider>
    </MuiThemeProvider>
  );
}
