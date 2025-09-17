import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { MessageSquare, Send, Plus, Search, Mail, Smartphone, Bell, Users, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Messages() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isComposeDialogOpen, setIsComposeDialogOpen] = useState(false);
  const [selectedTenants, setSelectedTenants] = useState<string[]>([]);

  // Sample messages data
  const messages = [
    {
      id: "1",
      title: "Monthly Rent Reminder",
      content: "Friendly reminder that rent is due on the 1st of each month...",
      recipients: ["All Tenants"],
      sentAt: "2024-01-25 09:00",
      channel: ["email", "sms"],
      status: "sent",
      readCount: 18,
      totalRecipients: 24
    },
    {
      id: "2",
      title: "Building Maintenance Notice",
      content: "Scheduled elevator maintenance on Saturday from 9 AM to 2 PM...",
      recipients: ["Building A", "Building B"],
      sentAt: "2024-01-20 14:30",
      channel: ["email", "push"],
      status: "sent",
      readCount: 32,
      totalRecipients: 45
    },
    {
      id: "3",
      title: "Water Shut-off Notice",
      content: "Water will be temporarily shut off for maintenance...",
      recipients: ["Units 201-210"],
      sentAt: "2024-01-18 10:15",
      channel: ["email", "sms", "push"],
      status: "sent",
      readCount: 8,
      totalRecipients: 10
    }
  ];

  // Sample tenants data for selection
  const tenants = [
    { id: "1", name: "John Smith", unit: "101", email: "john@email.com", phone: "+1234567890" },
    { id: "2", name: "Sarah Johnson", unit: "203", email: "sarah@email.com", phone: "+1234567891" },
    { id: "3", name: "Mike Wilson", unit: "305", email: "mike@email.com", phone: "+1234567892" },
    { id: "4", name: "Emma Davis", unit: "402", email: "emma@email.com", phone: "+1234567893" }
  ];

  // Sample announcements/templates
  const templates = [
    {
      id: "1",
      title: "Rent Reminder",
      content: "This is a friendly reminder that your rent payment is due on [DATE]. Please ensure payment is made by the due date to avoid late fees.",
      category: "billing"
    },
    {
      id: "2",
      title: "Maintenance Notice",
      content: "We will be performing maintenance work in your area on [DATE] from [TIME]. This may cause temporary disruptions to [SERVICES].",
      category: "maintenance"
    },
    {
      id: "3",
      title: "Community Event",
      content: "Join us for [EVENT] on [DATE] at [TIME] in the community center. Light refreshments will be provided.",
      category: "community"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return <Badge className="bg-success text-success-foreground">Sent</Badge>;
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      case "scheduled":
        return <Badge className="bg-warning text-warning-foreground">Scheduled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getChannelIcons = (channels: string[]) => {
    return (
      <div className="flex space-x-1">
        {channels.includes("email") && <Mail className="h-4 w-4" />}
        {channels.includes("sms") && <Smartphone className="h-4 w-4" />}
        {channels.includes("push") && <Bell className="h-4 w-4" />}
      </div>
    );
  };

  const filteredMessages = messages.filter(message =>
    message.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    toast({
      title: "Message Sent",
      description: "Your message has been sent successfully to selected recipients.",
    });
    setIsComposeDialogOpen(false);
    setSelectedTenants([]);
  };

  const handleTenantSelection = (tenantId: string, checked: boolean) => {
    if (checked) {
      setSelectedTenants([...selectedTenants, tenantId]);
    } else {
      setSelectedTenants(selectedTenants.filter(id => id !== tenantId));
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary">Messages & Announcements</h1>
            <p className="text-muted-foreground">Communicate with tenants via email, SMS, and push notifications</p>
          </div>
          <Dialog open={isComposeDialogOpen} onOpenChange={setIsComposeDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Compose Message
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Compose New Message</DialogTitle>
                <DialogDescription>
                  Send announcements or messages to tenants via multiple channels.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="message-title">Message Title</Label>
                  <Input id="message-title" placeholder="Enter message title..." />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="template">Use Template (Optional)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.title} - {template.category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="message-content">Message Content</Label>
                  <Textarea 
                    id="message-content" 
                    placeholder="Enter your message..." 
                    rows={4}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label>Delivery Channels</Label>
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="email" defaultChecked />
                      <Label htmlFor="email" className="flex items-center space-x-1">
                        <Mail className="h-4 w-4" />
                        <span>Email</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sms" />
                      <Label htmlFor="sms" className="flex items-center space-x-1">
                        <Smartphone className="h-4 w-4" />
                        <span>SMS</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="push" />
                      <Label htmlFor="push" className="flex items-center space-x-1">
                        <Bell className="h-4 w-4" />
                        <span>Push</span>
                      </Label>
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label>Recipients</Label>
                  <div className="border rounded-md p-3 max-h-32 overflow-y-auto">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="all-tenants" 
                          checked={selectedTenants.length === tenants.length}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedTenants(tenants.map(t => t.id));
                            } else {
                              setSelectedTenants([]);
                            }
                          }}
                        />
                        <Label htmlFor="all-tenants" className="font-medium">All Tenants</Label>
                      </div>
                      {tenants.map((tenant) => (
                        <div key={tenant.id} className="flex items-center space-x-2 ml-6">
                          <Checkbox 
                            id={`tenant-${tenant.id}`}
                            checked={selectedTenants.includes(tenant.id)}
                            onCheckedChange={(checked) => handleTenantSelection(tenant.id, checked as boolean)}
                          />
                          <Label htmlFor={`tenant-${tenant.id}`} className="text-sm">
                            {tenant.name} - Unit {tenant.unit}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="send-option">Send Option</Label>
                  <Select defaultValue="now">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="now">Send Now</SelectItem>
                      <SelectItem value="schedule">Schedule for Later</SelectItem>
                      <SelectItem value="draft">Save as Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsComposeDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">28</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
              <Send className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">98.2%</div>
              <p className="text-xs text-muted-foreground">Successful deliveries</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Read Rate</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">76.5%</div>
              <p className="text-xs text-muted-foreground">Messages read</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tenants</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">24</div>
              <p className="text-xs text-muted-foreground">Can receive messages</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="sent" className="w-full">
          <TabsList>
            <TabsTrigger value="sent">Sent Messages</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="recipients">Recipients</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sent" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Message History</CardTitle>
                <CardDescription>All sent messages and announcements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Recipients</TableHead>
                      <TableHead>Channels</TableHead>
                      <TableHead>Sent At</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Read Rate</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMessages.map((message) => (
                      <TableRow key={message.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{message.title}</div>
                            <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                              {message.content}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {message.recipients.join(", ")}
                          </div>
                        </TableCell>
                        <TableCell>{getChannelIcons(message.channel)}</TableCell>
                        <TableCell>{message.sentAt}</TableCell>
                        <TableCell>{getStatusBadge(message.status)}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {message.readCount}/{message.totalRecipients}
                            <div className="text-xs text-muted-foreground">
                              {Math.round((message.readCount / message.totalRecipients) * 100)}%
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">View</Button>
                            <Button variant="outline" size="sm">Resend</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="templates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Message Templates</CardTitle>
                <CardDescription>Pre-defined message templates for common communications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {templates.map((template) => (
                    <div key={template.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{template.title}</h4>
                          <Badge variant="outline" className="mt-1">{template.category}</Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Use</Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{template.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="recipients" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Message Recipients</CardTitle>
                <CardDescription>Manage tenant contact information and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Preferences</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tenants.map((tenant) => (
                      <TableRow key={tenant.id}>
                        <TableCell className="font-medium">{tenant.name}</TableCell>
                        <TableCell>{tenant.unit}</TableCell>
                        <TableCell>{tenant.email}</TableCell>
                        <TableCell>{tenant.phone}</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Badge variant="outline" className="text-xs">Email</Badge>
                            <Badge variant="outline" className="text-xs">SMS</Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-success text-success-foreground">Active</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}