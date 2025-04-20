
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from '@/contexts/LanguageContext';
import TranslationsTable from '@/components/admin/TranslationsTable';
import ContentManager from '@/components/admin/ContentManager';
import LanguageExport from '@/components/admin/LanguageExport';
import SiteSettings from '@/components/admin/SiteSettings';
import VideoManager from '@/components/admin/VideoManager';

const AdminPanel = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-dental-navy mb-8">Admin Panel</h1>
        
        <Tabs defaultValue="translations" className="space-y-4">
          <TabsList>
            <TabsTrigger value="translations">Copy Management</TabsTrigger>
            <TabsTrigger value="content">Content Manager</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="export">Website Export</TabsTrigger>
            <TabsTrigger value="settings">Site Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="translations">
            <TranslationsTable />
          </TabsContent>

          <TabsContent value="content">
            <ContentManager />
          </TabsContent>

          <TabsContent value="videos">
            <VideoManager />
          </TabsContent>

          <TabsContent value="export">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Export Website Content</h2>
              <p className="text-gray-600 mb-6">
                Generate a comprehensive PDF export of the entire website, including all text content, 
                images, and structure. Perfect for documentation, offline review, or translation work.
              </p>
              <LanguageExport />
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <SiteSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
