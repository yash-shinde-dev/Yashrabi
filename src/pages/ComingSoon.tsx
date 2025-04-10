
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ComingSoonProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ComingSoon = ({ title, description, icon }: ComingSoonProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="bg-love-lavender/30 p-8 rounded-full mb-6">
        {icon}
      </div>
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground max-w-md mb-6">{description}</p>
      
      <div className="flex animate-float">
        <Heart className="h-6 w-6 text-love-magenta mx-1 animate-pulse-heart" fill="currentColor" />
        <Heart className="h-6 w-6 text-love-purple mx-1 animate-pulse-heart delay-150" fill="currentColor" />
        <Heart className="h-6 w-6 text-love-magenta mx-1 animate-pulse-heart delay-300" fill="currentColor" />
      </div>
      
      <Link to="/" className="mt-8">
        <Button
          variant="outline"
          className="border-love-pink flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Chat
        </Button>
      </Link>
    </div>
  );
};

export default ComingSoon;
