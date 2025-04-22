
import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import type { Img } from "../useImageLibraryActions";

const BUCKET = "site-images";

export function useImageFetchActions(
  checkBucket: () => Promise<boolean>,
  sharedState: ReturnType<typeof import('./useImageLibraryState').useImageLibraryState>
) {
  const { 
    setImages, 
    setLoading, 
    setBucketErrorMsg 
  } = sharedState;

  const fetchImages = useCallback(async () => {
    setLoading(true);
    
    // First check authentication
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      toast({
        title: "Authentication Required",
        description: "You need to be logged in to view images.",
        variant: "destructive"
      });
      setBucketErrorMsg("Authentication required to access storage.");
      setLoading(false);
      return;
    }
    
    const bucketOk = await checkBucket();
    if (!bucketOk) {
      setLoading(false);
      return;
    }
    
    try {
      const { data, error } = await supabase.storage
        .from(BUCKET)
        .list("", { limit: 200, offset: 0, sortBy: { column: "updated_at", order: "desc" } });

      if (error) {
        setImages([]);
        setBucketErrorMsg(`Could not fetch images: ${error.message}`);
        toast({
          title: "Failed to fetch images",
          description: error.message,
          variant: "destructive"
        });
      } else if (data) {
        const imgs: Img[] = data
          .filter(file => file && !file.name.endsWith("/"))
          .map(file => {
            const { data: publicUrlData } = supabase.storage.from(BUCKET).getPublicUrl(file.name);
            return {
              name: file.name,
              url: publicUrlData.publicUrl,
              updated_at: file.updated_at ?? null,
            };
          });
        setImages(imgs);
        setBucketErrorMsg("");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      setBucketErrorMsg(`An unexpected error occurred while fetching images: ${errorMessage}`);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    }
    
    setLoading(false);
  }, [checkBucket, setImages, setLoading, setBucketErrorMsg]);

  return {
    fetchImages
  };
}
