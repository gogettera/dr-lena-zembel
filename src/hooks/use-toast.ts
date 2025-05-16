
import { toast as shadcnToast } from "@/components/ui/sonner";
import { useToast as useShadcnToast } from "@radix-ui/react-toast";
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
  const { toast } = useShadcnToast();
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

    toast({
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
    toast: showToast,
    success: showSuccess,
    error: showError,
    warning: showWarning,
    info: showInfo,
    passwordSecurityInfo: showPasswordSecurityInfo
  };
}

// Create a type for the toast function that includes both call signature and properties
type ToastFunction = {
  (props: ToastProps): string | number;
  success: (props: ToastProps) => string | number;
  error: (props: ToastProps) => string | number;
  warning: (props: ToastProps) => string | number;
  info: (props: ToastProps) => string | number;
  default: (props: ToastProps) => string | number;
  passwordSecurityInfo: () => string | number;
};

// Create the base toast function
const toastFn = (props: ToastProps): string | number => {
  const variant = props.variant || "default";
  if (variant === "success") {
    return shadcnToast.success(props.title || "", { description: props.description });
  } else if (variant === "destructive") {
    return shadcnToast.error(props.title || "", { description: props.description });
  } else if (variant === "warning") {
    return shadcnToast.warning(props.title || "", { description: props.description });
  } else if (variant === "info") {
    return shadcnToast.info(props.title || "", { description: props.description });
  } else {
    return shadcnToast(props.title || "", { description: props.description });
  }
};

// Add properties to the function
export const toast = toastFn as ToastFunction;

// Add methods to the toast function
toast.success = (props: ToastProps) => shadcnToast.success(props.title || "", { description: props.description });
toast.error = (props: ToastProps) => shadcnToast.error(props.title || "", { description: props.description });
toast.warning = (props: ToastProps) => shadcnToast.warning(props.title || "", { description: props.description });
toast.info = (props: ToastProps) => shadcnToast.info(props.title || "", { description: props.description });
toast.default = (props: ToastProps) => shadcnToast(props.title || "", { description: props.description });
toast.passwordSecurityInfo = () => shadcnToast.info(
  "Enhanced Password Security", 
  { description: "Your password will be checked against known data breaches to ensure your account remains secure." }
);
