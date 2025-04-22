
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetaSettings } from './settings/MetaSettings';
import { SocialMediaSettings } from './settings/SocialMediaSettings';
import { FaviconSettings } from './settings/FaviconSettings';
import { ClinicInfoSettings } from './settings/clinic/ClinicInfoSettings';

const SiteSettings = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Site Settings</h2>
      
      <Tabs defaultValue="clinic" className="space-y-4">
        <TabsList className="mb-4">
          <TabsTrigger value="clinic">Clinic Info</TabsTrigger>
          <TabsTrigger value="meta">SEO & Meta</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="favicon">Favicon</TabsTrigger>
        </TabsList>

        <TabsContent value="clinic">
          <ClinicInfoSettings />
        </TabsContent>

        <TabsContent value="meta">
          <MetaSettings />
        </TabsContent>

        <TabsContent value="social">
          <SocialMediaSettings />
        </TabsContent>

        <TabsContent value="favicon">
          <FaviconSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SiteSettings;
