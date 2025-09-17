import { useState } from "react";
import { PageHeader } from "@/components/tenant/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Plus, Wrench, Clock, CheckCircle, AlertCircle, Search, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function TenantSupport() {
  const [isCreateTicketOpen, setIsCreateTicketOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ticketForm, setTicketForm] = useState({
    title: "",
    category: "",
    priority: "medium",
    description: "",
  });
  const { toast } = useToast();

  const tickets = [
    {
      id: "TKT-2024-001",
      title: "Kitchen Faucet Leaking",
      category: "Plumbing",
      priority: "high",
      status: "in_progress",
      createdAt: "2024-02-10",
      updatedAt: "2024-02-12",
      assignedTo: "John Maintenance",
      description: "The kitchen faucet has been dripping constantly for the past 3 days. Water is pooling under the sink.",
      resolutionNotes: "Replacement parts ordered. Will fix tomorrow.",
    },
    {
      id: "TKT-2024-002",
      title: "Air Conditioning Not Working",
      category: "HVAC",
      priority: "medium",
      status: "open",
      createdAt: "2024-02-12",
      updatedAt: "2024-02-12",
      assignedTo: null,
      description: "AC unit in bedroom not cooling properly. Temperature remains high even when set to lowest setting.",
      resolutionNotes: null,
    },
    {
      id: "TKT-2024-003",
      title: "Light Bulb Replacement",
      category: "Electrical",
      priority: "low",
      status: "resolved",
      createdAt: "2024-02-08",
      updatedAt: "2024-02-09",
      assignedTo: "Mike Electric",
      description: "Ceiling light in living room burned out.",
      resolutionNotes: "Light bulb replaced with LED. Issue resolved.",
    },
    {
      id: "TKT-2024-004",
      title: "Window Lock Broken",
      category: "General",
      priority: "medium",
      status: "open",
      createdAt: "2024-02-11",
      updatedAt: "2024-02-11",
      assignedTo: null,
      description: "Bedroom window lock is broken and window won't stay closed properly.",
      resolutionNotes: null,
    },
    {
      id: "TKT-2024-005",
      title: "Noise Complaint - Upstairs Neighbor",
      category: "General",
      priority: "medium",
      status: "closed",
      createdAt: "2024-02-05",
      updatedAt: "2024-02-07",
      assignedTo: "Property Manager",
      description: "Excessive noise from upstairs apartment during night hours.",
      resolutionNotes: "Spoke with tenant. Issue resolved through mutual agreement.",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-info text-info-foreground">Open</Badge>;
      case "in_progress":
        return <Badge className="bg-warning text-warning-foreground">In Progress</Badge>;
      case "resolved":
        return <Badge className="bg-success text-success-foreground">Resolved</Badge>;
      case "closed":
        return <Badge variant="secondary">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge variant="secondary">Medium</Badge>;
      case "low":
        return <Badge className="bg-info text-info-foreground">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Plumbing":
      case "HVAC":
      case "Electrical":
        return <Wrench className="h-4 w-4" />;
      case "General":
        return <MessageCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateTicket = () => {
    if (!ticketForm.title || !ticketForm.category || !ticketForm.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Ticket Created",
      description: `Support ticket "${ticketForm.title}" has been submitted successfully.`,
    });

    setTicketForm({
      title: "",
      category: "",
      priority: "medium",
      description: "",
    });
    setIsCreateTicketOpen(false);
  };

  const openTickets = filteredTickets.filter(t => t.status === "open").length;
  const inProgressTickets = filteredTickets.filter(t => t.status === "in_progress").length;
  const resolvedTickets = filteredTickets.filter(t => t.status === "resolved").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Support & Maintenance"
        subtitle="Submit tickets and track maintenance requests"
        breadcrumbs={[{ label: "Support" }]}
        action={
          <Dialog open={isCreateTicketOpen} onOpenChange={setIsCreateTicketOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Ticket
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Create Support Ticket</DialogTitle>
                <DialogDescription>
                  Describe your maintenance or support request
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={ticketForm.title}
                    onChange={(e) => setTicketForm({...ticketForm, title: e.target.value})}
                    placeholder="Brief description of the issue"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={ticketForm.category} onValueChange={(value) => setTicketForm({...ticketForm, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Plumbing">Plumbing</SelectItem>
                        <SelectItem value="Electrical">Electrical</SelectItem>
                        <SelectItem value="HVAC">HVAC</SelectItem>
                        <SelectItem value="Appliances">Appliances</SelectItem>
                        <SelectItem value="Security">Security</SelectItem>
                        <SelectItem value="General">General Maintenance</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={ticketForm.priority} onValueChange={(value) => setTicketForm({...ticketForm, priority: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={ticketForm.description}
                    onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                    placeholder="Provide detailed information about the issue..."
                    rows={4}
                  />
                </div>

                <Button onClick={handleCreateTicket} className="w-full">
                  Create Ticket
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredTickets.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open</CardTitle>
            <AlertCircle className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">{openTickets}</div>
            <p className="text-xs text-muted-foreground">Awaiting assignment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{inProgressTickets}</div>
            <p className="text-xs text-muted-foreground">Being worked on</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{resolvedTickets}</div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tickets" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tickets">My Tickets</TabsTrigger>
          <TabsTrigger value="emergency">Emergency Contact</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Support Tickets</CardTitle>
                  <CardDescription>Track your maintenance and support requests</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search tickets..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-full sm:w-64"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="hidden lg:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Updated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-mono text-sm">{ticket.id}</TableCell>
                        <TableCell className="font-medium max-w-xs truncate">{ticket.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(ticket.category)}
                            {ticket.category}
                          </div>
                        </TableCell>
                        <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                        <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                        <TableCell>{ticket.assignedTo || "Unassigned"}</TableCell>
                        <TableCell>{ticket.createdAt}</TableCell>
                        <TableCell>{ticket.updatedAt}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile view */}
              <div className="lg:hidden space-y-4">
                {filteredTickets.map((ticket) => (
                  <Card key={ticket.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold">{ticket.title}</h3>
                          <p className="text-sm text-muted-foreground font-mono">{ticket.id}</p>
                        </div>
                        <div className="text-right space-y-1">
                          {getStatusBadge(ticket.status)}
                          {getPriorityBadge(ticket.priority)}
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Category:</span>
                          <div className="flex items-center gap-1">
                            {getCategoryIcon(ticket.category)}
                            {ticket.category}
                          </div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Assigned:</span>
                          <span>{ticket.assignedTo || "Unassigned"}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Created:</span>
                          <span>{ticket.createdAt}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Updated:</span>
                          <span>{ticket.updatedAt}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {ticket.description}
                      </p>
                      
                      {ticket.resolutionNotes && (
                        <div className="mt-3 p-2 bg-muted rounded-lg">
                          <p className="text-xs font-medium text-muted-foreground">Update:</p>
                          <p className="text-sm">{ticket.resolutionNotes}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emergency" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-destructive" />
                  Emergency Contacts
                </CardTitle>
                <CardDescription>For urgent maintenance and emergency situations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">Emergency Maintenance</h3>
                    <p className="text-sm text-muted-foreground">24/7 emergency repairs</p>
                  </div>
                  <Button size="sm" variant="destructive">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                </div>
                
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">Security Office</h3>
                    <p className="text-sm text-muted-foreground">Building security and access issues</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    +254 700 555 0001
                  </Button>
                </div>
                
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">Property Manager</h3>
                    <p className="text-sm text-muted-foreground">General inquiries and issues</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What Constitutes an Emergency?</CardTitle>
                <CardDescription>Use emergency contacts for these situations only</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-destructive/10 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                    <div>
                      <h4 className="font-medium">Immediate Safety Hazards</h4>
                      <p className="text-sm text-muted-foreground">
                        Gas leaks, electrical hazards, flooding, fire hazards
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-warning/10 rounded-lg">
                    <Clock className="h-5 w-5 text-warning mt-0.5" />
                    <div>
                      <h4 className="font-medium">Security Issues</h4>
                      <p className="text-sm text-muted-foreground">
                        Broken locks, security system failures, unauthorized access
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-info/10 rounded-lg">
                    <Wrench className="h-5 w-5 text-info mt-0.5" />
                    <div>
                      <h4 className="font-medium">Major Utility Failures</h4>
                      <p className="text-sm text-muted-foreground">
                        Complete power outage, no water, heating system failure in winter
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Common questions and answers about maintenance and support</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">How quickly will my ticket be addressed?</h3>
                  <p className="text-sm text-muted-foreground">
                    Response times vary by priority: Urgent (2-4 hours), High (same day), Medium (1-2 business days), Low (3-5 business days).
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Can I track the progress of my maintenance request?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes! All tickets show real-time status updates. You'll receive notifications when the status changes or when work is completed.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">What information should I include in my ticket?</h3>
                  <p className="text-sm text-muted-foreground">
                    Be as detailed as possible: location of the issue, when it started, what you've tried, and any relevant photos. This helps our team respond more efficiently.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Do I need to be present for maintenance work?</h3>
                  <p className="text-sm text-muted-foreground">
                    For non-emergency repairs, we'll schedule a convenient time with you. For emergencies, we may need to enter your unit for safety reasons with proper notice when possible.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">How do I report an emergency after hours?</h3>
                  <p className="text-sm text-muted-foreground">
                    Use the emergency contact numbers provided in the Emergency Contact tab. Our emergency maintenance team is available 24/7 for urgent issues.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Can I request specific maintenance personnel?</h3>
                  <p className="text-sm text-muted-foreground">
                    While we can't guarantee specific technicians, you can mention preferences in your ticket. We'll do our best to accommodate when possible.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}