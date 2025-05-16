
import { useToast as useHookToast } from "@/hooks/use-toast";
import { toast } from "@/hooks/use-toast";
import type { ToastProps } from "@/hooks/use-toast";

export const useToast = useHookToast;
export { toast, type ToastProps };
