
import React, { useState, useEffect } from 'react';
import { EnhancedCarousel, CarouselItem } from "@/components/ui/enhanced-carousel";
import SocialPost from './social/SocialPost';
import SocialHeader from './social/SocialHeader';
import SocialFeedTabs from './social/SocialFeedTabs';
import SocialFollowButtons from './social/SocialFollowButtons';
import { useLanguage } from '@/contexts/LanguageContext';

// Define the post type to match SocialPost requirements
interface SocialPostType {
  id: number;
  content: string;
  image: string;
  likes: number;
  comments: number;
  shares: number;
  date: string;
  platform: "facebook" | "instagram";
}

const SocialFeedSection = () => {
  const [activeTab, setActiveTab] = useState<"all" | "facebook" | "instagram">("all");
  const { t } = useLanguage();
  const [posts, setPosts] = useState<SocialPostType[]>([]);
  
  // Get posts from translations with proper typing and error handling
  useEffect(() => {
    // Ensure we're using the correct options format with returnObjects set to true
    const translatedPosts = t('social.posts', { returnObjects: true });
    
    // Make sure translatedPosts is an array before setting it
    if (Array.isArray(translatedPosts)) {
      setPosts(translatedPosts);
    } else {
      console.error('Expected social.posts to be an array, got:', translatedPosts);
      // Fallback to empty array if translation doesn't return array
      setPosts([]);
    }
  }, [t]);
  
  // Filter posts based on active tab
  const filteredPosts = activeTab === "all" 
    ? posts 
    : posts.filter(post => post.platform === activeTab);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-dental-beige/30">
      <div className="container mx-auto px-4">
        <SocialHeader />
        <SocialFeedTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="w-full relative">
          <EnhancedCarousel className="w-full max-w-5xl mx-auto">
            {Array.isArray(filteredPosts) && filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <CarouselItem key={post.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <SocialPost post={post} />
                  </div>
                </CarouselItem>
              ))
            ) : (
              <CarouselItem className="pl-2 md:pl-4 basis-full">
                <div className="p-4 text-center text-gray-500">
                  {t('social.noPosts', 'No posts available')}
                </div>
              </CarouselItem>
            )}
          </EnhancedCarousel>
        </div>

        <SocialFollowButtons />
      </div>
    </section>
  );
};

export default SocialFeedSection;
