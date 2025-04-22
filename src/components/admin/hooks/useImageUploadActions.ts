
import { useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { validateImageFile, createFilePreview } from "@/utils/fileUtils";
import { toast } from "@/components/ui/use-toast";

const BUCKET = "site-images";

export function useImageUploadActions(
  bucketExists: boolean,
  checkBucket: () => Promise<boolean>,
  fetchImages: () => Promise<void>,
  sharedState: ReturnType<typeof import('./useImageLibraryState').useImageLibraryState>
) {
  const {
    setUploading,
    setPreviewUrl,
    selectedFile,
    setSelectedFile,
    setUploadErrorMsg
  } = sharedState;
  
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setUploadErrorMsg('');
    setPreviewUrl(null);
    
    const { valid, message } = validateImageFile(file, 5);
    if (!valid) {
      setUploadErrorMsg(message || 'Invalid file.');
      setSelectedFile(null);
      return;
    }
    
    if (file) {
      const preview = await createFilePreview(file);
      setPreviewUrl(preview);
    }
  }, [setSelectedFile, setUploadErrorMsg, setPreviewUrl]);

  const handleUpload = useCallback(async () => {
    // Check authentication first
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      toast({
        title: "Authentication Required",
        description: "You need to be logged in to upload images.",
        variant: "destructive"
      });
      setUploadErrorMsg("Authentication required to access storage.");
      return;
    }
    
    if (!selectedFile) {
      setUploadErrorMsg('Select an image to upload first.');
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
    setUploadErrorMsg('');
    const fileName = `${Date.now()}_${selectedFile.name.replace(/\s+/g, "_")}`;
    const filePath = fileName;
    
    try {
      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(filePath, selectedFile, {
          upsert: false,
        });
        
      if (uploadError) {
        setUploadErrorMsg(uploadError.message || 'Failed to upload.');
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
        setSelectedFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        await fetchImages();
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      setUploadErrorMsg(errorMessage);
      toast({
        title: 'Upload failed',
        description: 'An unexpected error occurred during upload',
        variant: 'destructive'
      });
    }
    
    setUploading(false);
  }, [
    selectedFile, 
    bucketExists, 
    checkBucket, 
    fetchImages, 
    setUploading, 
    setUploadErrorMsg, 
    setSelectedFile, 
    setPreviewUrl
  ]);

  return {
    fileInputRef,
    handleFileChange,
    handleUpload,
  };
}
