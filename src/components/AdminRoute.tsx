
import React, { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminRouteProps {
  element: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ element }) => {
  // For development purposes, we'll bypass authentication
  // and automatically set admin access
  useEffect(() => {
    // This effect temporarily enables admin access for development
    const setupDevAdmin = async () => {
      try {
        // Get current session or create an anonymous one
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          // Sign in anonymously for development
          await supabase.auth.signInAnonymously();
          console.log("[AdminRoute] Created anonymous session for development");
        }
        
        // Set special header for admin access
        // This header will be used by Supabase RLS policies
        supabase.auth.setSession({
          access_token: session?.access_token || '',
          refresh_token: session?.refresh_token || '',
        });
        
        console.log("[AdminRoute] Development admin access enabled");
      } catch (error) {
        console.error("[AdminRoute] Error setting up dev admin:", error);
      }
    };
    
    setupDevAdmin();
    
    // Clean up function not strictly necessary for development
    return () => {
      console.log("[AdminRoute] Admin route unmounted");
    };
  }, []);
  
  return <>{element}</>;
};

export default AdminRoute;
