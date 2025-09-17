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
import { CalendarDays, FileText, Plus, Search, Download, AlertTriangle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Leases() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [leaseForm, setLeaseForm] = useState({
    tenant: "",
    unit: "",
    startDate: "",
    endDate: "",
    monthlyRent: "",
  });

  // Sample lease data
  const leases = [
    {
      id: "1",
      tenant: "John Smith",
      unit: "101",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      monthlyRent: 1200,
      status: "active",
      daysToRenewal: 45,
      documentUrl: "/lease-docs/john-smith-101.pdf"
    },
    {
      id: "2",
      tenant: "Sarah Johnson",
      unit: "203",
      startDate: "2024-03-15",
      endDate: "2025-03-14",
      monthlyRent: 1500,
      status: "active",
      daysToRenewal: 120,
      documentUrl: "/lease-docs/sarah-johnson-203.pdf"
    },
    {
      id: "3",
      tenant: "Mike Wilson",
      unit: "305",
      startDate: "2023-06-01",
      endDate: "2024-05-31",
      monthlyRent: 1100,
      status: "expiring",
      daysToRenewal: -30,
      documentUrl: "/lease-docs/mike-wilson-305.pdf"
    }
  ];

  const getStatusBadge = (status: string, daysToRenewal: number) => {
    if (status === "expiring" || daysToRenewal < 0) {
      return <Badge variant="destructive">Expired</Badge>;
    }
    if (daysToRenewal <= 60) {
      return <Badge className="bg-warning text-warning-foreground">Renewing Soon</Badge>;
    }
    return <Badge className="bg-success text-success-foreground">Active</Badge>;
  };

  const filteredLeases = leases.filter(lease =>
    lease.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lease.unit.includes(searchTerm)
  );

  const handleAddLease = async () => {
    if (!leaseForm.tenant || !leaseForm.unit || !leaseForm.startDate || !leaseForm.endDate || !leaseForm.monthlyRent) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Lease Created",
        description: "New lease agreement has been created successfully.",
      });
      
      setLeaseForm({
        tenant: "",
        unit: "",
        startDate: "",
        endDate: "",
        monthlyRent: "",
      });
      setIsAddDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create lease. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewLease = (leaseId: string) => {
    toast({
      title: "Opening Lease Document",
      description: "Loading lease agreement document...",
    });
  };

  const handleDownloadLease = async (leaseId: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Download Started",
        description: "Lease document download has started.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download lease document.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary">Lease Management</h1>
            <p className="text-muted-foreground">Manage lease agreements and renewals</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Lease
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Lease</DialogTitle>
                <DialogDescription>
                  Create a new lease agreement for a tenant.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="tenant-select">Tenant *</Label>
                  <Select value={leaseForm.tenant} onValueChange={(value) => setLeaseForm({...leaseForm, tenant: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a tenant" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tenant1">John Doe</SelectItem>
                      <SelectItem value="tenant2">Jane Smith</SelectItem>
                      <SelectItem value="tenant3">Mike Johnson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="unit-select">Unit *</Label>
                  <Select value={leaseForm.unit} onValueChange={(value) => setLeaseForm({...leaseForm, unit: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unit1">Unit 101</SelectItem>
                      <SelectItem value="unit2">Unit 102</SelectItem>
                      <SelectItem value="unit3">Unit 201</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="start-date">Start Date *</Label>
                    <Input 
                      id="start-date" 
                      type="date" 
                      value={leaseForm.startDate}
                      onChange={(e) => setLeaseForm({...leaseForm, startDate: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="end-date">End Date *</Label>
                    <Input 
                      id="end-date" 
                      type="date" 
                      value={leaseForm.endDate}
                      onChange={(e) => setLeaseForm({...leaseForm, endDate: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="monthly-rent">Monthly Rent ($) *</Label>
                  <Input 
                    id="monthly-rent" 
                    type="number" 
                    value={leaseForm.monthlyRent}
                    onChange={(e) => setLeaseForm({...leaseForm, monthlyRent: e.target.value})}
                    placeholder="1200" 
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddLease} disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Lease
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Leases</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">24</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
              <AlertTriangle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">3</div>
              <p className="text-xs text-muted-foreground">Within 60 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Lease</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">12 mo</div>
              <p className="text-xs text-muted-foreground">Duration</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <div className="h-4 w-4 text-muted-foreground">$</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">$31,200</div>
              <p className="text-xs text-muted-foreground">Monthly</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle>All Leases</CardTitle>
            <CardDescription>Manage and track all lease agreements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by tenant name or unit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Monthly Rent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeases.map((lease) => (
                  <TableRow key={lease.id}>
                    <TableCell className="font-medium">{lease.tenant}</TableCell>
                    <TableCell>{lease.unit}</TableCell>
                    <TableCell>{lease.startDate}</TableCell>
                    <TableCell>{lease.endDate}</TableCell>
                    <TableCell>${lease.monthlyRent}</TableCell>
                    <TableCell>{getStatusBadge(lease.status, lease.daysToRenewal)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewLease(lease.id)}>
                          <FileText className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDownloadLease(lease.id)}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                          ) : (
                            <Download className="h-4 w-4 mr-1" />
                          )}
                          Download
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    
  );
}