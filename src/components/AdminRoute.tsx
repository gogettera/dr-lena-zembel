
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

const AdminRoute = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        console.log("Checking admin status...");
        setIsLoading(true);
        
        // Get current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          setError(sessionError.message);
          setIsAdmin(false);
          return;
        }
        
        if (!session) {
          console.log("No active session found");
          setIsAdmin(false);
          return;
        }

        console.log("Session found for user:", session.user.id);

        // Check if user has admin role
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (roleError) {
          console.error("Role check error:", roleError);
          setError(roleError.message);
          setIsAdmin(false);
          return;
        }

        console.log("Role data:", roleData);
        setIsAdmin(roleData?.role === 'admin');
      } catch (error: any) {
        console.error("Admin check failed:", error);
        setError(error.message);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAdminStatus();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-gray-600">Verifying admin access...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 p-4 rounded-md text-red-600 max-w-md">
          <h2 className="text-lg font-semibold mb-2">Error Checking Admin Status</h2>
          <p>{error}</p>
          <div className="mt-4">
            <button 
              onClick={() => window.location.href = '/admin/login'} 
              className="text-primary hover:underline"
            >
              Return to login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return isAdmin ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminRoute;
