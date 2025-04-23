
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AdminRouteProps {
  element: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ element }) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          // Not logged in at all
          setIsAdmin(false);
          return;
        }

        // Check if user has admin role
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .eq('role', 'admin')
          .single();

        if (error || !data) {
          // User is not an admin
          setIsAdmin(false);
          toast({
            title: 'Unauthorized Access',
            description: 'You do not have permission to access the admin panel.',
            variant: 'destructive'
          });
          return;
        }

        // User is an admin
        setIsAdmin(true);
      } catch (error) {
        console.error('Admin check error:', error);
        setIsAdmin(false);
        toast({
          title: 'Authentication Error',
          description: 'Could not verify admin status.',
          variant: 'destructive'
        });
      }
    };

    checkAdminStatus();
  }, []);

  // Loading state
  if (isAdmin === null) {
    return <div>Loading...</div>;
  }

  // Not an admin, redirect to login
  if (isAdmin === false) {
    return <Navigate to="/login" replace />;
  }

  // Render admin content
  return <>{element}</>;
};

export default AdminRoute;
