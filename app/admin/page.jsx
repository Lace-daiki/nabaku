'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getGlobalAdminDashboard } from '@/services/admin/dashboard';

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['globalAdminDashboard'],
    queryFn: getGlobalAdminDashboard,
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    enabled: isAuthenticated && user?.isAdmin === true,
  });

  useEffect(() => {
    // Check if user is authenticated and is admin
    if (!isAuthenticated || user?.isAdmin !== true) {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.isAdmin !== true) {
    return null;
  }

  const totals = data?.data?.totals || {};
  const recent = data?.data?.recentActivity || [];

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (isError) {
    return <div className="min-h-screen flex items-center justify-center">Error loading dashboard data</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Projects</h2>
            <p className="text-3xl font-bold text-blue-600">{totals.projects ?? 0}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Donations</h2>
            <p className="text-3xl font-bold text-green-600">₦{Number(totals.donations || 0).toLocaleString()}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Active Users</h2>
            <p className="text-3xl font-bold text-purple-600">{totals.activeUsers ?? 0}</p>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
            {isLoading ? (
              <div className="text-gray-500 text-center py-8">Loading...</div>
            ) : isError ? (
              <div className="text-red-500 text-center py-8">Failed to load activity</div>
            ) : recent.length === 0 ? (
              <div className="text-gray-500 text-center py-8">No recent activity to display</div>
            ) : (
              <div className="divide-y">
                {recent.map((item) => (
                  <div key={item._id} className="flex items-center justify-between py-3 px-2">
                    <div className="flex flex-col">
                      <span className="text-gray-900 font-medium">{item.fullname || item.email || 'Anonymous'}</span>
                      <span className="text-gray-500 text-sm">{item.project?.title || '—'}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-900 font-semibold">{item.currency === 'NGN' ? '₦' : ''}{Number(item.amount || 0).toLocaleString()}</div>
                      <div className="text-gray-500 text-sm">{item.createdAt ? new Date(item.createdAt).toLocaleString() : ''}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}