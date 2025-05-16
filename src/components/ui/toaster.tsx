
import { toast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  // Replace with Sonner toaster which is what we're actually using
  return <SonnerToaster />;
}
