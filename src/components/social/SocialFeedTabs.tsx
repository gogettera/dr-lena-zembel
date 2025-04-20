
import React from 'react';
import { Facebook, Instagram } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

type TabType = "all" | "facebook" | "instagram";

interface SocialFeedTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const SocialFeedTabs = ({ activeTab, onTabChange }: SocialFeedTabsProps) => {
  const { t } = useLanguage();
  
  const tabs = [
    { id: 'all', label: 'הכל', icon: null },
    { id: 'facebook', label: 'Facebook', icon: <Facebook className="w-4 h-4 text-[#1877F2]" /> },
    { id: 'instagram', label: 'Instagram', icon: <Instagram className="w-4 h-4 text-[#E1306C]" /> }
  ] as const;

  return (
    <div className="flex justify-center mb-8">
      <div className="inline-flex bg-white rounded-full p-1 shadow-md">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "px-4 py-2 rounded-full flex items-center gap-2 transition-colors",
              activeTab === tab.id
                ? "bg-dental-orange text-white"
                : "text-gray-600 hover:text-dental-navy"
            )}
            aria-label={`Show ${tab.label} posts`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SocialFeedTabs;
