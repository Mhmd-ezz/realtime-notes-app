import { Outlet } from 'react-router-dom';
import { useAuthBootstrap } from '@/hooks/auth/useAuthBootstrap';
import HeaderAppBar from './AppHeader';

export default function AppLayout() {
  useAuthBootstrap();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <HeaderAppBar />

      <main className="m-4" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 0' }}>
        <Outlet />
      </main>
    </div>
  );
}
