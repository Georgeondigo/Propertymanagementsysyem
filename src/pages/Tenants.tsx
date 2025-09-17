import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data
const tenants = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1-555-0123",
    unit: "204",
    leaseStart: "2024-01-15",
    leaseEnd: "2024-12-15",
    monthlyRent: 1250,
    balance: 0,
    status: "active",
    emergencyContact: "Jane Doe - +1-555-0124"
  },
  {
    id: "2",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.j@email.com",
    phone: "+1-555-0456",
    unit: "105",
    leaseStart: "2023-06-01",
    leaseEnd: "2024-05-31",
    monthlyRent: 1100,
    balance: -1100,
    status: "overdue",
    emergencyContact: "Mike Johnson - +1-555-0457"
  },
  {
    id: "3",
    firstName: "Mike",
    lastName: "Chen",
    email: "mike.chen@email.com",
    phone: "+1-555-0789",
    unit: "301",
    leaseStart: "2024-03-01",
    leaseEnd: "2025-02-28",
    monthlyRent: 1400,
    balance: 0,
    status: "active",
    emergencyContact: "Lisa Chen - +1-555-0790"
  }
];

const Tenants = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTenant, setSelectedTenant] = useState<any>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tenantForm, setTenantForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    unit: "",
    monthlyRent: "",
    emergencyContact: "",
  });
  const { toast } = useToast();

  const filteredTenants = tenants.filter(tenant =>
    tenant.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.unit.includes(searchTerm)
  );

  const getStatusBadge = (status: string, balance: number) => {
    if (status === "overdue" || balance < 0) {
      return <Badge variant="destructive">Overdue</Badge>;
    }
    if (status === "active") {
      return <Badge variant="default">Active</Badge>;
    }
  return <Badge variant="secondary">Inactive</Badge>;
  };

  const handleAddTenant = async () => {
    if (!tenantForm.firstName || !tenantForm.lastName || !tenantForm.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Tenant Added",
        description: `${tenantForm.firstName} ${tenantForm.lastName} has been added successfully.`,
      });
      
      setTenantForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        unit: "",
        monthlyRent: "",
        emergencyContact: "",
      });
      setIsAddDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add tenant. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditTenant = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Tenant Updated",
        description: "Tenant information has been updated successfully.",
      });
      
      setIsEditDialogOpen(false);
      setSelectedTenant(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update tenant. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeactivateTenant = async (tenantId: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Tenant Deactivated",
        description: "Tenant has been deactivated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to deactivate tenant. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDocuments = (tenantId: string) => {
    toast({
      title: "Opening Documents",
      description: "Redirecting to tenant documents page...",
    });
  };

  const handleViewPaymentHistory = (tenantId: string) => {
    toast({
      title: "Opening Payment History",
      description: "Redirecting to payment history page...",
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tenants</h1>
          <p className="text-muted-foreground">
            Manage tenant information and lease agreements
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Tenant
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Tenant</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={tenantForm.firstName}
                    onChange={(e) => setTenantForm({...tenantForm, firstName: e.target.value})}
                    placeholder="John"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={tenantForm.lastName}
                    onChange={(e) => setTenantForm({...tenantForm, lastName: e.target.value})}
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={tenantForm.email}
                  onChange={(e) => setTenantForm({...tenantForm, email: e.target.value})}
                  placeholder="john.doe@email.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={tenantForm.phone}
                    onChange={(e) => setTenantForm({...tenantForm, phone: e.target.value})}
                    placeholder="+1-555-0123"
                  />
                </div>
                <div>
                  <Label htmlFor="unit">Unit</Label>
                  <Select value={tenantForm.unit} onValueChange={(value) => setTenantForm({...tenantForm, unit: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="101">Unit 101</SelectItem>
                      <SelectItem value="102">Unit 102</SelectItem>
                      <SelectItem value="201">Unit 201</SelectItem>
                      <SelectItem value="202">Unit 202</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="monthlyRent">Monthly Rent</Label>
                  <Input
                    id="monthlyRent"
                    type="number"
                    value={tenantForm.monthlyRent}
                    onChange={(e) => setTenantForm({...tenantForm, monthlyRent: e.target.value})}
                    placeholder="1200"
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    value={tenantForm.emergencyContact}
                    onChange={(e) => setTenantForm({...tenantForm, emergencyContact: e.target.value})}
                    placeholder="Jane Doe - +1-555-0124"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddTenant} disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Add Tenant
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search tenants by name, email, or unit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tenants Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Tenants ({filteredTenants.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Lease Period</TableHead>
                <TableHead>Monthly Rent</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTenants.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="" />
                        <AvatarFallback>
                          {tenant.firstName[0]}{tenant.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {tenant.firstName} {tenant.lastName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {tenant.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">Unit {tenant.unit}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="flex items-center">
                        <Phone className="mr-1 h-3 w-3" />
                        {tenant.phone}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Mail className="mr-1 h-3 w-3" />
                        {tenant.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{tenant.leaseStart}</div>
                      <div className="text-muted-foreground">to {tenant.leaseEnd}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      ${tenant.monthlyRent.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`font-medium ${tenant.balance < 0 ? 'text-destructive' : 'text-success'}`}>
                      ${Math.abs(tenant.balance).toLocaleString()}
                      {tenant.balance < 0 ? ' overdue' : ''}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(tenant.status, tenant.balance)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setSelectedTenant(tenant)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          setSelectedTenant(tenant);
                          setTenantForm({
                            firstName: tenant.firstName,
                            lastName: tenant.lastName,
                            email: tenant.email,
                            phone: tenant.phone,
                            unit: tenant.unit,
                            monthlyRent: tenant.monthlyRent.toString(),
                            emergencyContact: tenant.emergencyContact,
                          });
                          setIsEditDialogOpen(true);
                        }}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Tenant
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Deactivate
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Deactivate Tenant</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to deactivate {tenant.firstName} {tenant.lastName}? This action will end their lease and revoke access.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeactivateTenant(tenant.id)}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Deactivate
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Tenant Details Dialog */}
      <Dialog open={!!selectedTenant} onOpenChange={() => setSelectedTenant(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Tenant Details - {selectedTenant?.firstName} {selectedTenant?.lastName}
            </DialogTitle>
          </DialogHeader>
          {selectedTenant && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Personal Information</h4>
                  <div className="space-y-2 text-sm">
                    <div>Name: {selectedTenant.firstName} {selectedTenant.lastName}</div>
                    <div>Email: {selectedTenant.email}</div>
                    <div>Phone: {selectedTenant.phone}</div>
                    <div>Emergency Contact: {selectedTenant.emergencyContact}</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Lease Information</h4>
                  <div className="space-y-2 text-sm">
                    <div>Unit: {selectedTenant.unit}</div>
                    <div>Lease Start: {selectedTenant.leaseStart}</div>
                    <div>Lease End: {selectedTenant.leaseEnd}</div>
                    <div>Monthly Rent: ${selectedTenant.monthlyRent.toLocaleString()}</div>
                    <div>Current Balance: 
                      <span className={selectedTenant.balance < 0 ? 'text-destructive font-medium' : 'text-success font-medium'}>
                        ${Math.abs(selectedTenant.balance).toLocaleString()}
                        {selectedTenant.balance < 0 ? ' overdue' : ''}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => handleViewPaymentHistory(selectedTenant.id)}>
                  View Payment History
                </Button>
                <Button variant="outline" onClick={() => handleViewDocuments(selectedTenant.id)}>
                  View Documents
                </Button>
                <Button onClick={() => {
                  setTenantForm({
                    firstName: selectedTenant.firstName,
                    lastName: selectedTenant.lastName,
                    email: selectedTenant.email,
                    phone: selectedTenant.phone,
                    unit: selectedTenant.unit,
                    monthlyRent: selectedTenant.monthlyRent.toString(),
                    emergencyContact: selectedTenant.emergencyContact,
                  });
                  setIsEditDialogOpen(true);
                  setSelectedTenant(null);
                }}>
                  Edit Tenant
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Tenant Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Tenant</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editFirstName">First Name *</Label>
                <Input
                  id="editFirstName"
                  value={tenantForm.firstName}
                  onChange={(e) => setTenantForm({...tenantForm, firstName: e.target.value})}
                  placeholder="John"
                />
              </div>
              <div>
                <Label htmlFor="editLastName">Last Name *</Label>
                <Input
                  id="editLastName"
                  value={tenantForm.lastName}
                  onChange={(e) => setTenantForm({...tenantForm, lastName: e.target.value})}
                  placeholder="Doe"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="editEmail">Email *</Label>
              <Input
                id="editEmail"
                type="email"
                value={tenantForm.email}
                onChange={(e) => setTenantForm({...tenantForm, email: e.target.value})}
                placeholder="john.doe@email.com"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editPhone">Phone</Label>
                <Input
                  id="editPhone"
                  value={tenantForm.phone}
                  onChange={(e) => setTenantForm({...tenantForm, phone: e.target.value})}
                  placeholder="+1-555-0123"
                />
              </div>
              <div>
                <Label htmlFor="editUnit">Unit</Label>
                <Select value={tenantForm.unit} onValueChange={(value) => setTenantForm({...tenantForm, unit: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="101">Unit 101</SelectItem>
                    <SelectItem value="102">Unit 102</SelectItem>
                    <SelectItem value="201">Unit 201</SelectItem>
                    <SelectItem value="202">Unit 202</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editMonthlyRent">Monthly Rent</Label>
                <Input
                  id="editMonthlyRent"
                  type="number"
                  value={tenantForm.monthlyRent}
                  onChange={(e) => setTenantForm({...tenantForm, monthlyRent: e.target.value})}
                  placeholder="1200"
                />
              </div>
              <div>
                <Label htmlFor="editEmergencyContact">Emergency Contact</Label>
                <Input
                  id="editEmergencyContact"
                  value={tenantForm.emergencyContact}
                  onChange={(e) => setTenantForm({...tenantForm, emergencyContact: e.target.value})}
                  placeholder="Jane Doe - +1-555-0124"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditTenant} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Tenant
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tenants;