'use client';

import { FaUser , FaImage } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function SetupPage5({ profile_image, profile_imagePreview, cover_image, cover_imagePreview, onChange }) {
  // Remove local state, use props instead

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast.error('File size exceeds 2MB. Please upload a smaller image.');
        return;
      }
      // Pass file to parent
      onChange({ target: { name: 'profile_image', files: [file] } });
    } else {
      toast.error('Please upload a valid image file.');
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast.error('File size exceeds 2MB. Please upload a smaller image.');
        return;
      }
      // Pass file to parent
      onChange({ target: { name: 'cover_image', files: [file] } });
    } else {
      toast.error('Please upload a valid image file.');
    }
  };

  const clearPhoto = () => {
    // Pass null to parent
    onChange({ target: { name: 'profile_image', files: [null] } });
  };

  const clearCoverPhoto = () => {
    onChange({ target: { name: 'cover_image', files: [null] } });
  };

  return (
    <div className="">
      <h1 className="text-[48px] text-[#1C1E4C] font-semibold">Upload Profile Pictures</h1>
      <p className="text-[18px] text-[#1C1E4C] mb-6">
        A professional profile and cover photo helps build trust with donors. Telling us about your type of organization helps us match you with donors who are looking for organizations like yours.
      </p>

      <div className="space-y-8 w-[886px] h-[266px] bg-[#F3F3F3] rounded-[40px] flex flex-col justify-center p-4">
        {/* Image Uploads */}
        <div className="flex gap-4 items-center bg-[#F5F5F5] p-6 rounded-2xl">
          {/* Profile photo */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-[120px] h-[120px] bg-[#DDDDE4] rounded-[10px] p-[32px] flex items-center justify-center text-3xl text-gray-500">
              {profile_imagePreview ? (
                <img src={profile_imagePreview} alt="Profile Preview" className="w-full h-full object-cover rounded-lg" />
              ) : (
                <FaUser  />
              )}
            </div>
            <input type="file" id="profileUpload" hidden onChange={handlePhotoChange} />
            <label htmlFor="profileUpload" className="text-[14px] text-[#54577A] font-normal border border-[#8E92BC] px-[24px] py-[12px] rounded-[40px] cursor-pointer">
              Add Photo
            </label>
            {profile_imagePreview && (
              <button type="button" onClick={clearPhoto} className="text-red-500 text-sm mt-2">
                Remove Photo
              </button>
            )}
          </div>

          {/* Cover photo */}
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full h-[120px] bg-[#DDDDE4] rounded-[10px] px-[32px] py-[12px] flex items-center justify-center text-3xl text-gray-500">
              {cover_imagePreview ? (
                <img src={cover_imagePreview} alt="Cover Preview" className="w-full h-full object-cover rounded-lg" />
              ) : (
                <FaImage />
              )}
            </div>
            <input type="file" id="coverUpload" hidden onChange={handleCoverChange} />
            <label htmlFor="coverUpload" className="text-[14px] text-[#54577A] border border-[#8E92BC] px-[24px] py-[12px] rounded-[40px] cursor-pointer w-full text-center">
              Add Photo
            </label>
            {cover_imagePreview && (
              <button type="button" onClick={clearCoverPhoto} className="text-red-500 text-sm mt-2">
                Remove Cover Photo
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
