
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      console.log("Attempting login with email:", email);
      
      // Step 1: Sign in with email and password
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        console.error("Authentication error:", authError);
        setErrorMessage(`Authentication failed: ${authError.message}`);
        throw authError;
      }

      console.log("Auth successful, user:", authData.user?.id);
      
      if (authData.user) {
        // Step 2: Check if user has admin role
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', authData.user.id)
          .maybeSingle();

        if (roleError) {
          console.error("Role check error:", roleError);
          setErrorMessage(`Role verification failed: ${roleError.message}`);
          throw roleError;
        }

        console.log("Role data:", roleData);

        if (roleData?.role === 'admin') {
          console.log("Admin role confirmed, redirecting to admin panel");
          toast({
            title: "Login successful",
            description: "Welcome back, administrator!",
            variant: "default",
          });
          navigate('/admin');
        } else {
          console.log("User is not an admin, signing out");
          await supabase.auth.signOut();
          setErrorMessage("You don't have administrator privileges");
          throw new Error('Unauthorized access');
        }
      }
    } catch (error: any) {
      console.error("Login process failed:", error);
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials or unauthorized access",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-8">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center font-bold">
            Admin Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-sm text-center text-gray-500">
          <p>Contact your system administrator if you need access.</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
