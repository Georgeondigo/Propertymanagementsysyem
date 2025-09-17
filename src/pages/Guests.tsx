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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Users, Clock, CheckCircle, XCircle, Plus, Search, QrCode, Calendar, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Guests() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedGuest, setSelectedGuest] = useState<string | null>(null);

  // Sample guest data
  const guests = [
    {
      id: "1",
      guestName: "Alice Cooper",
      tenant: "John Smith",
      unit: "101",
      purpose: "Family visit",
      visitDate: "2024-01-25",
      visitTimeStart: "14:00",
      visitTimeEnd: "18:00",
      status: "pending",
      phone: "+1234567890",
      createdAt: "2024-01-20",
      digitalPassCode: null
    },
    {
      id: "2",
      guestName: "Bob Wilson",
      tenant: "Sarah Johnson",
      unit: "203",
      purpose: "Delivery service",
      visitDate: "2024-01-24",
      visitTimeStart: "10:00",
      visitTimeEnd: "12:00",
      status: "approved",
      phone: "+1234567891",
      createdAt: "2024-01-22",
      digitalPassCode: "PASS123",
      checkInTime: "2024-01-24T10:15:00Z",
      checkOutTime: "2024-01-24T11:45:00Z"
    },
    {
      id: "3",
      guestName: "Carol Davis",
      tenant: "Mike Wilson",
      unit: "305",
      purpose: "Maintenance work",
      visitDate: "2024-01-23",
      visitTimeStart: "09:00",
      visitTimeEnd: "17:00",
      status: "approved",
      phone: "+1234567892",
      createdAt: "2024-01-18",
      digitalPassCode: "PASS456",
      checkInTime: "2024-01-23T09:30:00Z",
      checkOutTime: "2024-01-23T16:30:00Z"
    },
    {
      id: "4",
      guestName: "David Brown",
      tenant: "Emma Davis",
      unit: "402",
      purpose: "Personal visit",
      visitDate: "2024-01-22",
      visitTimeStart: "19:00",
      visitTimeEnd: "22:00",
      status: "rejected",
      phone: "+1234567893",
      createdAt: "2024-01-21",
      digitalPassCode: null
    }
  ];

  // Sample visit trends data
  const visitTrends = [
    { month: "Jul", visitors: 45, approved: 40, rejected: 5 },
    { month: "Aug", visitors: 52, approved: 48, rejected: 4 },
    { month: "Sep", visitors: 38, approved: 35, rejected: 3 },
    { month: "Oct", visitors: 60, approved: 55, rejected: 5 },
    { month: "Nov", visitors: 47, approved: 42, rejected: 5 },
    { month: "Dec", visitors: 55, approved: 50, rejected: 5 },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
      case "approved":
        return <Badge className="bg-success text-success-foreground">Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "checked-in":
        return <Badge className="bg-blue-500 text-white">Checked In</Badge>;
      case "checked-out":
        return <Badge variant="outline">Checked Out</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guest.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guest.unit.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || guest.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApproveGuest = (guestId: string) => {
    toast({
      title: "Guest Approved",
      description: "Guest request has been approved. Digital pass code sent to tenant.",
    });
  };

  const handleRejectGuest = (guestId: string) => {
    toast({
      title: "Guest Rejected",
      description: "Guest request has been rejected. Tenant has been notified.",
    });
  };

  const pendingGuests = guests.filter(g => g.status === "pending").length;
  const approvedGuests = guests.filter(g => g.status === "approved").length;
  const totalVisitors = guests.length;
  const approvalRate = Math.round((approvedGuests / totalVisitors) * 100);

  return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary">Guest Management</h1>
            <p className="text-muted-foreground">Manage visitor access and digital passes</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Guest
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{pendingGuests}</div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Visitors</CardTitle>
              <Users className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">8</div>
              <p className="text-xs text-muted-foreground">Currently in building</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{totalVisitors}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{approvalRate}%</div>
              <p className="text-xs text-muted-foreground">Requests approved</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="requests" className="w-full">
          <TabsList>
            <TabsTrigger value="requests">Guest Requests</TabsTrigger>
            <TabsTrigger value="active">Active Visitors</TabsTrigger>
            <TabsTrigger value="history">Visit History</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="requests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Guest Requests</CardTitle>
                <CardDescription>Approve or reject visitor access requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by guest, tenant, or unit..."
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
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Guest Name</TableHead>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Visit Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredGuests.map((guest) => (
                      <TableRow key={guest.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{guest.guestName}</div>
                            <div className="text-sm text-muted-foreground">{guest.phone}</div>
                          </div>
                        </TableCell>
                        <TableCell>{guest.tenant}</TableCell>
                        <TableCell>{guest.unit}</TableCell>
                        <TableCell>{guest.purpose}</TableCell>
                        <TableCell>{guest.visitDate}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {guest.visitTimeStart} - {guest.visitTimeEnd}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(guest.status)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {guest.status === "pending" && (
                              <>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="text-success border-success hover:bg-success/10"
                                  onClick={() => handleApproveGuest(guest.id)}
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="text-destructive border-destructive hover:bg-destructive/10"
                                  onClick={() => handleRejectGuest(guest.id)}
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                              </>
                            )}
                            {guest.status === "approved" && (
                              <Button variant="outline" size="sm">
                                <QrCode className="h-4 w-4 mr-1" />
                                View Pass
                              </Button>
                            )}
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
          
          <TabsContent value="active" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Visitors</CardTitle>
                <CardDescription>Guests currently in the building</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Guest Name</TableHead>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Check-in Time</TableHead>
                      <TableHead>Expected Checkout</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {guests
                      .filter(g => g.checkInTime && !g.checkOutTime)
                      .map((guest) => (
                        <TableRow key={guest.id}>
                          <TableCell className="font-medium">{guest.guestName}</TableCell>
                          <TableCell>{guest.tenant}</TableCell>
                          <TableCell>{guest.unit}</TableCell>
                          <TableCell>{guest.checkInTime ? new Date(guest.checkInTime).toLocaleTimeString() : "-"}</TableCell>
                          <TableCell>{guest.visitTimeEnd}</TableCell>
                          <TableCell>
                            <Badge variant="outline">2h 30m</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Manual Checkout
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                
                {guests.filter(g => g.checkInTime && !g.checkOutTime).length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No active visitors in the building
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Visit History</CardTitle>
                <CardDescription>Completed visitor sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Guest Name</TableHead>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Visit Date</TableHead>
                      <TableHead>Check-in</TableHead>
                      <TableHead>Check-out</TableHead>
                      <TableHead>Duration</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {guests
                      .filter(g => g.checkInTime && g.checkOutTime)
                      .map((guest) => (
                        <TableRow key={guest.id}>
                          <TableCell className="font-medium">{guest.guestName}</TableCell>
                          <TableCell>{guest.tenant}</TableCell>
                          <TableCell>{guest.unit}</TableCell>
                          <TableCell>{guest.visitDate}</TableCell>
                          <TableCell>{guest.checkInTime ? new Date(guest.checkInTime).toLocaleTimeString() : "-"}</TableCell>
                          <TableCell>{guest.checkOutTime ? new Date(guest.checkOutTime).toLocaleTimeString() : "-"}</TableCell>
                          <TableCell>
                            <Badge variant="outline">7h 15m</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Visit Trends</CardTitle>
                <CardDescription>Monthly visitor statistics and approval rates</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={visitTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="visitors" stroke="hsl(var(--primary))" strokeWidth={2} name="Total Visitors" />
                    <Line type="monotone" dataKey="approved" stroke="hsl(var(--success))" strokeWidth={2} name="Approved" />
                    <Line type="monotone" dataKey="rejected" stroke="hsl(var(--destructive))" strokeWidth={2} name="Rejected" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  );
}