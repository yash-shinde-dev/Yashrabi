
import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { X, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MainLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-love">
        <div className="animate-pulse p-6 rounded-full">
          <div className="w-16 h-16 border-4 border-love-purple border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white/30">
      {/* Mobile Sidebar Toggle */}
      {isMobile && (
        <div className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
             onClick={() => setSidebarOpen(false)}>
        </div>
      )}
      
      {/* Sidebar */}
      <div className={`${isMobile ? 'fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out' : 'relative'} 
                       ${isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'}`}>
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        
        {/* Mobile Sidebar Toggle Button */}
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="fixed bottom-4 left-4 z-30 bg-white/80 backdrop-blur-sm shadow-md rounded-full h-12 w-12 flex items-center justify-center border border-love-pink/30"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6 text-love-purple" />
          </Button>
        )}
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
