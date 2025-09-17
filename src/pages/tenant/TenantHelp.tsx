import { useState } from "react";
import { PageHeader } from "@/components/tenant/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Mail, 
  Clock, 
  Search,
  ExternalLink,
  FileText,
  Wrench,
  CreditCard,
  Users,
  Zap
} from "lucide-react";

export default function TenantHelp() {
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      id: 1,
      category: "Payments",
      question: "How do I pay my rent online?",
      answer: "You can pay your rent through the Payments page in your tenant portal. We accept credit cards, debit cards, and bank transfers. Simply click 'Make Payment' and follow the instructions.",
      icon: CreditCard,
    },
    {
      id: 2,
      category: "Maintenance",
      question: "How do I report a maintenance issue?",
      answer: "Visit the Support page and click 'Submit Ticket'. Describe the issue in detail and select the appropriate category. For emergencies, call our 24/7 hotline immediately.",
      icon: Wrench,
    },
    {
      id: 3,
      category: "Utilities",
      question: "How do I read my utility bill?",
      answer: "Your utility bill shows current month usage, rate per unit, and total charges. You can view detailed breakdowns in the Utilities section of your portal, including historical usage charts.",
      icon: Zap,
    },
    {
      id: 4,
      category: "Guests",
      question: "How do I register a guest visit?",
      answer: "Go to the Guests page, click 'Register Guest', fill in visitor details and visit time. Once approved, your guest will receive a digital pass via SMS or email.",
      icon: Users,
    },
    {
      id: 5,
      category: "Lease",
      question: "Where can I find my lease agreement?",
      answer: "Your lease agreement is available in the Documents section. You can download, print, or view it online anytime. Contact management if you need a new copy.",
      icon: FileText,
    },
    {
      id: 6,
      category: "General",
      question: "What are the building's quiet hours?",
      answer: "Quiet hours are from 10:00 PM to 7:00 AM on weekdays and 11:00 PM to 8:00 AM on weekends. Please be mindful of noise levels during these times.",
      icon: Clock,
    },
  ];

  const contactMethods = [
    {
      title: "24/7 Emergency Hotline",
      description: "For urgent maintenance, security, or safety issues",
      contact: "+1 (555) 911-HELP",
      icon: Phone,
      type: "emergency",
      available: "Available 24/7",
    },
    {
      title: "Property Management Office",
      description: "General inquiries, lease questions, and appointments",
      contact: "+1 (555) 123-MGMT",
      icon: Phone,
      type: "general",
      available: "Mon-Fri: 9 AM - 6 PM",
    },
    {
      title: "Email Support",
      description: "Non-urgent questions and document requests",
      contact: "support@propertyhub.com",
      icon: Mail,
      type: "email",
      available: "Response within 24 hours",
    },
    {
      title: "Live Chat",
      description: "Quick questions and real-time support",
      contact: "Chat with us",
      icon: MessageSquare,
      type: "chat",
      available: "Mon-Fri: 9 AM - 6 PM",
    },
  ];

  const quickActions = [
    {
      title: "Submit Maintenance Request",
      description: "Report repairs or maintenance issues",
      href: "/tenant/support",
      icon: Wrench,
    },
    {
      title: "Make a Payment",
      description: "Pay rent or outstanding balances",
      href: "/tenant/payments",
      icon: CreditCard,
    },
    {
      title: "Register a Guest",
      description: "Pre-register visitor access",
      href: "/tenant/guests",
      icon: Users,
    },
    {
      title: "View Documents",
      description: "Access lease and building policies",
      href: "/tenant/documents",
      icon: FileText,
    },
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Help & Support"
        subtitle="Get answers to common questions and contact support"
        breadcrumbs={[{ label: "Help" }]}
      />

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks you might want to do</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Button
                key={action.title}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2"
                asChild
              >
                <a href={action.href}>
                  <action.icon className="h-6 w-6" />
                  <div className="text-center">
                    <p className="font-medium text-sm">{action.title}</p>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                </a>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
          <CardDescription>Multiple ways to get help when you need it</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contactMethods.map((method) => (
              <div
                key={method.title}
                className={`p-4 rounded-lg border ${
                  method.type === 'emergency' 
                    ? 'border-destructive bg-destructive/5' 
                    : 'border-border'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    method.type === 'emergency' 
                      ? 'bg-destructive text-destructive-foreground' 
                      : 'bg-primary text-primary-foreground'
                  }`}>
                    <method.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{method.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                    <p className="font-medium text-sm mb-1">{method.contact}</p>
                    <Badge variant="outline" className="text-xs">
                      {method.available}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Frequently Asked Questions
          </CardTitle>
          <CardDescription>Find answers to common questions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Accordion type="single" collapsible className="space-y-2">
            {filteredFaqs.map((faq) => (
              <AccordionItem key={faq.id} value={`item-${faq.id}`} className="border rounded-lg">
                <AccordionTrigger className="px-4 hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <faq.icon className="h-4 w-4 text-primary flex-shrink-0" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{faq.question}</span>
                        <Badge variant="secondary" className="text-xs">
                          {faq.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-8">
              <HelpCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No FAQs found matching your search.</p>
              <p className="text-sm text-muted-foreground mt-2">
                Try different keywords or contact support directly.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Additional Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Resources</CardTitle>
          <CardDescription>Useful links and documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button variant="ghost" className="w-full justify-between" asChild>
              <a href="/tenant/documents">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Building Policies & Rules</span>
                </div>
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" className="w-full justify-between" asChild>
              <a href="/tenant/documents">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Tenant Handbook</span>
                </div>
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" className="w-full justify-between" asChild>
              <a href="/tenant/announcements">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Latest Announcements</span>
                </div>
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}