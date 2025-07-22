'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/context/auth/AuthContext';
import { ProjectsProvider } from '@/context/project/ProjectContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2, // Will retry failed queries 2 times before displaying an error
    },
  },
});

export function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProjectsProvider>
          {children}
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
        </ProjectsProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}