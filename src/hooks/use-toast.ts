
import { toast as shadcnToast } from "@/components/ui/sonner";
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
  const { t } = useLanguage();
  // Create a fake toasts array to satisfy the toaster component
  const toasts: any[] = [];

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
  }: ToastProps): void => {
    let finalTitle = title;
    let finalDescription = description;

    // Use translation keys if provided
    if (titleKey) {
      finalTitle = t(titleKey, { params: titleParams });
    }
    
    if (descriptionKey) {
      finalDescription = t(descriptionKey, { params: descriptionParams });
    }

    if (variant === "success") {
      shadcnToast.success(finalTitle || "", { description: finalDescription, action });
    } else if (variant === "destructive") {
      shadcnToast.error(finalTitle || "", { description: finalDescription, action });
    } else if (variant === "warning") {
      shadcnToast.warning(finalTitle || "", { description: finalDescription, action });
    } else if (variant === "info") {
      shadcnToast.info(finalTitle || "", { description: finalDescription, action });
    } else {
      shadcnToast(finalTitle || "", { description: finalDescription, action });
    }
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
    passwordSecurityInfo: showPasswordSecurityInfo,
    // Add the toasts property to satisfy the Toaster component
    toasts
  };
}

// Create a type for the toast function that includes both call signature and properties
type ToastFunction = {
  (props: ToastProps): void;
  success: (props: Omit<ToastProps, "variant">) => void;
  error: (props: Omit<ToastProps, "variant">) => void;
  warning: (props: Omit<ToastProps, "variant">) => void;
  info: (props: Omit<ToastProps, "variant">) => void;
  default: (props: Omit<ToastProps, "variant">) => void;
  passwordSecurityInfo: () => void;
};

// Create the base toast function
const toastFn = (props: ToastProps): void => {
  const variant = props.variant || "default";
  if (variant === "success") {
    shadcnToast.success(props.title || "", { description: props.description });
  } else if (variant === "destructive") {
    shadcnToast.error(props.title || "", { description: props.description });
  } else if (variant === "warning") {
    shadcnToast.warning(props.title || "", { description: props.description });
  } else if (variant === "info") {
    shadcnToast.info(props.title || "", { description: props.description });
  } else {
    shadcnToast(props.title || "", { description: props.description });
  }
};

// Add properties to the function
export const toast = toastFn as ToastFunction;

// Add methods to the toast function
toast.success = (props: Omit<ToastProps, "variant">) => shadcnToast.success(props.title || "", { description: props.description });
toast.error = (props: Omit<ToastProps, "variant">) => shadcnToast.error(props.title || "", { description: props.description });
toast.warning = (props: Omit<ToastProps, "variant">) => shadcnToast.warning(props.title || "", { description: props.description });
toast.info = (props: Omit<ToastProps, "variant">) => shadcnToast.info(props.title || "", { description: props.description });
toast.default = (props: Omit<ToastProps, "variant">) => shadcnToast(props.title || "", { description: props.description });
toast.passwordSecurityInfo = () => shadcnToast.info(
  "Enhanced Password Security", 
  { description: "Your password will be checked against known data breaches to ensure your account remains secure." }
);
