import { useState } from "react";
import { PageHeader } from "@/components/tenant/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Upload, Search, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function TenantDocuments() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const documents = [
    {
      id: 1,
      name: "Lease Agreement 2024",
      type: "lease",
      size: "2.4 MB",
      uploadedAt: "2024-01-15",
      description: "Main lease agreement document",
    },
    {
      id: 2,
      name: "Building Policies & Rules",
      type: "policy",
      size: "1.8 MB",
      uploadedAt: "2024-01-01",
      description: "Complete building policies and tenant guidelines",
    },
    {
      id: 3,
      name: "Move-in Inspection Report",
      type: "inspection",
      size: "3.2 MB",
      uploadedAt: "2024-01-20",
      description: "Pre-move-in condition documentation",
    },
  ];

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (docName: string) => {
    toast({
      title: "Download Started",
      description: `${docName} is being downloaded.`,
    });
  };

  const handleUpload = () => {
    toast({
      title: "Upload Feature",
      description: "Document upload functionality will be available soon.",
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Documents & Policies"
        subtitle="Access your lease, policies, and building documents"
        breadcrumbs={[{ label: "Documents" }]}
        action={
          <Button onClick={handleUpload}>
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        }
      />

      <Tabs defaultValue="my-documents" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="my-documents">My Documents</TabsTrigger>
          <TabsTrigger value="policies">Building Policies</TabsTrigger>
          <TabsTrigger value="forms">Forms & Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="my-documents" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Your Documents</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <FileText className="h-8 w-8 text-primary mb-2" />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(doc.name)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardTitle className="text-sm">{doc.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-xs mb-3">
                    {doc.description}
                  </CardDescription>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{doc.size}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {doc.uploadedAt}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="policies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Building Policies</CardTitle>
              <CardDescription>Important policies and guidelines for residents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Noise Policy</h4>
                    <p className="text-sm text-muted-foreground">Quiet hours and noise guidelines</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Pet Policy</h4>
                    <p className="text-sm text-muted-foreground">Pet registration and rules</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Parking Guidelines</h4>
                    <p className="text-sm text-muted-foreground">Parking rules and visitor policies</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Forms & Templates</CardTitle>
              <CardDescription>Downloadable forms for various requests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Maintenance Request Form</h4>
                  <p className="text-sm text-muted-foreground mb-3">For non-urgent maintenance requests</p>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Move-out Notice</h4>
                  <p className="text-sm text-muted-foreground mb-3">30-day notice to vacate form</p>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}