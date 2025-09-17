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
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { QrCode, UserPlus, Users, Clock, CheckCircle, XCircle, Calendar as CalendarIcon, Search } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function TenantGuests() {
  const [isAddGuestOpen, setIsAddGuestOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [guestForm, setGuestForm] = useState({
    name: "",
    phone: "",
    purpose: "",
    visitDate: "",
    timeStart: "",
    timeEnd: "",
  });
  const { toast } = useToast();

  const guests = [
    {
      id: 1,
      name: "John Smith",
      phone: "+254700123456",
      purpose: "Personal Visit",
      visitDate: "2024-02-15",
      timeStart: "14:00",
      timeEnd: "17:00",
      status: "approved",
      approvedBy: "Security Team",
      createdAt: "2024-02-10",
      passCode: "GU2024001",
      checkInTime: "14:15",
      checkOutTime: null,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      phone: "+254700987654",
      purpose: "Delivery Service",
      visitDate: "2024-02-16",
      timeStart: "10:00",
      timeEnd: "11:00",
      status: "pending",
      approvedBy: null,
      createdAt: "2024-02-12",
      passCode: null,
      checkInTime: null,
      checkOutTime: null,
    },
    {
      id: 3,
      name: "Mike Wilson",
      phone: "+254700555555",
      purpose: "Maintenance Work",
      visitDate: "2024-02-14",
      timeStart: "09:00",
      timeEnd: "12:00",
      status: "rejected",
      approvedBy: "Security Team",
      createdAt: "2024-02-09",
      passCode: null,
      checkInTime: null,
      checkOutTime: null,
    },
    {
      id: 4,
      name: "Lisa Brown",
      phone: "+254700777777",
      purpose: "Family Visit",
      visitDate: "2024-02-12",
      timeStart: "18:00",
      timeEnd: "22:00",
      status: "completed",
      approvedBy: "Security Team",
      createdAt: "2024-02-08",
      passCode: "GU2024002",
      checkInTime: "18:05",
      checkOutTime: "21:45",
    },
    {
      id: 5,
      name: "Robert Davis",
      phone: "+254700888888",
      purpose: "Business Meeting",
      visitDate: "2024-02-13",
      timeStart: "15:00",
      timeEnd: "16:30",
      status: "completed",
      approvedBy: "Security Team",
      createdAt: "2024-02-10",
      passCode: "GU2024003",
      checkInTime: "14:58",
      checkOutTime: "16:25",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-success text-success-foreground">Approved</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "completed":
        return <Badge className="bg-info text-info-foreground">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guest.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || guest.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddGuest = () => {
    if (!guestForm.name || !guestForm.phone || !guestForm.visitDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Guest Registered",
      description: `Guest request for ${guestForm.name} has been submitted for approval.`,
    });

    setGuestForm({
      name: "",
      phone: "",
      purpose: "",
      visitDate: "",
      timeStart: "",
      timeEnd: "",
    });
    setIsAddGuestOpen(false);
  };

  const handleGenerateQR = (guest: any) => {
    toast({
      title: "QR Code Generated",
      description: `Digital pass created for ${guest.name}. Pass code: ${guest.passCode}`,
    });
  };

  const handleCancelGuest = (guestId: number) => {
    toast({
      title: "Guest Request Cancelled",
      description: "The guest request has been cancelled successfully.",
    });
  };

  const pendingGuests = filteredGuests.filter(g => g.status === "pending").length;
  const approvedGuests = filteredGuests.filter(g => g.status === "approved").length;
  const completedGuests = filteredGuests.filter(g => g.status === "completed").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Guest Management"
        subtitle="Register visitors and manage guest access"
        breadcrumbs={[{ label: "Guests" }]}
        action={
          <Dialog open={isAddGuestOpen} onOpenChange={setIsAddGuestOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Register Guest
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Register New Guest</DialogTitle>
                <DialogDescription>
                  Add a new guest for approval and access management
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="guestName">Guest Name *</Label>
                    <Input
                      id="guestName"
                      value={guestForm.name}
                      onChange={(e) => setGuestForm({...guestForm, name: e.target.value})}
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="guestPhone">Phone Number *</Label>
                    <Input
                      id="guestPhone"
                      value={guestForm.phone}
                      onChange={(e) => setGuestForm({...guestForm, phone: e.target.value})}
                      placeholder="+254700000000"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="purpose">Purpose of Visit</Label>
                  <Select value={guestForm.purpose} onValueChange={(value) => setGuestForm({...guestForm, purpose: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Personal Visit">Personal Visit</SelectItem>
                      <SelectItem value="Business Meeting">Business Meeting</SelectItem>
                      <SelectItem value="Delivery Service">Delivery Service</SelectItem>
                      <SelectItem value="Maintenance Work">Maintenance Work</SelectItem>
                      <SelectItem value="Family Visit">Family Visit</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Visit Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          setSelectedDate(date);
                          setGuestForm({...guestForm, visitDate: date ? format(date, "yyyy-MM-dd") : ""});
                        }}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="timeStart">Start Time</Label>
                    <Input
                      id="timeStart"
                      type="time"
                      value={guestForm.timeStart}
                      onChange={(e) => setGuestForm({...guestForm, timeStart: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="timeEnd">End Time</Label>
                    <Input
                      id="timeEnd"
                      type="time"
                      value={guestForm.timeEnd}
                      onChange={(e) => setGuestForm({...guestForm, timeEnd: e.target.value})}
                    />
                  </div>
                </div>

                <Button onClick={handleAddGuest} className="w-full">
                  Register Guest
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
            <CardTitle className="text-sm font-medium">Total Guests</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredGuests.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{pendingGuests}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{approvedGuests}</div>
            <p className="text-xs text-muted-foreground">Ready for visit</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">{completedGuests}</div>
            <p className="text-xs text-muted-foreground">Visit finished</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Guests</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="completed">History</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                <div>
                  <CardTitle>All Guests</CardTitle>
                  <CardDescription>Complete guest request history</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search guests..."
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
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
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
                      <TableHead>Guest Name</TableHead>
                      <TableHead>Phone</TableHead>
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
                        <TableCell className="font-medium">{guest.name}</TableCell>
                        <TableCell>{guest.phone}</TableCell>
                        <TableCell>{guest.purpose}</TableCell>
                        <TableCell>{guest.visitDate}</TableCell>
                        <TableCell>{guest.timeStart} - {guest.timeEnd}</TableCell>
                        <TableCell>{getStatusBadge(guest.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {guest.status === "approved" && guest.passCode && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleGenerateQR(guest)}
                              >
                                <QrCode className="h-4 w-4" />
                              </Button>
                            )}
                            {guest.status === "pending" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleCancelGuest(guest.id)}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile view */}
              <div className="lg:hidden space-y-4">
                {filteredGuests.map((guest) => (
                  <Card key={guest.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold">{guest.name}</h3>
                          <p className="text-sm text-muted-foreground">{guest.phone}</p>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(guest.status)}
                          {guest.passCode && (
                            <p className="text-xs text-muted-foreground mt-1 font-mono">
                              {guest.passCode}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Purpose:</span>
                          <span>{guest.purpose}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Visit Date:</span>
                          <span>{guest.visitDate}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Time:</span>
                          <span>{guest.timeStart} - {guest.timeEnd}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        {guest.status === "approved" && guest.passCode && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleGenerateQR(guest)}
                          >
                            <QrCode className="h-4 w-4 mr-1" />
                            QR Code
                          </Button>
                        )}
                        {guest.status === "pending" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCancelGuest(guest.id)}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Cancel
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {["pending", "approved", "completed"].map((status) => (
          <TabsContent key={status} value={status} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">{status} Guests</CardTitle>
                <CardDescription>
                  Guests with {status} status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="hidden lg:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Guest Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Purpose</TableHead>
                        <TableHead>Visit Date</TableHead>
                        <TableHead>Time</TableHead>
                        {status === "approved" && <TableHead>Pass Code</TableHead>}
                        {status === "completed" && <TableHead>Check In/Out</TableHead>}
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredGuests.filter(g => g.status === status).map((guest) => (
                        <TableRow key={guest.id}>
                          <TableCell className="font-medium">{guest.name}</TableCell>
                          <TableCell>{guest.phone}</TableCell>
                          <TableCell>{guest.purpose}</TableCell>
                          <TableCell>{guest.visitDate}</TableCell>
                          <TableCell>{guest.timeStart} - {guest.timeEnd}</TableCell>
                          {status === "approved" && (
                            <TableCell className="font-mono text-sm">{guest.passCode}</TableCell>
                          )}
                          {status === "completed" && (
                            <TableCell className="text-sm">
                              <div>In: {guest.checkInTime}</div>
                              <div>Out: {guest.checkOutTime}</div>
                            </TableCell>
                          )}
                          <TableCell>
                            <div className="flex gap-1">
                              {status === "approved" && guest.passCode && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleGenerateQR(guest)}
                                >
                                  <QrCode className="h-4 w-4" />
                                </Button>
                              )}
                              {status === "pending" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleCancelGuest(guest.id)}
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile view */}
                <div className="lg:hidden space-y-4">
                  {filteredGuests.filter(g => g.status === status).map((guest) => (
                    <Card key={guest.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold">{guest.name}</h3>
                            <p className="text-sm text-muted-foreground">{guest.phone}</p>
                          </div>
                          <div className="text-right">
                            {guest.passCode && (
                              <p className="text-sm font-mono">{guest.passCode}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Purpose:</span>
                            <span>{guest.purpose}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Visit:</span>
                            <span>{guest.visitDate} {guest.timeStart}-{guest.timeEnd}</span>
                          </div>
                          {status === "completed" && (
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Check In/Out:</span>
                              <span>{guest.checkInTime} / {guest.checkOutTime}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex justify-end">
                          {status === "approved" && guest.passCode && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleGenerateQR(guest)}
                            >
                              <QrCode className="h-4 w-4 mr-1" />
                              QR Code
                            </Button>
                          )}
                          {status === "pending" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCancelGuest(guest.id)}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Cancel
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}