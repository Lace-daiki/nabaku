'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/context/auth/AuthContext';
import { ProjectsProvider } from '@/context/project/ProjectContext';

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
        </ProjectsProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}