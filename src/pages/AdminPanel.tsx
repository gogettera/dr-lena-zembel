
import React from 'react';
import { Table } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Search } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import TranslationsTable from '@/components/admin/TranslationsTable';
import ContentManager from '@/components/admin/ContentManager';
import LanguageExport from '@/components/admin/LanguageExport';

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
            <TabsTrigger value="export">Website Export</TabsTrigger>
          </TabsList>

          <TabsContent value="translations" className="space-y-4">
            <TranslationsTable />
          </TabsContent>

          <TabsContent value="content">
            <ContentManager />
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
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
