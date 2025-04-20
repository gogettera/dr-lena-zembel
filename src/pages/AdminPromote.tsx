
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const AdminPromote = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handlePromote = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get all users (admin permission required; works only if anon key has access)
      const { data, error } = await supabase.auth.admin.listUsers();
      if (error) throw error;

      const user = data?.users?.find((u) => u.email === email);
      if (!user) {
        toast({
          variant: "destructive",
          title: "User not found",
          description: `No user with email ${email}`,
        });
        setLoading(false);
        return;
      }

      // Upsert into user_roles table
      const { error: upsertError } = await supabase
        .from("user_roles")
        .upsert([{ user_id: user.id, role: "admin" }]);
      if (upsertError) throw upsertError;

      toast({
        title: "Promoted!",
        description: `User ${email} is now an admin.`,
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Promotion failed",
        description: err.message || String(err),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md p-8">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Promote to Admin</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handlePromote}>
            <Input
              type="email"
              required
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <Button type="submit" className="w-full" disabled={loading || !email}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Promoting...
                </>
              ) : (
                "Make me admin"
              )}
            </Button>
          </form>
          <div className="mt-4 text-sm text-gray-500">
            <strong>Remove this page when done for security!</strong>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPromote;

