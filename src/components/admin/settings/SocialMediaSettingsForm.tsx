
import React from 'react';
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import SocialInputRow from "./SocialInputRow";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

const SocialMediaSettingsForm = ({ form, loading, onSubmit }) => {
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleFetchPosts = async () => {
    try {
      const response = await fetch('/api/functions/v1/fetch-facebook-posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pageId: form.getValues('facebook_page_id') || 'drzembel',
          limit: 10
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast({
          titleKey: 'admin.settings.social.posts_fetched',
          descriptionKey: 'admin.settings.social.posts_fetched_description',
          descriptionParams: { count: data.posts?.length || 0 },
          variant: 'success'
        });
      } else {
        toast({
          titleKey: 'admin.settings.social.fetch_failed',
          description: data.error || t('admin.settings.social.error_try_again'),
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        titleKey: 'admin.settings.social.fetch_failed',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="facebook"
            render={({ field }) => (
              <SocialInputRow
                icon={<Facebook className="w-5 h-5 text-[#1877F2] mr-2" />}
                field={field}
                label={t('admin.settings.social.facebook_url')}
                placeholder={t('admin.settings.social.placeholders.facebook')}
                loading={loading}
              />
            )}
          />
          
          <FormField
            control={form.control}
            name="facebook_page_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('admin.settings.social.facebook_page_id')}</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <Input
                      placeholder={t('admin.settings.social.placeholders.facebook_page_id')}
                      {...field}
                      value={field.value || ''}
                      className="flex-1"
                    />
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={handleFetchPosts}
                      disabled={loading || !field.value}
                    >
                      {t('admin.settings.social.fetch_posts')}
                    </Button>
                  </div>
                </FormControl>
                <FormDescription>
                  {t('admin.settings.social.facebook_page_id_description')}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="instagram"
            render={({ field }) => (
              <SocialInputRow
                icon={<Instagram className="w-5 h-5 text-[#E1306C] mr-2" />}
                field={field}
                label={t('admin.settings.social.instagram_url')}
                placeholder={t('admin.settings.social.placeholders.instagram')}
                loading={loading}
              />
            )}
          />
          
          <FormField
            control={form.control}
            name="twitter"
            render={({ field }) => (
              <SocialInputRow
                icon={<Twitter className="w-5 h-5 text-[#1DA1F2] mr-2" />}
                field={field}
                label={t('admin.settings.social.twitter_url')}
                placeholder={t('admin.settings.social.placeholders.twitter')}
                loading={loading}
              />
            )}
          />
          
          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <SocialInputRow
                icon={<Linkedin className="w-5 h-5 text-[#0077B5] mr-2" />}
                field={field}
                label={t('admin.settings.social.linkedin_url')}
                placeholder={t('admin.settings.social.placeholders.linkedin')}
                loading={loading}
              />
            )}
          />
          
          <FormField
            control={form.control}
            name="youtube"
            render={({ field }) => (
              <SocialInputRow
                icon={<Youtube className="w-5 h-5 text-[#FF0000] mr-2" />}
                field={field}
                label={t('admin.settings.social.youtube_url')}
                placeholder={t('admin.settings.social.placeholders.youtube')}
                loading={loading}
              />
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="show_social_icons"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  {t('admin.settings.social.show_social_icons')}
                </FormLabel>
                <FormDescription>
                  {t('admin.settings.social.show_social_icons_description')}
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        <div className="flex justify-end">
          <Button type="submit" disabled={loading} className="w-full md:w-auto">
            {loading ? t('admin.settings.social.saving') : t('admin.settings.social.save_settings')}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SocialMediaSettingsForm;
