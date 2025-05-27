import React from 'react';
import { motion } from 'framer-motion';
import Header from "../exhibits/header";

const ExhibitE = () => {
  const portraitAudioPairs = [
    {
      portrait: 'https://fakeimg.pl/200x200?text=Portrait+1',
      audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
      portrait: 'https://fakeimg.pl/200x200?text=Portrait+2',
      audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    },
    // Add more pairs as needed
  ];

  return (
    <div className="p-20 space-y-12 px-6 py-16 min-h-screen bg-black text-white">
      <Header
        title="Exhibit E: Evidence Archive"
        prevPath="/exhibitD"
        prevLabel="← Previous"
        nextPath="/slideshow/3"
        nextLabel="Next →"
      />
    </div>
  );
};

export default ExhibitE;
