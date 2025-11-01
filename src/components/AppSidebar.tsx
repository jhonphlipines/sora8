import { useState } from "react";
import { Home, BookOpen, Trophy, Settings, Code, Database, Globe, Smartphone, Target, Award, DollarSign, BarChart3, ChevronRight } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, useSidebar } from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
const mainItems = [{
  title: "Home",
  url: "/",
  icon: Home
}, {
  title: "Completion",
  url: "/completion",
  icon: Award
}, {
  title: "Analysis",
  url: "/data-analysis",
  icon: BarChart3
}, {
  title: "Pricing",
  url: "/pricing",
  icon: DollarSign
}];
const labItems = [{
  title: "Courses",
  icon: BookOpen,
  subItems: [{
    title: "courses",
    url: "/learn",
    icon: Code
  }, {
    title: "practice",
    url: "/practice",
    icon: Target
  }]
}, {
  title: "Assessment Lab",
  icon: Trophy,
  subItems: [{
    title: "Quick Tests",
    url: "/tests",
    icon: Target
  }, {
    title: "Level Tests",
    url: "/levels",
    icon: BarChart3
  }, {
    title: "Certification",
    url: "/tests",
    icon: Award
  }]
}];
const adminItems = [{
  title: "Lab Settings",
  url: "/settings",
  icon: Settings
}, {
  title: "Performance",
  url: "/performance",
  icon: BarChart3
}];
export function AppSidebar() {
  const {
    state
  } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "Courses": true,
    "Assessment Lab": true
  });
  const isActive = (path: string) => currentPath === path || path === "/learn" && currentPath.startsWith("/learn");
  const getNavClass = (isActive: boolean) => isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "hover:bg-sidebar-accent/50 text-sidebar-foreground";
  const toggleSection = (title: string) => {
    setOpenSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };
  return <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-sidebar-background">
        {/* Brand Section */}
        {!isCollapsed && <div className="p-4 border-b border-sidebar-border">
            <h2 className="text-lg font-bold text-sidebar-foreground">
              🧪 CodeCert Labs
            </h2>
            <p className="text-xs text-sidebar-foreground/70">Development Environment</p>
          </div>}

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map(item => <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={getNavClass(isActive(item.url))}>
                    <NavLink to={item.url} end>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Lab Sections */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">Learning</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {labItems.map(item => <SidebarMenuItem key={item.title}>
                  <Collapsible open={openSections[item.title]} onOpenChange={() => toggleSection(item.title)}>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="hover:bg-sidebar-accent/50 text-sidebar-foreground w-full">
                        <item.icon className="h-4 w-4" />
                        {!isCollapsed && <>
                            <span className="flex-1 text-left">{item.title}</span>
                            <ChevronRight className={`h-4 w-4 transition-transform ${openSections[item.title] ? "rotate-90" : ""}`} />
                          </>}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {!isCollapsed && <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subItems?.map(subItem => <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild className={getNavClass(isActive(subItem.url))}>
                                <NavLink to={subItem.url}>
                                  <subItem.icon className="h-3 w-3" />
                                  <span>{subItem.title}</span>
                                </NavLink>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>)}
                        </SidebarMenuSub>
                      </CollapsibleContent>}
                  </Collapsible>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admin Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">
        </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map(item => <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={getNavClass(isActive(item.url))}>
                    
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>;
}