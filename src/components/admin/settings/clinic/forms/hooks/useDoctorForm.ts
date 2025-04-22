
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { doctorFormSchema, type DoctorFormValues } from "../schemas/doctorFormSchema";

export const useDoctorForm = () => {
  const { toast } = useToast();
  const form = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorFormSchema),
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

  const onSubmit = async (values: DoctorFormValues) => {
    const payload = {
      full_name: values.full_name,
      display_name: values.display_name,
      title: values.title,
      education: values.education || null,
      languages: values.languages || null,
      experience: values.experience || null,
      approach: values.approach || null,
      profile_image: values.profile_image || null,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('doctor_info')
      .upsert({
        id: 1,
        ...payload,
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

  return { form, onSubmit };
};
