import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building,
  FileText,
  Zap,
  CreditCard,
  Wrench,
  MessageSquare,
  UserCheck,
  BarChart3,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Tenants", href: "/tenants", icon: Users },
  { name: "Units", href: "/units", icon: Building },
  { name: "Leases", href: "/leases", icon: FileText },
  { name: "Utilities", href: "/utilities", icon: Zap },
  { name: "Payments", href: "/payments", icon: CreditCard },
  { name: "Maintenance", href: "/maintenance", icon: Wrench },
  { name: "Messages", href: "/messages", icon: MessageSquare },
  { name: "Guests", href: "/guests", icon: UserCheck },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export const AdminSidebar = () => {
  const location = useLocation();
  const { user, profile } = useAuth();
  const { state } = useSidebar();

  const getInitials = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase();
    }
    return user?.email?.[0]?.toUpperCase() || "A";
  };

  const getDisplayName = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name} ${profile.last_name}`;
    }
    return user?.email || "Admin";
  };

  return (
    <Sidebar 
      className={cn(
        "bg-admin-sidebar text-admin-sidebar-foreground border-r border-admin-sidebar-hover",
        state === "collapsed" ? "w-14" : "w-64"
      )}
      collapsible="icon"
    >
      <SidebarHeader className="p-6 border-b border-admin-sidebar-hover">
        {state !== "collapsed" && (
          <>
            <h1 className="text-xl font-bold text-tenant-accent">PropertyHub</h1>
            <p className="text-sm text-admin-sidebar-foreground/60">Admin Panel</p>
          </>
        )}
        {state === "collapsed" && (
          <div className="flex justify-center">
            <div className="h-8 w-8 rounded-lg bg-admin-sidebar-accent flex items-center justify-center text-white text-sm font-bold">
              P
            </div>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="flex-1 p-4">
        <SidebarGroup>
          <SidebarGroupLabel className={cn("text-admin-sidebar-foreground/80", state === "collapsed" && "sr-only")}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild className="h-auto p-0">
                      <NavLink
                        to={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full",
                          isActive
                            ? "bg-tenant-accent text-white"
                            : "text-admin-sidebar-foreground hover:bg-admin-sidebar-hover hover:text-white"
                        )}
                      >
                        <Icon className="h-5 w-5 flex-shrink-0" />
                        {state !== "collapsed" && <span className="font-medium">{item.name}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-admin-sidebar-hover">
        <div className={cn(
          "flex items-center gap-3 p-3 rounded-lg bg-admin-sidebar-hover",
          state === "collapsed" && "justify-center"
        )}>
          <div className="h-8 w-8 rounded-full bg-admin-sidebar-accent flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
            {getInitials()}
          </div>
          {state !== "collapsed" && (
            <div className="flex-1 min-w-0">
              <p className="text-sm  text-white font-medium truncate">{getDisplayName()}</p>
              <p className="text-xs  text-white text-admin-sidebar-foreground/60">Property Manager</p>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};