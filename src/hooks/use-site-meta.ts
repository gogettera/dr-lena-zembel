
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
  canonical_url: string | null;
  google_analytics_id: string | null;
  facebook_pixel_id: string | null;
}

export const useSiteMeta = () => {
  const [meta, setMeta] = useState<SiteMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const fetchMeta = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('site_meta')
        .select('*')
        .eq('id', 1)
        .maybeSingle();

      if (fetchError) throw fetchError;

      setMeta(data as SiteMeta);
    } catch (err) {
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

      // If we have a blob URL, we need to replace it with something else or null
      // as blob URLs are temporary and won't survive page reloads
      const og_image_url = newMeta.og_image_url && newMeta.og_image_url.startsWith('blob:') 
        ? null  // Don't store blob URLs in the database
        : newMeta.og_image_url;

      const updates = {
        id: 1,
        title: newMeta.title,
        description: newMeta.description,
        og_title: newMeta.og_title,
        og_description: newMeta.og_description,
        og_image_url,
        twitter_title: newMeta.twitter_title,
        twitter_description: newMeta.twitter_description,
        twitter_card: newMeta.twitter_card,
        favicon_url: newMeta.favicon_url,
        updated_at: new Date().toISOString(),
        canonical_url: newMeta.canonical_url,
        google_analytics_id: newMeta.google_analytics_id,
        facebook_pixel_id: newMeta.facebook_pixel_id,
      };

      const { error: updateError } = await supabase
        .rpc('admin_update_site_meta', { 
          meta_data: updates
        });

      if (updateError) {
        throw updateError;
      }

      setMeta(prevMeta => ({ ...prevMeta, ...updates } as SiteMeta));

      toast({
        title: 'Meta updated',
        description: 'Site meta information has been updated successfully',
      });

      await fetchMeta();

      return true;
    } catch (err) {
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
