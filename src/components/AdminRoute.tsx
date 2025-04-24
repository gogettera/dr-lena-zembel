
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

interface AdminRouteProps {
  element: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ element }) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Add timeout protection in case auth check hangs
    const authTimeout = setTimeout(() => {
      if (isCheckingAuth) {
        setIsAdmin(false);
        setIsCheckingAuth(false);
        toast({
          title: 'Authentication Timeout',
          description: 'Could not verify your permissions in time. Please try again.',
          variant: 'destructive'
        });
      }
    }, 5000);

    const checkAdminStatus = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw new Error('Failed to fetch authentication session');
        
        if (!session || !session.user) {
          // Not logged in at all
          setIsAdmin(false);
          toast({
            title: 'Authentication Required',
            description: 'Please log in to access the admin panel.',
          });
          return;
        }

        // Check if user has admin role using the security definer function
        const { data, error } = await supabase.rpc('is_admin', {
          user_id: session.user.id
        });

        if (error) {
          console.error('Admin check error:', error);
          throw new Error('Permission verification failed');
        }

        // Set admin status based on the result from the security definer function
        setIsAdmin(Boolean(data));
        
        if (!data) {
          // User is not an admin
          toast({
            title: 'Unauthorized Access',
            description: 'You do not have permission to access the admin panel.',
            variant: 'destructive'
          });
        }
      } catch (error) {
        console.error('Admin check error:', error);
        setIsAdmin(false);
        toast({
          title: 'Authentication Error',
          description: 'Could not verify admin status.',
          variant: 'destructive'
        });
      } finally {
        setIsCheckingAuth(false);
        clearTimeout(authTimeout);
      }
    };

    checkAdminStatus();
    
    return () => clearTimeout(authTimeout);
  }, [toast]);

  // Loading state
  if (isAdmin === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-beige p-4">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <Skeleton className="h-12 w-3/4 mb-6 mx-auto" />
          <Skeleton className="h-4 w-full mb-3" />
          <Skeleton className="h-4 w-5/6 mb-3" />
          <Skeleton className="h-4 w-4/6 mb-8" />
          <div className="text-center text-gray-400 text-sm">Verifying admin access...</div>
        </div>
      </div>
    );
  }

  // Not an admin, redirect to login
  if (isAdmin === false) {
    return <Navigate to="/login" replace />;
  }

  // Render admin content
  return <>{element}</>;
};

export default AdminRoute;
