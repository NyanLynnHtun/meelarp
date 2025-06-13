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
      <header className="mt-22 flex items-center justify-between absolute top-0 left-0 right-0 z-10 p-4 bg-transparent title-font">
        <h1 className="text-1xl font-bold text-white ">
          Exhibit A: Testimonies
        </h1>
        <div className="flex gap-8">
          <Link to="/3">
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
      <div className="w-full flex justify-center">
        <div className="flex flex-wrap justify-center gap-x-16 gap-y-16">
          {portraitAudioPairs.map((pair, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center justify-center bg-transparent p-4 cursor-pointer"
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
      </div>

      {/* Modal */}
      {selectedPair && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 px-2 py-4 sm:px-4 sm:py-8 overflow-y-auto">
          <div
            className="relative bg-zinc-900 rounded-xl w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 shadow-2xl mx-auto"
            style={{ maxHeight: "90vh" }}
          >
            {/* ❌ Close Button */}
            <button
              onClick={() => setSelectedPair(null)}
              className="absolute top-2 left-3 md:top-4 md:left-5 text-gray-400 hover:text-white text-2xl z-10"
            >
              &times;
            </button>

            {/* Left Section (Image + Audio) */}
            <div className="p-4 sm:p-6 flex flex-col items-center justify-start">
              <div className="w-32 h-32 sm:w-48 sm:h-60 md:w-64 md:h-80 flex-shrink-0">
                <img
                  src={selectedPair.portrait}
                  alt="Portrait"
                  className="w-full h-full object-cover object-top rounded-lg"
                />
              </div>
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
                  maxWidth: 320,
                  marginTop: 16,
                }}
              />
            </div>

            {/* Right Section (Transcript) */}
            <div className="flex flex-col h-full p-4 sm:p-6">
              {/* Fixed header with title and toggle */}
              <div className="flex justify-between items-center w-full flex-shrink-0 mb-2">
                <h3 className="text-xl font-semibold text-white">Transcript</h3>
                <button
                  onClick={() => setShowMyanmar(!showMyanmar)}
                  className="text-sm px-3 py-1 bg-yellow-400 text-black rounded-full"
                >
                  {showMyanmar ? "Switch to English" : "Switch to Burmese"}
                </button>
              </div>
              {/* Only the text is scrollable */}
              <div className="text-gray-200 text-sm overflow-y-auto w-full flex-1 whitespace-pre-wrap min-h-0 max-h-[50vh] sm:max-h-[65vh]">
                {(showMyanmar
                  ? selectedPair.transcriptMy
                  : selectedPair.transcriptEn
                )
                  .split(/\n\s*\n/)
                  .map((para, idx) => (
                    <h3 key={idx} style={{ marginBottom: "0.9em" }}>
                      {para.split("\n").map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {i !== para.split("\n").length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </h3>
                  ))}
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
