
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Facebook, Instagram, Linkedin, Share2, Twitter, Youtube } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import SocialInputRow from "./SocialInputRow";

interface SocialMediaSettingsFormFields {
  facebook: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  twitter: string;
  showSocialIcons: boolean;
}

export const SocialMediaSettings = () => {
  const { toast } = useToast();

  const form = useForm<SocialMediaSettingsFormFields>({
    defaultValues: {
      facebook: '',
      instagram: '',
      linkedin: '',
      youtube: '',
      twitter: '',
      showSocialIcons: true
    }
  });

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const load = async () => {
      setLoading(true);
      let { data, error } = await supabase
        .from('site_social')
        .select('*')
        .eq('id', 1)
        .maybeSingle();

      // Handle not found case: insert a blank row first
      if (!data && !error) {
        const { error: insertError } = await supabase.from('site_social').insert([{ id: 1 }]);
        if (insertError) {
          toast({
            title: "Couldn't initialize social settings",
            description: insertError.message,
            variant: "destructive"
          });
          setLoading(false);
          return;
        }
        const res = await supabase.from('site_social').select('*').eq('id', 1).maybeSingle();
        data = res.data;
      }

      if (data) {
        form.reset({
          facebook: data.facebook || '',
          instagram: data.instagram || '',
          linkedin: data.linkedin || '',
          youtube: data.youtube || '',
          twitter: data.twitter || '',
          showSocialIcons: typeof data.show_social_icons === "boolean" ? data.show_social_icons : true
        });
      }
      if (error) {
        toast({
          title: "Error loading social settings",
          description: error.message,
          variant: "destructive"
        });
      }
      setLoading(false);
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (fields: SocialMediaSettingsFormFields) => {
    setLoading(true);
    try {
      const updateObj = {
        id: 1,
        facebook: fields.facebook || '',
        instagram: fields.instagram || '',
        linkedin: fields.linkedin || '',
        youtube: fields.youtube || '',
        twitter: fields.twitter || '',
        show_social_icons: typeof fields.showSocialIcons === 'boolean' ? fields.showSocialIcons : true,
        updated_at: new Date().toISOString()
      };
      const { error } = await supabase
        .from('site_social')
        .upsert(updateObj, { onConflict: 'id' });
      if (error) {
        toast({
          title: "Error saving social media settings",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Social media settings updated",
          description: "Your social media links have been updated successfully.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Social Media Settings</h3>
      <p className="text-sm text-gray-600 mb-4">
        Manage your social media links and sharing options across the website.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="facebook"
            render={({ field }) => (
              <SocialInputRow
                icon={<Facebook className="w-5 h-5 text-[#1877F2] mr-2" />}
                label="Facebook Page URL"
                placeholder="https://facebook.com/yourpage"
                field={field}
                loading={loading}
              />
            )}
          />
          <FormField
            control={form.control}
            name="instagram"
            render={({ field }) => (
              <SocialInputRow
                icon={<Instagram className="w-5 h-5 text-[#E1306C] mr-2" />}
                label="Instagram Profile URL"
                placeholder="https://instagram.com/yourprofile"
                field={field}
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
                label="LinkedIn Profile URL"
                placeholder="https://linkedin.com/in/yourprofile"
                field={field}
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
                label="YouTube Channel URL"
                placeholder="https://youtube.com/channel/yourchannelid"
                field={field}
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
                label="Twitter Profile URL"
                placeholder="https://twitter.com/yourhandle"
                field={field}
                loading={loading}
              />
            )}
          />

          <FormField
            control={form.control}
            name="showSocialIcons"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 mt-6">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Show Social Media Icons</FormLabel>
                  <FormDescription>
                    Toggle to show or hide social media icons in the website footer
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={loading}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading}>
            <Share2 className="w-4 h-4 mr-2" />
            {loading ? "Saving..." : "Save Social Media Settings"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
