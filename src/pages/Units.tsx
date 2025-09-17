import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Search,
  Filter,
  Home,
  User,
  DollarSign,
  Bed,
  Bath,
  Square,
  MapPin,
  Edit,
  Trash2,
  Eye,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data
const units = [
  {
    id: "1",
    unitNumber: "101",
    floor: 1,
    bedrooms: 2,
    bathrooms: 1,
    squareFeet: 850,
    rentAmount: 1100,
    status: "occupied",
    tenant: "Sarah Johnson",
    description: "Cozy 2-bedroom apartment with city view"
  },
  {
    id: "2",
    unitNumber: "102",
    floor: 1,
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 650,
    rentAmount: 950,
    status: "vacant",
    tenant: null,
    description: "Modern 1-bedroom apartment with updated kitchen"
  },
  {
    id: "3",
    unitNumber: "201",
    floor: 2,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1000,
    rentAmount: 1300,
    status: "occupied",
    tenant: "Mike Chen",
    description: "Spacious 2-bedroom with balcony and parking"
  },
  {
    id: "4",
    unitNumber: "202",
    floor: 2,
    bedrooms: 2,
    bathrooms: 1,
    squareFeet: 900,
    rentAmount: 1200,
    status: "maintenance",
    tenant: null,
    description: "2-bedroom unit currently under renovation"
  },
  {
    id: "5",
    unitNumber: "301",
    floor: 3,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1200,
    rentAmount: 1500,
    status: "occupied",
    tenant: "John Doe",
    description: "Large 3-bedroom penthouse with terrace"
  },
  {
    id: "6",
    unitNumber: "302",
    floor: 3,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1000,
    rentAmount: 1350,
    status: "vacant",
    tenant: null,
    description: "Modern 2-bedroom with premium finishes"
  }
];

const Units = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [floorFilter, setFloorFilter] = useState("all");
  const [selectedUnit, setSelectedUnit] = useState<any>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [unitForm, setUnitForm] = useState({
    unitNumber: "",
    floor: "",
    bedrooms: "",
    bathrooms: "",
    squareFeet: "",
    rentAmount: "",
    description: "",
  });
  const { toast } = useToast();

  const filteredUnits = units.filter(unit => {
    const matchesSearch = unit.unitNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         unit.tenant?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || unit.status === statusFilter;
    const matchesFloor = floorFilter === "all" || unit.floor.toString() === floorFilter;
    
    return matchesSearch && matchesStatus && matchesFloor;
  });

  const groupedByFloor = filteredUnits.reduce((acc, unit) => {
    const floor = unit.floor;
    if (!acc[floor]) acc[floor] = [];
    acc[floor].push(unit);
    return acc;
  }, {} as Record<number, any[]>);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "occupied":
        return <Badge variant="default">Occupied</Badge>;
      case "vacant":
        return <Badge variant="secondary">Vacant</Badge>;
      case "maintenance":
        return <Badge variant="destructive">Maintenance</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "occupied":
        return "border-primary bg-primary/5";
      case "vacant":
        return "border-success bg-success/5";
      case "maintenance":
        return "border-destructive bg-destructive/5";
      default:
        return "border-border";
    }
  };

  const stats = {
    total: units.length,
    occupied: units.filter(u => u.status === "occupied").length,
    vacant: units.filter(u => u.status === "vacant").length,
    maintenance: units.filter(u => u.status === "maintenance").length,
    occupancyRate: Math.round((units.filter(u => u.status === "occupied").length / units.length) * 100)
  };

  const handleAddUnit = async () => {
    if (!unitForm.unitNumber || !unitForm.floor || !unitForm.rentAmount) {
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
        title: "Unit Added",
        description: `Unit ${unitForm.unitNumber} has been created successfully.`,
      });
      
      setUnitForm({
        unitNumber: "",
        floor: "",
        bedrooms: "",
        bathrooms: "",
        squareFeet: "",
        rentAmount: "",
        description: "",
      });
      setIsAddDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add unit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditUnit = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Unit Updated",
        description: "Unit information has been updated successfully.",
      });
      
      setIsEditDialogOpen(false);
      setSelectedUnit(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update unit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewHistory = (unitId: string) => {
    toast({
      title: "Opening History",
      description: "Redirecting to unit history page...",
    });
  };

  const handleViewPhotos = (unitId: string) => {
    toast({
      title: "Opening Photos",
      description: "Redirecting to unit photo gallery...",
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Units</h1>
          <p className="text-muted-foreground">
            Manage property units and occupancy
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Unit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Unit</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="unitNumber">Unit Number *</Label>
                  <Input
                    id="unitNumber"
                    value={unitForm.unitNumber}
                    onChange={(e) => setUnitForm({...unitForm, unitNumber: e.target.value})}
                    placeholder="e.g., 101"
                  />
                </div>
                <div>
                  <Label htmlFor="floor">Floor *</Label>
                  <Input
                    id="floor"
                    type="number"
                    value={unitForm.floor}
                    onChange={(e) => setUnitForm({...unitForm, floor: e.target.value})}
                    placeholder="1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    value={unitForm.bedrooms}
                    onChange={(e) => setUnitForm({...unitForm, bedrooms: e.target.value})}
                    placeholder="2"
                  />
                </div>
                <div>
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    value={unitForm.bathrooms}
                    onChange={(e) => setUnitForm({...unitForm, bathrooms: e.target.value})}
                    placeholder="1"
                  />
                </div>
                <div>
                  <Label htmlFor="squareFeet">Sq Ft</Label>
                  <Input
                    id="squareFeet"
                    type="number"
                    value={unitForm.squareFeet}
                    onChange={(e) => setUnitForm({...unitForm, squareFeet: e.target.value})}
                    placeholder="850"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="rentAmount">Monthly Rent *</Label>
                <Input
                  id="rentAmount"
                  type="number"
                  value={unitForm.rentAmount}
                  onChange={(e) => setUnitForm({...unitForm, rentAmount: e.target.value})}
                  placeholder="1200"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={unitForm.description}
                  onChange={(e) => setUnitForm({...unitForm, description: e.target.value})}
                  placeholder="Unit description..."
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddUnit} disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Add Unit
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Home className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Units</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Occupied</p>
                <p className="text-2xl font-bold text-primary">{stats.occupied}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Home className="h-4 w-4 text-success" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Vacant</p>
                <p className="text-2xl font-bold text-success">{stats.vacant}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-destructive" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Maintenance</p>
                <p className="text-2xl font-bold text-destructive">{stats.maintenance}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Occupancy Rate</p>
                <p className="text-2xl font-bold text-primary">{stats.occupancyRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search units by number or tenant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="vacant">Vacant</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
            <Select value={floorFilter} onValueChange={setFloorFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Floor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Floors</SelectItem>
                <SelectItem value="1">Floor 1</SelectItem>
                <SelectItem value="2">Floor 2</SelectItem>
                <SelectItem value="3">Floor 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Units Grid by Floor */}
      <div className="space-y-6">
        {Object.keys(groupedByFloor)
          .sort((a, b) => parseInt(a) - parseInt(b))
          .map(floor => (
          <Card key={floor}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Floor {floor} ({groupedByFloor[parseInt(floor)].length} units)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedByFloor[parseInt(floor)].map((unit) => (
                  <Card key={unit.id} className={`cursor-pointer transition-colors hover:shadow-md ${getStatusColor(unit.status)}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">Unit {unit.unitNumber}</h3>
                          {getStatusBadge(unit.status)}
                        </div>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm" onClick={() => setSelectedUnit(unit)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => {
                            setSelectedUnit(unit);
                            setUnitForm({
                              unitNumber: unit.unitNumber,
                              floor: unit.floor.toString(),
                              bedrooms: unit.bedrooms.toString(),
                              bathrooms: unit.bathrooms.toString(),
                              squareFeet: unit.squareFeet.toString(),
                              rentAmount: unit.rentAmount.toString(),
                              description: unit.description,
                            });
                            setIsEditDialogOpen(true);
                          }}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {unit.tenant && (
                        <div className="flex items-center space-x-2 mb-3 text-sm">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{unit.tenant}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                        <div className="flex items-center space-x-1">
                          <Bed className="h-3 w-3 text-muted-foreground" />
                          <span>{unit.bedrooms} bed</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Bath className="h-3 w-3 text-muted-foreground" />
                          <span>{unit.bathrooms} bath</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Square className="h-3 w-3 text-muted-foreground" />
                          <span>{unit.squareFeet} sq ft</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-3 w-3 text-muted-foreground" />
                          <span>${unit.rentAmount}</span>
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {unit.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
          ))}
      </div>

      {/* Unit Details Dialog */}
      <Dialog open={!!selectedUnit} onOpenChange={() => setSelectedUnit(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Unit {selectedUnit?.unitNumber} Details
            </DialogTitle>
          </DialogHeader>
          {selectedUnit && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Unit {selectedUnit.unitNumber}</h3>
                {getStatusBadge(selectedUnit.status)}
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Unit Details</h4>
                  <div className="space-y-2 text-sm">
                    <div>Floor: {selectedUnit.floor}</div>
                    <div>Bedrooms: {selectedUnit.bedrooms}</div>
                    <div>Bathrooms: {selectedUnit.bathrooms}</div>
                    <div>Square Feet: {selectedUnit.squareFeet}</div>
                    <div>Monthly Rent: ${selectedUnit.rentAmount.toLocaleString()}</div>
                  </div>
                </div>
                
                {selectedUnit.tenant && (
                  <div>
                    <h4 className="font-medium mb-2">Current Tenant</h4>
                    <div className="space-y-2 text-sm">
                      <div>Name: {selectedUnit.tenant}</div>
                      <div>Status: Active</div>
                      <div>Move-in: Jan 15, 2024</div>
                      <div>Lease Expires: Dec 15, 2024</div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedUnit.description}
                </p>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => handleViewHistory(selectedUnit.id)}>
                  View History
                </Button>
                <Button variant="outline" onClick={() => handleViewPhotos(selectedUnit.id)}>
                  View Photos
                </Button>
                <Button onClick={() => {
                  setUnitForm({
                    unitNumber: selectedUnit.unitNumber,
                    floor: selectedUnit.floor.toString(),
                    bedrooms: selectedUnit.bedrooms.toString(),
                    bathrooms: selectedUnit.bathrooms.toString(),
                    squareFeet: selectedUnit.squareFeet.toString(),
                    rentAmount: selectedUnit.rentAmount.toString(),
                    description: selectedUnit.description,
                  });
                  setIsEditDialogOpen(true);
                  setSelectedUnit(null);
                }}>
                  Edit Unit
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Unit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Unit</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editUnitNumber">Unit Number *</Label>
                <Input
                  id="editUnitNumber"
                  value={unitForm.unitNumber}
                  onChange={(e) => setUnitForm({...unitForm, unitNumber: e.target.value})}
                  placeholder="e.g., 101"
                />
              </div>
              <div>
                <Label htmlFor="editFloor">Floor *</Label>
                <Input
                  id="editFloor"
                  type="number"
                  value={unitForm.floor}
                  onChange={(e) => setUnitForm({...unitForm, floor: e.target.value})}
                  placeholder="1"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="editBedrooms">Bedrooms</Label>
                <Input
                  id="editBedrooms"
                  type="number"
                  value={unitForm.bedrooms}
                  onChange={(e) => setUnitForm({...unitForm, bedrooms: e.target.value})}
                  placeholder="2"
                />
              </div>
              <div>
                <Label htmlFor="editBathrooms">Bathrooms</Label>
                <Input
                  id="editBathrooms"
                  type="number"
                  value={unitForm.bathrooms}
                  onChange={(e) => setUnitForm({...unitForm, bathrooms: e.target.value})}
                  placeholder="1"
                />
              </div>
              <div>
                <Label htmlFor="editSquareFeet">Sq Ft</Label>
                <Input
                  id="editSquareFeet"
                  type="number"
                  value={unitForm.squareFeet}
                  onChange={(e) => setUnitForm({...unitForm, squareFeet: e.target.value})}
                  placeholder="850"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="editRentAmount">Monthly Rent *</Label>
              <Input
                id="editRentAmount"
                type="number"
                value={unitForm.rentAmount}
                onChange={(e) => setUnitForm({...unitForm, rentAmount: e.target.value})}
                placeholder="1200"
              />
            </div>
            <div>
              <Label htmlFor="editDescription">Description</Label>
              <Textarea
                id="editDescription"
                value={unitForm.description}
                onChange={(e) => setUnitForm({...unitForm, description: e.target.value})}
                placeholder="Unit description..."
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditUnit} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Unit
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Units;