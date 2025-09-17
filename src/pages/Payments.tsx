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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { DollarSign, CreditCard, Plus, Search, Download, TrendingUp, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Payments() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Sample payments data
  const payments = [
    {
      id: "1",
      tenant: "John Smith",
      unit: "101",
      amount: 1200,
      type: "rent",
      method: "Bank Transfer",
      date: "2024-01-15",
      status: "completed",
      reference: "TXN123456"
    },
    {
      id: "2",
      tenant: "Sarah Johnson",
      unit: "203",
      amount: 1500,
      type: "rent",
      method: "Credit Card",
      date: "2024-01-10",
      status: "completed",
      reference: "TXN123457"
    },
    {
      id: "3",
      tenant: "Mike Wilson",
      unit: "305",
      amount: 1100,
      type: "rent",
      method: "Cash",
      date: "2024-01-05",
      status: "pending",
      reference: "TXN123458"
    },
    {
      id: "4",
      tenant: "John Smith",
      unit: "101",
      amount: 108.50,
      type: "utilities",
      method: "Auto-pay",
      date: "2024-01-20",
      status: "completed",
      reference: "TXN123459"
    }
  ];

  // Sample arrears data
  const arrears = [
    {
      tenant: "Emma Davis",
      unit: "402",
      amountDue: 2400,
      daysOverdue: 45,
      lastPayment: "2023-11-15"
    },
    {
      tenant: "Tom Brown",
      unit: "507",
      amountDue: 1200,
      daysOverdue: 15,
      lastPayment: "2024-01-01"
    }
  ];

  // Sample revenue data
  const revenueData = [
    { month: "Jul", rent: 28000, utilities: 3200, late_fees: 450 },
    { month: "Aug", rent: 29500, utilities: 3400, late_fees: 200 },
    { month: "Sep", rent: 30000, utilities: 3100, late_fees: 600 },
    { month: "Oct", rent: 31200, utilities: 3600, late_fees: 300 },
    { month: "Nov", rent: 30800, utilities: 3800, late_fees: 150 },
    { month: "Dec", rent: 32000, utilities: 4200, late_fees: 500 },
  ];

  const paymentMethodData = [
    { name: "Bank Transfer", value: 45, color: "hsl(var(--primary))" },
    { name: "Credit Card", value: 30, color: "hsl(var(--secondary))" },
    { name: "Auto-pay", value: 20, color: "hsl(var(--accent))" },
    { name: "Cash", value: 5, color: "hsl(var(--muted))" },
  ];

  const filteredPayments = payments.filter(payment =>
    payment.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.unit.includes(searchTerm) ||
    payment.reference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-success text-success-foreground">Completed</Badge>;
      case "pending":
        return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleAddPayment = () => {
    toast({
      title: "Payment Recorded",
      description: "Manual payment has been recorded successfully.",
    });
    setIsAddDialogOpen(false);
  };

  const totalRevenue = payments
    .filter(p => p.status === "completed")
    .reduce((sum, payment) => sum + payment.amount, 0);
    
  const totalArrears = arrears.reduce((sum, arr) => sum + arr.amountDue, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary">Payment Management</h1>
            <p className="text-muted-foreground">Track rent collection and payment history</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => {
              toast({
                title: "Export Starting",
                description: "Generating payment report for download...",
              });
            }}>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Record Payment
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Record Manual Payment</DialogTitle>
                  <DialogDescription>
                    Record a payment received outside the system.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="tenant-select">Tenant</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a tenant" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tenant1">John Smith - Unit 101</SelectItem>
                        <SelectItem value="tenant2">Sarah Johnson - Unit 203</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="amount">Amount ($)</Label>
                      <Input id="amount" type="number" placeholder="1200.00" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="payment-type">Payment Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rent">Rent</SelectItem>
                          <SelectItem value="utilities">Utilities</SelectItem>
                          <SelectItem value="late_fee">Late Fee</SelectItem>
                          <SelectItem value="deposit">Deposit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="payment-method">Payment Method</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="check">Check</SelectItem>
                          <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                          <SelectItem value="money_order">Money Order</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="payment-date">Payment Date</Label>
                      <Input id="payment-date" type="date" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="reference">Reference/Check Number</Label>
                    <Input id="reference" placeholder="Enter reference number" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddPayment}>Record Payment</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Outstanding Arrears</CardTitle>
              <AlertTriangle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">${totalArrears.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">{arrears.length} tenants</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">94.5%</div>
              <p className="text-xs text-muted-foreground">+2.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Payment Time</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">3.2 days</div>
              <p className="text-xs text-muted-foreground">Before due date</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="payments" className="w-full">
          <TabsList>
            <TabsTrigger value="payments">Recent Payments</TabsTrigger>
            <TabsTrigger value="arrears">Arrears</TabsTrigger>
            <TabsTrigger value="analytics">Revenue Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>Recent payment transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by tenant, unit, or reference..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reference</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell className="font-medium">{payment.tenant}</TableCell>
                        <TableCell>{payment.unit}</TableCell>
                        <TableCell>${payment.amount}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{payment.type}</Badge>
                        </TableCell>
                        <TableCell>{payment.method}</TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{payment.reference}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="arrears" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Outstanding Arrears</CardTitle>
                <CardDescription>Tenants with overdue payments</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Amount Due</TableHead>
                      <TableHead>Days Overdue</TableHead>
                      <TableHead>Last Payment</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {arrears.map((arrear, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{arrear.tenant}</TableCell>
                        <TableCell>{arrear.unit}</TableCell>
                        <TableCell className="text-warning font-semibold">${arrear.amountDue}</TableCell>
                        <TableCell>
                          <Badge variant={arrear.daysOverdue > 30 ? "destructive" : "default"}>
                            {arrear.daysOverdue} days
                          </Badge>
                        </TableCell>
                        <TableCell>{arrear.lastPayment}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => toast({
                                title: "Sending Notice",
                                description: `Payment reminder sent to ${arrear.tenant}.`,
                              })}
                            >
                              Send Notice
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => toast({
                                title: "Contacting Tenant",
                                description: `Opening contact form for ${arrear.tenant}.`,
                              })}
                            >
                              Contact
                            </Button>
                          </div>
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
                  <CardTitle>Revenue Trends</CardTitle>
                  <CardDescription>Monthly revenue breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="rent" stroke="hsl(var(--primary))" strokeWidth={2} name="Rent" />
                      <Line type="monotone" dataKey="utilities" stroke="hsl(var(--secondary))" strokeWidth={2} name="Utilities" />
                      <Line type="monotone" dataKey="late_fees" stroke="hsl(var(--accent))" strokeWidth={2} name="Late Fees" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Distribution of payment methods</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={paymentMethodData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {paymentMethodData.map((entry, index) => (
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
      </div>
    </AdminLayout>
  );
}