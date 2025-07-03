// src/components/projects/NewProjectModal.jsx
'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faExclamationTriangle, faCircleNotch, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useCreateProject } from '@/hooks/project/useProjectMutations';
import { useRouter } from 'next/navigation';

export default function NewProjectModal({ isOpen, onClose }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    target_amount: '',
    cover_image: null,
    media: []
  });
  const [authError, setAuthError] = useState(false);
  const [fileError, setFileError] = useState('');
  const [success, setSuccess] = useState(false);
  const createMutation = useCreateProject();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setAuthError(false);
  };

  const validateFile = (file, type) => {
    if (type === 'cover_image') {
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
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
    } else if (name === 'media') {
      setFormData(prev => ({ ...prev, [name]: Array.from(files) }));
    }
    setAuthError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError(false);
    setFileError('');
    
    if (fileError) {
      return;
    }

    try {
      const response = await createMutation.mutateAsync(formData);
      if (response.success) {
        setSuccess(true);
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
          setSuccess(false);
        }, 2000);
      } else {
        throw new Error(response.message || 'Failed to create project');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      
      if (error.response?.status === 401) {
        setAuthError(true);
        setTimeout(() => {
          router.push('/login');
        }, 5000);
      } else {
        setFileError(error.message || 'Failed to create project. Please try again.');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create a new Project</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
            disabled={createMutation.isLoading}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded flex items-start">
            <FontAwesomeIcon icon={faCheckCircle} className="mt-1 mr-2" />
            <span>Project created successfully!</span>
          </div>
        )}

        {/* Authentication Error */}
        {authError && !success && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-start">
            <FontAwesomeIcon icon={faExclamationTriangle} className="mt-1 mr-2" />
            <div>
              <p className="font-medium">Session Expired</p>
              <p className="text-sm">You'll be redirected to login in 5 seconds...</p>
            </div>
          </div>
        )}

        {/* File Error */}
        {fileError && !success && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-start">
            <FontAwesomeIcon icon={faExclamationTriangle} className="mt-1 mr-2" />
            <span>{fileError}</span>
          </div>
        )}

        {/* General Error (from mutation) */}
        {createMutation.error && !authError && !fileError && !success && (
          <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded flex items-start">
            <FontAwesomeIcon icon={faExclamationTriangle} className="mt-1 mr-2" />
            <span>{createMutation.error.message}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className={success ? 'hidden' : ''}>
          {/* Title */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:border-blue-500 focus:outline-none"
              required
              disabled={createMutation.isLoading}
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
              required
              disabled={createMutation.isLoading}
            />
            <p className="text-sm text-gray-500 mt-1">Only .png, .jpg and .jpeg formats are allowed</p>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:border-blue-500 focus:outline-none"
              rows={4}
              required
              disabled={createMutation.isLoading}
            />
          </div>

          {/* Media Files */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Additional Media</label>
            <input
              type="file"
              name="media"
              onChange={handleFileChange}
              className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              accept="image/*,video/*"
              multiple
              disabled={createMutation.isLoading}
            />
          </div>

          {/* Target Amount */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Target Amount (₦)</label>
            <input
              type="number"
              name="target_amount"
              value={formData.target_amount}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:border-blue-500 focus:outline-none"
              required
              min="0"
              step="1000"
              disabled={createMutation.isLoading}
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              disabled={createMutation.isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center min-w-[120px]"
              disabled={createMutation.isLoading || !!fileError}
            >
              {createMutation.isLoading ? (
                <>
                  <FontAwesomeIcon icon={faCircleNotch} className="animate-spin mr-2" />
                  Creating...
                </>
              ) : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}