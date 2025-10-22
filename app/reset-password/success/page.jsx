'use client';

import Link from 'next/link';

export default function ResetPasswordSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow text-center">
        <div className="flex justify-center">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg 
              className="h-6 w-6 text-green-600" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
        </div>
        
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Password Reset Successful!
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Your password has been successfully updated. You can now log in with your new password.
          </p>
        </div>

        <div className="mt-6">
          <Link
            href="/login"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1C1E4C] hover:bg-[#15173d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1C1E4C]"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
