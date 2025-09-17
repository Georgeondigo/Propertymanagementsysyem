import { useState } from "react";
import { PageHeader } from "@/components/tenant/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileText, Search, Printer, Eye, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function TenantInvoices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const { toast } = useToast();

  const invoices = [
    {
      id: "INV-2024-001",
      date: "2024-02-01",
      dueDate: "2024-02-15",
      type: "Rent",
      description: "Monthly Rent - February 2024",
      amount: 1500.00,
      status: "paid",
      paidDate: "2024-02-10",
      items: [
        { description: "Monthly Rent", amount: 1500.00 }
      ]
    },
    {
      id: "INV-2024-002",
      date: "2024-02-05",
      dueDate: "2024-02-20",
      type: "Utilities",
      description: "Utility Bills - February 2024",
      amount: 285.50,
      status: "pending",
      paidDate: null,
      items: [
        { description: "Electricity", amount: 85.50 },
        { description: "Water", amount: 48.75 },
        { description: "Gas", amount: 32.20 },
        { description: "Internet", amount: 119.05 }
      ]
    },
    {
      id: "INV-2024-003",
      date: "2024-01-15",
      dueDate: "2024-01-30",
      type: "Combined",
      description: "Rent + Utilities - January 2024",
      amount: 1820.75,
      status: "paid",
      paidDate: "2024-01-28",
      items: [
        { description: "Monthly Rent", amount: 1500.00 },
        { description: "Electricity", amount: 95.25 },
        { description: "Water", amount: 52.50 },
        { description: "Gas", amount: 38.00 },
        { description: "Internet", amount: 135.00 }
      ]
    },
    {
      id: "INV-2024-004",
      date: "2024-01-31",
      dueDate: "2024-02-15",
      type: "Parking",
      description: "Parking Fee - February 2024",
      amount: 75.00,
      status: "overdue",
      paidDate: null,
      items: [
        { description: "Monthly Parking Spot", amount: 75.00 }
      ]
    },
    {
      id: "INV-2023-012",
      date: "2023-12-15",
      dueDate: "2023-12-30",
      type: "Rent",
      description: "Monthly Rent - December 2023",
      amount: 1500.00,
      status: "paid",
      paidDate: "2023-12-25",
      items: [
        { description: "Monthly Rent", amount: 1500.00 }
      ]
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-success text-success-foreground">Paid</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>;
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Rent":
        return "text-primary";
      case "Utilities":
        return "text-info";
      case "Combined":
        return "text-accent";
      case "Parking":
        return "text-warning";
      default:
        return "text-foreground";
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    const matchesType = typeFilter === "all" || invoice.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleDownload = (invoiceId: string) => {
    toast({
      title: "Download Started",
      description: `Invoice ${invoiceId} is being downloaded as PDF.`,
    });
  };

  const handlePrint = (invoiceId: string) => {
    toast({
      title: "Print Dialog",
      description: `Opening print dialog for invoice ${invoiceId}.`,
    });
  };

  const handlePreview = (invoiceId: string) => {
    toast({
      title: "Invoice Preview",
      description: `Opening preview for invoice ${invoiceId}.`,
    });
  };

  const totalAmount = filteredInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidAmount = filteredInvoices.filter(inv => inv.status === "paid").reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingAmount = filteredInvoices.filter(inv => inv.status === "pending").reduce((sum, invoice) => sum + invoice.amount, 0);
  const overdueAmount = filteredInvoices.filter(inv => inv.status === "overdue").reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Invoices & Receipts"
        subtitle="View and download your billing statements"
        breadcrumbs={[{ label: "Invoices" }]}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoiced</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{filteredInvoices.length} invoices</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid</CardTitle>
            <div className="h-2 w-2 bg-success rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">${paidAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Completed payments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <div className="h-2 w-2 bg-secondary rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary-foreground">${pendingAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Awaiting payment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <div className="h-2 w-2 bg-destructive rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">${overdueAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Past due date</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Invoices</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                <div>
                  <CardTitle>All Invoices</CardTitle>
                  <CardDescription>Complete invoice history</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search invoices..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-full sm:w-64"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-32">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Rent">Rent</SelectItem>
                      <SelectItem value="Utilities">Utilities</SelectItem>
                      <SelectItem value="Combined">Combined</SelectItem>
                      <SelectItem value="Parking">Parking</SelectItem>
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
                      <TableHead>Invoice ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-mono text-sm">{invoice.id}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>
                          <span className={getTypeColor(invoice.type)}>{invoice.type}</span>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{invoice.description}</TableCell>
                        <TableCell className="font-semibold">${invoice.amount.toFixed(2)}</TableCell>
                        <TableCell>{invoice.dueDate}</TableCell>
                        <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handlePreview(invoice.id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDownload(invoice.id)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handlePrint(invoice.id)}
                            >
                              <Printer className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile view */}
              <div className="lg:hidden space-y-4">
                {filteredInvoices.map((invoice) => (
                  <Card key={invoice.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold font-mono text-sm">{invoice.id}</h3>
                          <p className="text-sm text-muted-foreground">{invoice.date}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${invoice.amount.toFixed(2)}</div>
                          {getStatusBadge(invoice.status)}
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Type:</span>
                          <span className={getTypeColor(invoice.type)}>{invoice.type}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Due Date:</span>
                          <span>{invoice.dueDate}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm mb-4 text-muted-foreground line-clamp-2">
                        {invoice.description}
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          {invoice.items.slice(0, 2).map((item, index) => (
                            <div key={index} className="text-xs text-muted-foreground">
                              {item.description}: ${item.amount.toFixed(2)}
                            </div>
                          ))}
                          {invoice.items.length > 2 && (
                            <div className="text-xs text-muted-foreground">
                              +{invoice.items.length - 2} more items
                            </div>
                          )}
                        </div>
                        
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePreview(invoice.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownload(invoice.id)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePrint(invoice.id)}
                          >
                            <Printer className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {["pending", "paid", "overdue"].map((status) => (
          <TabsContent key={status} value={status} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">{status} Invoices</CardTitle>
                <CardDescription>
                  Invoices with {status} status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="hidden lg:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInvoices.filter(inv => inv.status === status).map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-mono text-sm">{invoice.id}</TableCell>
                          <TableCell>{invoice.date}</TableCell>
                          <TableCell>
                            <span className={getTypeColor(invoice.type)}>{invoice.type}</span>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">{invoice.description}</TableCell>
                          <TableCell className="font-semibold">${invoice.amount.toFixed(2)}</TableCell>
                          <TableCell>{invoice.dueDate}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handlePreview(invoice.id)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDownload(invoice.id)}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handlePrint(invoice.id)}
                              >
                                <Printer className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile view */}
                <div className="lg:hidden space-y-4">
                  {filteredInvoices.filter(inv => inv.status === status).map((invoice) => (
                    <Card key={invoice.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold font-mono text-sm">{invoice.id}</h3>
                            <p className="text-sm text-muted-foreground">{invoice.date}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">${invoice.amount.toFixed(2)}</div>
                            <span className={getTypeColor(invoice.type)}>{invoice.type}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm mb-4 text-muted-foreground">
                          Due: {invoice.dueDate}
                        </p>
                        
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-muted-foreground line-clamp-1 flex-1 mr-2">
                            {invoice.description}
                          </p>
                          
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handlePreview(invoice.id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDownload(invoice.id)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
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