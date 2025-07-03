'use client';

import { useAuth } from '@/context/auth/AuthContext';
import Side from '@/components/admin/side';
import Head from '@/components/admin/header';

export default function DashboardLayout({ children }) {
  const { user } = useAuth();

  return (
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <Side />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Navbar */}
          <Head />
          
          {/* Main content */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-90">
            <div className="container mx-auto px-4 py-6">
              {children}
            </div>
          </main>
        </div>
      </div>
  );
}