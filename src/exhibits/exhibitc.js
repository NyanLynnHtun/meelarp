import React, { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../exhibits/header";

const ExhibitC = () => {
  const supabaseBaseUrl =
    "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/videos/";
  const totalVideos = 24;
  const batchSize = 3;

  const [visibleCount, setVisibleCount] = useState(batchSize);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef(null);
  const hasMore = visibleCount < totalVideos;

  const videos = Array.from(
    { length: totalVideos },
    (_, i) => `${supabaseBaseUrl}video%20(${i + 1}).mp4`
  );
  const visibleVideos = videos.slice(0, visibleCount);

  const loadMore = useCallback(() => {
    if (!hasMore || isLoading) return;
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + batchSize, totalVideos));
      setIsLoading(false);
    }, 800); // Simulate loading delay
  }, [hasMore, isLoading]);

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    if (!hasMore) return;

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading) setIsIntersecting(true);
      },
      { rootMargin: "100px" }
    );

    const node = loaderRef.current;
    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [hasMore, isLoading]);

  // Trigger load more when loader enters viewport
  useEffect(() => {
    if (isIntersecting && hasMore) {
      loadMore();
      setIsIntersecting(false); // Reset trigger
    }
  }, [isIntersecting, hasMore, loadMore]);

  return (
    <div className="p-20 space-y-12 px-6 py-16 min-h-screen bg-black text-white">
      <Header
        title="Exhibit C: Video Compilations"
        prevPath="/exhibitB"
        prevLabel="← Previous"
        nextPath="/exhibitD"
        nextLabel="Next →"
      />
      <AnimatePresence mode="wait">
        <motion.div
          className="min-h-screen bg-black text-white px-4 py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {visibleVideos.map((src, index) => (
              <motion.div
                key={index}
                className="w-full max-w-sm bg-white bg-opacity-5 p-2 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
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

          {hasMore && (
            <div ref={loaderRef} className="flex flex-col items-center mt-10">
              {isLoading ? (
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex flex-col items-center"
                >
                  <svg
                    className="animate-spin h-8 w-8 text-white mb-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  <span className="text-gray-400">Loading more videos...</span>
                </motion.div>
              ) : (
                <button
                  onClick={loadMore}
                  className="mt-2 px-6 py-2 bg-white bg-opacity-10 rounded-lg text-gray-200 hover:bg-opacity-20 transition shadow-lg"
                  aria-label="Load more videos"
                >
                  Load More
                </button>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ExhibitC;
