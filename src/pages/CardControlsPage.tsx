import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { toast } from 'sonner';

// lucide-react Icons
import { Home, CreditCardIcon, ShieldAlert, LockKeyhole, Eye, Edit3, Ban, CheckCircle2, XCircle } from 'lucide-react';

const CardControlsPage: React.FC = () => {
  console.log('CardControlsPage loaded');
  const location = useLocation();
  const accountIdFromState = location.state?.accountId;

  const [selectedCard, setSelectedCard] = useState<string | null>(accountIdFromState || 'default_card_id_123'); // Placeholder if no accountId passed
  
  // Example state for card controls - in a real app, this would come from an API
  const [isCardFrozen, setIsCardFrozen] = useState(false);
  const [onlinePaymentsEnabled, setOnlinePaymentsEnabled] = useState(true);
  const [contactlessEnabled, setContactlessEnabled] = useState(true);
  const [pinReminderRequested, setPinReminderRequested] = useState(false);

  useEffect(() => {
    if (accountIdFromState) {
      setSelectedCard(accountIdFromState);
      // Here you would typically fetch card-specific settings based on accountIdFromState
      console.log(`Card controls for account ID: ${accountIdFromState}`);
      toast.success(`Loading controls for card linked to account: ${accountIdFromState.slice(-4)}`);
    } else {
        console.log('No specific account ID passed, showing generic card controls.');
    }
  }, [accountIdFromState]);

  const handleFreezeCardToggle = (frozen: boolean) => {
    setIsCardFrozen(frozen);
    toast.success(`Card ${frozen ? 'frozen' : 'unfrozen'} successfully.`);
  };

  const handleOnlinePaymentsToggle = (enabled: boolean) => {
    setOnlinePaymentsEnabled(enabled);
    toast.success(`Online payments ${enabled ? 'enabled' : 'disabled'}.`);
  };

  const handleContactlessToggle = (enabled: boolean) => {
    setContactlessEnabled(enabled);
    toast.success(`Contactless payments ${enabled ? 'enabled' : 'disabled'}.`);
  };
  
  const handleReportLostStolen = () => {
    // In a real app, this would initiate a more complex flow
    setIsCardFrozen(true); // Automatically freeze card
    toast.error('Card Reported Lost/Stolen!', {
        description: 'Your card has been frozen. Please contact us for a replacement.',
        action: {
            label: 'Contact Support',
            onClick: () => console.log('Contact support clicked'),
        },
    });
  };

  const handlePinReminder = () => {
    setPinReminderRequested(true);
    // Logic for PIN reminder (e.g., show partial PIN, send SMS, etc.)
    // This is a simplified version.
    setTimeout(() => {
        setPinReminderRequested(false);
        toast.info("PIN reminder sent to your registered mobile number.", {
            description: "Please check your messages. For security, we don't display the full PIN here.",
        });
    }, 2000);
  };


  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/"><Home className="h-4 w-4" /> Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  <CreditCardIcon className="h-4 w-4 mr-1 inline-block" /> Card Controls
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {selectedCard && (
             <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg">
                <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                    Managing Card ending in {selectedCard.slice(-4)}
                </h2>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                    {accountIdFromState ? `Controls for card associated with account ID: ${accountIdFromState}` : "Displaying controls for your default card."}
                </p>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Card Security Section */}
            <Card className="shadow-md dark:bg-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LockKeyhole className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Card Security
                </CardTitle>
                <CardDescription>Manage your card's security settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between space-x-2 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                  <Label htmlFor="freeze-card" className="flex flex-col space-y-1">
                    <span className="font-medium">Freeze Card</span>
                    <span className="text-xs font-normal leading-snug text-muted-foreground">
                      Temporarily block all transactions.
                    </span>
                  </Label>
                  <Switch
                    id="freeze-card"
                    checked={isCardFrozen}
                    onCheckedChange={handleFreezeCardToggle}
                    aria-label="Freeze or unfreeze your card"
                  />
                </div>
                <div className="flex items-center justify-between space-x-2 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                  <Label htmlFor="online-payments" className="flex flex-col space-y-1">
                    <span className="font-medium">Online Payments</span>
                    <span className="text-xs font-normal leading-snug text-muted-foreground">
                      Enable or disable payments on websites and apps.
                    </span>
                  </Label>
                  <Switch
                    id="online-payments"
                    checked={onlinePaymentsEnabled}
                    onCheckedChange={handleOnlinePaymentsToggle}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                  <Label htmlFor="contactless-payments" className="flex flex-col space-y-1">
                    <span className="font-medium">Contactless Payments</span>
                    <span className="text-xs font-normal leading-snug text-muted-foreground">
                      Enable or disable tap-to-pay functionality.
                    </span>
                  </Label>
                  <Switch
                    id="contactless-payments"
                    checked={contactlessEnabled}
                    onCheckedChange={handleContactlessToggle}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Card Management Section */}
            <Card className="shadow-md dark:bg-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCardIcon className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Card Management
                </CardTitle>
                <CardDescription>Report issues or request PIN reminders.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                      <ShieldAlert className="mr-2 h-4 w-4" /> Report Lost or Stolen
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] dark:bg-slate-800">
                    <DialogHeader>
                      <DialogTitle>Report Card Lost or Stolen</DialogTitle>
                      <DialogDescription>
                        Reporting your card will freeze it immediately to prevent unauthorized use. We'll guide you through getting a replacement.
                      </DialogDescription>
                    </DialogHeader>
                    <p className="text-sm text-muted-foreground py-4">
                        Are you sure you want to report your card (ending in {selectedCard?.slice(-4)}) as lost or stolen? This action cannot be undone through the app.
                    </p>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button variant="destructive" onClick={() => { handleReportLostStolen(); /* Close dialog if needed */ DialogClose; }}>
                        <CheckCircle2 className="mr-2 h-4 w-4" /> Yes, Report Card
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Eye className="mr-2 h-4 w-4" /> View PIN Reminder
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] dark:bg-slate-800">
                    <DialogHeader>
                      <DialogTitle>PIN Reminder</DialogTitle>
                      <DialogDescription>
                        For security, we cannot display your full PIN. A reminder can be sent via SMS to your registered mobile number.
                      </DialogDescription>
                    </DialogHeader>
                    {pinReminderRequested ? (
                        <div className="py-4 text-center">
                            <p className="text-green-600 dark:text-green-400">Sending PIN reminder...</p>
                            {/* Could add a spinner here */}
                        </div>
                    ) : (
                        <div className="py-4">
                            <p>Click "Send Reminder" to receive your PIN hint.</p>
                        </div>
                    )}
                    <DialogFooter>
                       <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button onClick={handlePinReminder} disabled={pinReminderRequested}>
                        {pinReminderRequested ? "Sending..." : "Send Reminder"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Transaction Limits Section (Placeholder) */}
            <Card className="shadow-md dark:bg-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Edit3 className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Transaction Limits
                </CardTitle>
                <CardDescription>View and manage your spending limits.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-slate-100 dark:bg-slate-700/50 rounded-md">
                  <Ban className="h-12 w-12 text-slate-400 dark:text-slate-500 mb-3" />
                  <p className="text-muted-foreground">
                    Managing transaction limits is not yet available here.
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Please contact customer support or visit a branch for assistance with transaction limits.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default CardControlsPage;