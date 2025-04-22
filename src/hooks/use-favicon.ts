
import { useState, useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useFavicon = () => {
  const [currentMeta, setCurrentMeta] = useState<any>(null);
  const [isFetching, setIsFetching] = useState(true);
  const { toast } = useToast();

  const fetchFavicon = useCallback(async () => {
    try {
      setIsFetching(true);
      const { data, error } = await supabase
        .from('site_meta')
        .select('*')
        .eq('id', 1)
        .maybeSingle();
      
      if (error) throw error;
      
      setCurrentMeta(data);
      return data?.favicon_url || '';
    } catch (error) {
      console.error('Error fetching favicon:', error);
      toast({
        title: "Failed to load current favicon",
        description: "Couldn't retrieve the current favicon setting.",
        variant: "destructive",
      });
      return '';
    } finally {
      setIsFetching(false);
    }
  }, [toast]);

  const updateFavicon = async (faviconUrl: string) => {
    if (!currentMeta) return false;
    
    try {
      const { error } = await supabase
        .from('site_meta')
        .upsert({ 
          id: 1, 
          favicon_url: faviconUrl,
          updated_at: new Date().toISOString(),
          // Preserve existing meta fields
          title: currentMeta.title,
          description: currentMeta.description,
          og_title: currentMeta.og_title,
          og_description: currentMeta.og_description,
          og_image_url: currentMeta.og_image_url,
          twitter_title: currentMeta.twitter_title,
          twitter_description: currentMeta.twitter_description,
          twitter_card: currentMeta.twitter_card
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating favicon:', error);
      return false;
    }
  };

  return {
    currentMeta,
    isFetching,
    fetchFavicon,
    updateFavicon
  };
};
