'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'
import { useRegisterMutation } from '@/hooks/useAuthMutation';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const registerMutation = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!agreeTerms) {
      setError('You must agree to the terms of use');
      return;
    }

    // Add more validation here if needed

    try {
      await registerMutation.mutateAsync({ email, phone, password });
      // Optionally reset form fields or redirect
      setShowPopup(true); // Show the popup on successful registration
      setTimeout(() => setShowPopup(false), 5000);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex h-screen  items-center justify-center">
      {/* Left Section - Signup Form */}
      <div className="border-1 rounded-[40px] m-4 p-8 w-[966px] h-[730px] flex flex-col justify-center">
        <div className="mb-30 ">
          <Image src="/nabaku.png" alt="Illustration" width={100} height={100} />
        </div>
        <div className="">
          <h1 className="text-[48px] text-[#1C1E4C] font-semibold"><em>sign</em> up as an organization</h1>
          <p className="text-[18px] text-[#1C1E4C] mb-6">This would also form your login details and contact information as well</p>
          {error && <p className="text-red-500">{error}</p>}

          <div className="space-y-8 w-[886px] h-[266px] bg-[#F3F3F3] rounded-[40px] flex flex-col justify-center p-4">
            <div className="flex space-x-4">
              <input
                type="email"
                placeholder="Contact email of the organization"
                className="w-full p-3 border rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="tel"
                placeholder="Contact phone of the organization"
                className="w-full p-3 border rounded-lg"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="flex space-x-4">
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-3 border rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Retype Password"
                className="w-full p-3 border rounded-lg"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
              />
              <label>I agree to the <span className="font-semibold">terms of use</span></label>
            </div>
          </div>

          <div className='flex justify-between mt-10'>
            <p className="mt-2 text-center text-gray-500 text-[16px] font-medium">
              Already have an account? <Link href="/login" className="text-[#1C1E4C]">Sign in</Link>
            </p>
            <button 
                onClick={handleSubmit}
                type="submit" 
                className="bg-[#1C1E4C] text-white text-center py-[15px] px-[24px] rounded-[40px]"
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? 'Signing up...' : 'Sign up'}
              </button>
          </div>
          {showPopup && (
            <div className="fixed top-0 left-0 right-0 mt-4 flex justify-center">
              <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg">
                Please check your email for the activation link.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Section - Illustration */}
      <div className="border-1 rounded-[40px]">
        <div className="bg-[#8E92BC] rounded-[40px] p-8">
          <Image src="/login.png" alt="Illustration" width={400} height={746} />
        </div>
      </div>
    </div>
  );
}
