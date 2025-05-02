
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Facebook, Instagram } from 'lucide-react';

interface SocialFeedTabsProps {
  activeTab: "all" | "facebook" | "instagram";
  onTabChange: (tab: "all" | "facebook" | "instagram") => void;
}

const SocialFeedTabs: React.FC<SocialFeedTabsProps> = ({ activeTab, onTabChange }) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex justify-center mb-6">
      <div className="flex gap-2 rounded-full border border-dental-beige/40 p-1 bg-white/70">
        <button 
          className={cn(
            "px-4 py-2 rounded-full transition-colors",
            activeTab === "all" ? "bg-dental-navy text-white" : "hover:bg-dental-beige/30"
          )}
          onClick={() => onTabChange("all")}
        >
          {t('social.tabs.all', 'הכל')}
        </button>
        <button 
          className={cn(
            "px-4 py-2 rounded-full flex items-center transition-colors gap-2",
            activeTab === "facebook" ? "bg-[#1877F2] text-white" : "hover:bg-dental-beige/30"
          )}
          onClick={() => onTabChange("facebook")}
        >
          <Facebook size={18} />
          {t('social.tabs.facebook', 'פייסבוק')}
        </button>
        <button 
          className={cn(
            "px-4 py-2 rounded-full flex items-center transition-colors gap-2",
            activeTab === "instagram" ? "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white" : "hover:bg-dental-beige/30"
          )}
          onClick={() => onTabChange("instagram")}
        >
          <Instagram size={18} />
          {t('social.tabs.instagram', 'אינסטגרם')}
        </button>
      </div>
    </div>
  );
};

export default SocialFeedTabs;
