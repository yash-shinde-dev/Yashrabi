
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Image, 
  Upload, 
  X, 
  Heart, 
  Maximize, 
  MoreHorizontal,
  Trash2
} from 'lucide-react';

type PhotoItem = {
  id: string;
  userId: string;
  image: string;
  timestamp: number;
  caption?: string;
};

// Sample base64 encoded placeholder images - replace these with real uploads
const placeholderImages = [
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23FFDEE2'/%3E%3Cpath d='M100,65 C83,65 70,78 70,95 C70,112 83,125 100,125 C117,125 130,112 130,95 C130,78 117,65 100,65 Z M145,145 C145,145 131,125 100,125 C69,125 55,145 55,145 L55,150 L145,150 L145,145 Z' fill='%23D946EF'/%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23E5DEFF'/%3E%3Cpath d='M70,60 L130,60 L150,120 L50,120 Z' fill='%239b87f5'/%3E%3Ccircle cx='80' cy='85' r='7' fill='%23FDE1D3'/%3E%3Ccircle cx='120' cy='85' r='7' fill='%23FDE1D3'/%3E%3Cpath d='M70,140 L130,140 C130,140 125,160 100,160 C75,160 70,140 70,140 Z' fill='%239b87f5'/%3E%3C/svg%3E",
];

const GalleryUI = () => {
  const { user } = useAuth();
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Load photos from local storage
  useEffect(() => {
    const storedPhotos = localStorage.getItem('loveNestGallery');
    if (storedPhotos) {
      try {
        setPhotos(JSON.parse(storedPhotos));
      } catch (error) {
        console.error('Error parsing stored gallery:', error);
        // Set initial sample photos if no stored photos
        setInitialSamplePhotos();
      }
    } else {
      // Set initial sample photos for demo
      setInitialSamplePhotos();
    }
  }, []);
  
  // Set initial sample photos
  const setInitialSamplePhotos = () => {
    const samplePhotos: PhotoItem[] = placeholderImages.map((image, index) => ({
      id: `sample-${index}`,
      userId: index % 2 === 0 ? 'yash-id' : 'surabhi-id',
      image,
      timestamp: Date.now() - (index * 86400000), // Different days
      caption: index % 2 === 0 ? 'Our special moment together!' : 'Missing you ❤️',
    }));
    
    setPhotos(samplePhotos);
    localStorage.setItem('loveNestGallery', JSON.stringify(samplePhotos));
  };
  
  // Save photos to local storage
  useEffect(() => {
    if (photos.length) {
      localStorage.setItem('loveNestGallery', JSON.stringify(photos));
    }
  }, [photos]);
  
  // Handle file upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0] || !user) return;
    
    setIsUploading(true);
    
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onloadend = () => {
      const newPhoto: PhotoItem = {
        id: Date.now().toString(),
        userId: user.id,
        image: reader.result as string,
        timestamp: Date.now(),
      };
      
      setPhotos(prevPhotos => [newPhoto, ...prevPhotos]);
      setIsUploading(false);
    };
    
    reader.onerror = () => {
      console.error('Error reading file');
      setIsUploading(false);
    };
    
    reader.readAsDataURL(file);
  };
  
  // Handle delete photo
  const handleDeletePhoto = (id: string) => {
    setPhotos(prevPhotos => prevPhotos.filter(photo => photo.id !== id));
    if (selectedPhoto?.id === id) {
      setSelectedPhoto(null);
    }
  };
  
  // Format date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  if (!user) return null;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image className="h-6 w-6 text-love-magenta" />
          <h1 className="text-2xl font-bold bg-gradient-love bg-clip-text text-transparent">Our Photo Gallery</h1>
        </div>
        
        <label className="cursor-pointer">
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleImageUpload} 
            disabled={isUploading}
          />
          <Button
            className="bg-love-purple hover:bg-love-magenta text-white flex gap-2 items-center"
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                <span>Upload Photo</span>
              </>
            )}
          </Button>
        </label>
      </div>
      
      {photos.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-love-lavender/30 mx-auto rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
            <Image className="h-8 w-8 text-love-magenta" />
          </div>
          <h3 className="text-lg font-medium">Your Gallery is Empty</h3>
          <p className="text-muted-foreground mt-1">
            Upload your first photo to start creating memories.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {photos.map(photo => (
            <Card 
              key={photo.id} 
              className="group relative overflow-hidden border-love-pink/30 hover:border-love-pink transition-colors"
            >
              <CardContent className="p-0">
                <div 
                  className="aspect-square cursor-pointer"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img 
                    src={photo.image} 
                    alt="Gallery item" 
                    className="object-cover w-full h-full"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2 text-white">
                    <div className="text-xs">{formatDate(photo.timestamp)}</div>
                    {photo.caption && (
                      <div className="text-sm font-medium line-clamp-1">{photo.caption}</div>
                    )}
                  </div>
                </div>
                
                <button 
                  className="absolute top-2 right-2 bg-white/70 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleDeletePhoto(photo.id)}
                >
                  <Trash2 className="h-4 w-4 text-love-magenta" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {/* Photo Detail Dialog */}
      <Dialog open={!!selectedPhoto} onOpenChange={(open) => !open && setSelectedPhoto(null)}>
        <DialogContent className="max-w-4xl w-[90vw] bg-white/95 backdrop-blur-md p-1 sm:p-2">
          <div className="relative">
            <button 
              className="absolute top-2 right-2 bg-black/30 text-white rounded-full p-1 z-10"
              onClick={() => setSelectedPhoto(null)}
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="flex flex-col">
              <div className="flex-1 overflow-hidden">
                <img
                  src={selectedPhoto?.image}
                  alt="Full size"
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm text-muted-foreground">
                      {selectedPhoto && formatDate(selectedPhoto.timestamp)}
                    </div>
                    {selectedPhoto?.caption && (
                      <div className="text-base font-medium mt-1">{selectedPhoto.caption}</div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full border-love-pink/30"
                    >
                      <Heart className="h-4 w-4 text-love-magenta" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full border-love-pink/30"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryUI;
