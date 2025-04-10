
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast as sonnerToast } from "sonner";

// User type definition
type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

// Hardcoded user credentials
const VALID_CREDENTIALS = [
  {
    id: "yash-id",
    name: "Yash",
    email: "yash@lovenest.com",
    password: "YashLoveSurabhi@721",
    avatar: "/yash-avatar.jpg" // You can replace with actual images later
  },
  {
    id: "surabhi-id",
    name: "Surabhi",
    email: "surabhi@lovenest.com",
    password: "SurabhiLoveYash@721",
    avatar: "/surabhi-avatar.jpg" // You can replace with actual images later
  }
];

// Auth context type
type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  partner: User | null;
};

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props type
type AuthProviderProps = {
  children: ReactNode;
};

// Auth provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for saved authentication on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('loveNestUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('loveNestUser');
      }
    }
    setIsLoading(false);
  }, []);

  // Get partner info
  const partner = user 
    ? VALID_CREDENTIALS.find(cred => cred.id !== user.id) 
    : null;

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = VALID_CREDENTIALS.find(
      cred => cred.email.toLowerCase() === email.toLowerCase() && cred.password === password
    );
    
    if (foundUser) {
      const userObj = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        avatar: foundUser.avatar
      };
      
      setUser(userObj);
      localStorage.setItem('loveNestUser', JSON.stringify(userObj));
      sonnerToast.success(`Welcome back, ${foundUser.name}! ❤️`);
      return true;
    }
    
    sonnerToast.error('Invalid email or password');
    return false;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('loveNestUser');
    sonnerToast('Logged out successfully');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
    partner
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
