
import { useCallback, useRef } from "react";
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
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setPreviewUrl(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  }, [setSelectedFile, setUploadErrorMsg, setPreviewUrl]);

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
      
      // Generate secure random filename to prevent path traversal attacks
      // Extract file extension safely using regex
      const fileExt = (file.name.match(/\.([^.]+)$/) || ['', 'bin'])[1].toLowerCase();
      
      // Validate file extension against allowed types as double-check
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'];
      if (!allowedExtensions.includes(fileExt)) {
        toast({
          title: "File validation failed",
          description: `File extension .${fileExt} is not allowed`,
          variant: "destructive"
        });
        failedUploads++;
        continue;
      }
      
      const sanitizedFilename = `${uuidv4()}.${fileExt}`;
      
      try {
        // Upload file
        const { error, data } = await supabase.storage
          .from(BUCKET)
          .upload(sanitizedFilename, file, {
            contentType: file.type,
            upsert: false
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
          setUploadProgress(Math.round((i + 1) / files.length * 100));
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
    setUploading(false);
    setUploadProgress(0);
  }, [checkBucket, fetchImages, setUploading, setUploadProgress]);
  
  return { 
    handleUpload,
    fileInputRef,
    handleFileChange
  };
}
