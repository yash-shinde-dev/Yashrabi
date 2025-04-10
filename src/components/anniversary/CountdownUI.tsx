
import React, { useState, useEffect } from 'react';
import { CalendarHeart, Gift, Heart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const CountdownUI = () => {
  const [anniversary, setAnniversary] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isEditing, setIsEditing] = useState(false);
  
  // Load anniversary date from local storage
  useEffect(() => {
    const storedDate = localStorage.getItem('loveNestAnniversary');
    if (storedDate) {
      setAnniversary(storedDate);
    }
  }, []);
  
  // Save anniversary date to local storage
  useEffect(() => {
    if (anniversary) {
      localStorage.setItem('loveNestAnniversary', anniversary);
    }
  }, [anniversary]);
  
  // Calculate time left
  useEffect(() => {
    if (!anniversary) return;
    
    const calculateTimeLeft = () => {
      const anniversaryDate = new Date(anniversary);
      const currentDate = new Date();
      
      // Get this year's anniversary
      const thisYearAnniversary = new Date(
        currentDate.getFullYear(),
        anniversaryDate.getMonth(),
        anniversaryDate.getDate()
      );
      
      // If this year's anniversary has passed, calculate for next year
      if (thisYearAnniversary < currentDate) {
        thisYearAnniversary.setFullYear(thisYearAnniversary.getFullYear() + 1);
      }
      
      const difference = thisYearAnniversary.getTime() - currentDate.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [anniversary]);
  
  // Format anniversary date
  const formatAnniversaryDate = () => {
    if (!anniversary) return 'Not set yet';
    
    const date = new Date(anniversary);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Calculate anniversary years
  const calculateYears = () => {
    if (!anniversary) return 0;
    
    const startDate = new Date(anniversary);
    const currentDate = new Date();
    
    let years = currentDate.getFullYear() - startDate.getFullYear();
    
    // Adjust if anniversary hasn't occurred yet this year
    if (
      currentDate.getMonth() < startDate.getMonth() || 
      (currentDate.getMonth() === startDate.getMonth() && 
       currentDate.getDate() < startDate.getDate())
    ) {
      years--;
    }
    
    return years;
  };
  
  const years = calculateYears();
  const nextAnniversaryYear = years + 1;
  
  // Handle save
  const handleSave = () => {
    setIsEditing(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <CalendarHeart className="h-6 w-6 text-love-magenta" />
        <h1 className="text-2xl font-bold bg-gradient-love bg-clip-text text-transparent">Our Anniversary</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card border-love-pink overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10">
            <Heart className="h-40 w-40 -mt-10 -mr-10 text-love-magenta" fill="currentColor" />
          </div>
          
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-love-magenta" />
              Our Special Day
            </CardTitle>
            <CardDescription>
              {isEditing ? 'Set the date of your love journey' : 'When we officially became "us"'}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground block mb-1">
                    Anniversary Date
                  </label>
                  <Input
                    type="date"
                    value={anniversary}
                    onChange={(e) => setAnniversary(e.target.value)}
                    className="love-input"
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  This will be used to calculate your upcoming anniversaries.
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Anniversary Date</div>
                    <div className="text-lg font-medium">{formatAnniversaryDate()}</div>
                  </div>
                  
                  {anniversary && (
                    <div>
                      <div className="text-sm text-muted-foreground">Years Together</div>
                      <div className="text-lg font-medium flex items-center gap-1">
                        <span>{years}</span>
                        <Heart className="h-4 w-4 text-love-magenta" fill="currentColor" />
                      </div>
                    </div>
                  )}
                </div>
                
                {anniversary && years > 0 && (
                  <div className="p-3 bg-love-pink/30 rounded-lg">
                    <div className="text-sm font-medium">What a journey! 💕</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {years} {years === 1 ? 'year' : 'years'} of love, laughter, and making beautiful memories together.
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-end">
            {isEditing ? (
              <Button 
                onClick={handleSave}
                className="bg-love-purple hover:bg-love-magenta text-white"
              >
                Save Date
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => setIsEditing(true)}
                className="border-love-pink"
              >
                {anniversary ? 'Change Date' : 'Set Date'}
              </Button>
            )}
          </CardFooter>
        </Card>
        
        {anniversary && (
          <Card className="glass-card border-love-lavender overflow-hidden relative">
            <div className="absolute -top-16 -left-16 w-32 h-32 bg-love-lavender/30 rounded-full"></div>
            <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-love-pink/30 rounded-full"></div>
            
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarHeart className="h-5 w-5 text-love-magenta" />
                Countdown to Anniversary
              </CardTitle>
              <CardDescription>
                Next celebration: Our {nextAnniversaryYear}{getOrdinalSuffix(nextAnniversaryYear)} Anniversary
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex flex-col items-center">
              <div className="flex justify-center gap-4 text-center my-6">
                <div className="flex flex-col">
                  <div className="text-4xl font-bold bg-gradient-love bg-clip-text text-transparent">
                    {timeLeft.days}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Days</div>
                </div>
                
                <div className="flex flex-col">
                  <div className="text-4xl font-bold bg-gradient-love bg-clip-text text-transparent">
                    {timeLeft.hours}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Hours</div>
                </div>
                
                <div className="flex flex-col">
                  <div className="text-4xl font-bold bg-gradient-love bg-clip-text text-transparent">
                    {timeLeft.minutes}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Minutes</div>
                </div>
                
                <div className="flex flex-col">
                  <div className="text-4xl font-bold bg-gradient-love bg-clip-text text-transparent">
                    {timeLeft.seconds}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Seconds</div>
                </div>
              </div>
              
              <div className="text-center p-3 bg-love-lavender/30 rounded-lg w-full">
                <div className="text-sm">
                  Time to plan something special for your upcoming anniversary!
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

// Helper function to get ordinal suffix
function getOrdinalSuffix(n: number): string {
  if (n > 3 && n < 21) return 'th';
  switch (n % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

export default CountdownUI;
