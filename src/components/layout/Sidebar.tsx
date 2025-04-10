
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  MessageCircleHeart, 
  Image, 
  BookHeart, 
  CalendarHeart, 
  Music,
  Video,
  Heart,
  Star,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed?: boolean;
  onClick?: () => void;
};

const NavItem = ({ to, icon, label, isCollapsed = false, onClick }: NavItemProps) => (
  <NavLink
    to={to}
    className={({ isActive }) => `
      flex items-center px-3 py-3 rounded-lg transition-colors
      ${isActive 
        ? 'bg-love-pink/30 text-love-magenta' 
        : 'text-foreground/70 hover:bg-love-pink/20 hover:text-love-magenta'
      }
    `}
    onClick={onClick}
  >
    <div className="mr-3">{icon}</div>
    {!isCollapsed && <span>{label}</span>}
  </NavLink>
);

type SidebarProps = {
  closeSidebar?: () => void;
};

const Sidebar = ({ closeSidebar }: SidebarProps) => {
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  React.useEffect(() => {
    if (!isMobile) {
      setIsCollapsed(false);
    }
  }, [isMobile]);

  return (
    <aside className={`
      bg-white/60 backdrop-blur-sm border-r border-love-pink/30
      overflow-y-auto transition-all duration-300 ease-in-out h-full
      ${isCollapsed ? 'w-16' : 'w-64'}
      ${isMobile ? 'w-64' : ''}
    `}>
      <div className="p-4 flex justify-between items-center">
        <div className="w-10 h-10 rounded-full bg-gradient-love flex items-center justify-center">
          <Heart className="h-6 w-6 text-white" fill="white" />
        </div>
        
        {isMobile && closeSidebar && (
          <Button variant="ghost" size="icon" onClick={closeSidebar} className="text-love-purple">
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      <nav className="px-2 py-4 space-y-1">
        <NavItem 
          to="/" 
          icon={<MessageCircleHeart className="h-5 w-5" />} 
          label="Chat" 
          isCollapsed={isCollapsed && !isMobile} 
          onClick={isMobile ? closeSidebar : undefined}
        />
        <NavItem 
          to="/gallery" 
          icon={<Image className="h-5 w-5" />} 
          label="Gallery" 
          isCollapsed={isCollapsed && !isMobile} 
          onClick={isMobile ? closeSidebar : undefined}
        />
        <NavItem 
          to="/diary" 
          icon={<BookHeart className="h-5 w-5" />} 
          label="Love Diary" 
          isCollapsed={isCollapsed && !isMobile} 
          onClick={isMobile ? closeSidebar : undefined}
        />
        <NavItem 
          to="/anniversary" 
          icon={<CalendarHeart className="h-5 w-5" />} 
          label="Anniversary" 
          isCollapsed={isCollapsed && !isMobile} 
          onClick={isMobile ? closeSidebar : undefined}
        />
        <NavItem 
          to="/favorites" 
          icon={<Star className="h-5 w-5" />} 
          label="Favorites" 
          isCollapsed={isCollapsed && !isMobile} 
          onClick={isMobile ? closeSidebar : undefined}
        />
        
        <div className="pt-4 border-t border-love-pink/30 my-4"></div>
        
        <div className="px-3 pb-2 text-xs font-medium text-muted-foreground">
          {(!isCollapsed || isMobile) && 'Coming Soon'}
        </div>
        
        <NavItem 
          to="/calls" 
          icon={<Video className="h-5 w-5 opacity-50" />} 
          label="Video Calls" 
          isCollapsed={isCollapsed && !isMobile} 
          onClick={isMobile ? closeSidebar : undefined}
        />
        <NavItem 
          to="/music" 
          icon={<Music className="h-5 w-5 opacity-50" />} 
          label="Music" 
          isCollapsed={isCollapsed && !isMobile} 
          onClick={isMobile ? closeSidebar : undefined}
        />
      </nav>
    </aside>
  );
};

export default Sidebar;
