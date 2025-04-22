
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";

const formSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  display_name: z.string().min(2, "Display name must be at least 2 characters"),
  title: z.string().min(2, "Title must be at least 2 characters"),
  education: z.string().optional(),
  languages: z.string().optional(),
  experience: z.string().optional(),
  approach: z.string().optional(),
  profile_image: z.string().optional(),
});

export const DoctorInfoForm = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      display_name: "",
      title: "",
      education: "",
      languages: "",
      experience: "",
      approach: "",
      profile_image: "",
    },
  });

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      const { data, error } = await supabase
        .from('doctor_info')
        .select('*')
        .maybeSingle();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load doctor information",
          variant: "destructive",
        });
        return;
      }

      if (data) {
        form.reset({
          full_name: data.full_name,
          display_name: data.display_name,
          title: data.title,
          education: data.education || "",
          languages: data.languages || "",
          experience: data.experience || "",
          approach: data.approach || "",
          profile_image: data.profile_image || "",
        });
      }
    };

    fetchDoctorInfo();
  }, [form, toast]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { error } = await supabase
      .from('doctor_info')
      .upsert({
        id: 1,
        ...values,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update doctor information",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Doctor information updated successfully",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter full name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="display_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name (DBA)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter display name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Professional Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter professional title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="education"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Education</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter education details" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="languages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Languages</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter languages spoken" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter professional experience" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="approach"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Professional Approach</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter professional approach" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="profile_image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image URL</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter profile image URL" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Save Changes</Button>
      </form>
    </Form>
  );
};
