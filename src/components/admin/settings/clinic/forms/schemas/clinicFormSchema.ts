
import * as z from "zod";
import { Json } from "@/integrations/supabase/types";

export const clinicFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  phone: z.string().min(9, "Phone must be at least 9 characters"),
  email: z.string().email().optional().or(z.literal("")),
  website: z.string().url().optional().or(z.literal("")),
  description: z.string().optional(),
  hours: z.string().min(2, "Hours must be at least 2 characters"),
});

export type ClinicFormValues = z.infer<typeof clinicFormSchema>;
