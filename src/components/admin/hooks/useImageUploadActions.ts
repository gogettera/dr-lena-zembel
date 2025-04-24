
import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from 'uuid';

// Allowed image MIME types and file size limits for security
const ALLOWED_MIME_TYPES = [
  "image/jpeg", 
  "image/png", 
  "image/webp", 
  "image/gif", 
  "image/svg+xml"
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const BUCKET = "site-images";

export function useImageUploadActions(
  checkBucket: () => Promise<boolean>,
  fetchImages: () => Promise<void>,
  sharedState: ReturnType<typeof import('./useImageLibraryState').useImageLibraryState>
) {
  const { setLoading, setUploadProgress } = sharedState;

  const validateFile = (file: File): {valid: boolean; error?: string} => {
    // Validate file type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return { 
        valid: false, 
        error: `Unsupported file type: ${file.type}. Allowed types: JPEG, PNG, WebP, GIF, SVG`
      };
    }
    
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return {
        valid: false,
        error: `File too large. Maximum size: ${MAX_FILE_SIZE/1024/1024}MB`
      };
    }
    
    return { valid: true };
  };

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
    const bucketExists = await checkBucket();
    if (!bucketExists) {
      toast({
        title: "Upload failed",
        description: `Storage bucket "${BUCKET}" not found or not accessible`,
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
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
      
      // Generate secure random filename to prevent path traversal attacks
      const fileExt = file.name.split('.').pop();
      const sanitizedFilename = `${uuidv4()}.${fileExt}`;
      
      try {
        // Upload with progress tracking
        const { error, data } = await supabase.storage
          .from(BUCKET)
          .upload(sanitizedFilename, file, {
            contentType: file.type,
            upsert: false,
            onUploadProgress: (progress) => {
              const percentage = (progress.loaded / progress.total) * 100;
              setUploadProgress(percentage);
            }
          });
          
        if (error) {
          console.error("Upload error:", error);
          toast({
            title: "Upload failed",
            description: error.message,
            variant: "destructive"
          });
          failedUploads++;
        } else {
          successfulUploads++;
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
        console.error("Upload error:", err);
        toast({
          title: "Upload failed",
          description: errorMessage,
          variant: "destructive"
        });
        failedUploads++;
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
    setLoading(false);
    setUploadProgress(0);
  }, [checkBucket, fetchImages, setLoading, setUploadProgress]);
  
  return { handleUpload };
}
