import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoveRight, CreditCard, MoreVertical, AlertCircle, ExternalLink, Settings2 } from 'lucide-react';
import { toast } from 'sonner';

interface RecentTransaction {
  id: string;
  date: string; // ISO string date
  description: string;
  amount: number;
  type: 'credit' | 'debit';
}

interface AccountSummaryCardProps {
  accountId: string;
  accountName: string;
  sortCode: string; // e.g., "20-30-40"
  accountNumber: string; // e.g., "12345678"
  balance: number;
  currencySymbol?: string;
  recentTransactions: RecentTransaction[];
}

const AccountSummaryCard: React.FC<AccountSummaryCardProps> = ({
  accountId,
  accountName,
  sortCode,
  accountNumber,
  balance,
  currencySymbol = "£",
  recentTransactions,
}) => {
  console.log('AccountSummaryCard loaded for account:', accountName);

  const handleDropdownAction = (action: string) => {
    toast.info(`Action: "${action}" selected for account ${accountName}. (Not implemented)`);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg rounded-xl dark:bg-slate-800">
      <CardHeader className="flex flex-row items-center justify-between p-4 sm:p-6">
        <div>
          <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">{accountName}</CardTitle>
          <p className="text-xs text-gray-500 dark:text-gray-400">Account Overview</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full data-[state=open]:bg-muted">
              <MoreVertical className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Account Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleDropdownAction('View statements')}>
              <ExternalLink className="mr-2 h-4 w-4" />
              View Statements
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDropdownAction('Account details')}>
              <Settings2 className="mr-2 h-4 w-4" />
              Manage Account
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleDropdownAction('Report issue')} className="text-red-600 dark:text-red-400 focus:text-red-600 focus:bg-red-50 dark:focus:text-red-400 dark:focus:bg-red-900/50">
              <AlertCircle className="mr-2 h-4 w-4" />
              Report an Issue
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6 space-y-4">
        <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
          <p className="text-xs text-gray-500 dark:text-gray-400">Available Balance</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {currencySymbol}
            {balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Sort Code</p>
            <p className="font-medium text-gray-700 dark:text-gray-200">{sortCode}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Account Number</p>
            <p className="font-medium text-gray-700 dark:text-gray-200">{accountNumber}</p>
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="recent-transactions" className="border-t dark:border-slate-700">
            <AccordionTrigger className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:no-underline py-3 min-h-[48px] flex items-center justify-between w-full">
              Quick View Transactions
            </AccordionTrigger>
            <AccordionContent className="pt-1 pb-2 text-sm">
              {recentTransactions.length > 0 ? (
                <ul className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {recentTransactions.slice(0, 5).map(tx => (
                    <li key={tx.id} className="flex justify-between items-center py-1.5 border-b border-dashed border-gray-200 dark:border-gray-700 last:border-b-0">
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-200">{tx.description}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(tx.date).toLocaleDateString()}</p>
                      </div>
                      <p className={`font-semibold ${tx.type === 'credit' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-500'}`}>
                        {tx.type === 'credit' ? '+' : '-'}{currencySymbol}{tx.amount.toFixed(2)}
                      </p>
                    </li>
                  ))}
                  {recentTransactions.length > 5 && (
                    <li className="text-center mt-2">
                       <Button variant="link" asChild className="text-xs h-auto p-0 text-blue-600 dark:text-blue-400">
                        <Link to={`/recent-activity?account=${accountId}`} state={{ accountId }}>
                            View all transactions
                        </Link>
                       </Button>
                    </li>
                  )}
                </ul>
              ) : (
                <p className="text-xs text-gray-500 dark:text-gray-400 py-3 text-center">No recent transactions to display.</p>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row gap-3 p-4 sm:p-6 border-t dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 rounded-b-xl">
        <Button asChild className="w-full sm:w-auto flex-grow min-h-[48px] text-base bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white">
          <Link to="/move-money" state={{ accountId, accountName, currentBalance: balance }}>
            <MoveRight className="mr-2 h-5 w-5" /> Move money
          </Link>
        </Button>
        <Button variant="outline" size="icon" asChild className="h-12 w-full sm:w-12 min-w-[48px] text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
          <Link to="/card-controls" state={{ accountId }} aria-label="Card Controls">
            <CreditCard className="h-5 w-5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AccountSummaryCard;