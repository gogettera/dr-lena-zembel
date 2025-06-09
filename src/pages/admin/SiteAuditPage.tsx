
import React from 'react';
import AdminRoute from '@/components/AdminRoute';
import SiteAuditDashboard from '@/components/admin/SiteAuditDashboard';

const SiteAuditPage: React.FC = () => {
  return (
    <AdminRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-8 px-4">
          <SiteAuditDashboard />
        </div>
      </div>
    </AdminRoute>
  );
};

export default SiteAuditPage;
