// hooks/useFileUpload.js
import { useState } from 'react';
import { uploadImageToCloudinary } from '@/services/auth/fileUpload';

export const useFileUpload = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = async (file) => {
    if (!file) return null;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      const url = await uploadImageToCloudinary(file);
      return url;
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadFile, uploadProgress, isUploading };
};