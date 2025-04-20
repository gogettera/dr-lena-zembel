
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Globe } from "lucide-react";

interface MetaSettings {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: File | null;
}

export const MetaSettings = () => {
  const [ogImageFile, setOgImageFile] = React.useState<File | null>(null);
  const [ogImagePreview, setOgImagePreview] = React.useState<string>('');
  const { toast } = useToast();

  const form = useForm<MetaSettings>({
    defaultValues: {
      title: 'דנטל לאב - מרפאת שיניים',
      description: 'מרפאה דנטלית מקומית עם טיפול אישי ומקצועי',
      ogTitle: 'דנטל לאב - מרפאת שיניים',
      ogDescription: 'הכירו את מרפאת השיניים דנטל לאב - טיפול אישי ומקצועי',
      ogImage: null
    }
  });

  const handleOgImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (PNG or JPG)",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Open Graph image must be less than 2MB",
        variant: "destructive",
      });
      return;
    }

    setOgImageFile(file);
    const url = URL.createObjectURL(file);
    setOgImagePreview(url);
  };

  const onSubmit = (data: MetaSettings) => {
    console.log("Meta Settings:", data);
    if (ogImageFile) {
      const formData = new FormData();
      formData.append('file', ogImageFile);
      // TODO: Implement file upload logic
    }
    
    toast({
      title: "SEO settings updated",
      description: "Your site's meta information has been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">SEO & Meta Settings</h3>
        <p className="text-sm text-gray-600 mb-4">
          Configure how your site appears in search engines and when shared on social media.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    The title that appears in browser tabs and search results.
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>
                    A brief description of your site for search engines (150-160 characters recommended).
                  </FormDescription>
                </FormItem>
              )}
            />

            <div className="border-t pt-4 mt-4">
              <h4 className="text-md font-medium mb-2">Open Graph Settings</h4>
              <p className="text-sm text-gray-600 mb-4">
                These settings control how your site appears when shared on social media.
              </p>
            </div>

            <FormField
              control={form.control}
              name="ogTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Social Share Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ogDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Social Share Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Social Share Image</FormLabel>
              <div className="mt-1 mb-3">
                {ogImagePreview && (
                  <div className="mb-3">
                    <img
                      src={ogImagePreview}
                      alt="Open Graph preview"
                      className="w-64 h-auto border rounded"
                    />
                  </div>
                )}
                <Input
                  type="file"
                  accept="image/png,image/jpeg"
                  onChange={handleOgImageChange}
                  className="cursor-pointer"
                />
                <FormDescription>
                  Recommended size: 1200x630 pixels (aspect ratio 1.91:1)
                </FormDescription>
              </div>
            </div>

            <Button type="submit">
              <Globe className="w-4 h-4 mr-2" />
              Save SEO Settings
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
