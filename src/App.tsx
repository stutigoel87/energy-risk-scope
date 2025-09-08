import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import Dashboard from "./pages/Dashboard";
import OilPrice from "./pages/OilPrice";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-gradient-bg">
            <DashboardSidebar />
            <div className="flex-1 flex flex-col">
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <>
                      <DashboardHeader title="Risk Overview" />
                      <main className="flex-1 p-6">
                        <Dashboard />
                      </main>
                    </>
                  } 
                />
                <Route 
                  path="/oil-price" 
                  element={
                    <>
                      <DashboardHeader title="Oil Price Volatility" />
                      <main className="flex-1 p-6">
                        <OilPrice />
                      </main>
                    </>
                  } 
                />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
