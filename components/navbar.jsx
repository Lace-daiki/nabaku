'use client';

import { useLogoutMutation } from '@/hooks/auth/useAuthMutation';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const Navbar = ({ user }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const logoutMutation = useLogoutMutation();
  const pathname = usePathname();

  // Extract first letter of email for avatar
  const avatarLetter = user?.email?.charAt(0).toUpperCase() || 'U';

  // Determine page title based on pathname
  let pageTitle = 'Dashboard';
  if (pathname.startsWith('/dashboard/projects')) pageTitle = 'Projects';
  else if (pathname.startsWith('/dashboard/transaction')) pageTitle = 'Transactions';
  else if (pathname.startsWith('/dashboard/wallet')) pageTitle = 'Wallet';
  else if (pathname.startsWith('/dashboard/settings')) pageTitle = 'Settings';
  else if (pathname.startsWith('/dashboard')) pageTitle = 'Dashboard';

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between h-16">
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>

          {/* Logo and desktop navigation */}
          <div className="flex items-center">
            <div className="hidden md:block">
              <h1 className="text-[24px] font-bold text-[#1C1E53]">
                {pageTitle}
              </h1>
            </div>
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-6">
            {/* Profile Avatar with Circular Border */}
            <div className="relative">
              <div className="h-12 w-12 rounded-full bg-[#1C1E4C] flex items-center justify-center text-white font-medium border-2 border-[#8E92BC]">
                {avatarLetter}
              </div>
            </div>

            {/* Profile dropdown
            <div className="ml-3 relative">
              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  <p className="font-medium text-gray-700">{user?.email}</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="bg-indigo-50 border-indigo-500 text-indigo-700 block px-3 py-2 rounded-md text-base font-medium"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium"
            >
              Team
            </a>
            <a
              href="#"
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium"
            >
              Projects
            </a>
            <a
              href="#"
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium"
            >
              Calendar
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;