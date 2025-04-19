
import React from 'react';
import SocialPostEditor from '@/components/admin/SocialPostEditor';

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-dental-navy mb-8 text-center">ניהול פוסטים</h1>
        <SocialPostEditor />
      </div>
    </div>
  );
};

export default Admin;
