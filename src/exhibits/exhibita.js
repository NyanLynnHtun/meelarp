import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./ExhibitDetail.css";

const ExhibitA = () => {
  const portraitAudioPairs = [
    {
      portrait:
        "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Final%20Testimonies/Pictures/01.png",
      audio:
        "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Final%20Testimonies/Audio/Electricity%20-%20David%20Suum%20Tung.mp3",
    },
    {
      portrait:
        "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Final%20Testimonies/Pictures/02.png",
      audio:
        "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Final%20Testimonies/Audio/Electricity%20-%20Ei%20Phyu%20Lwin.mp3",
    },
    {
      portrait:
        "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Final%20Testimonies/Pictures/03.png",
      audio:
        "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Final%20Testimonies/Audio/Electricity%20-%20Ei%20Phyu%20Lwin.mp3",
    },
    {
      portrait:
        "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Final%20Testimonies/Pictures/04.png",
      audio:
        "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Final%20Testimonies/Audio/Electricity%20-%20David%20Suum%20Tung.mp3",
    },
    {
      portrait:
        "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Final%20Testimonies/Pictures/05.png",
      audio:
        "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Final%20Testimonies/Audio/Electricity%20-%20Ei%20Phyu%20Lwin.mp3",
    },
    {
      portrait:
        "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Final%20Testimonies/Pictures/06.png",
      audio:
        "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Final%20Testimonies/Audio/Electricity%20-%20Ei%20Phyu%20Lwin.mp3",
    },
    {
      portrait:
        "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Final%20Testimonies/Pictures/07.png",
      audio:
        "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Final%20Testimonies/Audio/Electricity%20-%20David%20Suum%20Tung.mp3",
    },
    {
      portrait:
        "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Final%20Testimonies/Pictures/08.png",
      audio:
        "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Final%20Testimonies/Audio/Electricity%20-%20Ei%20Phyu%20Lwin.mp3",
    },
    {
      portrait:
        "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Final%20Testimonies/Pictures/09.png",
      audio:
        "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Final%20Testimonies/Audio/Electricity%20-%20Ei%20Phyu%20Lwin.mp3",
    },
    {
      portrait:
        "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Final%20Testimonies/Pictures/10.png",
      audio:
        "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Final%20Testimonies/Audio/Electricity%20-%20David%20Suum%20Tung.mp3",
    },
    {
      portrait:
        "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Final%20Testimonies/Pictures/11.png",
      audio:
        "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Final%20Testimonies/Audio/Electricity%20-%20Ei%20Phyu%20Lwin.mp3",
    },
    {
      portrait:
        "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Final%20Testimonies/Pictures/12.png",
      audio:
        "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Final%20Testimonies/Audio/Electricity%20-%20Ei%20Phyu%20Lwin.mp3",
    },
    {
      portrait:
        "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Final%20Testimonies/Pictures/13.png",
      audio:
        "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Final%20Testimonies/Audio/Electricity%20-%20David%20Suum%20Tung.mp3",
    },
    {
      portrait:
        "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Final%20Testimonies/Pictures/14.png",
      audio:
        "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Final%20Testimonies/Audio/Electricity%20-%20Ei%20Phyu%20Lwin.mp3",
    },
    {
      portrait:
        "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Final%20Testimonies/Pictures/15.png",
      audio:
        "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Final%20Testimonies/Audio/Electricity%20-%20Ei%20Phyu%20Lwin.mp3",
    },
    {
      portrait:
        "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Final%20Testimonies/Pictures/16.png",
      audio:
        "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Final%20Testimonies/Audio/Electricity%20-%20David%20Suum%20Tung.mp3",
    },
    {
      portrait:
        "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Final%20Testimonies/Pictures/17.png",
      audio:
        "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Final%20Testimonies/Audio/Electricity%20-%20David%20Suum%20Tung.mp3",
    },
    // Add more pairs as needed
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="p-20 space-y-12 px-6 py-16 min-h-screen bg-black text-white">
      {/* Transparent Header */}
      <header className="mt-22 flex items-center justify-between absolute top-0 left-0 right-0 z-10 p-4 bg-transparent">
        <h1 className="text-1xl font-bold text-white">
          Exhibit A: Portraits and Audio Testimonials
        </h1>
        <div className="flex gap-8">
          <Link to="/slideshow/3">
            <motion.button
              className="bg-transparent top-8 right-8 bg-gray-700 hover:bg-gray-900 text-white py-3 px-6 rounded-full shadow-lg transition z-20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Exhibits
            </motion.button>
          </Link>
          <Link to="/exhibitB">
            <motion.button
              className="bg-transparent top-8 right-8 bg-gray-700 hover:bg-gray-900 text-white py-3 px-6 rounded-full shadow-lg transition z-20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
               Next →
            </motion.button>
          </Link>
        </div>
      </header>

      {/* Exhibition content */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-32 items-center justify-center">
        {portraitAudioPairs.map((pair, index) => (
          <motion.div
            key={index}
            className={`flex flex-col items-center bg-transparent p-4 ${
              activeIndex === index ? "pulse" : ""
            }`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-full h-auto max-w-xs max-h-80 overflow-hidden rounded-lg mb-4">
              <LazyImage src={pair.portrait} alt={`Testimonial ${index + 1}`} />
            </div>

            <AudioPlayer
              src={pair.audio}
              onPlay={() => setActiveIndex(index)}
              onPause={() => setActiveIndex(null)} /* Reset pulse on pause */
              onEnded={() => setActiveIndex(null)}
              showJumpControls={false}
              showDownloadProgress={false}
              showFilledVolume={false}
              customAdditionalControls={[]} // Hide extra buttons
              customVolumeControls={[]} // Hide volume control
              autoPlayAfterSrcChange={false}
              layout="stacked"
              style={{
                backgroundColor: "#111",

                borderRadius: "12px",

                color: "#fff",

                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)", // subtle glow

                padding: "8px",
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Navigation buttons */}
      {/* <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 flex gap-8 z-50">
        <Link to="/slideshow/3">
          <motion.button
            className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-8 rounded-full shadow-lg transition duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            ◀
          </motion.button>
        </Link>

        <Link to="/exhibitB">
          <motion.button
            className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-8 rounded-full shadow-lg transition duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            ▶
          </motion.button>
        </Link>
      </div> */}
    </div>
  );
};

// Lazy Image Component
const LazyImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {!loaded && (
        <div className="w-full h-full bg-transparent animate-pulse rounded-lg"></div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-contain transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        loading="lazy"
      />
    </div>
  );
};

export default ExhibitA;
