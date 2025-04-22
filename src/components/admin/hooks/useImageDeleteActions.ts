
import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const BUCKET = "site-images";

export function useImageDeleteActions(
  bucketExists: boolean, 
  checkBucket: () => Promise<boolean>, 
  fetchImages: () => Promise<void>,
  sharedState: ReturnType<typeof import('./useImageLibraryState').useImageLibraryState>
) {
  const { setLoading } = sharedState;

  const handleDelete = useCallback(async (name: string) => {
    // Check authentication first
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      toast({
        title: "Authentication Required",
        description: "You need to be logged in to delete images.",
        variant: "destructive"
      });
      return;
    }
    
    if (!bucketExists) {
      const bucketOk = await checkBucket();
      if (!bucketOk) {
        toast({
          title: "Delete failed",
          description: `Storage bucket "${BUCKET}" not found`,
          variant: "destructive"
        });
        return;
      }
    }
    
    setLoading(true);
    
    try {
      const { error } = await supabase.storage.from(BUCKET).remove([name]);
      if (error) {
        toast({ 
          title: "Failed to delete", 
          description: error.message, 
          variant: "destructive" 
        });
      } else {
        toast({ title: "Image deleted" });
        await fetchImages();
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      toast({
        title: "Delete failed",
        description: errorMessage,
        variant: "destructive"
      });
    }
    
    setLoading(false);
  }, [bucketExists, checkBucket, fetchImages, setLoading]);
  
  return { handleDelete };
}
