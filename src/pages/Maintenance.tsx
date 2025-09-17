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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Wrench, Clock, CheckCircle, AlertTriangle, Plus, Search, Users, TrendingUp, Loader2, UserCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Maintenance() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [assignmentForm, setAssignmentForm] = useState({
    staffMember: "",
    notes: "",
    priority: "",
  });

  // Sample maintenance tickets data
  const tickets = [
    {
      id: "1",
      title: "Leaky faucet in bathroom",
      description: "Kitchen sink faucet has been dripping for two days",
      tenant: "John Smith",
      unit: "101",
      category: "Plumbing",
      priority: "medium",
      status: "open",
      assignedTo: null,
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
      estimatedTime: "2-4 hours"
    },
    {
      id: "2",
      title: "AC not cooling properly",
      description: "Air conditioning unit not maintaining temperature",
      tenant: "Sarah Johnson",
      unit: "203",
      category: "HVAC",
      priority: "high",
      status: "in-progress",
      assignedTo: "Mike Rodriguez",
      createdAt: "2024-01-10",
      updatedAt: "2024-01-12",
      estimatedTime: "4-6 hours"
    },
    {
      id: "3",
      title: "Broken light switch",
      description: "Living room light switch is not working",
      tenant: "Mike Wilson",
      unit: "305",
      category: "Electrical",
      priority: "low",
      status: "resolved",
      assignedTo: "Tom Davis",
      createdAt: "2024-01-08",
      updatedAt: "2024-01-14",
      estimatedTime: "1-2 hours"
    },
    {
      id: "4",
      title: "Clogged kitchen drain",
      description: "Kitchen sink is backing up and draining slowly",
      tenant: "Emma Davis",
      unit: "402",
      category: "Plumbing",
      priority: "medium",
      status: "open",
      assignedTo: null,
      createdAt: "2024-01-20",
      updatedAt: "2024-01-20",
      estimatedTime: "2-3 hours"
    }
  ];

  // Sample staff data
  const staff = [
    { id: "1", name: "Mike Rodriguez", specialty: "HVAC", workload: 3 },
    { id: "2", name: "Tom Davis", specialty: "Electrical", workload: 2 },
    { id: "3", name: "Lisa Chen", specialty: "Plumbing", workload: 1 },
    { id: "4", name: "David Park", specialty: "General", workload: 4 }
  ];

  // Analytics data
  const categoryData = [
    { name: "Plumbing", count: 15, color: "hsl(var(--primary))" },
    { name: "Electrical", count: 8, color: "hsl(var(--secondary))" },
    { name: "HVAC", count: 12, color: "hsl(var(--accent))" },
    { name: "General", count: 6, color: "hsl(var(--muted))" },
  ];

  const resolutionData = [
    { month: "Jul", resolved: 23, average_time: 2.5 },
    { month: "Aug", resolved: 28, average_time: 2.2 },
    { month: "Sep", resolved: 25, average_time: 2.8 },
    { month: "Oct", resolved: 30, average_time: 2.1 },
    { month: "Nov", resolved: 27, average_time: 2.4 },
    { month: "Dec", resolved: 32, average_time: 1.9 },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge variant="destructive">Open</Badge>;
      case "in-progress":
        return <Badge className="bg-warning text-warning-foreground">In Progress</Badge>;
      case "resolved":
        return <Badge className="bg-success text-success-foreground">Resolved</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge className="bg-warning text-warning-foreground">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.unit.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAssignTicket = async () => {
    if (!assignmentForm.staffMember) {
      toast({
        title: "Missing Information",
        description: "Please select a staff member to assign.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Ticket Assigned",
        description: "Maintenance ticket has been assigned successfully.",
      });
      
      setAssignmentForm({ staffMember: "", notes: "", priority: "" });
      setIsAssignDialogOpen(false);
      setSelectedTicket(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to assign ticket. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResolveTicket = async (ticketId: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Ticket Resolved",
        description: "Maintenance ticket has been marked as resolved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resolve ticket. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openTickets = tickets.filter(t => t.status === "open").length;
  const inProgressTickets = tickets.filter(t => t.status === "in-progress").length;
  const resolvedTickets = tickets.filter(t => t.status === "resolved").length;
  const avgResolutionTime = 2.3; // days

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary">Maintenance Management</h1>
            <p className="text-muted-foreground">Track and manage maintenance requests</p>
          </div>
          <Button 
            className="bg-primary hover:bg-primary/90"
            onClick={() => toast({
              title: "Creating Ticket",
              description: "Opening new maintenance ticket form...",
            })}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Ticket
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{openTickets}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
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
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Resolution</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{avgResolutionTime} days</div>
              <p className="text-xs text-muted-foreground">-0.4 from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="tickets" className="w-full">
          <TabsList>
            <TabsTrigger value="tickets">Maintenance Tickets</TabsTrigger>
            <TabsTrigger value="staff">Staff Workload</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tickets" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Tickets</CardTitle>
                <CardDescription>Manage all maintenance requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by title, tenant, or unit..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-sm"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{ticket.title}</div>
                            <div className="text-sm text-muted-foreground">{ticket.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>{ticket.tenant}</TableCell>
                        <TableCell>{ticket.unit}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{ticket.category}</Badge>
                        </TableCell>
                        <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                        <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                        <TableCell>{ticket.assignedTo || "Unassigned"}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedTicket(ticket.id);
                                setIsAssignDialogOpen(true);
                              }}
                            >
                              Assign
                            </Button>
                            <Button variant="outline" size="sm">View</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="staff" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Staff Workload</CardTitle>
                <CardDescription>Current maintenance staff assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Staff Member</TableHead>
                      <TableHead>Specialty</TableHead>
                      <TableHead>Active Tickets</TableHead>
                      <TableHead>Workload Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {staff.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{member.specialty}</Badge>
                        </TableCell>
                        <TableCell>{member.workload}</TableCell>
                        <TableCell>
                          {member.workload <= 2 ? (
                            <Badge className="bg-success text-success-foreground">Available</Badge>
                          ) : member.workload <= 4 ? (
                            <Badge className="bg-warning text-warning-foreground">Busy</Badge>
                          ) : (
                            <Badge variant="destructive">Overloaded</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">View Tasks</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Resolution Trends</CardTitle>
                  <CardDescription>Monthly ticket resolution and average time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={resolutionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="resolved" fill="hsl(var(--primary))" name="Tickets Resolved" />
                      <Bar yAxisId="right" dataKey="average_time" fill="hsl(var(--secondary))" name="Avg Time (days)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Issue Categories</CardTitle>
                  <CardDescription>Distribution of maintenance requests by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, count }) => `${name}: ${count}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Assign Ticket Dialog */}
        <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Assign Ticket</DialogTitle>
              <DialogDescription>
                Assign this maintenance ticket to a staff member.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="staff-member">Staff Member</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select staff member" />
                  </SelectTrigger>
                  <SelectContent>
                    {staff.map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.name} - {member.specialty} ({member.workload} active)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Set priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Assignment Notes</Label>
                <Textarea id="notes" placeholder="Add any special instructions..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAssignTicket}>Assign Ticket</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}