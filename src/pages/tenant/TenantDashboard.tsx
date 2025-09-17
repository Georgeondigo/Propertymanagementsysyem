import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  Zap, 
  Bell, 
  Calendar, 
  Users, 
  MessageSquare,
  DollarSign,
  AlertCircle,
  TrendingUp,
  Clock
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

const TenantDashboard = () => {
  const { profile } = useAuth();

  // Mock data - replace with real data from Supabase
  const dashboardData = {
    currentBalance: 2500,
    nextDueDate: "2024-02-01",
    utilityCharges: 150,
    unit: "304",
    announcements: 2,
    pendingGuests: 1,
    openTickets: 0,
  };

  const recentActivity = [
    {
      id: 1,
      type: "payment",
      description: "Rent payment processed",
      amount: "$2,500",
      date: "Jan 15, 2024",
      status: "completed",
    },
    {
      id: 2,
      type: "utility",
      description: "Utility reading recorded",
      details: "Water: 125 units, Electric: 340 kWh",
      date: "Jan 10, 2024",
      status: "recorded",
    },
    {
      id: 3,
      type: "guest",
      description: "Guest pass approved",
      details: "Sarah Johnson - Jan 20, 2024",
      date: "Jan 8, 2024",
      status: "approved",
    },
  ];

  const quickActions = [
    {
      title: "Pay Rent",
      description: "Make your monthly payment",
      icon: CreditCard,
      href: "/tenant/payments",
      color: "bg-success",
    },
    {
      title: "View Utilities",
      description: "Check usage & bills",
      icon: Zap,
      href: "/tenant/utilities",
      color: "bg-info",
    },
    {
      title: "Submit Request",
      description: "Maintenance or support",
      icon: MessageSquare,
      href: "/tenant/support",
      color: "bg-warning",
    },
    {
      title: "Invite Guest",
      description: "Register a visitor",
      icon: Users,
      href: "/tenant/guests",
      color: "bg-primary",
    },
  ];

  const statusColors = {
    completed: "bg-success text-success-foreground",
    recorded: "bg-info text-info-foreground",
    approved: "bg-primary text-primary-foreground",
    pending: "bg-warning text-warning-foreground",
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back, {profile?.first_name || "Tenant"}!
          </h1>
          <p className="text-muted-foreground">
            Unit {dashboardData.unit} • Everything looks good
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          <Clock className="h-3 w-3 mr-1" />
          Last updated: Just now
        </Badge>
      </div>

      {/* Key Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Current Balance</p>
              <p className="text-2xl font-bold text-foreground">
                ${dashboardData.currentBalance.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">
                Due: {dashboardData.nextDueDate}
              </p>
            </div>
            <div className="p-2 bg-destructive/10 rounded-lg">
              <DollarSign className="h-5 w-5 text-destructive" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Utility Charges</p>
              <p className="text-2xl font-bold text-foreground">
                ${dashboardData.utilityCharges}
              </p>
              <p className="text-xs text-success">+8% from last month</p>
            </div>
            <div className="p-2 bg-info/10 rounded-lg">
              <Zap className="h-5 w-5 text-info" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Announcements</p>
              <p className="text-2xl font-bold text-foreground">
                {dashboardData.announcements}
              </p>
              <p className="text-xs text-info">New this week</p>
            </div>
            <div className="p-2 bg-warning/10 rounded-lg">
              <Bell className="h-5 w-5 text-warning" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Support Tickets</p>
              <p className="text-2xl font-bold text-foreground">
                {dashboardData.openTickets}
              </p>
              <p className="text-xs text-success">All resolved</p>
            </div>
            <div className="p-2 bg-success/10 rounded-lg">
              <MessageSquare className="h-5 w-5 text-success" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Quick Actions</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link key={action.title} to={action.href}>
                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${action.color}`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{action.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {action.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recent Activity</h3>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/tenant/profile">View All</Link>
              </Button>
            </div>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50">
                  <div className="p-1 bg-primary/10 rounded">
                    <TrendingUp className="h-3 w-3 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {activity.description}
                    </p>
                    {activity.details && (
                      <p className="text-xs text-muted-foreground">
                        {activity.details}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {activity.date}
                      </span>
                      <Badge 
                        className={`text-xs ${statusColors[activity.status as keyof typeof statusColors]}`}
                        variant="secondary"
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                  {activity.amount && (
                    <div className="text-right">
                      <p className="text-sm font-semibold text-success">
                        {activity.amount}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Urgent Items */}
      {dashboardData.currentBalance > 0 && (
        <Card className="p-6 border-warning">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-warning" />
            <div className="flex-1">
              <h3 className="font-semibold text-warning">Payment Due</h3>
              <p className="text-sm text-muted-foreground">
                Your rent payment of ${dashboardData.currentBalance.toLocaleString()} is due on {dashboardData.nextDueDate}
              </p>
            </div>
            <Button asChild>
              <Link to="/tenant/payments">Pay Now</Link>
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TenantDashboard;