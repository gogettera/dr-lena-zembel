
import React from "react";
import { Form, FormField, FormItem, FormLabel, FormDescription, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Youtube, Twitter, Share2 } from "lucide-react";
import SocialInputRow from "./SocialInputRow";
import { Switch } from "@/components/ui/switch";
import { UseFormReturn } from "react-hook-form";
import type { SocialMediaSettingsFormFields } from "./useSocialMediaSettingsForm";

interface SocialMediaSettingsFormProps {
  form: UseFormReturn<SocialMediaSettingsFormFields>;
  loading: boolean;
  onSubmit: (data: SocialMediaSettingsFormFields) => void;
}

const SocialMediaSettingsForm: React.FC<SocialMediaSettingsFormProps> = ({ form, loading, onSubmit }) => (
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
);

export default SocialMediaSettingsForm;
