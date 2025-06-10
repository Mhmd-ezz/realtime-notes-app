import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { store } from './store/store';
import ThemeProvider from './theme/ThemeProvider';
import 'react-toastify/dist/ReactToastify.css';
import './styles/global.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
