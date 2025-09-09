import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import Learn from "./pages/Learn";
import Practice from "./pages/Practice";
import Pricing from "./pages/Pricing";
import TestSelection from "./pages/TestSelection";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import LevelSelection from "./pages/LevelSelection";
import LevelQuiz from "./pages/LevelQuiz";
import LevelResults from "./pages/LevelResults";
import DataAnalysis from "./pages/DataAnalysis";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <main className="flex-1">
              {/* Global navigation trigger */}
              <header className="h-12 flex items-center border-b border-border bg-background px-4">
                <SidebarTrigger className="mr-4" />
                <div className="text-sm font-medium text-muted-foreground">
                  CodeCert Development Labs
                </div>
              </header>
              
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/learn" element={<Learn />} />
                  <Route path="/practice" element={<Practice />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/data-analysis" element={<DataAnalysis />} />
                  <Route path="/tests" element={<TestSelection />} />
                  <Route path="/levels" element={<LevelSelection />} />
                  <Route path="/level-quiz/:levelId" element={<LevelQuiz />} />
                  <Route path="/level-results" element={<LevelResults />} />
                  <Route path="/quiz/:testType" element={<Quiz />} />
                  <Route path="/quiz" element={<Quiz />} />
                  <Route path="/results" element={<Results />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </main>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
