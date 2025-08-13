'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { authService } from '@/services/auth/auth';
import { toast } from 'react-toastify';

export default function VerifiedAccount() {
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const activateUserAccount = async () => {
      setLoading(true);
      try {
        const response = await authService.activateAccount(); // Call the activateAccount method
        if (response.success) {
          toast.success('Account activated successfully!');
          // Redirect to login page after activation
          setTimeout(() => {
            router.push('/login'); // Redirect to the login page
          }, 2000); // Optional: delay for 2 seconds before redirecting
        } else {
          toast.error('Account activation failed. Please try again.');
        }
      } catch (error) {
        console.error('Error activating account:', error);
        toast.error('Account activation failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    activateUserAccount();
  }, [router]); // Add router to the dependency array

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="border-1 rounded-[40px] m-4 p-8 w-[966px] h-[730px] flex flex-col gap-4">
        <div className="mb-10">
          <Image src="/nabaku.png" alt="Illustration" width={200} height={22} />
        </div>
        <h3 className='text-[48px] text-[#1C1E4C] font-medium'>
          <span className='font-bold italic'>Congratulations</span>, your account has been verified.
        </h3>
        <p className='font-medium text-[18px] text-[#1C1E4C]'>Redirecting you...</p>
      </div>
      <div className="border-1 rounded-[40px]">
        <div className="bg-[#8E92BC] rounded-[40px] p-8">
          <Image src="/login.png" alt="Illustration" width={400} height={746} />
        </div>
      </div>
    </div>
  );
}
