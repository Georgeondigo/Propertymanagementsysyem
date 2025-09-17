import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { TenantLayout } from "@/components/layout/TenantLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";

// Pages
import Dashboard from "./pages/Dashboard";
import Tenants from "./pages/Tenants";
import Units from "./pages/Units";
import Leases from "./pages/Leases";
import Utilities from "./pages/Utilities";
import Payments from "./pages/Payments";
import Maintenance from "./pages/Maintenance";
import Messages from "./pages/Messages";
import Guests from "./pages/Guests";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TenantDashboard from "./pages/tenant/TenantDashboard";
import TenantPayments from "./pages/tenant/TenantPayments";
import TenantUtilities from "./pages/tenant/TenantUtilities";
import TenantInvoices from "./pages/tenant/TenantInvoices";
import TenantGuests from "./pages/tenant/TenantGuests";
import TenantSupport from "./pages/tenant/TenantSupport";
import TenantAnnouncements from "./pages/tenant/TenantAnnouncements";
import TenantDocuments from "./pages/tenant/TenantDocuments";
import TenantProfile from "./pages/tenant/TenantProfile";
import TenantHelp from "./pages/tenant/TenantHelp";

const queryClient = new QueryClient();

const AppRouter = () => {
  const { profile } = useAuth();

  return (
    <Routes>
      {/* Authentication Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin/Staff Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute requiredRoles={["admin", "staff"]}>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenants"
        element={
          <ProtectedRoute requiredRoles={["admin", "staff"]}>
            <AdminLayout>
              <Tenants />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/units"
        element={
          <ProtectedRoute requiredRoles={["admin", "staff"]}>
            <AdminLayout>
              <Units />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/leases"
        element={
          <ProtectedRoute requiredRoles={["admin", "staff"]}>
            <AdminLayout>
              <Leases />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/utilities"
        element={
          <ProtectedRoute requiredRoles={["admin", "staff"]}>
            <AdminLayout>
              <Utilities />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/payments"
        element={
          <ProtectedRoute requiredRoles={["admin", "staff"]}>
            <AdminLayout>
              <Payments />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/maintenance"
        element={
          <ProtectedRoute requiredRoles={["admin", "staff"]}>
            <AdminLayout>
              <Maintenance />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/messages"
        element={
          <ProtectedRoute requiredRoles={["admin", "staff"]}>
            <AdminLayout>
              <Messages />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/guests"
        element={
          <ProtectedRoute requiredRoles={["admin", "staff"]}>
            <AdminLayout>
              <Guests />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics"
        element={
          <ProtectedRoute requiredRoles={["admin", "staff"]}>
            <AdminLayout>
              <Analytics />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute requiredRoles={["admin", "staff"]}>
            <AdminLayout>
              <Settings />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* Tenant Routes */}
      <Route
        path="/tenant"
        element={
          <ProtectedRoute requiredRoles={["tenant"]}>
            <TenantLayout>
              <TenantDashboard />
            </TenantLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenant/payments"
        element={
          <ProtectedRoute requiredRoles={["tenant"]}>
            <TenantLayout>
              <TenantPayments />
            </TenantLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenant/utilities"
        element={
          <ProtectedRoute requiredRoles={["tenant"]}>
            <TenantLayout>
              <TenantUtilities />
            </TenantLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenant/invoices"
        element={
          <ProtectedRoute requiredRoles={["tenant"]}>
            <TenantLayout>
              <TenantInvoices />
            </TenantLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenant/guests"
        element={
          <ProtectedRoute requiredRoles={["tenant"]}>
            <TenantLayout>
              <TenantGuests />
            </TenantLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenant/support"
        element={
          <ProtectedRoute requiredRoles={["tenant"]}>
            <TenantLayout>
              <TenantSupport />
            </TenantLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenant/announcements"
        element={
          <ProtectedRoute requiredRoles={["tenant"]}>
            <TenantLayout>
              <TenantAnnouncements />
            </TenantLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenant/documents"
        element={
          <ProtectedRoute requiredRoles={["tenant"]}>
            <TenantLayout>
              <TenantDocuments />
            </TenantLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenant/profile"
        element={
          <ProtectedRoute requiredRoles={["tenant"]}>
            <TenantLayout>
              <TenantProfile />
            </TenantLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenant/help"
        element={
          <ProtectedRoute requiredRoles={["tenant"]}>
            <TenantLayout>
              <TenantHelp />
            </TenantLayout>
          </ProtectedRoute>
        }
      />

      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
