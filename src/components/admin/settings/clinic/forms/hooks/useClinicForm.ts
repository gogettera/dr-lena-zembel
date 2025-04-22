
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { clinicFormSchema, type ClinicFormValues } from "../schemas/clinicFormSchema";

export const useClinicForm = () => {
  const { toast } = useToast();
  const form = useForm<ClinicFormValues>({
    resolver: zodResolver(clinicFormSchema),
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

  const onSubmit = async (values: ClinicFormValues) => {
    const payload = {
      id: 1,
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
      .upsert(payload);

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

  return { form, onSubmit };
};
