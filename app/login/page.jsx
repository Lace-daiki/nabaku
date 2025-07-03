'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLoginMutation } from '@/hooks/auth/useAuthMutation';
import { ADMIN_CREDENTIALS } from '@/config/admin';
import { useAuth } from '@/context/auth/AuthContext';

export default function LoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const { mutate: login, isPending } = useLoginMutation();
  const router = useRouter();
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!id || !password) {
      setError('Email and password are required');
      return;
    }

    try {
      // Check if credentials match admin
      if (id === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        // Set admin user in auth context
        authLogin({ ...ADMIN_CREDENTIALS });
        router.push('/admin');
        return;
      }

      // If not admin, proceed with normal login
      await login({ id, password });
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      {/* Left Section - Illustration */}
      <div className="border-1 rounded-[40px]">
        <div className="bg-[#8E92BC] rounded-[40px] p-8">
          <Image src="/login.png" alt="Illustration" width={400} height={746} />
        </div>
      </div>
      
      {/* Right Section - Login Form */}
      <div className="border-1 rounded-[40px] m-4 p-8 w-[966px] h-[730px] flex flex-col justify-center">
        <div className="mb-30 ">
          <Image src="/nabaku.png" alt="Illustration" width={100} height={100} />
        </div>
        <div className="">
          <h1 className="text-[48px] text-[#1C1E4C] font-semibold ">Welcome back!</h1>
          <p className="text-[18px] text-[#1C1E4C] mb-6 ">Welcome back! Please enter your details</p>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="space-y-8 w-[886px] h-[266px] bg-[#F3F3F3] rounded-[40px] flex flex-col justify-center p-4">
            <input
              type="email"
              placeholder="Enter phone number or email of the organization"
              className="w-full p-3 border rounded-[40px]"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter Password"
              className="w-full p-3 border rounded-[40px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center text-[#54577A]">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Keep me logged in
              </label>
              <Link href="" className="text-[#54577A]">Forgot password?</Link>
            </div>
          </div>

          <div className='flex justify-between mt-10'>
            <p className="mt-2 text-center text-gray-500 text-[16px] font-medium">
              Don't have an account? <Link href="/register" className="text-[#1C1E4C]">Sign up</Link>
            </p>
            <button 
              onClick={handleSubmit}
              type="submit" 
              className="bg-[#1C1E4C] text-white text-center py-[15px] px-[24px] rounded-[40px] cursor-pointer"
              disabled={isPending}
            >
              {isPending ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}