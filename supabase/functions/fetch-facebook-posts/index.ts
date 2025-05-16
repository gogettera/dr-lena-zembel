
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Types for Facebook API responses
interface FacebookPosts {
  data: FacebookPost[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
  };
}

interface FacebookPost {
  id: string;
  message?: string;
  created_time: string;
  full_picture?: string;
  permalink_url: string;
  attachments?: {
    data: Array<{
      media_type: string;
      media?: {
        image?: {
          src: string;
        };
        source?: string;
      };
      type: string;
      url: string;
    }>;
  };
  insights?: {
    data: Array<{
      name: string;
      period: string;
      values: Array<{
        value: number;
      }>;
    }>;
  };
}

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Handler for the edge function
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get Facebook access token from Supabase secrets
    const FB_ACCESS_TOKEN = Deno.env.get('FACEBOOK_PAGE_ACCESS_TOKEN');
    if (!FB_ACCESS_TOKEN) {
      return new Response(JSON.stringify({
        error: 'Facebook access token not configured'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Parse request to get options
    let options = {};
    try {
      const requestText = await req.text();
      if (requestText) {
        options = JSON.parse(requestText);
      }
    } catch (e) {
      // Default to empty options if parsing fails
      console.error('Error parsing request body:', e);
    }

    const pageId = options.pageId || 'drzembel'; // Default to your page name
    const limit = options.limit || 5;
    
    console.log(`Fetching up to ${limit} posts from Facebook page: ${pageId}`);
    
    // Build Facebook Graph API URL
    const fields = 'message,created_time,full_picture,permalink_url,attachments{media,media_type,type},insights.metric(post_reactions_by_type_total,post_comments,post_shares)';
    const fbApiUrl = `https://graph.facebook.com/v16.0/${pageId}/posts?fields=${fields}&limit=${limit}&access_token=${FB_ACCESS_TOKEN}`;
    
    // Fetch posts from Facebook
    const response = await fetch(fbApiUrl);
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Facebook API error (${response.status}):`, errorText);
      return new Response(JSON.stringify({
        error: `Failed to fetch from Facebook: ${response.statusText}`,
        details: errorText
      }), {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    const fbPosts: FacebookPosts = await response.json();
    console.log(`Fetched ${fbPosts.data?.length || 0} posts from Facebook`);
    
    // Create Supabase client
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL') as string;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string;
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    
    // Transform Facebook posts to our database format
    const transformedPosts = fbPosts.data.map(post => {
      const videoUrl = post.attachments?.data?.find(a => 
        a.media_type === 'video' && a.media?.source)?.media?.source;
      
      // Calculate engagement metrics
      let likesCount = 0;
      let commentsCount = 0;
      let sharesCount = 0;
      
      if (post.insights?.data) {
        for (const insight of post.insights.data) {
          if (insight.name === 'post_reactions_by_type_total') {
            // Sum all reaction types
            likesCount = insight.values[0]?.value || 0;
          } else if (insight.name === 'post_comments') {
            commentsCount = insight.values[0]?.value || 0;
          } else if (insight.name === 'post_shares') {
            sharesCount = insight.values[0]?.value || 0;
          }
        }
      }
      
      return {
        id: post.id,
        content: post.message || '',
        image_url: post.full_picture || post.attachments?.data?.find(a => 
          a.media_type === 'photo' && a.media?.image)?.media?.image?.src || null,
        video_url: videoUrl || null,
        post_url: post.permalink_url,
        likes_count: likesCount,
        comments_count: commentsCount,
        shares_count: sharesCount,
        platform: 'facebook',
        created_at: post.created_time,
        fetched_at: new Date().toISOString()
      };
    });
    
    console.log(`Storing ${transformedPosts.length} posts in database`);
    
    // Store posts in database - use upsert to avoid duplicates
    const { data: storedPosts, error } = await supabase
      .from('facebook_posts')
      .upsert(transformedPosts, { onConflict: 'id' })
      .select();
      
    if (error) {
      console.error('Error storing posts in database:', error);
      return new Response(JSON.stringify({
        error: 'Failed to store posts in database',
        details: error
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(JSON.stringify({
      success: true,
      message: `Successfully fetched and stored ${transformedPosts.length} posts`,
      posts: transformedPosts
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('Unhandled error in fetch-facebook-posts function:', error);
    return new Response(JSON.stringify({
      error: 'Internal server error',
      message: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
