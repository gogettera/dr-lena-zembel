
import { Toast as ShadcnToast, toast as shadcnToast } from "@/components/ui/sonner";
import { useToast as useShadcnToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatTranslation } from "@/utils/translation/format";

// Type for toast parameters
export interface ToastProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive" | "success" | "warning" | "info";
  duration?: number;
  titleKey?: string;
  descriptionKey?: string;
  titleParams?: Record<string, any>;
  descriptionParams?: Record<string, any>;
}

export function useToast() {
  const toast = useShadcnToast();
  const { t } = useLanguage();

  const showToast = ({
    title,
    description,
    action,
    variant = "default",
    duration = 5000,
    titleKey,
    descriptionKey,
    titleParams,
    descriptionParams
  }: ToastProps) => {
    let finalTitle = title;
    let finalDescription = description;

    // Use translation keys if provided
    if (titleKey) {
      finalTitle = t(titleKey, { params: titleParams });
    }
    
    if (descriptionKey) {
      finalDescription = t(descriptionKey, { params: descriptionParams });
    }

    toast.toast({
      title: finalTitle,
      description: finalDescription,
      action,
      variant,
      duration,
    });
  };

  // Predefined toast types
  const showSuccess = (props: Omit<ToastProps, "variant">) => 
    showToast({ ...props, variant: "success" });
  
  const showError = (props: Omit<ToastProps, "variant">) => 
    showToast({ ...props, variant: "destructive" });
  
  const showWarning = (props: Omit<ToastProps, "variant">) => 
    showToast({ ...props, variant: "warning" });
  
  const showInfo = (props: Omit<ToastProps, "variant">) => 
    showToast({ ...props, variant: "info" });

  const showPasswordSecurityInfo = () => {
    showInfo({
      titleKey: "security.password.securityCheck.title",
      descriptionKey: "security.password.securityCheck.description",
      duration: 8000,
    });
  };

  return {
    ...toast,
    toast: showToast,
    success: showSuccess,
    error: showError,
    warning: showWarning,
    info: showInfo,
    passwordSecurityInfo: showPasswordSecurityInfo
  };
}

// Export a singleton instance for direct import
export const toast = {
  success: (props: ToastProps) => shadcnToast.success(props.title || "", { description: props.description }),
  error: (props: ToastProps) => shadcnToast.error(props.title || "", { description: props.description }),
  warning: (props: ToastProps) => shadcnToast.warning(props.title || "", { description: props.description }),
  info: (props: ToastProps) => shadcnToast.info(props.title || "", { description: props.description }),
  default: (props: ToastProps) => shadcnToast(props.title || "", { description: props.description }),
  passwordSecurityInfo: () => shadcnToast.info(
    "Password Security Check",
    { 
      description: "Your password will be checked against known data breaches to ensure your account remains secure."
    }
  )
};

export default useToast;
