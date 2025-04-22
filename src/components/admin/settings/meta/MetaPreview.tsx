
import React from 'react';
import { Card } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { MetaFormData } from "@/hooks/use-meta-form";

interface MetaPreviewProps {
  form: UseFormReturn<MetaFormData>;
  ogImagePreview: string;
}

export const MetaPreview = ({ form, ogImagePreview }: MetaPreviewProps) => {
  return (
    <Card className="p-4">
      <div className="space-y-6">
        <div>
          <h4 className="text-base font-medium mb-2">Search Engine Preview</h4>
          <div className="border rounded p-4 bg-white">
            <div className="text-blue-800 text-lg font-medium overflow-hidden text-ellipsis">
              {form.watch('title') || 'Your Website Title'}
            </div>
            <div className="text-green-700 text-sm overflow-hidden text-ellipsis">
              example.com
            </div>
            <div className="text-gray-600 text-sm mt-1 overflow-hidden text-ellipsis">
              {form.watch('description') || 'Your website description will appear here in search results. Make it compelling to improve click-through rates.'}
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-base font-medium mb-2">Social Media Preview</h4>
          <div className="border rounded p-4 bg-white">
            <div className="border-b pb-2 text-gray-500 text-xs">example.com</div>
            {ogImagePreview && (
              <div className="my-2">
                <img 
                  src={ogImagePreview} 
                  alt="Social media preview" 
                  className="w-full h-auto rounded max-h-60 object-cover" 
                />
              </div>
            )}
            <div className="font-bold mt-2">
              {form.watch('ogTitle') || form.watch('title') || 'Your Open Graph Title'}
            </div>
            <div className="text-gray-600 text-sm mt-1">
              {form.watch('ogDescription') || form.watch('description') || 'Your social media description will appear here when your site is shared on platforms like Facebook and LinkedIn.'}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
