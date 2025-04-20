
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

  const handleAuth = async (e: React.FormEvent, isLogin: boolean) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      console.log(`Attempting to ${isLogin ? 'login' : 'register'} with email:`, email);
      
      // Attempt login or registration
      const { data: authData, error: authError } = isLogin 
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

      if (authError) {
        console.error("Authentication error:", authError);
        setErrorMessage(`Authentication failed: ${authError.message}`);
        throw authError;
      }

      console.log("Auth successful, user:", authData.user?.id);
      
      if (authData.user) {
        // For new registrations, create admin role
        if (!isLogin) {
          const { error: roleError } = await supabase
            .from('user_roles')
            .insert([
              { user_id: authData.user.id, role: 'admin' }
            ]);

          if (roleError) {
            console.error("Role assignment error:", roleError);
            setErrorMessage(`Role assignment failed: ${roleError.message}`);
            throw roleError;
          }
        }

        // Check if user has admin role
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
            title: isLogin ? "Login successful" : "Registration successful",
            description: isLogin ? "Welcome back, administrator!" : "Admin account created successfully!",
            variant: "default",
          });
          navigate('/admin');
        } else {
          console.log("User is not an admin, signing out");
          await supabase.auth.signOut();
          setErrorMessage("You don't have administrator privileges");
        }
      }
    } catch (error: any) {
      console.error("Login process failed:", error);
      toast({
        title: "Authentication failed",
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
            Admin Portal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            {errorMessage && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
                {errorMessage}
              </div>
            )}

            <TabsContent value="login">
              <form onSubmit={(e) => handleAuth(e, true)} className="space-y-4">
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
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={(e) => handleAuth(e, false)} className="space-y-4">
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
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...
                    </>
                  ) : (
                    'Create Admin Account'
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="text-sm text-center text-gray-500">
          <p>Protected admin area. Unauthorized access is prohibited.</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
