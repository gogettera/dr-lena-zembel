
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Facebook, Heart, MessageCircle, Share, Instagram } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import SocialShareButtons from '../SocialShareButtons';

interface SocialPostProps {
  post: {
    id: number;
    content: string;
    image: string;
    likes: number;
    comments: number;
    shares: number;
    date: string;
    platform: "facebook" | "instagram";
  }
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

  return (
    <Card className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={post.image}
            alt="תמונת פוסט"
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 right-4">
            <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full">
              {platformIcon}
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <p className="text-dental-navy mb-4 line-clamp-3">{post.content}</p>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>{post.comments}</span>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={toggleSharing} 
                  className="flex items-center gap-1 hover:text-dental-orange transition-colors"
                  aria-label={t('sharePost')}
                >
                  <Share className="w-4 h-4" />
                  <span>{post.shares}</span>
                </button>
              </div>
            </div>
            <span className="text-xs">{post.date}</span>
          </div>
          
          {isSharing && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <SocialShareButtons 
                url={`${window.location.origin}/${post.platform}/${post.id}`}
                title={post.content}
                description={t('checkOutPost')}
                compact={true}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialPost;
