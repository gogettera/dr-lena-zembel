
import React from 'react';

interface AdminRouteProps {
  element: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ element }) => {
  // Admin check removed - open access for everyone
  return <>{element}</>;
};

export default AdminRoute;
