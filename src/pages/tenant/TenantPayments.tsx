import { useState } from "react";
import { PageHeader } from "@/components/tenant/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { CreditCard, Download, DollarSign, Clock, TrendingUp, Smartphone, Banknote } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function TenantPayments() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const { toast } = useToast();

  const outstandingBalances = [
    { type: "Rent", amount: 1500, dueDate: "2024-02-01", status: "overdue" },
    { type: "Utilities", amount: 285, dueDate: "2024-02-15", status: "pending" },
    { type: "Parking", amount: 75, dueDate: "2024-02-20", status: "pending" },
  ];

  const paymentHistory = [
    { id: 1, date: "2024-01-15", type: "Rent", amount: 1500, method: "M-Pesa", status: "completed", reference: "MP240115001" },
    { id: 2, date: "2024-01-10", type: "Utilities", amount: 320, method: "Bank Transfer", status: "completed", reference: "BT240110002" },
    { id: 3, date: "2023-12-15", type: "Rent", amount: 1500, method: "Credit Card", status: "completed", reference: "CC231215003" },
    { id: 4, date: "2023-12-08", type: "Utilities", amount: 275, method: "M-Pesa", status: "completed", reference: "MP231208004" },
    { id: 5, date: "2023-11-15", type: "Rent", amount: 1500, method: "M-Pesa", status: "completed", reference: "MP231115005" },
  ];

  const monthlySpending = [
    { month: "Sep", rent: 1500, utilities: 245, total: 1745 },
    { month: "Oct", rent: 1500, utilities: 280, total: 1780 },
    { month: "Nov", rent: 1500, utilities: 275, total: 1775 },
    { month: "Dec", rent: 1500, utilities: 320, total: 1820 },
    { month: "Jan", rent: 1500, utilities: 285, total: 1785 },
  ];

  const paymentMethods = [
    { name: "M-Pesa", value: 45, color: "#22c55e" },
    { name: "Bank Transfer", value: 25, color: "#3b82f6" },
    { name: "Credit Card", value: 20, color: "#8b5cf6" },
    { name: "Cash", value: 10, color: "#f59e0b" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "completed":
        return <Badge className="bg-success text-success-foreground">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handlePayment = (type: string, amount: number) => {
    if (!selectedPaymentMethod) {
      toast({
        title: "Select Payment Method",
        description: "Please select a payment method to continue.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Payment Initiated",
      description: `${type} payment of $${amount} via ${selectedPaymentMethod} is being processed.`,
    });
  };

  const handleDownloadReceipt = (id: number) => {
    toast({
      title: "Download Started",
      description: `Receipt #${id} is being downloaded.`,
    });
  };

  const totalOutstanding = outstandingBalances.reduce((sum, item) => sum + item.amount, 0);
  const overdueAmount = outstandingBalances.filter(item => item.status === "overdue").reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payments & Billing"
        subtitle="Manage your rent, utilities, and payment history"
        breadcrumbs={[{ label: "Payments" }]}
      />

      {/* Outstanding Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalOutstanding}</div>
            <p className="text-xs text-muted-foreground">Across all bills</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Amount</CardTitle>
            <Clock className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">${overdueAmount}</div>
            <p className="text-xs text-muted-foreground">Requires immediate attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Feb 15</div>
            <p className="text-xs text-muted-foreground">Utilities due</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="outstanding" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="outstanding">Outstanding Bills</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
          <TabsTrigger value="analytics">Spending Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="outstanding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Outstanding Payments</CardTitle>
              <CardDescription>Bills that require payment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {outstandingBalances.map((bill, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg space-y-3 sm:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{bill.type}</h3>
                        {getStatusBadge(bill.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">Due: {bill.dueDate}</p>
                    </div>
                    <div className="text-right sm:text-left">
                      <div className="text-2xl font-bold">${bill.amount}</div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" className="mt-2">Pay Now</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Pay {bill.type}</DialogTitle>
                            <DialogDescription>
                              Complete payment of ${bill.amount} for {bill.type}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium">Payment Method</label>
                              <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select payment method" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="mpesa">
                                    <div className="flex items-center gap-2">
                                      <Smartphone className="h-4 w-4" />
                                      M-Pesa
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="card">
                                    <div className="flex items-center gap-2">
                                      <CreditCard className="h-4 w-4" />
                                      Credit/Debit Card
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="bank">
                                    <div className="flex items-center gap-2">
                                      <Banknote className="h-4 w-4" />
                                      Bank Transfer
                                    </div>
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <Button 
                              onClick={() => handlePayment(bill.type, bill.amount)} 
                              className="w-full"
                            >
                              Pay ${bill.amount}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Your complete payment record</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentHistory.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>{payment.type}</TableCell>
                        <TableCell className="font-medium">${payment.amount}</TableCell>
                        <TableCell>{payment.method}</TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        <TableCell className="font-mono text-sm">{payment.reference}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownloadReceipt(payment.id)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {/* Mobile view */}
              <div className="md:hidden space-y-3">
                {paymentHistory.map((payment) => (
                  <Card key={payment.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{payment.type}</h3>
                          <p className="text-sm text-muted-foreground">{payment.date}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${payment.amount}</div>
                          {getStatusBadge(payment.status)}
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>{payment.method}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownloadReceipt(payment.id)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Receipt
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Spending Trend</CardTitle>
                <CardDescription>Rent vs utilities over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlySpending}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="rent" stroke="hsl(var(--primary))" strokeWidth={2} />
                      <Line type="monotone" dataKey="utilities" stroke="hsl(var(--accent))" strokeWidth={2} />
                      <Line type="monotone" dataKey="total" stroke="hsl(var(--success))" strokeWidth={2} strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Your preferred payment methods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={paymentMethods}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {paymentMethods.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Monthly Comparison</CardTitle>
                <CardDescription>Breakdown of expenses by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlySpending}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="rent" fill="hsl(var(--primary))" />
                      <Bar dataKey="utilities" fill="hsl(var(--accent))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}