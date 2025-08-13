'use client';

import { useState, useEffect } from 'react';
import { profileService } from '@/services/auth/profileService';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function SettingsPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    description: '',
    cover_image: '',
    profile_image: '',
    phone: '',
    email: '',
    youtube: '',
    instagram: '',
    facebook: '',
    twitter: '',
  });
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({...profile});

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const result = await profileService.getProfile();
        console.log(result);
        console.log("name:", result.data.data.description);
        
        // if (result.success) {
          const profileData = {
            name: result.data.data.name || '',
            description: result.data.data.description || '',
            cover_image: result.data.data.cover_image || '',
            profile_image: result.data.data.profile_image || '',
            phone: result.data.data.contact?.phone || '',
            email: result.data.data.contact?.email || '',
            youtube: result.data.data.contact?.youtube || '',
            instagram: result.data.data.contact?.instagram || '',
            facebook: result.data.data.contact?.facebook || '',
            twitter: result.data.data.contact?.twitter || '',
          };
          setProfile(profileData);
          setFormData(profileData);
        // } else {
        //   toast.error(result.error);
        // }
      } catch (error) {
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      // Validate required fields
      if (!formData.description.trim()) {
        toast.error('Please provide a description for your organization');
        return;
      }

      if (!formData.name.trim()) {
        toast.error('Please provide a name for your organization');
        return;
      }

      // Prepare data in the format expected by the API
      const updateData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        cover_image: formData.cover_image,
        profile_image: formData.profile_image,
        contact: {
          phone: formData.phone,
          email: formData.email,
          youtube: formData.youtube,
          instagram: formData.instagram,
          facebook: formData.facebook,
          twitter: formData.twitter,
        },
      };

      const result = await profileService.updateProfile(updateData);
      if (result.success) {
        setProfile(formData);
        setIsEditing(false);
        toast.success('Profile updated successfully');
      } else {
        toast.error(result.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading profile data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-2xl font-semibold mb-6">Profile Settings</h1>
      <p className="text-sm text-gray-500 mb-6">
        Manage how your organization appears to the public.
      </p>

      {/* Cover and Logo */}
      <div className="relative mb-16">
        <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
          {formData.cover_image ? (
            <img 
              src={formData.cover_image} 
              alt="Cover banner" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500">No cover image</span>
            </div>
          )}
        </div>
        
        <div className="absolute bottom-[-32px] left-6">
          <div className="w-20 h-20 rounded-lg border-4 border-white bg-white overflow-hidden">
            {formData.profile_image ? (
              <img 
                src={formData.profile_image} 
                alt="Organization logo" 
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-xs">Logo</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Organization Name */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-semibold">Organization Name</h2>
            <p className="text-sm text-gray-500">
              The name of your organization
            </p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={() => {
                    setFormData(profile);
                    setIsEditing(false);
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="text-sm text-blue-500 hover:text-blue-700 font-medium"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm text-blue-500 hover:text-blue-700 font-medium"
              >
                Edit
              </button>
            )}
          </div>
        </div>
        
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter organization name..."
          />
        ) : (
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-gray-700 font-medium">
              {formData.name || 'No organization name provided'}
            </p>
          </div>
        )}
      </div>

      {/* About Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-semibold">About your organization</h2>
            <p className="text-sm text-gray-500">
              Help people get to know about your organization
            </p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={() => {
                    setFormData(profile);
                    setIsEditing(false);
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="text-sm text-blue-500 hover:text-blue-700 font-medium"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm text-blue-500 hover:text-blue-700 font-medium"
              >
                Edit
              </button>
            )}
          </div>
        </div>
        
        {isEditing ? (
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={6}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Tell us about your organization..."
          />
        ) : (
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-gray-700 whitespace-pre-line">
              {formData.description || 'No description provided'}
            </p>
          </div>
        )}
      </div>

      
      <Link href="/profile-setup" className="text-[#1C1E4C]">Sign up</Link>
      
      {/* Social Links */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-semibold">Social Media Links</h2>
            <p className="text-sm text-gray-500">
              Add your organization's social media profiles
            </p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={() => {
                    setFormData(profile);
                    setIsEditing(false);
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="text-sm text-blue-500 hover:text-blue-700 font-medium"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm text-blue-500 hover:text-blue-700 font-medium"
              >
                Edit
              </button>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+1234567890"
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={!isEditing}
            />
          </div>
          
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="contact@example.com"
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={!isEditing}
            />
          </div>
          
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">YouTube</label>
            <input
              type="text"
              name="youtube"
              value={formData.youtube}
              onChange={handleInputChange}
              placeholder="@yourchannel"
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={!isEditing}
            />
          </div>
          
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Instagram</label>
            <input
              type="text"
              name="instagram"
              value={formData.instagram}
              onChange={handleInputChange}
              placeholder="@yourprofile"
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Facebook</label>
            <input
              type="text"
              name="facebook"
              value={formData.facebook}
              onChange={handleInputChange}
              placeholder="Your Facebook page name"
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Twitter</label>
            <input
              type="text"
              name="twitter"
              value={formData.twitter}
              onChange={handleInputChange}
              placeholder="@yourhandle"
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
