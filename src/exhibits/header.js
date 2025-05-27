// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Props: title, prevPath, prevLabel, nextPath, nextLabel
const Header = ({
  title,
  prevPath,
  prevLabel = "Back",
  nextPath,
  nextLabel = "Next →",
  className = "",
}) => (
  <header
    className={`mt-22 flex items-center justify-between absolute top-0 left-0 right-0 z-10 p-4 bg-transparent title-font ${className}`}
  >
    <h1 className="text-1xl font-bold text-white">{title}</h1>
    <div className="flex gap-8">
      {prevPath && (
        <Link to={prevPath}>
          <motion.button
            className="bg-transparent bg-gray-700 hover:bg-gray-900 text-white py-3 px-6 rounded-full shadow-lg transition z-20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {prevLabel}
          </motion.button>
        </Link>
      )}
      {nextPath && (
        <Link to={nextPath}>
          <motion.button
            className="bg-transparent bg-gray-700 hover:bg-gray-900 text-white py-3 px-6 rounded-full shadow-lg transition z-20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {nextLabel}
          </motion.button>
        </Link>
      )}
    </div>
  </header>
);

export default Header;
