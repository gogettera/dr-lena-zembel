
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

import { Input } from "@/components/ui/input";
import { FormItem, FormLabel, FormDescription } from "@/components/ui/form";

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
        google_analytics_id: data.googleAnalyticsId,
        facebook_pixel_id: data.facebookPixelId,
      });

      if (!success) {
        throw new Error('Failed to update meta settings');
      } else {
        toast({
          title: "Meta data saved",
          description: "המידע נשמר בהצלחה במסד הנתונים",
          variant: "default"
        });
      }
    } catch (err) {
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
          Configure how your site appears in search engines, social media, and set tracking IDs.
        </p>

        <Tabs defaultValue="basic" className="space-y-4">
          <TabsList>
            <TabsTrigger value="basic">Basic SEO</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="opengraph">Open Graph</TabsTrigger>
            <TabsTrigger value="twitter">Twitter Cards</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <TabsContent value="basic">
                <BasicSEOForm form={form} loading={loading || metaLoading} />
              </TabsContent>

              <TabsContent value="analytics">
                <div className="flex flex-col gap-6 max-w-md">
                  <FormItem>
                    <FormLabel htmlFor="googleAnalyticsId">
                      Google Analytics ID
                    </FormLabel>
                    <Input
                      id="googleAnalyticsId"
                      {...form.register("googleAnalyticsId")}
                      placeholder="G-XXXXXXXXXX"
                      className="ltr:text-left rtl:text-right"
                    />
                    <FormDescription>
                      Google Analytics Measurement ID (e.g., G-XXXXXXXXXX)
                    </FormDescription>
                  </FormItem>

                  <FormItem>
                    <FormLabel htmlFor="facebookPixelId">
                      Facebook Pixel ID
                    </FormLabel>
                    <Input
                      id="facebookPixelId"
                      {...form.register("facebookPixelId")}
                      placeholder="1234567890"
                      className="ltr:text-left rtl:text-right"
                    />
                    <FormDescription>
                      Facebook Pixel ID (your numeric code)
                    </FormDescription>
                  </FormItem>
                </div>
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
