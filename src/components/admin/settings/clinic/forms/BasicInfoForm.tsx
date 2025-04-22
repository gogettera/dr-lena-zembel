
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
import { Json } from "@/integrations/supabase/types";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  phone: z.string().min(9, "Phone must be at least 9 characters"),
  email: z.string().email().optional().or(z.literal("")),
  website: z.string().url().optional().or(z.literal("")),
  description: z.string().optional(),
  hours: z.string().min(2, "Hours must be at least 2 characters"),
});

export const BasicInfoForm = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      email: "",
      website: "",
      description: "",
      hours: "",
    },
  });

  useEffect(() => {
    const fetchClinicInfo = async () => {
      const { data, error } = await supabase
        .from('clinic_info')
        .select('*')
        .maybeSingle();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load clinic information",
          variant: "destructive",
        });
        return;
      }

      if (data) {
        // Check if hours is an object with the weekdays property
        let hoursValue = "";
        if (data.hours && typeof data.hours === 'object') {
          const hoursObj = data.hours as Record<string, unknown>;
          if (hoursObj.weekdays && typeof hoursObj.weekdays === 'string') {
            hoursValue = hoursObj.weekdays;
          }
        }

        form.reset({
          name: data.name,
          address: data.address,
          phone: data.phone,
          email: data.email || "",
          website: data.website || "",
          description: data.description || "",
          hours: hoursValue,
        });
      }
    };

    fetchClinicInfo();
  }, [form, toast]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Ensure all required fields are present
    const payload = {
      name: values.name,
      address: values.address,
      phone: values.phone,
      hours: { weekdays: values.hours },
      email: values.email || null,
      website: values.website || null,
      description: values.description || null,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('clinic_info')
      .upsert({
        id: 1,
        ...payload
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update clinic information",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Clinic information updated successfully",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Clinic Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter clinic name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter clinic address" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter phone number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Operating Hours</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter operating hours" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email (Optional)</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="Enter email address" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website (Optional)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter website URL" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter clinic description" />
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
