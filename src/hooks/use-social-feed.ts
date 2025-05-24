
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

export interface SocialPost {
  id: string;
  content: string | null;
  image_url: string | null;
  video_url: string | null;
  post_url: string | null;
  likes_count: number | null;
  comments_count: number | null;
  shares_count: number | null;
  platform: 'facebook' | 'instagram';
  created_at: string | null;
  relative_time?: string;
}

interface UseSocialFeedOptions {
  limit?: number;
  platform?: 'facebook' | 'instagram' | 'all';
  fetchFromApi?: boolean;
  refreshInterval?: number | null;
}

export function useSocialFeed({
  limit = 10,
  platform = 'all',
  fetchFromApi = false,
  refreshInterval = null
}: UseSocialFeedOptions = {}) {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  const formatRelativeTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.round(diffMs / 1000);
    const diffMin = Math.round(diffSec / 60);
    const diffHour = Math.round(diffMin / 60);
    const diffDay = Math.round(diffHour / 24);
    const diffWeek = Math.round(diffDay / 7);
    const diffMonth = Math.round(diffDay / 30);
    const diffYear = Math.round(diffDay / 365);
    
    if (diffSec < 60) return t('social.time.just_now', 'just now');
    if (diffMin < 60) return t('social.time.minutes_ago', { count: diffMin });
    if (diffHour < 24) return t('social.time.hours_ago', { count: diffHour });
    if (diffDay < 7) return t('social.time.days_ago', { count: diffDay });
    if (diffWeek < 4) return t('social.time.weeks_ago', { count: diffWeek });
    if (diffMonth < 12) return t('social.time.months_ago', { count: diffMonth });
    return t('social.time.years_ago', { count: diffYear });
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      // Build query based on platform filter
      let query = supabase
        .from('facebook_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (platform !== 'all') {
        query = query.eq('platform', platform);
      }
      
      const { data, error: fetchError } = await query;
      
      if (fetchError) {
        throw new Error(fetchError.message);
      }
      
      // Format posts with relative time and proper typing
      const formattedPosts: SocialPost[] = (data || []).map(post => ({
        id: post.id,
        content: post.content,
        image_url: post.image_url,
        video_url: post.video_url,
        post_url: post.post_url,
        likes_count: post.likes_count,
        comments_count: post.comments_count,
        shares_count: post.shares_count,
        platform: post.platform as 'facebook' | 'instagram',
        created_at: post.created_at,
        relative_time: post.created_at ? formatRelativeTime(post.created_at) : ''
      }));
      
      setPosts(formattedPosts);
      setError(null);
    } catch (err) {
      console.error('Error fetching social feed:', err);
      setError(err.message);
      toast.error({
        title: t('social.errors.fetch_failed'),
        description: t('social.errors.try_again')
      });
    } finally {
      setLoading(false);
    }
  };
  
  const refreshFromApi = async () => {
    try {
      const response = await supabase.functions.invoke('fetch-facebook-posts', {
        body: JSON.stringify({ limit: 10 })
      });
      
      if (response.error) {
        console.error('Error refreshing posts from Facebook API:', response.error);
        return false;
      }
      
      // After refreshing from API, fetch the latest posts from the database
      await fetchPosts();
      return true;
    } catch (err) {
      console.error('Error invoking fetch-facebook-posts function:', err);
      return false;
    }
  };
  
  // Initial fetch from database
  useEffect(() => {
    fetchPosts();
  }, [platform, limit]);
  
  // Optional API refresh
  useEffect(() => {
    if (fetchFromApi) {
      refreshFromApi();
    }
  }, [fetchFromApi]);
  
  // Set up refresh interval if specified
  useEffect(() => {
    if (!refreshInterval) return;
    
    const intervalId = setInterval(() => {
      fetchPosts();
    }, refreshInterval);
    
    return () => clearInterval(intervalId);
  }, [refreshInterval]);

  return {
    posts,
    loading,
    error,
    refresh: fetchPosts,
    refreshFromApi
  };
}
