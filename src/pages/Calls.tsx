
import React from 'react';
import ComingSoon from './ComingSoon';
import { Video } from 'lucide-react';

const Calls = () => {
  return (
    <ComingSoon
      title="Video & Voice Calls Coming Soon"
      description="We're working on adding secure video and voice calls so you can see and hear each other when you're apart."
      icon={<Video className="h-12 w-12 text-love-magenta" />}
    />
  );
};

export default Calls;
