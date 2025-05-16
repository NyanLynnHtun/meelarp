import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ExhibitC = () => {
  const supabaseBaseUrl = "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/videos/";
  const totalVideos = 24;
  const batchSize = 6;

  const [visibleCount, setVisibleCount] = useState(batchSize);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const loaderRef = useRef(null);

  const videos = Array.from({ length: totalVideos }, (_, i) => `${supabaseBaseUrl}video%20(${i + 1}).mp4`);
  const visibleVideos = videos.slice(0, visibleCount);

  const loadMore = () => setVisibleCount(prev => Math.min(prev + batchSize, totalVideos));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { rootMargin: "100px" }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isIntersecting && visibleCount < totalVideos) {
      loadMore();
    }
  }, [isIntersecting]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="min-h-screen bg-black text-white px-4 py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 text-left">
          Exhibit C: Video Compilations
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {visibleVideos.map((src, index) => (
            <motion.div
              key={index}
              className="w-full max-w-sm bg-white bg-opacity-5 p-2 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <div className="aspect-video bg-black rounded overflow-hidden">
                <video
                  src={src}
                  controls
                  preload="metadata"
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {visibleCount < totalVideos && (
          <div ref={loaderRef} className="text-center mt-10">
            <p className="text-gray-400">Loading more videos...</p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ExhibitC;
