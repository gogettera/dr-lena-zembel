
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TranslationsTable from '@/components/admin/TranslationsTable';
import TranslationAudit from '@/components/admin/TranslationAudit';

const TranslationsAdminPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Translation Management</h1>
        <p className="text-gray-600">
          Manage and audit translations across all languages and treatment pages
        </p>
      </div>

      <Tabs defaultValue="audit" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="audit">Translation Audit</TabsTrigger>
          <TabsTrigger value="manage">Manage Translations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="audit" className="mt-6">
          <TranslationAudit />
        </TabsContent>
        
        <TabsContent value="manage" className="mt-6">
          <TranslationsTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TranslationsAdminPage;
