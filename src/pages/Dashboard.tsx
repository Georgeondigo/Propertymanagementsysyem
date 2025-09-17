import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Home,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  Bell,
  Activity,
  Calendar,
} from "lucide-react";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your properties.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            This Month
          </Button>
          <Button size="sm">
            <Bell className="mr-2 h-4 w-4" />
            View Alerts
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <DashboardStats />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>

        {/* Alerts & Quick Actions */}
        <div className="space-y-6">
          {/* Urgent Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Urgent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3 p-3 border border-destructive/20 rounded-lg">
                <div className="w-2 h-2 bg-destructive rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Overdue Payment</p>
                  <p className="text-xs text-muted-foreground">
                    Unit 204 - $1,250 overdue for 15 days
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 border border-yellow-500/20 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Lease Expiring</p>
                  <p className="text-xs text-muted-foreground">
                    Unit 105 lease ends in 30 days
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 border border-blue-500/20 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Maintenance Request</p>
                  <p className="text-xs text-muted-foreground">
                    Unit 301 - Heating system issue
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Add New Tenant
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Home className="mr-2 h-4 w-4" />
                Add New Unit
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <DollarSign className="mr-2 h-4 w-4" />
                Record Payment
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Activity className="mr-2 h-4 w-4" />
                View Reports
              </Button>
            </CardContent>
          </Card>

          {/* Performance Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Occupancy Rate</span>
                <Badge variant="secondary" className="bg-success text-success-foreground">
                  94%
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Collection Rate</span>
                <Badge variant="secondary" className="bg-primary text-primary-foreground">
                  87%
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Avg Response Time</span>
                <Badge variant="outline">2.3 hours</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Satisfaction Score</span>
                <Badge variant="secondary" className="bg-success text-success-foreground">
                  4.8/5
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;