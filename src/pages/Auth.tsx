import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SignIn, SignUp, useAuth } from "@clerk/clerk-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Trophy, BookOpen, Target, CheckCircle2 } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate("/");
    }
  }, [isSignedIn, isLoaded, navigate]);

  const features = [
    {
      icon: Code2,
      title: "Interactive Coding",
      description: "Write and execute code in real-time with our built-in editor"
    },
    {
      icon: BookOpen,
      title: "Structured Learning",
      description: "Progress through levels from beginner to advanced"
    },
    {
      icon: Target,
      title: "Practice Problems",
      description: "Solve real-world coding challenges and improve your skills"
    },
    {
      icon: Trophy,
      title: "Earn Certificates",
      description: "Get recognized for your achievements with downloadable certificates"
    },
    {
      icon: CheckCircle2,
      title: "Track Progress",
      description: "Monitor your learning journey with detailed analytics"
    }
  ];

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary/20 p-4">
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
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Auth Card */}
        <Card className="w-full shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome</CardTitle>
            <CardDescription className="text-center">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" className="flex justify-center">
                <SignIn 
                  routing="hash"
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "shadow-none p-0 w-full",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                      socialButtonsBlockButton: "border border-border",
                      formFieldInput: "border border-border bg-background",
                      footerActionLink: "text-primary hover:text-primary/80",
                    }
                  }}
                />
              </TabsContent>
              
              <TabsContent value="signup" className="flex justify-center">
                <SignUp 
                  routing="hash"
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "shadow-none p-0 w-full",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                      socialButtonsBlockButton: "border border-border",
                      formFieldInput: "border border-border bg-background",
                      footerActionLink: "text-primary hover:text-primary/80",
                    }
                  }}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;