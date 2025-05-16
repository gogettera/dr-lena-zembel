
import React, { useState } from 'react';
import { EnhancedCarousel, CarouselItem } from "@/components/ui/enhanced-carousel";
import SocialPost from './social/SocialPost';
import SocialHeader from './social/SocialHeader';
import SocialFeedTabs from './social/SocialFeedTabs';
import SocialFollowButtons from './social/SocialFollowButtons';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSocialFeed } from '@/hooks/use-social-feed';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

const SocialFeedSection = () => {
  const [activeTab, setActiveTab] = useState<"all" | "facebook" | "instagram">("all");
  const { t } = useLanguage();
  
  // Use our custom hook to fetch social posts
  const { posts, loading, error, refresh, refreshFromApi } = useSocialFeed({
    platform: activeTab === 'all' ? 'all' : activeTab,
    limit: 10
  });
  
  // Admin feature to manually refresh the feed
  const isAdmin = false; // In a real app, this would be based on user roles
  
  const handleRefreshFeed = async () => {
    const success = await refreshFromApi();
    if (success) {
      toast.success({
        title: t('social.refresh.success'),
        description: t('social.refresh.updated')
      });
    } else {
      toast.error({
        title: t('social.refresh.failed'),
        description: t('social.refresh.try_again')
      });
    }
  };

  // Fallback to translation file data if no posts and not loading
  const useFallbackData = !loading && (!posts || posts.length === 0);
  
  return (
    <section className="py-24 bg-gradient-to-b from-white to-dental-beige/30">
      <div className="container mx-auto px-4">
        <SocialHeader />
        
        <div className="flex justify-between items-center mb-6">
          <SocialFeedTabs activeTab={activeTab} onTabChange={setActiveTab} />
          
          {isAdmin && (
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1"
              onClick={handleRefreshFeed}
            >
              <RefreshCw size={16} />
              {t('social.actions.refresh')}
            </Button>
          )}
        </div>

        <div className="w-full relative">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dental-navy"></div>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <p className="text-red-500">{t('social.errors.load_failed')}</p>
              <Button onClick={refresh} className="mt-4">
                {t('social.actions.try_again')}
              </Button>
            </div>
          ) : (
            <EnhancedCarousel className="w-full max-w-5xl mx-auto">
              {posts && posts.length > 0 ? (
                posts.map((post) => (
                  <CarouselItem key={post.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <SocialPost post={post} />
                    </div>
                  </CarouselItem>
                ))
              ) : useFallbackData ? (
                // Fallback to translations data if no database posts available yet
                Array.isArray(t('social.posts', { returnObjects: true })) ? 
                  t('social.posts', { returnObjects: true }).map((post) => (
                    <CarouselItem key={post.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                      <div className="p-1">
                        <SocialPost post={post} />
                      </div>
                    </CarouselItem>
                  ))
                : (
                  <CarouselItem className="pl-2 md:pl-4 basis-full">
                    <div className="p-4 text-center text-gray-500">
                      {t('social.noPosts', 'No posts available')}
                    </div>
                  </CarouselItem>
                )
              ) : (
                <CarouselItem className="pl-2 md:pl-4 basis-full">
                  <div className="p-4 text-center text-gray-500">
                    {t('social.noPosts', 'No posts available')}
                  </div>
                </CarouselItem>
              )}
            </EnhancedCarousel>
          )}
        </div>

        <SocialFollowButtons />
      </div>
    </section>
  );
};

export default SocialFeedSection;
