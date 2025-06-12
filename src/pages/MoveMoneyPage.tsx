import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';

// Shadcn/ui Components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label'; // Can be used if not using FormLabel from react-hook-form context

// Lucide Icons
import { Home, ChevronRight, Banknote, Users, Landmark } from 'lucide-react';

const moveMoneyFormSchema = z.object({
  fromAccountId: z.string().optional(), // Optional as it might be pre-filled
  toSortCode: z.string().regex(/^\d{2}-\d{2}-\d{2}$/, "Invalid sort code format (e.g., 20-30-40)"),
  toAccountNumber: z.string().length(8, "Account number must be 8 digits"),
  amount: z.coerce.number().positive("Amount must be positive"),
  reference: z.string().max(50, "Reference cannot exceed 50 characters").optional(),
  paymentType: z.enum(["personal", "business"], { required_error: "Please select a payment type" }),
});

type MoveMoneyFormValues = z.infer<typeof moveMoneyFormSchema>;

const MoveMoneyPage: React.FC = () => {
  const location = useLocation();
  const { accountId, accountName, currentBalance } = (location.state as { accountId?: string; accountName?: string; currentBalance?: number; }) || {};

  console.log('MoveMoneyPage loaded. Passed state:', location.state);

  const form = useForm<MoveMoneyFormValues>({
    resolver: zodResolver(moveMoneyFormSchema),
    defaultValues: {
      fromAccountId: accountId,
      toSortCode: '',
      toAccountNumber: '',
      amount: undefined,
      reference: '',
      paymentType: undefined,
    },
  });

  function onSubmit(data: MoveMoneyFormValues) {
    console.log('Move Money Form Submitted:', data);
    toast.success("Transfer Initiated!", {
      description: `£${data.amount.toFixed(2)} to account ${data.toAccountNumber} is being processed.`,
      action: {
        label: "View Activity",
        onClick: () => console.log("Navigate to activity page (not implemented)"),
      },
    });
    form.reset(); // Optionally reset form
  }

  useEffect(() => {
    // Pre-fill fromAccount if accountId changes
    if (accountId) {
      form.setValue('fromAccountId', accountId);
    }
  }, [accountId, form]);


  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/" className="flex items-center text-sm font-medium text-gray-500 hover:text-tsb-blue dark:text-gray-400 dark:hover:text-tsb-light-blue">
                      <Home className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-sm font-medium text-gray-700 dark:text-gray-200">Move Money</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <Card className="w-full max-w-2xl mx-auto shadow-xl dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-gray-100 flex items-center">
                <Banknote className="mr-3 h-7 w-7 text-tsb-blue dark:text-tsb-light-blue" />
                Initiate Money Transfer
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                Securely transfer funds to another account. Please verify all details before submitting.
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <CardContent className="space-y-6">
                  {accountId && accountName && currentBalance !== undefined && (
                    <div className="p-4 border rounded-lg bg-slate-100 dark:bg-slate-700">
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">From Account</Label>
                      <p className="text-lg font-semibold text-tsb-blue-dark dark:text-tsb-blue-light">{accountName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Sort Code: XX-XX-XX | Account No: ******{accountId.slice(-2)}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Available Balance: £{currentBalance.toFixed(2)}</p>
                    </div>
                  )}
                  {!accountId && (
                     <FormField
                        control={form.control}
                        name="fromAccountId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>From Account</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select source account" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="dummy-account-1">Spend & Save (Balance: £1,234.56)</SelectItem>
                                <SelectItem value="dummy-account-2">Savings Account (Balance: £5,678.90)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="toSortCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Landmark className="mr-2 h-4 w-4 text-gray-500" />
                            Recipient Sort Code
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 20-30-40" {...field} className="dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="toAccountNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Users className="mr-2 h-4 w-4 text-gray-500" />
                            Recipient Account Number
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="8-digit number" {...field} className="dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount (£)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0.00" {...field} step="0.01" className="dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="reference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Reference (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Invoice payment" {...field} className="dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                        </FormControl>
                        <FormDescription className="dark:text-gray-500">Max 50 characters. This will appear on statements.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="paymentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                              <SelectValue placeholder="Select payment type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="personal">Personal Payment</SelectItem>
                            <SelectItem value="business">Business Payment</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex justify-end pt-6 border-t dark:border-slate-700">
                  <Button type="submit" size="lg" className="bg-tsb-blue hover:bg-tsb-blue-dark dark:bg-tsb-blue-dark dark:hover:bg-tsb-blue text-white min-w-[150px]">
                    {form.formState.isSubmitting ? 'Processing...' : 'Confirm & Send'}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
          
          <div className="mt-8 p-4 border border-yellow-300 bg-yellow-50 text-yellow-700 rounded-md text-sm dark:bg-yellow-900/30 dark:border-yellow-700 dark:text-yellow-300">
            <strong>Important:</strong> Always double-check recipient details before sending money. TSB is not liable for funds sent to incorrect accounts due to user error.
            If you suspect fraud, contact us immediately.
          </div>

        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MoveMoneyPage;