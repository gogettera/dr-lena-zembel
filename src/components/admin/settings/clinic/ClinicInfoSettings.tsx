
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BasicInfoForm } from './forms/BasicInfoForm';
import { DoctorInfoForm } from './forms/DoctorInfoForm';
import { StaffManagement } from './StaffManagement';

export const ClinicInfoSettings = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Clinic Information</h2>
      
      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList className="mb-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="doctor">Doctor Info</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <BasicInfoForm />
        </TabsContent>

        <TabsContent value="doctor">
          <DoctorInfoForm />
        </TabsContent>

        <TabsContent value="staff">
          <StaffManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};
