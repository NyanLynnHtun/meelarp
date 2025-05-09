import React from 'react';
import { motion } from 'framer-motion';

const ExhibitD = () => {
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
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold text-center">Exhibit D: Testimonials (Portraits + Audios)</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {portraitAudioPairs.map((pair, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={pair.portrait}
              alt={`Testimonial ${index + 1}`}
              className="w-full h-auto rounded-lg mb-4"
            />
            <audio controls className="w-full">
              <source src={pair.audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExhibitD;
