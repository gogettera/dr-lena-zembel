
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  twitter?: string;
  showSocialIcons?: boolean;
}

export function useSocialLinks() {
  const [links, setLinks] = useState<SocialLinks | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchLinks() {
      setLoading(true);
      const { data, error } = await supabase
        .from('site_social')
        .select('*')
        .eq('id', 1)
        .maybeSingle();

      if (error || !data) {
        setLinks(null);
        setLoading(false);
        return;
      }
      setLinks({
        facebook: data.facebook || '',
        instagram: data.instagram || '',
        linkedin: data.linkedin || '',
        youtube: data.youtube || '',
        twitter: data.twitter || '',
        showSocialIcons: typeof data.show_social_icons === 'boolean'
          ? data.show_social_icons
          : true,
      });
      setLoading(false);
    }
    fetchLinks();
  }, []);

  return { links, loading };
}
