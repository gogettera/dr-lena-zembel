
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useBucketCheck } from './useBucketCheck';
import { toast } from '@/components/ui/use-toast';

export type Img = {
  name: string;
  url: string;
  updated_at: string | null;
};

const BUCKET = 'site-images';

export function useImageLibrary() {
  const [images, setImages] = useState<Img[]>([]);
  const [loading, setLoading] = useState(true);
  const { bucketExists, checkBucket } = useBucketCheck();

  const fetchImages = useCallback(async () => {
    setLoading(true);
    const bucketOk = await checkBucket();
    
    if (!bucketOk) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .storage
        .from(BUCKET)
        .list('', { 
          limit: 200, 
          offset: 0, 
          sortBy: { column: 'updated_at', order: 'desc' } 
        });

      if (error) {
        setImages([]);
        toast({
          title: 'Fetch Failed',
          description: `Could not fetch images: ${error.message}`,
          variant: 'destructive'
        });
      } else if (data) {
        const imgs: Img[] = data
          .filter(file => file && !file.name.endsWith('/'))
          .map(file => {
            const { data: publicUrlData } = supabase.storage.from(BUCKET).getPublicUrl(file.name);
            return {
              name: file.name,
              url: publicUrlData.publicUrl,
              updated_at: file.updated_at ?? null,
            };
          });
        
        setImages(imgs);
      }
    } catch {
      toast({
        title: 'Fetch Failed',
        description: 'An unexpected error occurred while fetching images',
        variant: 'destructive'
      });
    }
    
    setLoading(false);
  }, [checkBucket]);

  const handleDelete = useCallback(async (name: string) => {
    setLoading(true);
    
    try {
      const { error } = await supabase.storage
        .from(BUCKET)
        .remove([name]);
      
      if (error) {
        toast({ 
          title: 'Failed to delete', 
          description: error.message, 
          variant: 'destructive' 
        });
      } else {
        toast({ title: 'Image deleted' });
        fetchImages();
      }
    } catch {
      toast({
        title: 'Delete failed',
        description: 'An unexpected error occurred',
        variant: 'destructive'
      });
    }
    
    setLoading(false);
  }, [fetchImages]);

  return {
    images,
    loading,
    bucketExists,
    fetchImages,
    handleDelete
  };
}
