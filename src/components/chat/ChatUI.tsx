
import React, { useState, useEffect, useRef } from 'react';
import { Heart, Send, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

// Message type
type Message = {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
};

// Mock initial messages
const initialMessages: Message[] = [
  {
    id: '1',
    senderId: 'yash-id',
    text: 'Hi love, how are you today? 💕',
    timestamp: Date.now() - 86400000, // 1 day ago
  },
  {
    id: '2',
    senderId: 'surabhi-id',
    text: "I'm good! Just thinking about you 🥰",
    timestamp: Date.now() - 82800000, // 23 hours ago
  },
  {
    id: '3',
    senderId: 'yash-id',
    text: "I miss you so much! Can't wait to see you this weekend ❤️",
    timestamp: Date.now() - 79200000, // 22 hours ago
  },
  {
    id: '4',
    senderId: 'surabhi-id',
    text: "Me too! It's going to be perfect 😍",
    timestamp: Date.now() - 75600000, // 21 hours ago
  },
];

const ChatUI = () => {
  const { user, partner } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  // Load messages from local storage on component mount
  useEffect(() => {
    const storedMessages = localStorage.getItem('loveNestMessages');
    if (storedMessages) {
      try {
        setMessages(JSON.parse(storedMessages));
      } catch (error) {
        console.error('Error parsing stored messages:', error);
        setMessages(initialMessages);
      }
    } else {
      setMessages(initialMessages);
    }
  }, []);
  
  // Save messages to local storage when messages change
  useEffect(() => {
    if (messages.length) {
      localStorage.setItem('loveNestMessages', JSON.stringify(messages));
    }
  }, [messages]);
  
  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !user) return;
    
    const newMsg: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      text: newMessage.trim(),
      timestamp: Date.now(),
    };
    
    setMessages(prevMessages => [...prevMessages, newMsg]);
    setNewMessage('');
  };
  
  // Format timestamp
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Format date for message groups
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString(undefined, { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  };
  
  // Group messages by date
  const groupMessagesByDate = () => {
    const groups: { date: string; messages: Message[] }[] = [];
    let currentDate = '';
    let currentGroup: Message[] = [];
    
    messages.forEach(message => {
      const messageDate = formatDate(message.timestamp);
      
      if (messageDate !== currentDate) {
        if (currentGroup.length > 0) {
          groups.push({ date: currentDate, messages: currentGroup });
        }
        currentDate = messageDate;
        currentGroup = [message];
      } else {
        currentGroup.push(message);
      }
    });
    
    if (currentGroup.length > 0) {
      groups.push({ date: currentDate, messages: currentGroup });
    }
    
    return groups;
  };
  
  const messageGroups = groupMessagesByDate();
  
  if (!user || !partner) return null;
  
  return (
    <div className="flex flex-col h-full glass-card overflow-hidden">
      {/* Chat display area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messageGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="space-y-2">
            <div className="flex justify-center">
              <div className="px-3 py-1 rounded-full bg-love-lavender/30 text-xs text-muted-foreground">
                {group.date}
              </div>
            </div>
            
            {group.messages.map((message) => {
              const isMe = message.senderId === user.id;
              const sender = isMe ? user : partner;
              
              return (
                <div key={message.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-2 max-w-[80%] ${isMe ? 'flex-row-reverse' : ''}`}>
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarImage src={sender.avatar} alt={sender.name} />
                      <AvatarFallback className={isMe ? 'bg-love-purple' : 'bg-love-magenta'}>
                        {sender.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="space-y-1">
                      <div className={`message-bubble ${isMe ? 'message-mine' : 'message-yours'}`}>
                        <div className="text-sm">{message.text}</div>
                      </div>
                      <div className={`text-xs text-muted-foreground ${isMe ? 'text-right' : 'text-left'} px-2`}>
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      
      {/* Message input */}
      <div className="p-3 border-t border-love-pink/30">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-love-purple hover:text-love-magenta hover:bg-love-pink/20"
          >
            <Smile className="h-5 w-5" />
          </Button>
          
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="love-input flex-1"
          />
          
          <Button 
            type="submit" 
            size="icon"
            disabled={!newMessage.trim()}
            className="bg-love-purple hover:bg-love-magenta text-white rounded-full"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatUI;
