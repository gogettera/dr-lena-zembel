
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
      
      const updates = {
        ...newMeta,
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
