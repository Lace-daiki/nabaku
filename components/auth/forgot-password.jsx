'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faExclamationTriangle, faCircleNotch, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '@/lib/contants';

export default function ForgetPasswordModal({ isOpen, onClose }) {
  const router = useRouter();
  const [id, setId] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setId(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Replace with your API call to send a password reset email
      const response = await fetch(`${API_BASE_URL}/authentication/password/forgot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        toast.success('Password reset email sent successfully!');
        setTimeout(() => {
          onClose();
          setSuccess(false);
        }, 2000);
      } else {
        throw new Error(data.message || 'Failed to send password reset email');
      }
    } catch (error) {
      console.error('Error sending password reset email:', error);
      setError(error.message || 'Failed to send password reset email. Please try again.');
      toast.error(error.message || 'Failed to send password reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-25 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Forget Password</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
            disabled={loading}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {/* Success Message */}
        {success && (
          <div className="flex items-center text-green-600 mb-4">
            <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
            <span>Password reset email sent!</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="flex items-center text-red-600 mb-4">
            <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              value={id}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:border-blue-500 focus:outline-none"
              required
              disabled={loading}
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center min-w-[120px] cursor-pointer"
              disabled={loading}
            >
              {loading ? (
                <>
                  <FontAwesomeIcon icon={faCircleNotch} className="animate-spin mr-2" />
                  Sending...
                </>
              ) : 'Send Reset Link'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
