
import { useState, useCallback, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { updateFavicon as updateDocumentFavicon } from "@/utils/meta-utils";

export const useFavicon = () => {
  const [currentMeta, setCurrentMeta] = useState<any>(null);
  const [isFetching, setIsFetching] = useState(true);
  const { toast } = useToast();
  const defaultFaviconUrl = '/lovable-uploads/f0d36601-8f51-4bd6-9ce4-071cd62aa140.png';

  const fetchFavicon = useCallback(async () => {
    try {
      setIsFetching(true);
      console.log('Fetching favicon metadata...');
      
      const { data, error } = await supabase
        .from('site_meta')
        .select('*')
        .eq('id', 1)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching favicon metadata:', error);
        throw error;
      }
      
      console.log('Favicon metadata fetched:', data);
      setCurrentMeta(data);
      
      // If no favicon is set, use the default one
      const faviconUrl = data?.favicon_url || defaultFaviconUrl;
      
      // Apply the favicon to the document
      if (faviconUrl) {
        updateDocumentFavicon(faviconUrl);
      }
      
      return faviconUrl;
    } catch (error) {
      console.error('Error fetching favicon:', error);
      toast({
        title: "Failed to load current favicon",
        description: "Couldn't retrieve the current favicon setting.",
        variant: "destructive",
      });
      return defaultFaviconUrl;
    } finally {
      setIsFetching(false);
    }
  }, [toast, defaultFaviconUrl]);

  // Apply default favicon on first load if none exists
  useEffect(() => {
    if (!currentMeta || !currentMeta.favicon_url) {
      updateDocumentFavicon(defaultFaviconUrl);
    }
  }, [currentMeta, defaultFaviconUrl]);

  const updateFavicon = async (file: File): Promise<{success: boolean, url: string}> => {
    if (!currentMeta) {
      console.error('Cannot update favicon: current metadata not loaded');
      toast({
        title: "Error",
        description: "Could not update favicon. Try refreshing the page.",
        variant: "destructive",
      });
      return { success: false, url: '' };
    }
    
    try {
      console.log('Uploading favicon file:', file.name);
      
      // Generate a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `favicon-${Date.now()}.${fileExt}`;
      const filePath = `site-assets/${fileName}`;
      
      // Upload the file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('site-assets')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });
      
      if (uploadError) {
        console.error('Error uploading favicon:', uploadError);
        throw uploadError;
      }
      
      console.log('Favicon uploaded successfully:', uploadData);
      
      // Get public URL for the uploaded file
      const { data: publicUrlData } = supabase.storage
        .from('site-assets')
        .getPublicUrl(filePath);
      
      const faviconUrl = publicUrlData.publicUrl;
      console.log('Favicon public URL:', faviconUrl);
      
      // Update the favicon URL in the database
      const { error: updateError } = await supabase
        .from('site_meta')
        .update({ 
          favicon_url: faviconUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', 1);

      if (updateError) {
        console.error('Error updating favicon metadata:', updateError);
        throw updateError;
      }
      
      console.log('Favicon metadata updated successfully');
      
      // Apply the favicon to the document
      updateDocumentFavicon(faviconUrl);
      
      // Update local state
      setCurrentMeta({
        ...currentMeta,
        favicon_url: faviconUrl
      });
      
      return { success: true, url: faviconUrl };
    } catch (error) {
      console.error('Error updating favicon:', error);
      toast({
        title: "Error updating favicon",
        description: "There was a problem saving your favicon. Please try again.",
        variant: "destructive",
      });
      return { success: false, url: '' };
    }
  };

  return {
    currentMeta,
    isFetching,
    fetchFavicon,
    updateFavicon
  };
};
