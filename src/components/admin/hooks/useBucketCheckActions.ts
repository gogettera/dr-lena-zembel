
import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const BUCKET = "site-images";

export function useBucketCheckActions(sharedState: ReturnType<typeof import('./useImageLibraryState').useImageLibraryState>) {
  const {
    setBucketExists,
    setCheckInProgress,
    setBucketErrorMsg
  } = sharedState;

  const checkBucket = useCallback(async () => {
    setCheckInProgress(true);
    try {
      // First check if user is authenticated
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        setBucketExists(false);
        setBucketErrorMsg('Authentication required to access storage.');
        setCheckInProgress(false);
        return false;
      }
      
      const { data, error } = await supabase.storage.getBucket(BUCKET);
      if (error || !data) {
        setBucketExists(false);
        setBucketErrorMsg(
          `Storage bucket "${BUCKET}" not found. Please ensure it exists in your Supabase project.`
        );
        setCheckInProgress(false);
        return false;
      }
      setBucketExists(true);
      setBucketErrorMsg("");
      setCheckInProgress(false);
      return true;
    } catch (error) {
      setBucketExists(false);
      setBucketErrorMsg(
        `Error checking bucket "${BUCKET}". Please ensure Supabase is properly configured.`
      );
      setCheckInProgress(false);
      return false;
    }
  }, [setBucketExists, setCheckInProgress, setBucketErrorMsg]);

  const handleRetry = async (fetchImages?: () => Promise<void>) => {
    setBucketErrorMsg("");
    setBucketExists(true);
    setCheckInProgress(true);
    if (fetchImages) {
      await fetchImages();
    } else {
      await checkBucket();
    }
    setCheckInProgress(false);
  };

  const handleCreateBucket = () => {
    setBucketErrorMsg(
      "Creating a storage bucket requires administrator access to your Supabase project. Please create a bucket named 'site-images' in the Supabase dashboard."
    );
    toast({
      title: "Action required",
      description: "Please create a 'site-images' bucket in your Supabase dashboard",
      variant: "default"
    });
  };

  return {
    checkBucket,
    handleRetry,
    handleCreateBucket,
  };
}
