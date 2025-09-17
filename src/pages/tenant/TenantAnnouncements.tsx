import { useState } from "react";
import { PageHeader } from "@/components/tenant/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Calendar, Eye, Search, Clock } from "lucide-react";

export default function TenantAnnouncements() {
  const [searchTerm, setSearchTerm] = useState("");

  const announcements = [
    {
      id: 1,
      title: "Building Maintenance Schedule",
      content: "The building will undergo routine maintenance on February 20th from 9 AM to 5 PM. Water may be temporarily unavailable.",
      type: "maintenance",
      priority: "high",
      isRead: false,
      createdAt: "2024-02-15",
      expiresAt: "2024-02-20",
    },
    {
      id: 2,
      title: "New Parking Regulations",
      content: "Starting March 1st, visitor parking will require registration at the front desk. Please inform your guests.",
      type: "policy",
      priority: "medium",
      isRead: true,
      createdAt: "2024-02-10",
      expiresAt: "2024-03-01",
    },
    {
      id: 3,
      title: "Community Event - Rooftop BBQ",
      content: "Join us for a community BBQ on Saturday, February 24th at 6 PM on the rooftop terrace. Food and drinks provided!",
      type: "event",
      priority: "low",
      isRead: false,
      createdAt: "2024-02-12",
      expiresAt: "2024-02-24",
    },
  ];

  const filteredAnnouncements = announcements.filter(announcement =>
    announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadCount = announcements.filter(a => !a.isRead).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Announcements"
        subtitle="Stay updated with building news and events"
        breadcrumbs={[{ label: "Announcements" }]}
      />

      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <span className="text-sm text-muted-foreground">
            {unreadCount} unread announcement{unreadCount !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search announcements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full sm:w-64"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredAnnouncements.map((announcement) => (
          <Card key={announcement.id} className={`${!announcement.isRead ? 'border-primary' : ''}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-lg">{announcement.title}</CardTitle>
                    {!announcement.isRead && (
                      <Badge variant="secondary" className="text-xs">New</Badge>
                    )}
                  </div>
                  <CardDescription className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {announcement.createdAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Expires: {announcement.expiresAt}
                    </span>
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{announcement.content}</p>
              <div className="flex justify-between items-center mt-4">
                <Badge
                  variant={announcement.priority === 'high' ? 'destructive' : 
                          announcement.priority === 'medium' ? 'secondary' : 'outline'}
                >
                  {announcement.priority} priority
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {announcement.type}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}