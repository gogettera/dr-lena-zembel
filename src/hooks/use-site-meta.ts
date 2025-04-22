
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
}

export const useSiteMeta = () => {
  const [meta, setMeta] = useState<SiteMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const fetchMeta = async () => {
    try {
      setLoading(true);
      console.log('[Meta] Fetching site meta...');
      
      const { data, error: fetchError } = await supabase
        .from('site_meta')
        .select('*')
        .eq('id', 1)
        .maybeSingle();

      if (fetchError) throw fetchError;
      
      console.log('[Meta] Fetched data from DB:', data);
      setMeta(data as SiteMeta);
      
    } catch (err) {
      console.error('[Meta] Error fetching site meta:', err);
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
      console.log('[Meta] Updating site meta with:', newMeta);
      
      const updates = {
        id: 1,
        title: newMeta.title,
        description: newMeta.description,
        og_title: newMeta.og_title,
        og_description: newMeta.og_description,
        og_image_url: newMeta.og_image_url,
        twitter_title: newMeta.twitter_title,
        twitter_description: newMeta.twitter_description,
        twitter_card: newMeta.twitter_card,
        favicon_url: newMeta.favicon_url,
        updated_at: new Date().toISOString(),
        canonical_url: newMeta.canonical_url,
      };
      
      const { error: updateError } = await supabase
        .rpc('admin_update_site_meta', { 
          meta_data: updates
        });

      if (updateError) {
        console.error('[Meta] Supabase update error:', updateError);
        throw updateError;
      }
      
      setMeta(prevMeta => ({ ...prevMeta, ...updates } as SiteMeta));
      
      toast({
        title: 'Meta updated',
        description: 'Site meta information has been updated successfully',
      });
      
      await fetchMeta();
      console.log('[Meta] DB update confirmed. Latest meta:', updates);

      return true;
    } catch (err) {
      console.error('[Meta] Error updating site meta:', err);
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
