
import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "@/components/ui/use-toast";
import { useImageValidation } from "./useImageValidation";

export const BUCKET = "site-images";

export interface UploadResult {
  success: boolean;
  error?: string;
}

export function useFileUploader() {
  const { validateFileExtension } = useImageValidation();

  const uploadFile = useCallback(async (file: File): Promise<UploadResult> => {
    // Extract file extension safely using regex
    const fileExt = (file.name.match(/\.([^.]+)$/) || ['', 'bin'])[1].toLowerCase();
    
    // Validate file extension
    const extensionValidation = validateFileExtension(fileExt);
    if (!extensionValidation.valid) {
      return { 
        success: false, 
        error: extensionValidation.error 
      };
    }
    
    // Generate secure random filename to prevent path traversal attacks
    const sanitizedFilename = `${uuidv4()}.${fileExt}`;
    
    try {
      // Upload file
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(sanitizedFilename, file, {
          contentType: file.type,
          upsert: false
        });
          
      if (error) {
        console.error("Upload error:", error);
        return {
          success: false,
          error: error.message
        };
      } 
      
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
      console.error("Upload error:", err);
      return {
        success: false,
        error: errorMessage
      };
    }
  }, [validateFileExtension]);

  return {
    uploadFile
  };
}
