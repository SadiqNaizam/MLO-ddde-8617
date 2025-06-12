import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import AccountDashboardPage from "./pages/AccountDashboardPage";
import CardControlsPage from "./pages/CardControlsPage";
import MoveMoneyPage from "./pages/MoveMoneyPage";
import RecentActivityPage from "./pages/RecentActivityPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<AccountDashboardPage />} />
          <Route path="/card-controls" element={<CardControlsPage />} />
          <Route path="/move-money" element={<MoveMoneyPage />} />
          <Route path="/recent-activity" element={<RecentActivityPage />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;
