
import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const BUCKET = "site-images";

export function useBucketCheckActions() {
  const [bucketExists, setBucketExists] = useState(true);
  const [checkInProgress, setCheckInProgress] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const checkBucket = useCallback(async () => {
    setCheckInProgress(true);
    try {
      const { data, error } = await supabase.storage.getBucket(BUCKET);
      if (error || !data) {
        setBucketExists(false);
        setErrorMsg(
          `Storage bucket "${BUCKET}" not found. Please ensure it exists in your Supabase project.`
        );
        setCheckInProgress(false);
        return false;
      }
      setBucketExists(true);
      setErrorMsg("");
      setCheckInProgress(false);
      return true;
    } catch {
      setBucketExists(false);
      setErrorMsg(
        `Error checking bucket "${BUCKET}". Please ensure Supabase is properly configured.`
      );
      setCheckInProgress(false);
      return false;
    }
  }, []);

  const handleRetry = async (fetchImages?: () => Promise<void>) => {
    setErrorMsg("");
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
    setErrorMsg(
      "Creating a storage bucket requires administrator access to your Supabase project. Please create a bucket named 'site-images' in the Supabase dashboard."
    );
    toast({
      title: "Action required",
      description: "Please create a 'site-images' bucket in your Supabase dashboard",
      variant: "default"
    });
  };

  return {
    bucketExists,
    checkInProgress,
    errorMsg,
    setBucketExists,
    setCheckInProgress,
    setErrorMsg,
    checkBucket,
    handleRetry,
    handleCreateBucket,
  };
}
