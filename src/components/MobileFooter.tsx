import { Code, BookOpen, Bot, FileText } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const MobileFooter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Code, label: "Code", path: "/interactive-courses" },
    { icon: BookOpen, label: "Subject", path: "/learn" },
    { icon: Bot, label: "AI", path: "/ai" },
    { icon: FileText, label: "Notes", path: "/notes" },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border md:hidden">
      <nav className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors",
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </footer>
  );
};

export default MobileFooter;
