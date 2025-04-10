
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { BookHeart, CalendarDays, Heart, Plus, Trash2 } from 'lucide-react';

type DiaryEntry = {
  id: string;
  userId: string;
  content: string;
  timestamp: number;
};

const DiaryUI = () => {
  const { user, partner } = useAuth();
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [newEntry, setNewEntry] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  
  // Load entries from local storage
  useEffect(() => {
    const storedEntries = localStorage.getItem('loveNestDiary');
    if (storedEntries) {
      try {
        setEntries(JSON.parse(storedEntries));
      } catch (error) {
        console.error('Error parsing stored diary entries:', error);
        setEntries([]);
      }
    }
  }, []);
  
  // Save entries to local storage
  useEffect(() => {
    if (entries.length) {
      localStorage.setItem('loveNestDiary', JSON.stringify(entries));
    }
  }, [entries]);
  
  const handleAddEntry = () => {
    if (!newEntry.trim() || !user) return;
    
    const newDiaryEntry: DiaryEntry = {
      id: Date.now().toString(),
      userId: user.id,
      content: newEntry.trim(),
      timestamp: Date.now(),
    };
    
    setEntries(prevEntries => [newDiaryEntry, ...prevEntries]);
    setNewEntry('');
    setIsAdding(false);
  };
  
  const handleDeleteEntry = (id: string) => {
    setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
  };
  
  // Format date
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  if (!user || !partner) return null;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BookHeart className="h-6 w-6 text-love-magenta" />
          <h1 className="text-2xl font-bold bg-gradient-love bg-clip-text text-transparent">Our Love Diary</h1>
        </div>
        
        {!isAdding && (
          <Button
            onClick={() => setIsAdding(true)}
            className="bg-love-purple hover:bg-love-magenta text-white flex gap-2 items-center"
          >
            <Plus className="h-4 w-4" />
            Write New Entry
          </Button>
        )}
      </div>
      
      {isAdding && (
        <Card className="glass-card border-love-lavender">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="h-5 w-5 text-love-magenta" />
              New Diary Entry
            </CardTitle>
            <CardDescription>
              Write a sweet message or memory to cherish forever.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              placeholder="Today, I wanted to tell you..."
              className="min-h-32 resize-none focus-visible:ring-love-purple border-love-pink/50"
            />
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsAdding(false);
                setNewEntry('');
              }}
              className="border-love-pink/50 text-muted-foreground"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddEntry}
              disabled={!newEntry.trim()}
              className="bg-love-purple hover:bg-love-magenta text-white"
            >
              Save Entry
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {entries.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-love-lavender/30 mx-auto rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
            <BookHeart className="h-8 w-8 text-love-magenta" />
          </div>
          <h3 className="text-lg font-medium">Your Love Diary is Empty</h3>
          <p className="text-muted-foreground mt-1">
            Start writing sweet notes for each other to create beautiful memories.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {entries.map(entry => {
            const isMyEntry = entry.userId === user.id;
            const author = isMyEntry ? user : partner;
            
            return (
              <Card key={entry.id} className={`glass-card overflow-hidden border-${isMyEntry ? 'love-lavender' : 'love-pink'}`}>
                <CardHeader className={`pb-3 bg-${isMyEntry ? 'love-lavender' : 'love-pink'}/20`}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-${isMyEntry ? 'love-purple' : 'love-magenta'}`}></div>
                      <span className="font-medium">{author.name}'s Entry</span>
                    </div>
                    
                    {isMyEntry && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <CalendarDays className="h-3 w-3" />
                    <span>{formatDate(entry.timestamp)}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-4">
                  <p className="whitespace-pre-wrap">{entry.content}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DiaryUI;
