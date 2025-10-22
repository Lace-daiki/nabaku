'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();

  // Auto-redirect after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E1A58] to-[#2D2A6E] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg 
            className="w-12 h-12 text-green-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        
        {/* Success Message */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Payment Successful! 🎉
        </h1>
        <p className="text-gray-600 mb-8">
          Thank you for your payment. Your transaction has been completed successfully.
        </p>
        
        {/* Additional Info */}
        <div className="bg-gray-50 p-4 rounded-lg mb-8 text-left">
          <p className="text-sm text-gray-600 mb-2">
            A receipt has been sent to your email.
          </p>
          <p className="text-xs text-gray-500">
            You'll be redirected to the homepage in 5 seconds...
          </p>
        </div>
        
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-block w-full bg-[#1E1A58] hover:bg-[#2D2A6E] text-white font-medium py-3 px-6 rounded-lg transition duration-200"
        >
          Back to Home
        </Link>
        
        {/* Support Link */}
        <p className="mt-6 text-sm text-gray-500">
          Need help?{' '}
          <a 
            href="mailto:support@example.com" 
            className="text-[#1E1A58] hover:underline"
          >
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}