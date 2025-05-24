
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Facebook, Heart, MessageCircle, Share, Instagram, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import SocialShareButtons from '../SocialShareButtons';
import { type SocialPost as SocialPostType } from '@/hooks/use-social-feed';

interface SocialPostProps {
  post: SocialPostType;
}

const SocialPost = ({ post }: SocialPostProps) => {
  const [isSharing, setIsSharing] = useState(false);
  const { t } = useLanguage();

  const toggleSharing = () => {
    setIsSharing(!isSharing);
  };

  const platformIcon = post.platform === "instagram" ? 
    <Instagram className="w-5 h-5 text-[#E1306C]" /> : 
    <Facebook className="w-5 h-5 text-[#1877F2]" />;
    
  const handleViewOriginal = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (post.post_url) {
      window.open(post.post_url, '_blank', 'noopener,noreferrer');
    }
  };
  
  // Format the post date for display - use relative_time if available
  const displayDate = post.relative_time || '';

  return (
    <Card className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
      <CardContent className="p-0 flex flex-col h-full">
        <div className="relative">
          {post.image_url ? (
            <img
              src={post.image_url}
              alt={t('social.post.image_alt', { context: { content: (post.content || '').substring(0, 30) } })}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
          ) : post.video_url ? (
            <div className="w-full h-48 bg-black flex items-center justify-center">
              <video 
                src={post.video_url} 
                controls 
                poster="/lovable-uploads/64779606-c19d-42d7-b1a4-48f853db3d43.jpg"
                className="w-full h-full object-contain" 
              />
            </div>
          ) : (
            <div className="w-full h-24 bg-dental-beige/30 flex items-center justify-center">
              {platformIcon}
            </div>
          )}
          
          <div className="absolute top-4 right-4">
            <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full">
              {platformIcon}
            </div>
          </div>
        </div>
        
        <div className="p-6 flex-grow flex flex-col">
          <p className="text-dental-navy mb-4 line-clamp-3 flex-grow">{post.content || ''}</p>
          
          <div className="mt-auto">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex gap-3">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{post.likes_count || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.comments_count || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={toggleSharing} 
                    className="flex items-center gap-1 hover:text-dental-orange transition-colors"
                    aria-label={t('social.actions.share')}
                  >
                    <Share className="w-4 h-4" />
                    <span>{post.shares_count || 0}</span>
                  </button>
                </div>
              </div>
              <span className="text-xs">{displayDate}</span>
            </div>
            
            {post.post_url && (
              <button 
                onClick={handleViewOriginal}
                className="mt-3 text-xs flex items-center gap-1 text-dental-navy/70 hover:text-dental-navy transition-colors"
              >
                <ExternalLink size={12} />
                {t('social.actions.view_original')}
              </button>
            )}
            
            {isSharing && post.post_url && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <SocialShareButtons 
                  url={post.post_url}
                  title={(post.content || '').substring(0, 50) + '...'}
                  description={t('social.share.check_out_post')}
                  compact={true}
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialPost;
