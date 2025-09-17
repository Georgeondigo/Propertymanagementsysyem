import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const RecentActivity = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Payment Received</p>
              <p className="text-sm text-muted-foreground">John Doe - Unit 204</p>
            </div>
            <Badge variant="default" className="bg-success text-success-foreground">Success</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Maintenance Request</p>
              <p className="text-sm text-muted-foreground">Unit 105 - Heating Issue</p>
            </div>
            <Badge variant="destructive">Pending</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">New Application</p>
              <p className="text-sm text-muted-foreground">Unit 302 - Mike Chen</p>
            </div>
            <Badge variant="secondary">Review</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};