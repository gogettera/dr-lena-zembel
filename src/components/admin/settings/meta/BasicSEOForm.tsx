
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { MetaFormData } from "@/hooks/use-meta-form";

interface BasicSEOFormProps {
  form: UseFormReturn<MetaFormData>;
  loading: boolean;
}

export const BasicSEOForm = ({ form, loading }: BasicSEOFormProps) => {
  return (
    <Card className="p-4">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Site Title</FormLabel>
            <FormControl>
              <Input {...field} disabled={loading} />
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
          <FormItem className="mt-4">
            <FormLabel>Meta Description</FormLabel>
            <FormControl>
              <Textarea {...field} disabled={loading} />
            </FormControl>
            <FormDescription>
              A brief description of your site for search engines (150-160 characters recommended).
            </FormDescription>
          </FormItem>
        )}
      />
    </Card>
  );
};
