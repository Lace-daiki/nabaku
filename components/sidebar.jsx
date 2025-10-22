'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, ChartBarIcon, CogIcon, UsersIcon, WalletIcon } from '@heroicons/react/24/outline';
import { useLogoutMutation } from '@/hooks/auth/useAuthMutation';

const Sidebar = () => {
  const pathname = usePathname();
  const logoutMutation = useLogoutMutation();

  const navItems = [
    { name: 'Overview', href: '/dashboard', icon: HomeIcon },
    { name: 'Projects', href: '/dashboard/projects', icon: ChartBarIcon },
    { name: 'Transactions', href: '/dashboard/transaction', icon: UsersIcon },
    { name: 'Wallet', href: '/dashboard/wallet', icon: WalletIcon },
    { name: 'Settings', href: '/dashboard/settings', icon: CogIcon },
  ];

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="hidden md:flex md:flex-shrink-0 ">
      <div className="flex flex-col w-64 bg-[#FFFFFF] shadow-md text-white">
        <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto shadow-md">
          <div className="flex items-center justify-center flex-shrink-0 px-4 py-10">
            <Image src="/nabaku.png" alt="Illustration" width={116} height={23} />
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-5">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-[14px] font-medium rounded-[40px] ${
                  pathname === item.href
                    ? 'bg-[#1C1E4C] text-white'
                    : 'text-[#8E92BC] hover:bg-[#1C1E4C] hover:text-white'
                }`}
              >
                <item.icon
                  className={`mr-3 flex-shrink-0 h-6 w-6 ${
                    pathname === item.href ? 'text-white' : 'text-[#8E92BC] group-hover:text-white'
                  }`}
                />
                {item.name}
              </Link>
            ))}
          </nav>
          <button 
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className='w-[50%] text-[14px] bg-[#1C1E4C] text-white ml-15 px-5 py-2 rounded-[40px] cursor-pointer hover:bg-[#15173a] disabled:opacity-50'
          >
            {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;