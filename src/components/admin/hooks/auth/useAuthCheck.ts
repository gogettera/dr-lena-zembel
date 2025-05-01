
import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export function useAuthCheck() {
  const checkAuth = useCallback(async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    
    if (!sessionData.session) {
      toast({
        title: "Authentication Required",
        description: "You need to be logged in to perform this action.",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  }, []);

  return { checkAuth };
}
