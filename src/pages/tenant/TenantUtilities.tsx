import { useState } from "react";
import { PageHeader } from "@/components/tenant/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Zap, Droplets, Flame, TrendingUp, TrendingDown, AlertTriangle, Calendar } from "lucide-react";

export default function TenantUtilities() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months");

  const currentMonthUsage = [
    { type: "Electricity", usage: 425, unit: "kWh", cost: 85.50, rate: 0.201, status: "normal", icon: Zap, color: "hsl(var(--warning))" },
    { type: "Water", usage: 12.5, unit: "m³", cost: 48.75, rate: 3.90, status: "high", icon: Droplets, color: "hsl(var(--info))" },
    { type: "Gas", usage: 15.2, unit: "m³", cost: 32.20, rate: 2.12, status: "normal", icon: Flame, color: "hsl(var(--success))" },
  ];

  const historicalUsage = [
    { month: "Aug", electricity: 380, water: 10.2, gas: 12.1, electricityRate: 0.20, waterRate: 3.85, gasRate: 2.10 },
    { month: "Sep", electricity: 395, water: 11.5, gas: 13.8, electricityRate: 0.20, waterRate: 3.87, gasRate: 2.11 },
    { month: "Oct", electricity: 410, water: 12.1, gas: 14.5, electricityRate: 0.201, waterRate: 3.88, gasRate: 2.11 },
    { month: "Nov", electricity: 445, water: 13.2, gas: 16.2, electricityRate: 0.201, waterRate: 3.89, gasRate: 2.12 },
    { month: "Dec", electricity: 465, water: 13.8, gas: 17.5, electricityRate: 0.201, waterRate: 3.90, gasRate: 2.12 },
    { month: "Jan", electricity: 425, water: 12.5, gas: 15.2, electricityRate: 0.201, waterRate: 3.90, gasRate: 2.12 },
  ];

  const dailyUsage = [
    { day: "Mon", electricity: 14.2, water: 0.42, gas: 0.51 },
    { day: "Tue", electricity: 13.8, water: 0.38, gas: 0.48 },
    { day: "Wed", electricity: 15.1, water: 0.45, gas: 0.52 },
    { day: "Thu", electricity: 13.9, water: 0.41, gas: 0.49 },
    { day: "Fri", electricity: 16.2, water: 0.48, gas: 0.55 },
    { day: "Sat", electricity: 18.5, water: 0.52, gas: 0.61 },
    { day: "Sun", electricity: 17.8, water: 0.50, gas: 0.58 },
  ];

  const usageComparison = [
    { period: "This Month", electricity: 425, water: 12.5, gas: 15.2 },
    { period: "Last Month", electricity: 465, water: 13.8, gas: 17.5 },
    { period: "Same Month Last Year", electricity: 398, water: 11.8, gas: 14.1 },
    { period: "Building Average", electricity: 387, water: 11.2, gas: 13.8 },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "high":
        return <Badge variant="destructive">High Usage</Badge>;
      case "normal":
        return <Badge className="bg-success text-success-foreground">Normal</Badge>;
      case "low":
        return <Badge className="bg-info text-info-foreground">Low Usage</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getUsageTrend = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    const isIncrease = change > 0;
    return {
      change: Math.abs(change).toFixed(1),
      isIncrease,
      icon: isIncrease ? TrendingUp : TrendingDown,
      color: isIncrease ? "text-destructive" : "text-success",
    };
  };

  const totalCost = currentMonthUsage.reduce((sum, item) => sum + item.cost, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Utility Usage"
        subtitle="Monitor your water, electricity, and gas consumption"
        breadcrumbs={[{ label: "Utilities" }]}
        action={
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        }
      />

      {/* Current Usage Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCost.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        
        {currentMonthUsage.map((utility) => {
          const Icon = utility.icon;
          return (
            <Card key={utility.type}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{utility.type}</CardTitle>
                <Icon className="h-4 w-4" style={{ color: utility.color }} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{utility.usage} {utility.unit}</div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>${utility.cost.toFixed(2)}</span>
                  {getStatusBadge(utility.status)}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="daily">Daily Usage</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Usage Breakdown</CardTitle>
                <CardDescription>Current month consumption by utility type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentMonthUsage.map((utility) => {
                    const Icon = utility.icon;
                    const trend = getUsageTrend(utility.usage, historicalUsage[historicalUsage.length - 2]?.[utility.type.toLowerCase()] || utility.usage);
                    const TrendIcon = trend.icon;
                    
                    return (
                      <div key={utility.type} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full" style={{ backgroundColor: `${utility.color}20` }}>
                            <Icon className="h-5 w-5" style={{ color: utility.color }} />
                          </div>
                          <div>
                            <h3 className="font-semibold">{utility.type}</h3>
                            <p className="text-sm text-muted-foreground">
                              ${utility.rate.toFixed(3)} per {utility.unit}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold">{utility.usage} {utility.unit}</div>
                          <div className="flex items-center gap-1 text-sm">
                            <TrendIcon className={`h-3 w-3 ${trend.color}`} />
                            <span className={trend.color}>{trend.change}%</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usage Tips</CardTitle>
                <CardDescription>Ways to optimize your consumption</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-warning/10 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <h4 className="font-medium">High Water Usage</h4>
                    <p className="text-sm text-muted-foreground">
                      Your water usage is above average. Check for leaks and consider water-saving fixtures.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Zap className="h-4 w-4 text-warning" />
                    <span className="text-sm">Use LED bulbs to reduce electricity costs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Droplets className="h-4 w-4 text-info" />
                    <span className="text-sm">Take shorter showers to save water</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Flame className="h-4 w-4 text-success" />
                    <span className="text-sm">Lower thermostat to reduce gas usage</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Historical Usage</CardTitle>
                <CardDescription>Consumption trends over time</CardDescription>
              </div>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3months">3 Months</SelectItem>
                  <SelectItem value="6months">6 Months</SelectItem>
                  <SelectItem value="1year">1 Year</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="h-80 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={historicalUsage}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="electricity" stackId="1" stroke="hsl(var(--warning))" fill="hsl(var(--warning))" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="water" stackId="2" stroke="hsl(var(--info))" fill="hsl(var(--info))" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="gas" stackId="3" stroke="hsl(var(--success))" fill="hsl(var(--success))" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Electricity (kWh)</TableHead>
                      <TableHead>Water (m³)</TableHead>
                      <TableHead>Gas (m³)</TableHead>
                      <TableHead>Total Cost</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {historicalUsage.map((month) => (
                      <TableRow key={month.month}>
                        <TableCell className="font-medium">{month.month}</TableCell>
                        <TableCell>{month.electricity}</TableCell>
                        <TableCell>{month.water}</TableCell>
                        <TableCell>{month.gas}</TableCell>
                        <TableCell className="font-semibold">
                          ${(month.electricity * month.electricityRate + month.water * month.waterRate + month.gas * month.gasRate).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile view */}
              <div className="md:hidden space-y-3">
                {historicalUsage.map((month) => (
                  <Card key={month.month}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold">{month.month}</h3>
                        <div className="font-bold">
                          ${(month.electricity * month.electricityRate + month.water * month.waterRate + month.gas * month.gasRate).toFixed(2)}
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Electricity:</span>
                          <div>{month.electricity} kWh</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Water:</span>
                          <div>{month.water} m³</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Gas:</span>
                          <div>{month.gas} m³</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="daily" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Usage Pattern</CardTitle>
              <CardDescription>This week's consumption by day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyUsage}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="electricity" fill="hsl(var(--warning))" />
                    <Bar dataKey="water" fill="hsl(var(--info))" />
                    <Bar dataKey="gas" fill="hsl(var(--success))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usage Comparison</CardTitle>
              <CardDescription>Compare your usage across different periods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Period</TableHead>
                      <TableHead>Electricity (kWh)</TableHead>
                      <TableHead>Water (m³)</TableHead>
                      <TableHead>Gas (m³)</TableHead>
                      <TableHead>Performance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usageComparison.map((period) => (
                      <TableRow key={period.period}>
                        <TableCell className="font-medium">{period.period}</TableCell>
                        <TableCell>{period.electricity}</TableCell>
                        <TableCell>{period.water}</TableCell>
                        <TableCell>{period.gas}</TableCell>
                        <TableCell>
                          {period.period === "This Month" ? (
                            <Badge variant="outline">Current</Badge>
                          ) : period.period === "Building Average" ? (
                            <Badge className="bg-info text-info-foreground">Average</Badge>
                          ) : (
                            <Badge variant="secondary">Reference</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile view */}
              <div className="md:hidden space-y-3">
                {usageComparison.map((period) => (
                  <Card key={period.period}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold">{period.period}</h3>
                        {period.period === "This Month" ? (
                          <Badge variant="outline">Current</Badge>
                        ) : period.period === "Building Average" ? (
                          <Badge className="bg-info text-info-foreground">Average</Badge>
                        ) : (
                          <Badge variant="secondary">Reference</Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Electricity:</span>
                          <div>{period.electricity} kWh</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Water:</span>
                          <div>{period.water} m³</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Gas:</span>
                          <div>{period.gas} m³</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}