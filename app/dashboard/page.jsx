'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { useLogoutMutation } from '@/hooks/useAuthMutation';

export default function DashboardPage() {
  const { user } = useAuth();
  const logoutMutation = useLogoutMutation();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#1C1E4C]">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-[#1C1E4C] text-white py-2 px-4 rounded-lg"
            disabled={logoutMutation.isPending}
          >
            {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Welcome, {user?.email}</h2>
          <p className="text-gray-600">You are now logged in to your dashboard.</p>
        </div>
      </div>
    </ProtectedRoute>
  );
}