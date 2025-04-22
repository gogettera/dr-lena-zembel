
import { useState, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { validateImageFile, createFilePreview } from '@/utils/fileUtils';
import { toast } from '@/components/ui/use-toast';

const BUCKET = 'site-images';

export type Img = {
  name: string;
  url: string;
  updated_at: string | null;
};

export function useImageLibraryActions() {
  const [images, setImages] = useState<Img[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [bucketExists, setBucketExists] = useState(true);
  const [checkInProgress, setCheckInProgress] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // --- bucket check
  const checkBucket = useCallback(async () => {
    setCheckInProgress(true);
    try {
      const { data, error } = await supabase.storage.getBucket(BUCKET);
      if (error || !data) {
        setBucketExists(false);
        setErrorMsg(
          `Storage bucket "${BUCKET}" not found. Please ensure it exists in your Supabase project.`
        );
        setCheckInProgress(false);
        return false;
      }
      setBucketExists(true);
      setErrorMsg('');
      setCheckInProgress(false);
      return true;
    } catch (error) {
      setBucketExists(false);
      setErrorMsg(
        `Error checking bucket "${BUCKET}". Please ensure Supabase is properly configured.`
      );
      setCheckInProgress(false);
      return false;
    }
  }, []);

  // --- fetch images
  const fetchImages = useCallback(async () => {
    setLoading(true);
    const bucketOk = await checkBucket();
    if (!bucketOk) {
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .storage
        .from(BUCKET)
        .list('', { limit: 200, offset: 0, sortBy: { column: 'updated_at', order: 'desc' } });

      if (error) {
        setImages([]);
        setErrorMsg(`Could not fetch images: ${error.message}`);
      } else if (data) {
        const imgs: Img[] = data
          .filter(file => file && !file.name.endsWith('/'))
          .map(file => {
            const { data: publicUrlData } = supabase.storage.from(BUCKET).getPublicUrl(file.name);
            return {
              name: file.name,
              url: publicUrlData.publicUrl,
              updated_at: file.updated_at ?? null,
            };
          });
        setImages(imgs);
        setErrorMsg('');
      }
    } catch {
      setErrorMsg('An unexpected error occurred while fetching images.');
    }
    setLoading(false);
  }, [checkBucket]);

  // --- upload section
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setErrorMsg('');
    setPreviewUrl(null);
    const { valid, message } = validateImageFile(file, 5);
    if (!valid) {
      setErrorMsg(message || 'Invalid file.');
      setSelectedFile(null);
      return;
    }
    if (file) {
      const preview = await createFilePreview(file);
      setPreviewUrl(preview);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setErrorMsg('Select an image to upload first.');
      return;
    }
    if (!bucketExists) {
      const bucketOk = await checkBucket();
      if (!bucketOk) {
        toast({
          title: 'Upload failed',
          description: `Storage bucket "${BUCKET}" not found. Please ensure it exists in your Supabase project.`,
          variant: 'destructive'
        });
        return;
      }
    }
    setUploading(true);
    setErrorMsg('');
    const fileName = `${Date.now()}_${selectedFile.name.replace(/\s+/g, '_')}`;
    const filePath = fileName;
    try {
      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(filePath, selectedFile, {
          upsert: false,
        });
      if (uploadError) {
        setErrorMsg(uploadError.message || 'Failed to upload.');
        toast({ title: 'Upload failed', description: uploadError.message, variant: 'destructive' });
      } else {
        toast({ title: 'Image uploaded successfully', variant: 'default' });
        setSelectedFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        fetchImages();
      }
    } catch {
      toast({
        title: 'Upload failed',
        description: 'An unexpected error occurred during upload',
        variant: 'destructive'
      });
    }
    setUploading(false);
  };

  // --- delete
  const handleDelete = async (name: string) => {
    if (!bucketExists) {
      const bucketOk = await checkBucket();
      if (!bucketOk) {
        toast({
          title: 'Delete failed',
          description: `Storage bucket "${BUCKET}" not found`,
          variant: 'destructive'
        });
        return;
      }
    }
    setLoading(true);
    try {
      const { error } = await supabase.storage
        .from(BUCKET)
        .remove([name]);
      if (error) {
        toast({ title: 'Failed to delete', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Image deleted' });
        fetchImages();
      }
    } catch {
      toast({
        title: 'Delete failed',
        description: 'An unexpected error occurred',
        variant: 'destructive'
      });
    }
    setLoading(false);
  };

  // --- retry
  const handleRetry = async () => {
    setErrorMsg('');
    setBucketExists(true);
    setCheckInProgress(true);
    await fetchImages();
    setCheckInProgress(false);
  };

  // --- bucket creation (info)
  const handleCreateBucket = () => {
    setErrorMsg(
      "Creating a storage bucket requires administrator access to your Supabase project. Please create a bucket named 'site-images' in the Supabase dashboard."
    );
    toast({
      title: 'Action required',
      description: "Please create a 'site-images' bucket in your Supabase dashboard",
      variant: 'default'
    });
  };

  return {
    images,
    setImages,
    loading,
    uploading,
    previewUrl,
    selectedFile,
    errorMsg,
    bucketExists,
    checkInProgress,
    fileInputRef,
    setSelectedFile,
    setErrorMsg,
    setPreviewUrl,
    checkBucket,
    fetchImages,
    handleFileChange,
    handleUpload,
    handleDelete,
    handleRetry,
    handleCreateBucket,
  };
}
