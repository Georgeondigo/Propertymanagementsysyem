import { ReactNode } from "react";
import { TenantSidebar } from "./TenantSidebar";
import { TenantTopbar } from "./TenantTopbar";
import { SidebarProvider } from "@/components/ui/sidebar";

interface TenantLayoutProps {
  children: ReactNode;
}

export const TenantLayout = ({ children }: TenantLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-tenant-bg">
        <TenantSidebar />
        <div className="flex-1 flex flex-col">
          <TenantTopbar />
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};