
import { useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useImageValidation } from "./upload/useImageValidation";
import { useFilePreview } from "./upload/useFilePreview";
import { useFileUploader, BUCKET } from "./upload/useFileUploader";

export function useImageUploadActions(
  bucketExists: boolean,
  checkBucket: () => Promise<boolean>,
  fetchImages: () => Promise<void>,
  sharedState: ReturnType<typeof import('./useImageLibraryState').useImageLibraryState>
) {
  const { 
    setUploading, 
    setPreviewUrl, 
    setSelectedFile, 
    setUploadErrorMsg,
    setUploadProgress 
  } = sharedState;
  
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { validateFile } = useImageValidation();
  const { createPreview } = useFilePreview();
  const { uploadFile } = useFileUploader();

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setUploadErrorMsg('');
    setPreviewUrl(null);

    if (!file) return;

    const { valid, error } = validateFile(file);
    if (!valid) {
      setUploadErrorMsg(error || 'Invalid file.');
      setSelectedFile(null);
      return;
    }

    // Create file preview
    const previewUrl = await createPreview(file);
    setPreviewUrl(previewUrl);
  }, [setSelectedFile, setUploadErrorMsg, setPreviewUrl, validateFile, createPreview]);

  const handleUpload = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    // Check authentication first
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      toast({
        title: "Authentication Required",
        description: "You need to be logged in to upload images.",
        variant: "destructive"
      });
      return;
    }
    
    // Check bucket exists
    const bucketOk = await checkBucket();
    if (!bucketOk) {
      toast({
        title: "Upload failed",
        description: `Storage bucket "${BUCKET}" not found or not accessible`,
        variant: "destructive"
      });
      return;
    }
    
    setUploading(true);
    setUploadProgress(0);
    
    let successfulUploads = 0;
    let failedUploads = 0;
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Validate file before upload
      const validation = validateFile(file);
      if (!validation.valid) {
        toast({
          title: "File validation failed",
          description: validation.error,
          variant: "destructive"
        });
        failedUploads++;
        continue;
      }
      
      const result = await uploadFile(file);
      
      if (!result.success) {
        toast({
          title: "Upload failed",
          description: result.error || "An unexpected error occurred",
          variant: "destructive"
        });
        failedUploads++;
      } else {
        successfulUploads++;
        setUploadProgress(Math.round((i + 1) / files.length * 100));
      }
    }
    
    // Show summary toast for multiple uploads
    if (files.length > 1) {
      if (failedUploads > 0) {
        toast({
          title: "Upload complete with errors",
          description: `${successfulUploads} files uploaded successfully, ${failedUploads} failed`,
          variant: successfulUploads > 0 ? "default" : "destructive"
        });
      } else {
        toast({
          title: "Upload complete",
          description: `${successfulUploads} files uploaded successfully`
        });
      }
    }
    
    // Refresh images list and reset state
    await fetchImages();
    setUploading(false);
    setUploadProgress(0);
  }, [checkBucket, fetchImages, setUploading, setUploadProgress, validateFile, uploadFile]);
  
  return { 
    handleUpload,
    fileInputRef,
    handleFileChange
  };
}
