
import React, { useState } from 'react';
import { EnhancedCarousel, CarouselItem } from "@/components/ui/enhanced-carousel";
import SocialPost from './social/SocialPost';
import SocialHeader from './social/SocialHeader';
import SocialFeedTabs from './social/SocialFeedTabs';
import SocialFollowButtons from './social/SocialFollowButtons';

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

// Default posts as fallback
const defaultPosts: SocialPostType[] = [
  {
    id: 1,
    content: "מטופל חדש סיים היום טיפול והתוצאות מדהימות! תודה על האמון 😊",
    image: "/lovable-uploads/64779606-c19d-42d7-b1a4-48f853db3d43.jpg",
    likes: 45,
    comments: 12,
    shares: 3,
    date: "לפני שעתיים",
    platform: "facebook"
  },
  {
    id: 2,
    content: "טיפול שיניים לילדים בסביבה נעימה ומרגיעה. אצלנו כל ילד מקבל יחס אישי ואוהב ❤️",
    image: "/lovable-uploads/e1744c6a-ff5f-4782-9828-6ede63335c7e.jpg",
    likes: 38,
    comments: 8,
    shares: 2,
    date: "לפני יומיים",
    platform: "instagram"
  },
  {
    id: 3,
    content: "שמחים לבשר על הגעת הציוד החדש למרפאה! טכנולוגיה מתקדמת לטיפול מיטבי 🦷",
    image: "/lovable-uploads/11fa7c9b-39fc-4d60-b09b-13f0578ebffe.png",
    likes: 62,
    comments: 15,
    shares: 7,
    date: "לפני 3 ימים",
    platform: "facebook"
  },
  {
    id: 4,
    content: "ד\"ר לנה בכנס השנתי של רופאי השיניים. תמיד מתעדכנים בחידושים האחרונים בתחום! 👩‍⚕️",
    image: "/lovable-uploads/c4b49e3b-cd26-4669-b6f6-6f3750db21fa.jpg",
    likes: 53,
    comments: 7,
    shares: 4,
    date: "לפני שבוע",
    platform: "instagram"
  }
];

const SocialFeedSection = () => {
  const [activeTab, setActiveTab] = useState<"all" | "facebook" | "instagram">("all");
  
  const filteredPosts = activeTab === "all" 
    ? defaultPosts 
    : defaultPosts.filter(post => post.platform === activeTab);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-dental-beige/30">
      <div className="container mx-auto px-4">
        <SocialHeader />
        <SocialFeedTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="w-full relative">
          <EnhancedCarousel className="w-full max-w-5xl mx-auto">
            {filteredPosts.map((post) => (
              <CarouselItem key={post.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <SocialPost post={post} />
                </div>
              </CarouselItem>
            ))}
          </EnhancedCarousel>
        </div>

        <SocialFollowButtons />
      </div>
    </section>
  );
};

export default SocialFeedSection;
