
import { useToast as useHookToast, toast } from "@/hooks/use-toast";
import { ToastProps } from "@/hooks/use-toast";

export const useToast = useHookToast;
export { toast, type ToastProps };
