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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Zap, Droplets, Flame, Plus, Search, Download, TrendingUp, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Utilities() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [readingForm, setReadingForm] = useState({
    unit: "",
    electricity: "",
    water: "",
    gas: "",
    readingDate: "",
  });

  // Sample utility readings data
  const readings = [
    {
      id: "1",
      unit: "101",
      tenant: "John Smith",
      readingDate: "2024-01-15",
      electricity: 245,
      water: 1200,
      gas: 180,
      electricityCost: 48.50,
      waterCost: 24.00,
      gasCost: 36.00,
      totalCost: 108.50
    },
    {
      id: "2",
      unit: "203",
      tenant: "Sarah Johnson",
      readingDate: "2024-01-15",
      electricity: 320,
      water: 1800,
      gas: 220,
      electricityCost: 64.00,
      waterCost: 36.00,
      gasCost: 44.00,
      totalCost: 144.00
    },
    {
      id: "3",
      unit: "305",
      tenant: "Mike Wilson",
      readingDate: "2024-01-15",
      electricity: 180,
      water: 900,
      gas: 150,
      electricityCost: 36.00,
      waterCost: 18.00,
      gasCost: 30.00,
      totalCost: 84.00
    }
  ];

  // Sample chart data
  const usageData = [
    { month: "Jul", electricity: 2400, water: 15000, gas: 1800 },
    { month: "Aug", electricity: 2600, water: 16200, gas: 1900 },
    { month: "Sep", electricity: 2300, water: 14800, gas: 1700 },
    { month: "Oct", electricity: 2800, water: 17000, gas: 2100 },
    { month: "Nov", electricity: 3200, water: 18500, gas: 2400 },
    { month: "Dec", electricity: 3600, water: 19000, gas: 2800 },
  ];

  const costData = [
    { month: "Jul", electricity: 480, water: 300, gas: 360 },
    { month: "Aug", electricity: 520, water: 324, gas: 380 },
    { month: "Sep", electricity: 460, water: 296, gas: 340 },
    { month: "Oct", electricity: 560, water: 340, gas: 420 },
    { month: "Nov", electricity: 640, water: 370, gas: 480 },
    { month: "Dec", electricity: 720, water: 380, gas: 560 },
  ];

  const filteredReadings = readings.filter(reading =>
    reading.unit.includes(searchTerm) ||
    reading.tenant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddReading = async () => {
    if (!readingForm.unit || !readingForm.electricity || !readingForm.water || !readingForm.readingDate) {
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
        title: "Reading Added",
        description: "Utility reading has been recorded successfully.",
      });
      
      setReadingForm({
        unit: "",
        electricity: "",
        water: "",
        gas: "",
        readingDate: "",
      });
      setIsAddDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add reading. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportData = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Export Complete",
        description: "Utility data has been exported successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const totalElectricityCost = readings.reduce((sum, reading) => sum + reading.electricityCost, 0);
  const totalWaterCost = readings.reduce((sum, reading) => sum + reading.waterCost, 0);
  const totalGasCost = readings.reduce((sum, reading) => sum + reading.gasCost, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary">Utilities Management</h1>
            <p className="text-muted-foreground">Track and manage utility usage and costs</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleExportData} disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Reading
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add Utility Reading</DialogTitle>
                  <DialogDescription>
                    Record new utility readings for a unit.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="unit-select">Unit *</Label>
                    <Select value={readingForm.unit} onValueChange={(value) => setReadingForm({...readingForm, unit: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unit101">Unit 101</SelectItem>
                        <SelectItem value="unit102">Unit 102</SelectItem>
                        <SelectItem value="unit203">Unit 203</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="reading-date">Reading Date *</Label>
                    <Input 
                      id="reading-date" 
                      type="date" 
                      value={readingForm.readingDate}
                      onChange={(e) => setReadingForm({...readingForm, readingDate: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="electricity">Electricity (kWh) *</Label>
                      <Input 
                        id="electricity" 
                        type="number" 
                        value={readingForm.electricity}
                        onChange={(e) => setReadingForm({...readingForm, electricity: e.target.value})}
                        placeholder="245" 
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="water">Water (gallons) *</Label>
                      <Input 
                        id="water" 
                        type="number" 
                        value={readingForm.water}
                        onChange={(e) => setReadingForm({...readingForm, water: e.target.value})}
                        placeholder="1200" 
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="gas">Gas (therms)</Label>
                      <Input 
                        id="gas" 
                        type="number" 
                        value={readingForm.gas}
                        onChange={(e) => setReadingForm({...readingForm, gas: e.target.value})}
                        placeholder="180" 
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddReading} disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Add Reading
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Electricity Cost</CardTitle>
              <Zap className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">${totalElectricityCost.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Water Cost</CardTitle>
              <Droplets className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">${totalWaterCost.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gas Cost</CardTitle>
              <Flame className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">${totalGasCost.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">${(totalElectricityCost + totalWaterCost + totalGasCost).toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="readings" className="w-full">
          <TabsList>
            <TabsTrigger value="readings">Current Readings</TabsTrigger>
            <TabsTrigger value="usage-trends">Usage Trends</TabsTrigger>
            <TabsTrigger value="cost-analysis">Cost Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="readings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Utility Readings</CardTitle>
                <CardDescription>Latest utility readings by unit</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by unit or tenant..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Unit</TableHead>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Electricity</TableHead>
                      <TableHead>Water</TableHead>
                      <TableHead>Gas</TableHead>
                      <TableHead>Total Cost</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReadings.map((reading) => (
                      <TableRow key={reading.id}>
                        <TableCell className="font-medium">{reading.unit}</TableCell>
                        <TableCell>{reading.tenant}</TableCell>
                        <TableCell>{reading.readingDate}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {reading.electricity} kWh
                            <div className="text-xs text-muted-foreground">${reading.electricityCost}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {reading.water} gal
                            <div className="text-xs text-muted-foreground">${reading.waterCost}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {reading.gas} therms
                            <div className="text-xs text-muted-foreground">${reading.gasCost}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">${reading.totalCost}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="usage-trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Usage Trends</CardTitle>
                <CardDescription>Historical utility usage patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="electricity" stroke="hsl(var(--primary))" strokeWidth={2} name="Electricity (kWh)" />
                    <Line type="monotone" dataKey="water" stroke="hsl(var(--secondary))" strokeWidth={2} name="Water (gallons)" />
                    <Line type="monotone" dataKey="gas" stroke="hsl(var(--accent))" strokeWidth={2} name="Gas (therms)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cost-analysis" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Cost Analysis</CardTitle>
                <CardDescription>Monthly utility costs breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={costData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="electricity" stackId="a" fill="hsl(var(--primary))" name="Electricity" />
                    <Bar dataKey="water" stackId="a" fill="hsl(var(--secondary))" name="Water" />
                    <Bar dataKey="gas" stackId="a" fill="hsl(var(--accent))" name="Gas" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}