import React, { useState, useEffect } from 'react';
import { Star, Heart, Trash2, PlusCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { toast as sonnerToast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type FavoriteItem = {
  id: string;
  userId: string;
  title: string;
  description: string;
  type: 'place' | 'memory' | 'song' | 'food' | 'other';
  timestamp: number;
};

const FavoritesUI = () => {
  const { user, partner } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newFavorite, setNewFavorite] = useState({
    title: '',
    description: '',
    type: 'memory' as const
  });
  
  useEffect(() => {
    const storedFavorites = localStorage.getItem('yashrabiFavorites');
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error('Error parsing stored favorites:', error);
        setFavorites([]);
      }
    }
  }, []);
  
  useEffect(() => {
    if (favorites.length) {
      localStorage.setItem('yashrabiFavorites', JSON.stringify(favorites));
    }
  }, [favorites]);
  
  const handleAddFavorite = () => {
    if (!newFavorite.title.trim() || !user) return;
    
    const favoriteItem: FavoriteItem = {
      id: Date.now().toString(),
      userId: user.id,
      title: newFavorite.title.trim(),
      description: newFavorite.description.trim(),
      type: newFavorite.type,
      timestamp: Date.now(),
    };
    
    setFavorites(prevFavorites => [favoriteItem, ...prevFavorites]);
    setNewFavorite({
      title: '',
      description: '',
      type: 'memory'
    });
    setIsAdding(false);
    sonnerToast.success("Added to favorites! ❤️");
  };
  
  const handleDeleteFavorite = (id: string) => {
    setFavorites(prevFavorites => prevFavorites.filter(favorite => favorite.id !== id));
    sonnerToast("Removed from favorites");
  };
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  };
  
  if (!user || !partner) return null;

  const favoriteTypes = [
    { value: 'memory', label: 'Memory' },
    { value: 'place', label: 'Place' },
    { value: 'song', label: 'Song' },
    { value: 'food', label: 'Food' },
    { value: 'other', label: 'Other' }
  ];
  
  const typeColorMap = {
    memory: 'bg-love-pink/30 text-love-magenta',
    place: 'bg-love-lavender/30 text-love-purple',
    song: 'bg-blue-100 text-blue-600',
    food: 'bg-amber-100 text-amber-600',
    other: 'bg-gray-100 text-gray-600'
  };
  
  return (
    <div className="container mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Star className="h-6 w-6 text-amber-500" />
          <h1 className="text-2xl font-bold bg-gradient-love bg-clip-text text-transparent">Our Favorites</h1>
        </div>
        
        {!isAdding && (
          <Button
            onClick={() => setIsAdding(true)}
            className="bg-love-purple hover:bg-love-magenta text-white flex gap-2 items-center"
          >
            <PlusCircle className="h-4 w-4" />
            Add Favorite
          </Button>
        )}
      </div>
      
      {isAdding && (
        <Card className="glass-card border-love-lavender">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="h-5 w-5 text-love-magenta" />
              Add to Favorites
            </CardTitle>
            <CardDescription>
              Save your special places, memories, songs, or foods
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Input
                  value={newFavorite.title}
                  onChange={(e) => setNewFavorite({...newFavorite, title: e.target.value})}
                  placeholder="Title (e.g. Our First Date)"
                  className="love-input"
                />
              </div>
              
              <div>
                <Textarea
                  value={newFavorite.description}
                  onChange={(e) => setNewFavorite({...newFavorite, description: e.target.value})}
                  placeholder="Description (optional)"
                  className="min-h-20 resize-none focus-visible:ring-love-purple border-love-pink/50"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {favoriteTypes.map(type => (
                  <Button
                    key={type.value}
                    type="button"
                    variant={newFavorite.type === type.value ? "default" : "outline"}
                    onClick={() => setNewFavorite({...newFavorite, type: type.value as any})}
                    className={newFavorite.type === type.value ? "bg-love-magenta" : ""}
                  >
                    {type.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsAdding(false);
                setNewFavorite({
                  title: '',
                  description: '',
                  type: 'memory'
                });
              }}
              className="border-love-pink/50 text-muted-foreground"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddFavorite}
              disabled={!newFavorite.title.trim()}
              className="bg-love-purple hover:bg-love-magenta text-white"
            >
              Save Favorite
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-amber-100 mx-auto rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
            <Star className="h-8 w-8 text-amber-500" />
          </div>
          <h3 className="text-lg font-medium">No Favorites Yet</h3>
          <p className="text-muted-foreground mt-1">
            Start adding your favorite places, memories, songs, and more.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map(favorite => {
            const isMyFavorite = favorite.userId === user.id;
            const author = isMyFavorite ? user : partner;
            
            return (
              <Card key={favorite.id} className="glass-card overflow-hidden h-full border-love-pink/50 hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={author.avatar} alt={author.name} />
                        <AvatarFallback className={isMyFavorite ? 'bg-love-purple' : 'bg-love-magenta'}>
                          {author.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-sm">{author.name}'s Favorite</span>
                    </div>
                    
                    {isMyFavorite && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteFavorite(favorite.id)}
                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="pb-2">
                  <div className="mb-3">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${typeColorMap[favorite.type]}`}>
                      {favorite.type.charAt(0).toUpperCase() + favorite.type.slice(1)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg line-clamp-1">{favorite.title}</h3>
                  {favorite.description && (
                    <p className="text-muted-foreground text-sm mt-1 line-clamp-3">{favorite.description}</p>
                  )}
                </CardContent>
                
                <CardFooter className="text-xs text-muted-foreground pt-0">
                  Added on {formatDate(favorite.timestamp)}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

const Favorites = () => {
  return (
    <div className="container mx-auto">
      <FavoritesUI />
    </div>
  );
};

export default Favorites;
