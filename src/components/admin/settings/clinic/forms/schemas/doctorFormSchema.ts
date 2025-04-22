
import * as z from "zod";

export const doctorFormSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  display_name: z.string().min(2, "Display name must be at least 2 characters"),
  title: z.string().min(2, "Title must be at least 2 characters"),
  education: z.string().optional(),
  languages: z.string().optional(),
  experience: z.string().optional(),
  approach: z.string().optional(),
  profile_image: z.string().optional(),
});

export type DoctorFormValues = z.infer<typeof doctorFormSchema>;
