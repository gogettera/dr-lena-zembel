import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Loader2 } from "lucide-react";
import { useMetaForm } from "@/hooks/use-meta-form";
import { BasicSEOForm } from "./meta/BasicSEOForm";
import { OpenGraphForm } from "./meta/OpenGraphForm";
import { TwitterCardsForm } from "./meta/TwitterCardsForm";
import { MetaPreview } from "./meta/MetaPreview";
import { useSiteMeta } from "@/hooks/use-site-meta";
import { useToast } from "@/hooks/use-toast";

export const MetaSettings = () => {
  const [ogImagePreview, setOgImagePreview] = useState<string>('');
  const { form, metaLoading } = useMetaForm();
  const { updateMeta } = useSiteMeta();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const og_image_url = data.ogImage 
        ? URL.createObjectURL(data.ogImage) 
        : data.ogImageUrl || null;

      const success = await updateMeta({
        title: data.title,
        description: data.description,
        og_title: data.ogTitle,
        og_description: data.ogDescription,
        og_image_url,
        twitter_title: data.twitterTitle || data.ogTitle,
        twitter_description: data.twitterDescription || data.ogDescription,
        twitter_card: data.twitterCard,
        canonical_url: data.canonicalUrl,
      });

      if (!success) {
        throw new Error('Failed to update meta settings');
      } else {
        toast({
          title: "Meta data saved",
          description: "המידע נשמר בהצלחה במסד הנתונים",
          variant: "default"
        });
        console.log("Meta update was successful. Reload your site to see changes applied to meta tags.");
      }
    } catch (err) {
      console.error('Error saving meta settings:', err);
      toast({
        title: "Error saving settings",
        description: "Failed to save meta settings",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">SEO & Meta Settings</h3>
        <p className="text-sm text-gray-600 mb-4">
          Configure how your site appears in search engines and when shared on social media.
        </p>

        <Tabs defaultValue="basic" className="space-y-4">
          <TabsList>
            <TabsTrigger value="basic">Basic SEO</TabsTrigger>
            <TabsTrigger value="opengraph">Open Graph</TabsTrigger>
            <TabsTrigger value="twitter">Twitter Cards</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <TabsContent value="basic">
                <BasicSEOForm form={form} loading={loading || metaLoading} />
              </TabsContent>
              
              <TabsContent value="opengraph">
                <OpenGraphForm 
                  form={form}
                  loading={loading || metaLoading}
                  ogImagePreview={ogImagePreview}
                  setOgImagePreview={setOgImagePreview}
                />
              </TabsContent>
              
              <TabsContent value="twitter">
                <TwitterCardsForm form={form} loading={loading || metaLoading} />
              </TabsContent>
              
              <TabsContent value="preview">
                <MetaPreview form={form} ogImagePreview={ogImagePreview} />
              </TabsContent>
              
              <div className="pt-4">
                <Button type="submit" disabled={loading || metaLoading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Globe className="w-4 h-4 mr-2" />
                      Save SEO Settings
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </Tabs>
      </div>
    </div>
  );
};
