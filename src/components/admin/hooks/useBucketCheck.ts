
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
      // First check if user is authenticated
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) {
        toast({
          title: 'Authentication Required',
          description: 'You need to be logged in to access the image library.',
          variant: 'destructive'
        });
        setBucketExists(false);
        setErrorMsg('Authentication required to access storage. Please log in.');
        setCheckInProgress(false);
        return false;
      }
      
      // Use listBuckets instead of getBucket for more reliable bucket detection
      const { data, error } = await supabase.storage.listBuckets();
      
      if (error) {
        console.error('Error checking buckets:', error);
        setBucketExists(false);
        setErrorMsg(
          `Error accessing storage: ${error.message}. Please ensure Supabase is properly configured.`
        );
        toast({
          title: 'Bucket Error',
          description: `Error accessing storage: ${error.message}`,
          variant: 'destructive'
        });
        setCheckInProgress(false);
        return false;
      }
      
      // Check if our bucket exists in the list of buckets
      const bucketFound = data.some(bucket => bucket.name === BUCKET);
      
      if (!bucketFound) {
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
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Bucket check failed:', errorMessage);
      
      setBucketExists(false);
      setErrorMsg(
        `Error checking bucket "${BUCKET}": ${errorMessage}. Please ensure Supabase is properly configured.`
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
