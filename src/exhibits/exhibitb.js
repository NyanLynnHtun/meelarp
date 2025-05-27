import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../exhibits/header";

const ExhibitB = () => {
  return (
    <div className="p-20 space-y-12 px-6 py-16 min-h-screen bg-black text-white">
      {/* Transparent Header */}
      <Header
        title=" Exhibit B: Feedback Wall"
        prevPath="/exhibitA"
        prevLabel="← Previous"
        nextPath="/exhibitC"
        nextLabel="Next →"
      />

      {/* Exhibition content */}
      <div className="w-full flex justify-center">
        <div className="flex flex-wrap justify-center gap-x-16 gap-y-16"></div>
      </div>
    </div>
  );
};

export default ExhibitB;
