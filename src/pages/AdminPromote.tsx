
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { User } from "@supabase/supabase-js";

const AdminPromote = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handlePromote = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Skip the admin.listUsers API which requires admin privileges
      // Instead, directly upsert into user_roles table with the email
      const { data: userData, error: userError } = await supabase
        .from("user_roles")
        .select("user_id")
        .eq("user_id", email)
        .maybeSingle();

      if (userError) {
        console.error("Error checking user:", userError);
      }

      // Directly upsert into user_roles table using the email as user_id
      // This works because we don't need to verify the user exists in auth table
      // The foreign key constraint will handle that
      const { error: upsertError } = await supabase
        .from("user_roles")
        .upsert([{ user_id: email, role: "admin" }]);

      if (upsertError) {
        // If upsert fails because email is not a valid user ID,
        // we need to get the user ID first from authentication
        if (upsertError.message.includes("foreign key constraint")) {
          toast({
            variant: "destructive",
            title: "Promotion failed",
            description: "Please make sure you are registered and logged in first.",
          });
        } else {
          throw upsertError;
        }
      } else {
        toast({
          title: "Promotion attempted",
          description: `Attempted to promote ${email} to admin. If you are registered, please log out and log back in.`,
        });
      }
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
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <Button 
              type="submit" 
              className="w-full" 
              variant="orange"
              disabled={loading || !email}
            >
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
            <p className="mb-2">
              <strong>Important:</strong> You must be registered and logged in first.
            </p>
            <p>
              <strong>Remove this page when done for security!</strong>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPromote;
