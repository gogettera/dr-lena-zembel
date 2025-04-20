
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
      // 1. Find user by email in Supabase Auth
      const { data: users, error: userError } = await supabase.auth.admin.listUsers({
        email: promoteEmail,
        limit: 1,
      });

      if (userError || !users || users.users.length === 0) {
        toast({
          variant: "destructive",
          title: "User not found",
          description: `No user found with the email "${promoteEmail}".`,
        });
        setPromoteLoading(false);
        return;
      }

      const userId = users.users[0].id;

      // 2. Upsert user_roles with "admin" role
      const { error: upsertError } = await supabase
        .from('user_roles')
        .upsert([
          { user_id: userId, role: 'admin' }
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
            <TabsTrigger value="user-management">User Management</TabsTrigger>
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

          <TabsContent value="user-management">
            <div className="bg-white p-6 rounded-lg shadow-sm max-w-md">
              <h2 className="text-xl font-semibold mb-4">Promote User to Admin</h2>
              <form onSubmit={handlePromoteAdmin} className="space-y-4">
                <div>
                  <label htmlFor="promote-email" className="block text-sm font-medium text-gray-700 mb-1">
                    User Email
                  </label>
                  <Input
                    id="promote-email"
                    type="email"
                    required
                    placeholder="Enter user's email"
                    value={promoteEmail}
                    onChange={e => setPromoteEmail(e.target.value)}
                    disabled={promoteLoading}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={promoteLoading || promoteEmail.trim() === ''}>
                  {promoteLoading ? "Promoting..." : "Promote to Admin"}
                </Button>
              </form>
              <p className="text-sm text-gray-500 mt-3">
                Enter the email address of a registered user to grant them admin rights.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;

