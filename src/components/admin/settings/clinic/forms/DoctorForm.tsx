
import React from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useDoctorForm } from "./hooks/useDoctorForm";

export const DoctorForm = () => {
  const { form, onSubmit } = useDoctorForm();

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
