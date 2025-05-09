import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ExhibitDetail.css';

const ExhibitA = () => {
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
      <h1 className="text-3xl font-bold text-center">Exhibit A: Testimonials (Portraits + Audios)</h1>
      
      {/* Exhibition content */}
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

      {/* Button to navigate back to the slideshow page */}
      <div className="mt-8 text-center">
        <Link to="/slideshow/3">
          <motion.button
            className="bg-blue-500 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Exhibits
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default ExhibitA;
