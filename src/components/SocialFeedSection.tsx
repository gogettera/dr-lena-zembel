import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Facebook, Heart, MessageSquare, Share } from 'lucide-react';
import { EnhancedCarousel, CarouselItem } from "@/components/ui/enhanced-carousel";
import { useLanguage } from '@/contexts/LanguageContext';

// Default posts as fallback
const defaultPosts = [
  {
    id: 1,
    content: "מטופל חדש סיים היום טיפול והתוצאות מדהימות! תודה על האמון 😊",
    image: "/lovable-uploads/64779606-c19d-42d7-b1a4-48f853db3d43.jpg",
    likes: 45,
    comments: 12,
    shares: 3,
    date: "לפני שעתיים"
  },
  {
    id: 2,
    content: "טיפול שיניים לילדים בסביבה נעימה ומרגיעה. אצלנו כל ילד מקבל יחס אישי ואוהב ❤️",
    image: "/lovable-uploads/e1744c6a-ff5f-4782-9828-6ede63335c7e.jpg",
    likes: 38,
    comments: 8,
    shares: 2,
    date: "לפני יומיים"
  },
  {
    id: 3,
    content: "שמחים לבשר על הגעת הציוד החדש למרפאה! טכנולוגיה מתקדמת לטיפול מיטבי 🦷",
    image: "/lovable-uploads/11fa7c9b-39fc-4d60-b09b-13f0578ebffe.png",
    likes: 62,
    comments: 15,
    shares: 7,
    date: "לפני 3 ימים"
  }
];

const SocialPost = ({ post }: { post: any }) => {
  return (
    <Card className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={post.image}
            alt="תמונת פוסט פייסבוק"
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 right-4">
            <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full">
              <Facebook className="w-5 h-5 text-[#1877F2]" />
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
                <MessageSquare className="w-4 h-4" />
                <span>{post.comments}</span>
              </div>
              <div className="flex items-center gap-1">
                <Share className="w-4 h-4" />
                <span>{post.shares}</span>
              </div>
            </div>
            <span className="text-xs">{post.date}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const SocialFeedSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-gradient-to-b from-white to-dental-beige/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dental-navy mb-4 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
            {t('socialUpdates')}
          </h2>
          <p className="text-lg text-dental-navy/80 opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards]">
            {t('followUs')}
          </p>
          <div className="w-24 h-1 bg-dental-orange mx-auto mt-6 rounded-full opacity-0 animate-[fade-in_0.5s_ease-out_0.5s_forwards]"></div>
        </div>

        <div className="w-full relative">
          <EnhancedCarousel className="w-full max-w-5xl mx-auto">
            {defaultPosts.map((post) => (
              <CarouselItem key={post.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <SocialPost post={post} />
                </div>
              </CarouselItem>
            ))}
          </EnhancedCarousel>
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg" 
            className="rounded-full border-dental-navy text-dental-navy hover:bg-dental-navy hover:text-white transition-colors duration-300"
          >
            <Facebook className="mr-2 h-5 w-5" />
            {t('followOnFacebook')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SocialFeedSection;
