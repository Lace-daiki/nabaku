'use client';

import { useAuth } from '@/context/auth/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Sidebar from '@/components/sidebar';
import Navbar from '@/components/navbar';

export default function DashboardLayout({ children }) {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Navbar */}
          <Navbar user={user} />
          
          {/* Main content */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-90">
            <div className="container mx-auto px-4 py-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}