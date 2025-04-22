
import React from 'react';

interface AdminRouteProps {
  element: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ element }) => {
  // No authentication logic, open access
  return <>{element}</>;
};

export default AdminRoute;
