
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SiteMeta {
  title: string;
  description: string;
  og_title: string;
  og_description: string;
  og_image_url: string | null;
  twitter_title: string | null;
  twitter_description: string | null;
  twitter_card: string;
  favicon_url: string | null;
  updated_at: string | null;
}

export const useSiteMeta = () => {
  const [meta, setMeta] = useState<SiteMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const fetchMeta = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('site_meta')
        .select('*')
        .eq('id', 1)
        .maybeSingle();

      if (error) throw error;
      
      setMeta(data as SiteMeta);
    } catch (err) {
      console.error('Error fetching site meta:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch site metadata'));
      
      toast({
        title: 'Error fetching site meta',
        description: 'Could not load site meta information',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateMeta = async (newMeta: Partial<SiteMeta>) => {
    try {
      setLoading(true);
      
      // Ensure we have the current meta data before updating
      if (!meta) {
        await fetchMeta();
        if (!meta) throw new Error('No metadata available to update');
      }
      
      const updates = {
        // Include all required fields from existing meta
        title: newMeta.title ?? meta!.title,
        description: newMeta.description ?? meta!.description,
        og_title: newMeta.og_title ?? meta!.og_title,
        og_description: newMeta.og_description ?? meta!.og_description,
        // Include optional fields
        og_image_url: newMeta.og_image_url !== undefined ? newMeta.og_image_url : meta!.og_image_url,
        twitter_title: newMeta.twitter_title !== undefined ? newMeta.twitter_title : meta!.twitter_title,
        twitter_description: newMeta.twitter_description !== undefined ? newMeta.twitter_description : meta!.twitter_description,
        twitter_card: newMeta.twitter_card ?? meta!.twitter_card,
        favicon_url: newMeta.favicon_url !== undefined ? newMeta.favicon_url : meta!.favicon_url,
        updated_at: new Date().toISOString(),
      };
      
      const { error } = await supabase
        .from('site_meta')
        .upsert({ id: 1, ...updates }, { onConflict: 'id' });

      if (error) throw error;
      
      // Refresh meta data
      await fetchMeta();
      
      toast({
        title: 'Meta updated',
        description: 'Site meta information has been updated successfully',
      });
      
      return true;
    } catch (err) {
      console.error('Error updating site meta:', err);
      setError(err instanceof Error ? err : new Error('Failed to update site metadata'));
      
      toast({
        title: 'Error updating site meta',
        description: 'Could not update site meta information',
        variant: 'destructive',
      });
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchMeta();
  }, []);

  return {
    meta,
    loading,
    error,
    fetchMeta,
    updateMeta,
  };
};
