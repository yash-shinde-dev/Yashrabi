
import React from 'react';
import ComingSoon from './ComingSoon';
import { Music } from 'lucide-react';

const MusicPage = () => {
  return (
    <ComingSoon
      title="Music Sharing Coming Soon"
      description="Soon you'll be able to share your favorite love songs and create playlists together."
      icon={<Music className="h-12 w-12 text-love-magenta" />}
    />
  );
};

export default MusicPage;
