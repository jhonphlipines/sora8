import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { z } from "zod";
import { Code2, Trophy, BookOpen, Target, CheckCircle2, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
const authSchema = z.object({
  email: z.string().email("Invalid email address").max(255),
  password: z.string().min(6, "Password must be at least 6 characters").max(100)
});
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "";
const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [showAuthForm, setShowAuthForm] = useState(false);

  // Store referral code if present
  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) {
      localStorage.setItem('referral_code', ref);
    }
  }, [searchParams]);
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: {
          session
        }
      } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };
    checkUser();
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && (event === 'SIGNED_IN' || event === 'USER_UPDATED')) {
        // Track referral signup
        const referralCode = localStorage.getItem('referral_code');
        if (referralCode && session.user) {
          trackReferralSignup(referralCode, session.user.id);
          localStorage.removeItem('referral_code');
        }
        navigate("/");
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);
  const trackReferralSignup = async (referralCode: string, userId: string) => {
    try {
      // Find the affiliate link by referral code
      const {
        data: affiliateLink
      } = await supabase.from('affiliate_links').select('id').eq('referral_code', referralCode).eq('is_active', true).single();
      if (affiliateLink) {
        // Record the signup
        await supabase.from('affiliate_signups').insert({
          affiliate_link_id: affiliateLink.id,
          referred_user_id: userId
        });
      }
    } catch (error) {
      console.error('Error tracking referral:', error);
    }
  };
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validated = authSchema.parse({
        email,
        password
      });
      setLoading(true);
      const {
        error
      } = await supabase.auth.signUp({
        email: validated.email,
        password: validated.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`
        }
      });
      if (error) {
        if (error.message.includes("already registered")) {
          toast.error("This email is already registered. Please sign in instead.");
        } else {
          toast.error(error.message);
        }
        return;
      }
      toast.success("Account created successfully! You can now sign in.");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("An error occurred during sign up");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validated = authSchema.parse({
        email,
        password
      });
      setLoading(true);
      const {
        error
      } = await supabase.auth.signInWithPassword({
        email: validated.email,
        password: validated.password
      });
      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast.error("Invalid email or password");
        } else {
          toast.error(error.message);
        }
        return;
      }
      toast.success("Signed in successfully!");
      navigate("/");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("An error occurred during sign in");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    setSocialLoading(provider);
    try {
      const {
        error
      } = await supabase.auth.signInWithOAuth({
        provider: provider === 'facebook' ? 'facebook' : 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });
      if (error) {
        toast.error(`Failed to sign in with ${provider}: ${error.message}`);
      }
    } catch (error) {
      toast.error(`An error occurred during ${provider} sign in`);
    } finally {
      setSocialLoading(null);
    }
  };
  const features = [{
    icon: Code2,
    title: "Interactive Coding",
    description: "Write and execute code in real-time with our built-in editor"
  }, {
    icon: BookOpen,
    title: "Structured Learning",
    description: "Progress through levels from beginner to advanced"
  }, {
    icon: Target,
    title: "Practice Problems",
    description: "Solve real-world coding challenges and improve your skills"
  }, {
    icon: Trophy,
    title: "Earn Certificates",
    description: "Get recognized for your achievements with downloadable certificates"
  }, {
    icon: CheckCircle2,
    title: "Track Progress",
    description: "Monitor your learning journey with detailed analytics"
  }];
  const GoogleIcon = () => <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>;
  const FacebookIcon = () => <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#1877F2" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>;
  return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary/20 p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Features (Desktop) */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Master Programming
            </h1>
            <p className="text-xl text-muted-foreground">
              Learn, practice, and excel with interactive coding challenges
            </p>
          </div>

          <div className="space-y-6">
            {features.map((feature, index) => <div key={index} className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>)}
          </div>
        </div>

        {/* Mobile View - Website Details First */}
        <div className={`lg:hidden ${showAuthForm ? 'hidden' : 'block'}`}>
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Master Programming
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Learn, practice, and excel with interactive coding challenges
              </p>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-card/50 border border-border/30">
                  <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>)}
            </div>

            <div className="pt-4 space-y-3">
              <Button onClick={() => setShowAuthForm(true)} className="w-full text-base py-6">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="ghost" onClick={() => navigate("/")} className="w-full">
                Back to Home
              </Button>
            </div>
          </div>
        </div>

        {/* Auth Card - Always visible on desktop, toggled on mobile */}
        <Card className={`w-full shadow-xl ${showAuthForm ? 'block' : 'hidden lg:block'}`}>
          {/* Mobile Back Button */}
          <div className="lg:hidden p-4 pb-0">
            <Button variant="ghost" size="sm" onClick={() => setShowAuthForm(false)} className="text-muted-foreground">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back
            </Button>
          </div>
          
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome</CardTitle>
            <CardDescription className="text-center">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Social Login Buttons */}
            <div className="space-y-3 mb-6">
              <Button variant="outline" className="w-full h-11 gap-2 rounded-sm" onClick={() => handleSocialLogin('google')} disabled={socialLoading !== null}>
                {socialLoading === 'google' ? <Loader2 className="h-5 w-5 animate-spin" /> : <GoogleIcon />}
                Continue with Google
              </Button>
              
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
              </div>
            </div>

            <Tabs defaultValue="signup" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input id="signin-email" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input id="signin-password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input id="signup-email" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input id="signup-password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
                  </div>
                  <Button type="submit" className="w-full rounded-sm" disabled={loading}>
                    {loading ? "Creating account..." : "Sign Up"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center lg:block">
            <Button variant="ghost" onClick={() => navigate("/")} className="hidden lg:inline-flex">
              Back to Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>;
};
export default Auth;