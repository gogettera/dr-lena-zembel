
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Plus, Users } from "lucide-react";
import OptimizedImage from '@/components/ui/optimized-image';

interface StaffMember {
  id: number;
  name: string;
  role: string;
  bio: string | null;
  image_url: string | null;
  is_active: boolean;
  sort_order: number;
}

export const StaffManagement = () => {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchStaff = async () => {
      const { data, error } = await supabase
        .from('clinic_staff')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load staff information",
          variant: "destructive",
        });
        return;
      }

      setStaff(data || []);
      setLoading(false);
    };

    fetchStaff();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-6 w-6 animate-spin text-dental-navy" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Staff Members</h3>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Staff Member
        </Button>
      </div>

      {staff.length === 0 ? (
        <Card className="p-8 text-center">
          <Users className="h-12 w-12 mx-auto text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No staff members</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding a new staff member.</p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {staff.map((member) => (
            <Card key={member.id} className="p-4">
              <div className="flex items-start space-x-4">
                {member.image_url && (
                  <OptimizedImage
                    src={member.image_url}
                    alt={member.name}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {member.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">{member.role}</p>
                  {member.bio && (
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                      {member.bio}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
