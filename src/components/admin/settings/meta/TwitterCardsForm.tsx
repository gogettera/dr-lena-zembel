
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { MetaFormData } from "@/hooks/use-meta-form";

interface TwitterCardsFormProps {
  form: UseFormReturn<MetaFormData>;
  loading: boolean;
}

export const TwitterCardsForm = ({ form, loading }: TwitterCardsFormProps) => {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Info className="h-4 w-4 text-dental-navy" />
        <p className="text-sm text-gray-600">
          Twitter Card settings control how your site appears when shared on Twitter.
        </p>
      </div>
      
      <FormField
        control={form.control}
        name="twitterCard"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Twitter Card Type</FormLabel>
            <FormControl>
              <select 
                className="w-full p-2 border border-gray-300 rounded"
                value={field.value}
                onChange={field.onChange}
                disabled={loading}
              >
                <option value="summary">Summary (Small Image)</option>
                <option value="summary_large_image">Summary with Large Image</option>
              </select>
            </FormControl>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="twitterTitle"
        render={({ field }) => (
          <FormItem className="mt-4">
            <FormLabel>Twitter Title</FormLabel>
            <FormControl>
              <Input {...field} disabled={loading} />
            </FormControl>
            <FormDescription>
              Leave blank to use Open Graph title
            </FormDescription>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="twitterDescription"
        render={({ field }) => (
          <FormItem className="mt-4">
            <FormLabel>Twitter Description</FormLabel>
            <FormControl>
              <Textarea {...field} disabled={loading} />
            </FormControl>
            <FormDescription>
              Leave blank to use Open Graph description
            </FormDescription>
          </FormItem>
        )}
      />
    </Card>
  );
};
