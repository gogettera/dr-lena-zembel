
import { useState, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { validateImageFile, createFilePreview } from '@/utils/fileUtils';
import { toast } from '@/components/ui/use-toast';
import { useBucketCheck } from './useBucketCheck';

const BUCKET = 'site-images';

export function useImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { bucketExists, checkBucket } = useBucketCheck();

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
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
  }, []);

  const handleUpload = useCallback(async () => {
    if (!selectedFile) {
      setErrorMsg('Select an image to upload first.');
      return;
    }

    if (!bucketExists) {
      const bucketOk = await checkBucket();
      if (!bucketOk) {
        toast({
          title: 'Upload failed',
          description: `Storage bucket "${BUCKET}" not found.`,
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
        .upload(filePath, selectedFile, { upsert: false });

      if (uploadError) {
        setErrorMsg(uploadError.message || 'Failed to upload.');
        toast({ 
          title: 'Upload failed', 
          description: uploadError.message, 
          variant: 'destructive' 
        });
      } else {
        toast({ 
          title: 'Image uploaded successfully', 
          variant: 'default' 
        });
        
        // Reset form
        setSelectedFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    } catch {
      toast({
        title: 'Upload failed',
        description: 'An unexpected error occurred during upload',
        variant: 'destructive'
      });
    }

    setUploading(false);
  }, [selectedFile, bucketExists, checkBucket]);

  return {
    uploading,
    previewUrl,
    selectedFile,
    errorMsg,
    fileInputRef,
    handleFileChange,
    handleUpload
  };
}
