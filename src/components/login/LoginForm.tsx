
import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    setIsLoggingIn(true);

    try {
      await login(email, password);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-love bg-stars">
      <div className="absolute inset-0 bg-stars opacity-30"></div>
      <div className="relative w-full max-w-sm md:max-w-md">
        <Card className="glass-card border-love-pink shadow-xl overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-love-pink rounded-full opacity-20"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-love-lavender rounded-full opacity-20"></div>

          <CardHeader className="pb-6">
            <div className="flex justify-center mb-4">
              <div className="bg-love-pink/30 p-4 rounded-full">
                <Heart className="w-10 h-10 text-love-magenta animate-pulse-heart" />
              </div>
            </div>
            <CardTitle className="text-center text-2xl font-bold bg-gradient-love bg-clip-text text-transparent">
              Yashrabi
            </CardTitle>
            <CardDescription className="text-center">
              Yashrabi - Yash And Surabhi's Love Nest
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="love-input"
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="love-input"
                  required
                />
              </div>
              <div className="pt-2">
                <Button
                  type="submit"
                  className="love-button w-full group"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? 'Unlocking...' : (
                    <>
                      Enter with Love
                      <Heart className="ml-2 h-4 w-4 group-hover:animate-pulse-heart" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
