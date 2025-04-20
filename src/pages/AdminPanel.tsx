import React, { useState } from 'react';
import { Table } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Search } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import TranslationsTable from '@/components/admin/TranslationsTable';
import ContentManager from '@/components/admin/ContentManager';
import LanguageExport from '@/components/admin/LanguageExport';
import SiteSettings from '@/components/admin/SiteSettings';
import VideoManager from '@/components/admin/VideoManager';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";
import { User } from '@supabase/supabase-js';

const AdminPanel = () => {
  const { language } = useLanguage();
  const { toast } = useToast();

  // State for promoting user to admin
  const [promoteEmail, setPromoteEmail] = useState('');
  const [promoteLoading, setPromoteLoading] = useState(false);

  // Function to promote user to admin role
  const handlePromoteAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPromoteLoading(true);

    try {
      // First, we'll get all users and find the one with the matching email
      const { data, error } = await supabase.auth.admin.listUsers();

      if (error) {
        throw error;
      }

      // Find the user with the matching email - properly type the users array
      const users = data?.users as User[] | undefined;
      const user = users?.find(user => user.email === promoteEmail);

      if (!user) {
        toast({
          variant: "destructive",
          title: "User not found",
          description: `No user found with the email "${promoteEmail}".`,
        });
        setPromoteLoading(false);
        return;
      }

      // Upsert user_roles with "admin" role
      const { error: upsertError } = await supabase
        .from('user_roles')
        .upsert([
          { user_id: user.id, role: 'admin' }
        ])
        .select();

      if (upsertError) {
        toast({
          variant: "destructive",
          title: "Promotion failed",
          description: upsertError.message,
        });
      } else {
        toast({
          title: "Success",
          description: `User "${promoteEmail}" has been promoted to admin.`,
        });
        setPromoteEmail('');
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Unexpected error",
        description: err.message || String(err),
      });
    } finally {
      setPromoteLoading(false);
    }
  };

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
