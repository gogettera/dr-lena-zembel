
import { useState, useRef } from 'react';
import type { Img } from '../useImageLibraryActions';

export function useImageLibraryState() {
  // Bucket state
  const [bucketExists, setBucketExists] = useState(true);
  const [checkInProgress, setCheckInProgress] = useState(false);
  const [bucketErrorMsg, setBucketErrorMsg] = useState('');
  
  // Image list state
  const [images, setImages] = useState<Img[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Upload state
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadErrorMsg, setUploadErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return {
    // Bucket state
    bucketExists,
    setBucketExists,
    checkInProgress,
    setCheckInProgress,
    bucketErrorMsg,
    setBucketErrorMsg,
    
    // Image list state
    images,
    setImages,
    loading,
    setLoading,
    
    // Upload state
    uploading,
    setUploading,
    uploadProgress,
    setUploadProgress,
    previewUrl,
    setPreviewUrl,
    selectedFile,
    setSelectedFile,
    uploadErrorMsg,
    setUploadErrorMsg,
    fileInputRef
  };
}
