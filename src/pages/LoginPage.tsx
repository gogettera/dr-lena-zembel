
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{10,}$/;
// More secure password policy: min 10 chars, at least one letter, one number, one special character

// Generate a random CSRF token
const generateCSRFToken = () => {
  const array = new Uint32Array(4);
  window.crypto.getRandomValues(array);
  return Array.from(array).map(n => n.toString(16)).join('');
};

// Login rate limiting functions
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 60000; // 1 minute in milliseconds

const getLoginAttempts = () => {
  const attempts = localStorage.getItem('loginAttempts');
  return attempts ? parseInt(attempts, 10) : 0;
};

const getLastAttemptTime = () => {
  const time = localStorage.getItem('lastAttemptTime');
  return time ? parseInt(time, 10) : 0;
};

const updateLoginAttempts = (attempts: number) => {
  localStorage.setItem('loginAttempts', attempts.toString());
};

const updateLastAttemptTime = (time: number) => {
  localStorage.setItem('lastAttemptTime', time.toString());
};

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loginErrors, setLoginErrors] = useState<{email?: string, password?: string, csrf?: string}>({});
  const [csrfToken, setCsrfToken] = useState('');
  
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerErrors, setRegisterErrors] = useState<{email?: string, password?: string, confirm?: string, csrf?: string}>({});
  
  const [resetEmail, setResetEmail] = useState('');
  const [isResetSent, setIsResetSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetErrors, setResetErrors] = useState<{email?: string, csrf?: string}>({});

  const { toast } = useToast();
  const navigate = useNavigate();

  // Generate CSRF token on component mount
  useEffect(() => {
    setCsrfToken(generateCSRFToken());
  }, []);

  // Sanitize display text to prevent XSS
  const sanitizeText = (text: string): string => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  const validateEmail = (email: string): boolean => {
    return EMAIL_REGEX.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return PASSWORD_REGEX.test(password);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        setIsAuthenticated(!!session);
        
        // Set up auth state change listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, newSession) => {
            setIsAuthenticated(!!newSession);
          }
        );
        
        // Return cleanup function
        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Auth check error:", error);
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoginErrors({});
    
    const errors: {email?: string, password?: string, csrf?: string} = {};
    
    // Verify CSRF token
    if (!csrfToken) {
      errors.csrf = "Security token missing, please refresh the page";
      setLoginErrors(errors);
      return;
    }
    
    if (!email) {
      errors.email = "Email is required";
    } else if (!validateEmail(email)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!password) {
      errors.password = "Password is required";
    }
    
    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
      return;
    }
    
    // Check login rate limiting
    const loginAttempts = getLoginAttempts();
    const lastAttemptTime = getLastAttemptTime();
    const now = Date.now();
    
    if (loginAttempts >= MAX_LOGIN_ATTEMPTS && now - lastAttemptTime < LOCKOUT_DURATION) {
      const remainingTime = Math.ceil((LOCKOUT_DURATION - (now - lastAttemptTime)) / 1000);
      toast({
        title: "Too many attempts",
        description: `Please wait ${remainingTime} seconds before trying again`,
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    updateLoginAttempts(loginAttempts + 1);
    updateLastAttemptTime(now);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });
      
      if (error) {
        throw error;
      }
      
      // Reset login attempts on successful login
      updateLoginAttempts(0);
      
      // Generate new CSRF token
      setCsrfToken(generateCSRFToken());
      
      toast({
        title: "Login successful",
        description: "You are now logged in.",
      });
      
      navigate('/admin');
      
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setRegisterErrors({});
    
    const errors: {email?: string, password?: string, confirm?: string, csrf?: string} = {};
    
    // Verify CSRF token
    if (!csrfToken) {
      errors.csrf = "Security token missing, please refresh the page";
      setRegisterErrors(errors);
      return;
    }
    
    if (!registerEmail) {
      errors.email = "Email is required";
    } else if (!validateEmail(registerEmail)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!registerPassword) {
      errors.password = "Password is required";
    } else if (!validatePassword(registerPassword)) {
      errors.password = "Password must be at least 10 characters with at least one letter, one number, and one special character";
    }
    
    if (registerPassword !== confirmPassword) {
      errors.confirm = "Passwords do not match";
    }
    
    if (Object.keys(errors).length > 0) {
      setRegisterErrors(errors);
      return;
    }
    
    setRegisterLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: registerEmail.trim(),
        password: registerPassword,
        options: {
          emailRedirectTo: `${window.location.origin}/login`
        }
      });
      
      if (error) {
        throw error;
      }
      
      // Generate new CSRF token
      setCsrfToken(generateCSRFToken());
      
      toast({
        title: "Registration successful",
        description: "Please check your email for confirmation.",
      });
      
      setRegisterEmail('');
      setRegisterPassword('');
      setConfirmPassword('');
      
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: sanitizeText(error.message) || "An error occurred during registration.",
        variant: "destructive"
      });
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setResetErrors({});
    
    const errors: {email?: string, csrf?: string} = {};
    
    // Verify CSRF token
    if (!csrfToken) {
      errors.csrf = "Security token missing, please refresh the page";
      setResetErrors(errors);
      return;
    }
    
    if (!resetEmail) {
      setResetErrors({email: "Email is required"});
      return;
    } else if (!validateEmail(resetEmail)) {
      setResetErrors({email: "Please enter a valid email address"});
      return;
    }
    
    setResetLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail.trim(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        throw error;
      }
      
      // Generate new CSRF token
      setCsrfToken(generateCSRFToken());
      
      setIsResetSent(true);
      toast({
        title: "Reset email sent",
        description: "Check your email for a password reset link.",
      });
      
    } catch (error: any) {
      // Don't show specific error for security reasons
      toast({
        title: "Email sent",
        description: "If this email exists in our system, you will receive a password reset link.",
      });
      setIsResetSent(true);
    } finally {
      setResetLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/admin" />;
  }

  // Add hidden CSRF token to forms
  const CsrfTokenInput = () => (
    <input type="hidden" name="csrf_token" value={csrfToken} />
  );

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
                  <CsrfTokenInput />
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
                        className={cn("mt-1", loginErrors.email && "border-red-500")}
                        placeholder="Email address"
                        aria-invalid={!!loginErrors.email}
                      />
                      {loginErrors.email && (
                        <p className="text-red-500 text-xs mt-1">{loginErrors.email}</p>
                      )}
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
                        className={cn("mt-1", loginErrors.password && "border-red-500")}
                        placeholder="Password"
                        aria-invalid={!!loginErrors.password}
                      />
                      {loginErrors.password && (
                        <p className="text-red-500 text-xs mt-1">{loginErrors.password}</p>
                      )}
                    </div>
                    {loginErrors.csrf && (
                      <p className="text-red-500 text-xs mt-1">{loginErrors.csrf}</p>
                    )}
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
                  <CsrfTokenInput />
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
                        className={cn("mt-1", registerErrors.email && "border-red-500")}
                        placeholder="Email address"
                        aria-invalid={!!registerErrors.email}
                      />
                      {registerErrors.email && (
                        <p className="text-red-500 text-xs mt-1">{registerErrors.email}</p>
                      )}
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
                        className={cn("mt-1", registerErrors.password && "border-red-500")}
                        placeholder="Password (10+ chars, letters, numbers & special chars)"
                        aria-invalid={!!registerErrors.password}
                      />
                      {registerErrors.password && (
                        <p className="text-red-500 text-xs mt-1">{registerErrors.password}</p>
                      )}
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
                        className={cn("mt-1", registerErrors.confirm && "border-red-500")}
                        placeholder="Confirm password"
                        aria-invalid={!!registerErrors.confirm}
                      />
                      {registerErrors.confirm && (
                        <p className="text-red-500 text-xs mt-1">{registerErrors.confirm}</p>
                      )}
                    </div>
                    {registerErrors.csrf && (
                      <p className="text-red-500 text-xs mt-1">{registerErrors.csrf}</p>
                    )}
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
              <CsrfTokenInput />
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
                    className={cn("mt-1", resetErrors.email && "border-red-500")}
                    placeholder="Email address"
                    aria-invalid={!!resetErrors.email}
                  />
                  {resetErrors.email && (
                    <p className="text-red-500 text-xs mt-1">{resetErrors.email}</p>
                  )}
                  {resetErrors.csrf && (
                    <p className="text-red-500 text-xs mt-1">{resetErrors.csrf}</p>
                  )}
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
