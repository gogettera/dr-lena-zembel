
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

const BUCKET = 'site-images';

export function useBucketCheck() {
  const [bucketExists, setBucketExists] = useState(true);
  const [checkInProgress, setCheckInProgress] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const checkBucket = useCallback(async () => {
    setCheckInProgress(true);
    try {
      const { data, error } = await supabase.storage.getBucket(BUCKET);
      
      if (error || !data) {
        setBucketExists(false);
        setErrorMsg(
          `Storage bucket "${BUCKET}" not found. Please ensure it exists in your Supabase project.`
        );
        toast({
          title: 'Bucket Error',
          description: `Storage bucket "${BUCKET}" not found.`,
          variant: 'destructive'
        });
        setCheckInProgress(false);
        return false;
      }
      
      setBucketExists(true);
      setErrorMsg('');
      setCheckInProgress(false);
      return true;
    } catch (error) {
      setBucketExists(false);
      setErrorMsg(
        `Error checking bucket "${BUCKET}". Please ensure Supabase is properly configured.`
      );
      toast({
        title: 'Bucket Check Failed',
        description: 'Unable to verify storage bucket.',
        variant: 'destructive'
      });
      setCheckInProgress(false);
      return false;
    }
  }, []);

  const handleRetry = async () => {
    setErrorMsg('');
    setBucketExists(true);
    setCheckInProgress(true);
    await checkBucket();
    setCheckInProgress(false);
  };

  const handleCreateBucket = () => {
    setErrorMsg(
      "Creating a storage bucket requires administrator access to your Supabase project. Please create a bucket named 'site-images' in the Supabase dashboard."
    );
    toast({
      title: 'Action required',
      description: "Please create a 'site-images' bucket in your Supabase dashboard",
      variant: 'default'
    });
  };

  return {
    bucketExists,
    checkInProgress,
    errorMsg,
    checkBucket,
    handleRetry,
    handleCreateBucket
  };
}
