import { useNavigate } from "react-router-dom";
import { useAuth, useUser, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { BookOpen, Trophy, User } from "lucide-react";

export function Header() {
  const navigate = useNavigate();
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();

  return (
    <header className="h-14 flex items-center border-b border-border bg-card px-2 sm:px-4">
      <SidebarTrigger className="mr-2 sm:mr-4" />
      
      <div className="flex items-center justify-between flex-1">
        <div className="flex items-center gap-2">
          <img 
            alt="Logo" 
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg" 
            src="https://img.icons8.com/puffy-filled/64/FD7E14/v.png" 
          />
          <span className="text-base sm:text-xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent">
            CodeCert
          </span>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Desktop Navigation - Hidden on smaller screens */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/learn')} 
            className="hidden lg:flex text-foreground hover:text-primary text-sm px-2"
          >
            <BookOpen className="h-4 w-4 mr-1" />
            Learn
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/pricing')} 
            className="hidden lg:flex text-foreground hover:text-primary text-sm px-2"
          >
            Pricing
          </Button>
          
          {/* Test Button - Compact on mobile */}
          <Button 
            variant="default" 
            size="sm" 
            onClick={() => navigate('/tests')} 
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs px-2 sm:px-3"
          >
            <Trophy className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline ml-1">Test</span>
          </Button>
          
          <ThemeToggle />
          
          {isLoaded && isSignedIn ? (
            <UserButton 
              afterSignOutUrl="/auth"
              appearance={{
                elements: {
                  avatarBox: "h-7 w-7",
                }
              }}
            />
          ) : (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/auth')}
              className="text-xs sm:text-sm"
            >
              <User className="h-4 w-4 mr-1" />
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}