import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import {authService} from '@/services/auth'; // Ensure you import your authService

export const useLoginMutation = () => {
  const { login } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials) => authService.login(credentials),
    onSuccess: (data) => {
      login(data.user);
      router.push('/dashboard');
    },
    onError: (error) => {
      // You can return the error message to the component
      return error.message || 'Login failed. Please try again.';
    },
  });
};

export const useRegisterMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (userData) => authService.register(userData),
    onSuccess: () => {
      router.push('/login');
    },
    onError: (error) => {
      // You can return the error message to the component
      return error.message || 'Registration failed. Please try again.';
    },
  });
};

export const useLogoutMutation = () => {
  const { logout } = useAuth();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      logout();
    },
    onError: (error) => {
      console.error('Logout error:', error.message);
    },
  });
};