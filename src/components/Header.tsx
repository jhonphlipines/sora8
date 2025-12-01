import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { toast } from "sonner";
import { BookOpen, Trophy, User, LogOut, Settings } from "lucide-react";

export function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<{ avatar_url?: string; display_name?: string } | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("avatar_url, display_name")
        .eq("user_id", userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error signing out");
    } else {
      toast.success("Signed out successfully");
    }
  };

  return (
    <header className="h-14 flex items-center border-b border-border bg-card px-2 sm:px-4">
      <SidebarTrigger className="mr-2 sm:mr-4" />
      
      <div className="flex items-center justify-between flex-1">
        <div className="text-base sm:text-xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent">
          CodeCert
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
          {/* Desktop Navigation - Hidden on mobile */}
          <Button 
            variant="ghost" 
            onClick={() => navigate('/learn')} 
            className="hidden md:flex text-foreground hover:text-primary"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Learn
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/pricing')} 
            className="hidden md:flex text-foreground hover:text-primary"
          >
            Pricing
          </Button>
          
          {/* Test Button - Visible on all screens */}
          <Button 
            variant="default" 
            onClick={() => navigate('/tests')} 
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm px-2 sm:px-4"
          >
            <Trophy className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
            <span className="hidden sm:inline">Test</span>
          </Button>
          
          <ThemeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-7 w-7 sm:h-8 sm:w-8 ml-1 sm:ml-2 cursor-pointer hover:opacity-80 transition-opacity">
                <AvatarImage src={profile?.avatar_url || ""} alt="Profile" />
                <AvatarFallback className="bg-primary/10 text-primary text-xs sm:text-sm">
                  {profile?.display_name?.[0]?.toUpperCase() || <User className="h-3 w-3 sm:h-4 sm:w-4" />}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 sm:w-56">
              {user ? (
                <>
                  <div className="px-2 py-1.5 text-xs sm:text-sm text-muted-foreground truncate">
                    {user.email}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-xs sm:text-sm" onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-xs sm:text-sm" onClick={handleSignOut}>
                    <LogOut className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem className="cursor-pointer text-xs sm:text-sm" onClick={() => navigate('/auth')}>
                    <User className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Sign In
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-xs sm:text-sm" onClick={() => navigate('/auth')}>
                    <User className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Sign Up
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
