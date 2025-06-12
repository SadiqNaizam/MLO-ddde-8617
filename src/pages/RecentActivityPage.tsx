import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Custom Components
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter, Download, ListX } from 'lucide-react';

interface Transaction {
  id: string;
  date: string; // ISO string date
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  status: 'Completed' | 'Pending' | 'Failed';
  category: string;
}

const mockTransactions: Transaction[] = [
  { id: 'tx1', date: '2024-07-28T10:30:00Z', description: 'Starbucks Coffee', amount: 4.50, type: 'debit', status: 'Completed', category: 'Food & Drink' },
  { id: 'tx2', date: '2024-07-28T09:15:00Z', description: 'Salary Deposit - Acme Corp', amount: 2500.00, type: 'credit', status: 'Completed', category: 'Income' },
  { id: 'tx3', date: '2024-07-27T18:00:00Z', description: 'Netflix Subscription', amount: 15.99, type: 'debit', status: 'Completed', category: 'Entertainment' },
  { id: 'tx4', date: '2024-07-27T12:45:00Z', description: 'Tesco Groceries', amount: 75.20, type: 'debit', status: 'Completed', category: 'Groceries' },
  { id: 'tx5', date: '2024-07-26T15:00:00Z', description: 'Online Purchase - Amazon', amount: 49.99, type: 'debit', status: 'Pending', category: 'Shopping' },
  { id: 'tx6', date: '2024-07-26T11:00:00Z', description: 'Gym Membership Fee', amount: 30.00, type: 'debit', status: 'Completed', category: 'Health & Fitness' },
  { id: 'tx7', date: '2024-07-25T19:30:00Z', description: 'Dinner at The Italian Place', amount: 62.75, type: 'debit', status: 'Completed', category: 'Food & Drink' },
  { id: 'tx8', date: '2024-07-25T08:00:00Z', description: 'Refund - Concert Ticket', amount: 85.00, type: 'credit', status: 'Completed', category: 'Refunds' },
  { id: 'tx9', date: '2024-07-24T14:20:00Z', description: 'Book Store Purchase', amount: 22.50, type: 'debit', status: 'Completed', category: 'Shopping' },
  { id: 'tx10', date: '2024-07-24T10:00:00Z', description: 'Mobile Phone Bill', amount: 45.00, type: 'debit', status: 'Completed', category: 'Bills' },
  { id: 'tx11', date: '2024-07-23T17:50:00Z', description: 'Cinema Tickets', amount: 24.00, type: 'debit', status: 'Completed', category: 'Entertainment' },
  { id: 'tx12', date: '2024-07-23T13:00:00Z', description: 'Cash Withdrawal - ATM', amount: 100.00, type: 'debit', status: 'Completed', category: 'Cash' },
  { id: 'tx13', date: '2024-07-22T16:00:00Z', description: 'Transfer to Savings Account', amount: 500.00, type: 'debit', status: 'Completed', category: 'Transfers' },
  { id: 'tx14', date: '2024-07-22T09:00:00Z', description: 'Client Payment - Project X', amount: 1200.00, type: 'credit', status: 'Completed', category: 'Income' },
  { id: 'tx15', date: '2024-07-21T20:15:00Z', description: 'Spotify Premium', amount: 9.99, type: 'debit', status: 'Failed', category: 'Entertainment' },
];

const TRANSACTIONS_PER_PAGE = 10;

const RecentActivityPage = () => {
  console.log('RecentActivityPage loaded');
  const location = useLocation();
  // Account details from navigation state (optional)
  const accountIdFromState = location.state?.accountId as string | undefined;
  const accountNameFromState = (location.state?.accountName as string | undefined) || 'Selected Account';

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter(tx =>
      tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.amount.toString().includes(searchTerm)
    );
  }, [searchTerm]);

  const currentTransactions = useMemo(() => {
    const indexOfLastTransaction = currentPage * TRANSACTIONS_PER_PAGE;
    const indexOfFirstTransaction = indexOfLastTransaction - TRANSACTIONS_PER_PAGE;
    return filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  }, [filteredTransactions, currentPage]);

  const totalPages = Math.ceil(filteredTransactions.length / TRANSACTIONS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getStatusBadgeClasses = (status: Transaction['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Failed':
        return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-900">
      <Header />
      <div className="flex flex-1 pt-16 md:pt-0"> {/* Adjust pt for sticky header on mobile */}
        <div className="hidden md:flex"> {/* Sidebar hidden on mobile, shown on md+ */}
          <Sidebar />
        </div>
        <main className="flex-1 p-4 sm:p-6 space-y-6 overflow-auto">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Recent Activity {accountIdFromState ? `for ${accountNameFromState}` : ''}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="dark:text-white">Transaction History {accountIdFromState ? `- ${accountNameFromState}` : ''}</CardTitle>
              <p className="text-sm text-muted-foreground dark:text-slate-400">
                View and manage your recent transactions. 
                {accountIdFromState && <span className="block sm:inline"> (Account ID: {accountIdFromState})</span>}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2 items-center">
                <div className="relative flex-grow w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground dark:text-slate-400" />
                  <Input
                    type="search"
                    placeholder="Search transactions..."
                    className="pl-9 w-full dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1); // Reset to first page on new search
                    }}
                  />
                </div>
                <Button variant="outline" className="w-full sm:w-auto dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-700">
                  <Filter className="mr-2 h-4 w-4" /> Filter
                </Button>
                <Button variant="outline" className="w-full sm:w-auto dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-700">
                  <Download className="mr-2 h-4 w-4" /> Export
                </Button>
              </div>

              {filteredTransactions.length > 0 ? (
                <div className="rounded-md border dark:border-slate-700">
                  <Table>
                    <TableCaption className="dark:text-slate-400">A list of your recent transactions.</TableCaption>
                    <TableHeader>
                      <TableRow className="dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                        <TableHead className="dark:text-slate-300">Date</TableHead>
                        <TableHead className="dark:text-slate-300">Description</TableHead>
                        <TableHead className="hidden sm:table-cell dark:text-slate-300">Category</TableHead>
                        <TableHead className="text-right dark:text-slate-300">Amount</TableHead>
                        <TableHead className="hidden md:table-cell dark:text-slate-300">Type</TableHead>
                        <TableHead className="dark:text-slate-300">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentTransactions.map((tx) => (
                        <TableRow key={tx.id} className="dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                          <TableCell className="dark:text-slate-300">{new Date(tx.date).toLocaleDateString()}</TableCell>
                          <TableCell className="font-medium dark:text-slate-200">{tx.description}</TableCell>
                          <TableCell className="hidden sm:table-cell dark:text-slate-300">{tx.category}</TableCell>
                          <TableCell 
                            className={`text-right font-semibold ${
                              tx.type === 'credit' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-500'
                            }`}
                          >
                            {tx.type === 'credit' ? '+' : '-'}&pound;{tx.amount.toFixed(2)}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                             <span className={`px-2 py-0.5 text-xs font-medium rounded-full capitalize ${
                                tx.type === 'credit' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                                     : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                              }`}>
                              {tx.type}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusBadgeClasses(tx.status)}`}>
                              {tx.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    {totalPages > 1 && (
                        <TableFooter className="dark:border-slate-700">
                            <TableRow className="hover:bg-transparent dark:hover:bg-transparent">
                                <TableCell colSpan={6}>
                                    <Pagination>
                                        <PaginationContent>
                                            <PaginationItem>
                                                <PaginationPrevious
                                                    href="#"
                                                    onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                                                    className={currentPage === 1 ? "pointer-events-none opacity-50 dark:text-slate-500" : "dark:text-slate-300 dark:hover:bg-slate-700"}
                                                />
                                            </PaginationItem>
                                            {/* Simplified pagination display: Previous, Current of Total, Next */}
                                            <PaginationItem className="hidden sm:block">
                                              <span className="px-4 py-2 text-sm text-muted-foreground dark:text-slate-400">
                                                Page {currentPage} of {totalPages}
                                              </span>
                                            </PaginationItem>
                                            
                                            {/* For more complex pagination items (e.g., page numbers) */}
                                            {/* {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                                <PaginationItem key={page}>
                                                <PaginationLink
                                                    href="#"
                                                    onClick={(e) => { e.preventDefault(); handlePageChange(page); }}
                                                    isActive={currentPage === page}
                                                    className={currentPage === page ? "dark:bg-tsb-blue dark:text-white" : "dark:text-slate-300 dark:hover:bg-slate-700"}
                                                >
                                                    {page}
                                                </PaginationLink>
                                                </PaginationItem>
                                            ))} */}

                                            <PaginationItem>
                                                <PaginationNext
                                                    href="#"
                                                    onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                                                    className={currentPage === totalPages ? "pointer-events-none opacity-50 dark:text-slate-500" : "dark:text-slate-300 dark:hover:bg-slate-700"}
                                                />
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    )}
                  </Table>
                </div>
              ) : (
                <div className="text-center py-10 text-muted-foreground dark:text-slate-400 border border-dashed dark:border-slate-700 rounded-md">
                  <ListX className="mx-auto h-12 w-12 mb-4" />
                  <p className="text-lg font-semibold">No transactions found</p>
                  <p>Try adjusting your search term or filters.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default RecentActivityPage;