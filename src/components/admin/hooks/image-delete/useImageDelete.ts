
import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const BUCKET = "site-images";

export function useImageDelete() {
  const deleteImage = useCallback(async (name: string) => {
    try {
      // First check authentication
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        toast({
          title: "Authentication Required",
          description: "You need to be logged in to delete images.",
          variant: "destructive"
        });
        return { success: false, error: "Authentication required" };
      }
      
      const { error } = await supabase.storage.from(BUCKET).remove([name]);
      
      if (error) {
        toast({ 
          title: "Failed to delete", 
          description: error.message, 
          variant: "destructive" 
        });
        return { success: false, error: error.message };
      } 
      
      toast({ title: "Image deleted" });
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      toast({
        title: "Delete failed",
        description: errorMessage,
        variant: "destructive"
      });
      return { success: false, error: errorMessage };
    }
  }, []);
  
  return { deleteImage };
}
