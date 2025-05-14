import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./ExhibitDetail.css";
import portraitAudioPairs from "../data/portraitAudioData.json";
import { FaPlayCircle } from "react-icons/fa";

const ExhibitA = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedPair, setSelectedPair] = useState(null);
  const [showMyanmar, setShowMyanmar] = useState(true);

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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10 items-center justify-center">
        {portraitAudioPairs.map((pair, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center bg-transparent p-4 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              setSelectedPair(pair);
              setShowMyanmar(true); // reset to MM by default
            }}
          >
            <div className="relative w-full h-auto max-w-xs max-h-80 overflow-hidden rounded-lg mb-4 group">
              <img
                src={pair.portrait}
                alt={`Testimonial ${index + 1}`}
                className="w-full h-auto object-cover rounded-lg"
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                <FaPlayCircle className="text-white text-5xl drop-shadow-lg" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {selectedPair && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 px-4">
          <div className="bg-zinc-900 rounded-xl w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 overflow-hidden relative shadow-2xl">
            {/* ❌ Close Button */}
            <button
              onClick={() => setSelectedPair(null)}
              className="absolute top-4 left-4 text-gray-400 hover:text-white text-2xl"
            >
              &times;
            </button>

            {/* 🖼️ Left Section (Image + Audio) */}
            <div className="p-6 flex flex-col items-center justify-center">
              <img
                src={selectedPair.portrait}
                alt="Portrait"
                className="w-full h-auto object-cover rounded-lg"
              />
              <AudioPlayer
                src={selectedPair.audio}
                autoPlay
                showJumpControls={false}
                showDownloadProgress={false}
                showFilledVolume={false}
                customAdditionalControls={[]}
                customVolumeControls={[]}
                layout="stacked"
                style={{
                  backgroundColor: "#111",
                  borderRadius: "12px",
                  color: "#fff",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
                  padding: "8px",
                  width: "100%",
                }}
              />
            </div>

            {/* 📜 Right Section (Transcript + Toggle) */}
            <div className="p-6 flex flex-col items-start gap-y-4">
              <div className="flex justify-between items-center w-full">
                <h3 className="text-xl font-semibold text-white">Transcript</h3>
                <button
                  onClick={() => setShowMyanmar(!showMyanmar)}
                  className="text-sm px-3 py-1 bg-yellow-400 text-black rounded-full"
                >
                  {showMyanmar ? "Switch to English" : "Switch to Myanmar"}
                </button>
              </div>

              <div className="text-gray-200 text-sm overflow-y-auto max-h-[500px] whitespace-pre-wrap w-full">
                {showMyanmar
                  ? selectedPair.transcriptMy
                  : selectedPair.transcriptEn}
              </div>
            </div>
          </div>
        </div>
      )}
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
