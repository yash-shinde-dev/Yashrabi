
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Gallery from "./pages/Gallery";
import Diary from "./pages/Diary";
import Anniversary from "./pages/Anniversary";
import Calls from "./pages/Calls";
import Music from "./pages/Music";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  // Fix viewport height for mobile browsers
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    return () => window.removeEventListener('resize', setViewportHeight);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <div className="h-screen w-screen overflow-hidden safe-top safe-bottom">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/diary" element={<Diary />} />
                  <Route path="/anniversary" element={<Anniversary />} />
                  <Route path="/calls" element={<Calls />} />
                  <Route path="/music" element={<Music />} />
                  <Route path="/favorites" element={<Favorites />} />
                </Route>
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
