
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SocialFeedTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const SocialFeedTabs = ({ activeTab, onTabChange }: SocialFeedTabsProps) => {
  return (
    <div className="max-w-5xl mx-auto mb-8">
      <Tabs defaultValue={activeTab} className="w-full" onValueChange={onTabChange}>
        <div className="flex justify-center">
          <TabsList>
            <TabsTrigger value="all">All Posts</TabsTrigger>
            <TabsTrigger value="facebook">Facebook</TabsTrigger>
            <TabsTrigger value="instagram">Instagram</TabsTrigger>
          </TabsList>
        </div>
      </Tabs>
    </div>
  );
};

export default SocialFeedTabs;

