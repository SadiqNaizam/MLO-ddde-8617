import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import AccountSummaryCard from '@/components/AccountSummaryCard';
import { ScrollArea } from '@/components/ui/scroll-area';

// Placeholder data for AccountSummaryCard instances
const account1Transactions = [
  { id: 'tx1', date: new Date(Date.now() - 86400000).toISOString(), description: 'Online Shopping - Amazon', amount: 75.99, type: 'debit' as 'debit' | 'credit' },
  { id: 'tx2', date: new Date(Date.now() - 172800000).toISOString(), description: 'Salary Deposit - Acme Corp', amount: 2500.00, type: 'credit' as 'debit' | 'credit' },
  { id: 'tx3', date: new Date(Date.now() - 259200000).toISOString(), description: 'Coffee Shop - Starbucks', amount: 4.50, type: 'debit' as 'debit' | 'credit' },
  { id: 'tx4', date: new Date(Date.now() - 345600000).toISOString(), description: 'Gym Membership', amount: 30.00, type: 'debit' as 'debit' | 'credit' },
  { id: 'tx5', date: new Date(Date.now() - 432000000).toISOString(), description: 'Restaurant - The Italian Place', amount: 55.20, type: 'debit' as 'debit' | 'credit' },
  { id: 'tx6', date: new Date(Date.now() - 518400000).toISOString(), description: 'Utility Bill - Electricity', amount: 65.00, type: 'debit' as 'debit' | 'credit' },
];

const account2Transactions = [
  { id: 'tx7', date: new Date(Date.now() - 86400000 * 2).toISOString(), description: 'Book Store Purchase', amount: 22.50, type: 'debit' as 'debit' | 'credit' },
  { id: 'tx8', date: new Date(Date.now() - 86400000 * 5).toISOString(), description: 'Savings Interest', amount: 15.32, type: 'credit' as 'debit' | 'credit' },
  { id: 'tx9', date: new Date(Date.now() - 86400000 * 7).toISOString(), description: 'Grocery Shopping - Tesco', amount: 89.10, type: 'debit' as 'debit' | 'credit' },
];

const AccountDashboardPage: React.FC = () => {
  console.log('AccountDashboardPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-slate-100 dark:bg-slate-900">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - hidden on smaller screens by its own logic if not adapted for mobile explicitly here */}
        <div className="hidden md:flex"> {/* Sidebar is part of the main flex row for larger screens */}
          <Sidebar />
        </div>
        
        <ScrollArea className="flex-1 h-full"> {/* Make ScrollArea take remaining height */}
          <main className="p-4 sm:p-6 lg:p-8">
            <section aria-labelledby="dashboard-title" className="mb-6">
              <h1 id="dashboard-title" className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">
                Your Accounts
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Welcome back! Here's an overview of your TSB accounts.
              </p>
            </section>

            <section aria-label="Account Summaries" className="space-y-6">
              <AccountSummaryCard
                accountId="ACC12345SPEND"
                accountName="Spend & Save Account"
                sortCode="20-30-40"
                accountNumber="12345678"
                balance={3450.75}
                currencySymbol="£"
                recentTransactions={account1Transactions}
              />
              <AccountSummaryCard
                accountId="ACC67890SAVE"
                accountName="Easy Saver Account"
                sortCode="20-30-50"
                accountNumber="87654321"
                balance={10250.20}
                currencySymbol="£"
                recentTransactions={account2Transactions}
              />
              {/* Add more AccountSummaryCard instances here if needed */}
            </section>
            
            {/* Placeholder for additional dashboard sections */}
            <section aria-label="Quick Actions" className="mt-8">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-3">Quick Actions</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Need to do something else? You can find more options in the navigation menu.
                </p>
                {/* Example: <Button asChild className="mt-4"><Link to="/some-other-page">Explore Services</Link></Button> */}
              </div>
            </section>

          </main>
        </ScrollArea>
      </div>
      <Footer />
    </div>
  );
};

export default AccountDashboardPage;