import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth/auth';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth/AuthContext';

export const useLoginMutation = () => {
  const router = useRouter();
  const { login } = useAuth();

  return useMutation({
    mutationFn: (credentials) => authService.login(credentials),
    onSuccess: (data) => {
      // API returns: { success, message, data: { ...user }, authorization: { token, expiresIn } }
      const user = data?.data;
      console.log('user', user);
      
      login(user); // Update auth context with the user object saved by the service
      const isAdmin = user?.isAdmin === true || user?.role === 'admin';
      router.push(isAdmin ? '/admin' : '/dashboard');
      console.log('isAdmin', isAdmin);
    },
    onError: (error) => {
      console.error('Login error:', error);
      throw error;
    }
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
      console.error('Registration error:', error);
      throw error;
    }
  });
};

export const useLogoutMutation = () => {
  const { logout } = useAuth();
  
  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      logout();
    }
  });
};