
import React, { useState } from 'react';
import { Heart, Bell, LogOut, Music, Star, Calendar, Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const { user, partner, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!user) return null;

  const quickNavButtons = [
    { label: 'Anniversary', icon: Calendar, path: '/anniversary' },
    { label: 'Music', icon: Music, path: '/music' },
    { label: 'Favorites', icon: Star, path: '/favorites' }
  ];

  return (
    <header className="bg-white/60 backdrop-blur-md border-b border-love-pink/30 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-love-purple text-white">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="font-medium text-lg">
              <span className="bg-gradient-love bg-clip-text text-transparent font-bold">
                Yashrabi
                <Heart className="inline-block h-4 w-4 mx-1 animate-pulse-heart text-love-magenta" fill="currentColor" /> 
              </span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {quickNavButtons.map((button) => (
              <Button 
                key={button.label}
                variant="ghost" 
                size="sm" 
                onClick={() => navigate(button.path)}
                className="text-love-purple hover:text-love-magenta hover:bg-love-pink/20"
              >
                <button.icon className="h-4 w-4 mr-1" />
                {button.label}
              </Button>
            ))}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-love-purple hover:text-love-magenta hover:bg-love-pink/20">
              <Bell className="h-5 w-5" />
            </Button>
            
            {/* Mobile Menu */}
            {isMobile && (
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden text-love-purple">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-white/95 backdrop-blur-md border-love-pink/30">
                  <div className="flex flex-col gap-4 pt-6">
                    <div className="text-sm font-medium text-muted-foreground">Quick Navigation</div>
                    {quickNavButtons.map((button) => (
                      <Button 
                        key={button.label}
                        variant="ghost" 
                        onClick={() => {
                          navigate(button.path);
                          setIsMenuOpen(false);
                        }}
                        className="justify-start text-love-purple hover:text-love-magenta hover:bg-love-pink/20"
                      >
                        <button.icon className="h-4 w-4 mr-2" />
                        {button.label}
                      </Button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            )}
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={logout}
              className="text-love-purple hover:text-love-magenta hover:bg-love-pink/20"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
