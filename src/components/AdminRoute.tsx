
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface AdminRouteProps {
  element: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ element }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check authentication status and ensure session exists
    const setupAuth = async () => {
      try {
        // Check for existing session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          console.log("[AdminRoute] Using existing session");
          setAuthenticated(true);
          setLoading(false);
          return;
        }
        
        // For development, create an anonymous session
        try {
          const { data, error } = await supabase.auth.signInAnonymously();
          
          if (error) {
            console.error("[AdminRoute] Anonymous sign-in failed:", error.message);
            toast({
              title: "Authentication Error",
              description: "Could not sign in anonymously. Anonymous sign-in might be disabled in Supabase.",
              variant: "destructive"
            });
            setLoading(false);
            return;
          }
          
          if (data.session) {
            console.log("[AdminRoute] Created anonymous session for development");
            setAuthenticated(true);
          }
        } catch (error) {
          console.error("[AdminRoute] Error:", error);
          toast({
            title: "Authentication Error",
            description: "An unexpected error occurred during authentication.",
            variant: "destructive"
          });
        }
        
        setLoading(false);
      } catch (error) {
        console.error("[AdminRoute] Error setting up auth:", error);
        setLoading(false);
      }
    };
    
    setupAuth();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("[AdminRoute] Auth state changed:", event);
      setAuthenticated(!!session);
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dental-orange"></div>
      </div>
    );
  }
  
  if (!authenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-dental-navy mb-4">Authentication Required</h1>
          <p className="mb-6">You need to be authenticated to access the admin panel.</p>
          <button
            onClick={async () => {
              try {
                await supabase.auth.signInAnonymously();
              } catch (error) {
                console.error("Sign-in error:", error);
                toast({
                  title: "Error",
                  description: "Failed to authenticate. Please try again.",
                  variant: "destructive"
                });
              }
            }}
            className="w-full px-4 py-2 bg-dental-orange text-white rounded hover:bg-dental-orange/90 transition"
          >
            Sign In Anonymously
          </button>
          <p className="mt-4 text-sm text-gray-500">
            Note: For development purposes only. In production, implement proper authentication.
          </p>
        </div>
      </div>
    );
  }
  
  return <>{element}</>;
};

export default AdminRoute;
