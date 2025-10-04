import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { toast } from "sonner";
import { BookOpen, Trophy, User, LogOut } from "lucide-react";

export function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error signing out");
    } else {
      toast.success("Signed out successfully");
    }
  };

  return (
    <header className="h-14 flex items-center border-b border-border bg-card px-4">
      <SidebarTrigger className="mr-4" />
      
      <div className="flex items-center justify-between flex-1">
        <div className="text-xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent">
          CodeCert
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/learn')} className="text-foreground hover:text-primary">
            <BookOpen className="h-4 w-4 mr-2" />
            Learn
          </Button>
          <Button variant="ghost" onClick={() => navigate('/pricing')} className="text-foreground hover:text-primary">
            Pricing
          </Button>
          
          <Button variant="default" onClick={() => navigate('/tests')} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Trophy className="h-4 w-4 mr-2" />
            Test
          </Button>
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 ml-2 cursor-pointer hover:opacity-80 transition-opacity">
                <AvatarImage src="" alt="Profile" />
                <AvatarFallback className="bg-primary/10 text-primary">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {user ? (
                <>
                  <div className="px-2 py-1.5 text-sm text-muted-foreground">
                    {user.email}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/auth')}>
                    <User className="mr-2 h-4 w-4" />
                    Sign In
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/auth')}>
                    <User className="mr-2 h-4 w-4" />
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
