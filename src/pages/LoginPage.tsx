
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const LoginPage = () => {
  // Login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  // Registration state
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerLoading, setRegisterLoading] = useState(false);
  
  // Reset password state
  const [resetEmail, setResetEmail] = useState('');
  const [isResetSent, setIsResetSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Login successful",
        description: "You are now logged in.",
      });
      
      // Redirect to admin panel after successful login
      navigate('/admin');
      
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error.message || "An error occurred during login.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerEmail || !registerPassword) {
      toast({
        title: "Error",
        description: "Please enter both email and password.",
        variant: "destructive"
      });
      return;
    }
    
    if (registerPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      return;
    }
    
    setRegisterLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: registerEmail,
        password: registerPassword
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Registration successful",
        description: "Please check your email for confirmation.",
      });
      
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "An error occurred during registration.",
        variant: "destructive"
      });
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resetEmail) {
      toast({
        title: "Error",
        description: "Please enter your email.",
        variant: "destructive"
      });
      return;
    }
    
    setResetLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: window.location.origin + '/reset-password',
      });
      
      if (error) {
        throw error;
      }
      
      setIsResetSent(true);
      toast({
        title: "Reset email sent",
        description: "Check your email for a password reset link.",
      });
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send reset email.",
        variant: "destructive"
      });
    } finally {
      setResetLoading(false);
    }
  };

  // If already authenticated, redirect to admin panel
  if (isAuthenticated) {
    return <Navigate to="/admin" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-beige py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        {!showResetForm ? (
          <>
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold text-dental-navy">Admin Access</h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Sign in to access the admin panel
              </p>
            </div>
            
            <Tabs defaultValue="login" className="mt-8">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form className="space-y-6" onSubmit={handleLogin}>
                  <div className="rounded-md shadow-sm space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1"
                        placeholder="Email address"
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1"
                        placeholder="Password"
                      />
                    </div>
                  </div>

                  <div>
                    <Button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-dental-navy hover:bg-dental-orange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dental-orange"
                      disabled={loading}
                    >
                      {loading ? "Logging in..." : "Sign in"}
                    </Button>
                  </div>
                </form>
                
                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={() => setShowResetForm(true)}
                    className="text-sm text-dental-navy hover:text-dental-orange"
                  >
                    Forgot password?
                  </button>
                </div>
              </TabsContent>
              
              <TabsContent value="register">
                <form className="space-y-6" onSubmit={handleRegistration}>
                  <div className="rounded-md shadow-sm space-y-4">
                    <div>
                      <label htmlFor="register-email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <Input
                        id="register-email"
                        name="email"
                        type="email"
                        required
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        className="mt-1"
                        placeholder="Email address"
                      />
                    </div>
                    <div>
                      <label htmlFor="register-password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <Input
                        id="register-password"
                        name="password"
                        type="password"
                        required
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        className="mt-1"
                        placeholder="Password"
                      />
                    </div>
                    <div>
                      <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                        Confirm Password
                      </label>
                      <Input
                        id="confirm-password"
                        name="confirm-password"
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1"
                        placeholder="Confirm password"
                      />
                    </div>
                  </div>

                  <div>
                    <Button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-dental-navy hover:bg-dental-orange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dental-orange"
                      disabled={registerLoading}
                    >
                      {registerLoading ? "Registering..." : "Register"}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <>
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold text-dental-navy">Reset Password</h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                {isResetSent ? "Check your email for a reset link" : "Enter your email to receive a password reset link"}
              </p>
            </div>
            
            <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
              <div className="rounded-md shadow-sm">
                <div>
                  <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Input
                    id="reset-email"
                    name="email"
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="mt-1"
                    placeholder="Email address"
                  />
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-dental-navy hover:bg-dental-orange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dental-orange"
                  disabled={resetLoading || isResetSent}
                >
                  {resetLoading ? "Sending..." : isResetSent ? "Email Sent" : "Send Reset Link"}
                </Button>
              </div>
              
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowResetForm(false)}
                  className="text-sm text-dental-navy hover:text-dental-orange"
                >
                  Back to login
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
