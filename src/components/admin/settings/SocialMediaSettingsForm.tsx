
import React from 'react';
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import SocialInputRow from "./SocialInputRow";

const SocialMediaSettingsForm = ({ form, loading, onSubmit }) => {
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
        toast.success({
          title: 'Posts updated successfully',
          description: `Fetched ${data.posts?.length || 0} posts from Facebook`
        });
      } else {
        toast.error({
          title: 'Failed to fetch posts',
          description: data.error || 'An unknown error occurred'
        });
      }
    } catch (error) {
      toast.error({
        title: 'Failed to fetch posts',
        description: error.message
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
                icon="facebook"
                field={field}
                label="Facebook URL"
                placeholder="https://facebook.com/your-page"
              />
            )}
          />
          
          <FormField
            control={form.control}
            name="facebook_page_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facebook Page ID or username</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <Input
                      placeholder="drzembel"
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
                      Fetch Posts
                    </Button>
                  </div>
                </FormControl>
                <FormDescription>
                  Enter your Facebook Page ID or username to fetch posts automatically
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
                icon="instagram"
                field={field}
                label="Instagram URL"
                placeholder="https://instagram.com/your-username"
              />
            )}
          />
          
          <FormField
            control={form.control}
            name="twitter"
            render={({ field }) => (
              <SocialInputRow
                icon="twitter"
                field={field}
                label="Twitter URL"
                placeholder="https://twitter.com/your-handle"
              />
            )}
          />
          
          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <SocialInputRow
                icon="linkedin"
                field={field}
                label="LinkedIn URL"
                placeholder="https://linkedin.com/company/your-company"
              />
            )}
          />
          
          <FormField
            control={form.control}
            name="youtube"
            render={({ field }) => (
              <SocialInputRow
                icon="youtube"
                field={field}
                label="YouTube URL"
                placeholder="https://youtube.com/@your-channel"
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
                  Show social media icons
                </FormLabel>
                <FormDescription>
                  Display social media icons in the website footer
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        <div className="flex justify-end">
          <Button type="submit" disabled={loading} className="w-full md:w-auto">
            {loading ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SocialMediaSettingsForm;
