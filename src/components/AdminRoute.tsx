
import { Outlet } from 'react-router-dom';

const AdminRoute = () => {
  // Admin check removed - open access for everyone
  return <Outlet />;
};

export default AdminRoute;
