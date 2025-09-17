// src/components/projects/NewProjectModal.jsx
'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faExclamationTriangle, faCircleNotch, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { activityService } from '@/services/activity/activity';

export default function NewActivityModal({ isOpen, onClose }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    start: '',
    end: '',
    cover_image: null
  });
  const [authError, setAuthError] = useState(false);
  const [fileError, setFileError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setAuthError(false);
  };

  const validateFile = (file, type) => {
    if (type === 'cover_image') {
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        toast.error('Invalid file format. Only .png, .jpg and .jpeg formats are allowed!');
        setFileError('Invalid file format. Only .png, .jpg and .jpeg formats are allowed!');
        return false;
      }
    }
    setFileError('');
    return true;
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'cover_image') {
      if (files[0] && validateFile(files[0], 'cover_image')) {
        setFormData(prev => ({ ...prev, [name]: files[0] }));
      }
    }
    setAuthError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError(false);
    setFileError('');
    setIsLoading(true);
    
    if (fileError) {
      toast.error(fileError);
      setIsLoading(false);
      return;
    }

    // Validate required fields
    if (!formData.name.trim()) {
      toast.error('Please enter activity name');
      setIsLoading(false);
      return;
    }

    if (!formData.start) {
      toast.error('Please select start date and time');
      setIsLoading(false);
      return;
    }

    if (!formData.end) {
      toast.error('Please select end date and time');
      setIsLoading(false);
      return;
    }

    try {
      // Prepare data for API
      const activityData = {
        name: formData.name.trim(),
        start: formData.start,
        end: formData.end,
        // cover_image: formData.cover_image ? 'https://res.cloudinary.com/projectonecoop/image/upload/v1709556560/ceos-1709556558759.jpg' : null
      };

      const response = await activityService.addActivity(activityData);
      if (response.success) {
        setSuccess(true);
        toast.success('Activity created successfully!');
        setTimeout(() => {
          onClose();
          setSuccess(false);
          setFormData({
            name: '',
            start: '',
            end: '',
            cover_image: null
          });
        }, 2000);
      } else {
        throw new Error(response.message || 'Failed to create activity');
      }
    } catch (error) {
      console.error('Error creating activity:', error);
      if (error.response?.status === 401) {
        setAuthError(true);
        toast.error('Session Expired. You\'ll be redirected to login in 5 seconds...');
        setTimeout(() => {
          router.push('/login');
        }, 5000);
      } else {
        setFileError(error.message || 'Failed to create activity. Please try again.');
        toast.error(error.message || 'Failed to create activity. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create a new Activity</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
            disabled={isLoading}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {/* Success Message */}
        {/* Authentication Error */}
        {/* File Error */}
        {/* General Error (from mutation) */}

        {/* Form */}
        <form onSubmit={handleSubmit} className={success ? 'hidden' : ''}>
          {/* Title */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Title</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:border-blue-500 focus:outline-none"
              required
              disabled={isLoading}
            />
          </div>

          {/* Cover Image */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Cover Image</label>
            <input
              type="file"
              name="cover_image"
              onChange={handleFileChange}
              className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              accept="image/png,image/jpeg,image/jpg"
              disabled={isLoading}
            />
            <p className="text-sm text-gray-500 mt-1">Only .png, .jpg and .jpeg formats are allowed</p>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Start</label>
            <input
              type="datetime-local"
              name="start"
              value={formData.start}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:border-blue-500 focus:outline-none"
              required
              disabled={isLoading}
            />
          </div>

          {/* Media Files */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">End</label>
            <input
              type="datetime-local"
              name="end"
              value={formData.end}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:border-blue-500 focus:outline-none"
              required
              disabled={isLoading}
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center min-w-[120px]"
              disabled={isLoading || !!fileError}
            >
              {isLoading ? (
                <>
                  <FontAwesomeIcon icon={faCircleNotch} className="animate-spin mr-2" />
                  Creating...
                </>
              ) : 'Add Activity'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}