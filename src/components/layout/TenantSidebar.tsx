import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CreditCard,
  Zap,
  FileText,
  Users,
  MessageSquare,
  Bell,
  FileUser,
  User,
  HelpCircle,
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

const navigation = [
  { name: "Dashboard", href: "/tenant", icon: LayoutDashboard },
  { name: "Payments", href: "/tenant/payments", icon: CreditCard },
  { name: "Utilities", href: "/tenant/utilities", icon: Zap },
  { name: "Invoices", href: "/tenant/invoices", icon: FileText },
  { name: "Guests", href: "/tenant/guests", icon: Users },
  { name: "Support", href: "/tenant/support", icon: MessageSquare },
  { name: "Announcements", href: "/tenant/announcements", icon: Bell },
  { name: "Documents", href: "/tenant/documents", icon: FileUser },
  { name: "Profile", href: "/tenant/profile", icon: User },
  { name: "Help", href: "/tenant/help", icon: HelpCircle },
];

export const TenantSidebar = () => {
  const location = useLocation();
  const { state } = useSidebar();

  return (
    <Sidebar 
      className={cn(
        "bg-tenant-sidebar text-tenant-sidebar-foreground border-r border-tenant-hover",
        state === "collapsed" ? "w-14" : "w-64"
      )}
      collapsible="icon"
    >
      <SidebarHeader className="p-6 border-b border-tenant-hover">
        {state !== "collapsed" && (
          <>
            <h1 className="text-xl font-bold text-tenant-accent">PropertyHub</h1>
            <p className="text-sm text-muted-foreground">Tenant Portal</p>
          </>
        )}
        {state === "collapsed" && (
          <div className="flex justify-center">
            <div className="h-8 w-8 rounded-lg bg-tenant-accent flex items-center justify-center text-white text-sm font-bold">
              P
            </div>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="flex-1 p-4">
        <SidebarGroup>
          <SidebarGroupLabel className={cn("text-tenant-sidebar-foreground/80", state === "collapsed" && "sr-only")}>
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
                            : "text-tenant-sidebar-foreground hover:bg-tenant-hover"
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

      {state !== "collapsed" && (
        <SidebarFooter className="p-4 border-t border-tenant-hover">
          <div className="space-y-2">
            <NavLink
              to="/tenant/payments"
              className="flex items-center gap-2 w-full px-3 py-2 text-sm bg-success text-success-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              <CreditCard className="h-4 w-4" />
              <span>Pay Rent</span>
            </NavLink>
            <NavLink
              to="/tenant/support"
              className="flex items-center gap-2 w-full px-3 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Get Help</span>
            </NavLink>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
};