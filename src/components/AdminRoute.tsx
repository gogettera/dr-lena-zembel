
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const AdminRoute = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setIsAdmin(false);
        return;
      }

      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .single();

      setIsAdmin(roleData?.role === 'admin');
    };

    checkAdminStatus();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAdminStatus();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (isAdmin === null) {
    return <div>Loading...</div>;
  }

  return isAdmin ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminRoute;
