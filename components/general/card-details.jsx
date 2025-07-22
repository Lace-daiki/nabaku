'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faClock, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createDonation } from '@/services/donate/donation';
import { toast } from 'react-toastify';

export default function CardDetails({ project }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [donationData, setDonationData] = useState({
    amount: '',
    email: '',
    anonymous: true
  });

  useEffect(() => {
    if (!project) {
      setError('Project not found');
      setIsLoading(false);
      toast.error('Project not found');
    } else {
      setIsLoading(false);
    }
  }, [project]);

  if (isLoading) {
    return (
      <div className="w-[1156px] h-full mx-auto bg-white shadow-lg rounded-[20px] p-2 gap-4 overflow-hidden mt-10 flex items-center justify-center">
        <p className="text-gray-500">Loading project details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-[1156px] h-full mx-auto bg-white shadow-lg rounded-[20px] p-2 gap-4 overflow-hidden mt-10 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const handleEndProject = async () => {
    try {
      await deleteMutation.mutateAsync(project._id);
      router.push('/projects');
    } catch (error) {
      console.error('Error ending project:', error);
      toast.error('Error ending project');
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'ongoing': return 'bg-green-100 text-green-700';
      case 'paused': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const donationPayload = {
        amount: Number(donationData.amount),
        projectId: project._id,
        email: donationData.email,
        anonymous: donationData.anonymous
      };

      console.log('Submitting donation with payload:', donationPayload);
      
      const result = await createDonation(donationPayload);
      console.log('Donation result:', result);

      if (result.status === 'success' && result.data?.link) {
        // Redirect to Flutterwave hosted payment page
        window.location.href = result.data.link;
      } else {
        throw new Error(result.message || 'Invalid response from server');
      }
    } catch (error) {
      console.error('Error processing donation:', error);
      // Extract the error message from the error object
      const errorMessage = error.response?.data?.message || error.message || 'Failed to process donation. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      
      // If there's an error, keep the modal open but reset the form
      setDonationData({
        amount: '',
        email: '',
        anonymous: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDonationData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="w-[1156px] h-full mx-auto bg-white shadow-lg rounded-[20px] p-2 gap-4 overflow-hidden mt-10">
      {/* Project Cover Image with Progress */}
      <div className="relative w-[1136px] h-[360px]">
        <img 
          alt={project.title} 
          className="w-full h-full object-cover rounded-[10px] mb-2" 
          src={project.cover_image || "https://storage.googleapis.com/a1aa/image/KJAzFqkajDy_jVj8FvCZlBuoagQtHix-nRPniBlisJI.jpg"}
        />
        <div className="absolute inset-3 flex items-end justify-center">
          <div className="bg-white rounded-[16px] px-4 py-2 shadow-lg flex items-center">
            <div className="w-[696px] h-[6px] bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="bg-blue-600 h-[6px]" 
                style={{ width: `${(project.donated_amount / project.target_amount * 100) || 0}%` }}
              ></div>
            </div>
            <span className="ml-4 text-gray-700">
              ₦{project.donated_amount || 0} / ₦{project.target_amount || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="p-6 bg-[#EBEEF9] rounded-[10px] mt-4">
        <h1 className="text-2xl font-bold mb-2">
          {project.title}
        </h1>
        
        {/* Project Meta */}
        <div className="flex items-center text-gray-600 mb-4">
          <FontAwesomeIcon icon={faUsers} className="mr-2" />
          {project.contributor_count || 0} Contributors
          <FontAwesomeIcon icon={faClock} className="ml-4 mr-2" />
          {project.days_left || 0} days left
          <span className={`ml-4 px-2 py-1 rounded-full text-sm ${getStatusColor(project.status)}`}>
            {project.status || 'Ongoing'}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col float-right justify-end space-x-4 space-y-4 mb-6">
          <button 
            onClick={() => setShowDonateModal(true)}
            className="w-[216px] h-[44px] border text-white px-4 py-2 rounded-full bg-[#1C1E53] transition-colors cursor-pointer hover:bg-[#2a2d6e]"
          >
            Donate
          </button>
        </div>

        {/* Project Description */}
        <div className="mb-8 w-[745px] h-[416px]">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <div className="prose max-w-none">
            {project.description ? (
              <p className="text-gray-700 whitespace-pre-line break-words">{project.description}</p>
            ) : (
              <p className="text-gray-500 italic">No description provided</p>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        {/* <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Funding Progress</h3>
          <div className="w-full bg-[#BAC8FF] rounded-full h-4 mb-2">
            <div 
              className="bg-[#1C1E53] h-4 rounded-full" 
              style={{ width: `${project.progress || 0}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>{project.progress || 0}% Funded</span>
            <span>₦{project.donated_amount || 0} raised of ₦{project.target_amount || 0}</span>
          </div>
        </div> */}

        {/* QR Code for Donations */}
        <div className="flex justify-end">
          <img 
            alt="QR code for project donation" 
            className="w-24 h-24" 
            src={project.qr_code || "https://storage.googleapis.com/a1aa/image/26b4mUXWRKqb1XpCV8tOVs3HkF6jvUWB09Fnh398fVM.jpg"}
          />
        </div>
      </div>

      {/* Donation Modal */}
      {showDonateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-[500px] relative">
            <button
              onClick={() => {
                setShowDonateModal(false);
                setError(null); // Clear error when closing modal
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              disabled={isSubmitting}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            
            <h2 className="text-2xl font-bold mb-6">Donate to {project.title}</h2>
            
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleDonate} className="space-y-6">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                  Donation Amount (₦)
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={donationData.amount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1C1E53] focus:border-transparent"
                  placeholder="Enter amount"
                  required
                  min="1"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={donationData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1C1E53] focus:border-transparent"
                  placeholder="Enter your email"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="anonymous"
                  name="anonymous"
                  checked={donationData.anonymous}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-[#1C1E53] focus:ring-[#1C1E53] border-gray-300 rounded"
                  disabled={isSubmitting}
                />
                <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700">
                  Make this donation anonymous
                </label>
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#1C1E53] text-white py-2 px-4 rounded-md hover:bg-[#2a2d6e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}