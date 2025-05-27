import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ExhibitB = () => {
  return (
    <div className="p-20 space-y-12 px-6 py-16 min-h-screen bg-black text-white">
      {/* Transparent Header */}
      <header className="mt-22 flex items-center justify-between absolute top-0 left-0 right-0 z-10 p-4 bg-transparent title-font">
        <h1 className="text-1xl font-bold text-white ">
          Exhibit B: Feedback Wall
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
      <div className="w-full flex justify-center">
        <div className="flex flex-wrap justify-center gap-x-16 gap-y-16">
          
        </div>
      </div>
    </div>
  );
};

export default ExhibitB;
