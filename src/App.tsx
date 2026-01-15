import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Header } from "@/components/Header";
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
import Completion from "./pages/Completion";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Notes from "./pages/Notes";
import InteractiveCourses from "./pages/InteractiveCourses";
import AI from "./pages/AI";
import Books from "./pages/Books";
import Affiliate from "./pages/Affiliate";
import Referral from "./pages/Referral";
import CertifiedVideoCourses from "./pages/CertifiedVideoCourses";
import MobileFooter from "./components/MobileFooter";

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
              <Header />
              
              <div className="flex-1">
                <Routes>
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
                  <Route path="/learn" element={<ProtectedRoute><Learn /></ProtectedRoute>} />
                  <Route path="/practice" element={<ProtectedRoute><Practice /></ProtectedRoute>} />
                  <Route path="/pricing" element={<ProtectedRoute><Pricing /></ProtectedRoute>} />
                  <Route path="/completion" element={<ProtectedRoute><Completion /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  <Route path="/notes" element={<ProtectedRoute><Notes /></ProtectedRoute>} />
                  <Route path="/data-analysis" element={<ProtectedRoute><DataAnalysis /></ProtectedRoute>} />
                  <Route path="/interactive-courses" element={<ProtectedRoute><InteractiveCourses /></ProtectedRoute>} />
                  <Route path="/certified-courses" element={<ProtectedRoute><CertifiedVideoCourses /></ProtectedRoute>} />
                  <Route path="/ai" element={<ProtectedRoute><AI /></ProtectedRoute>} />
                  <Route path="/books" element={<ProtectedRoute><Books /></ProtectedRoute>} />
                  <Route path="/tests" element={<ProtectedRoute><TestSelection /></ProtectedRoute>} />
                  <Route path="/levels" element={<ProtectedRoute><LevelSelection /></ProtectedRoute>} />
                  <Route path="/level-quiz/:levelId" element={<ProtectedRoute><LevelQuiz /></ProtectedRoute>} />
                  <Route path="/level-results" element={<ProtectedRoute><LevelResults /></ProtectedRoute>} />
                  <Route path="/quiz/:testType" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
                  <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
                  <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
                  <Route path="/affiliate" element={<ProtectedRoute><Affiliate /></ProtectedRoute>} />
                  <Route path="/r" element={<Referral />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
                </Routes>
              </div>
              <MobileFooter />
            </main>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
