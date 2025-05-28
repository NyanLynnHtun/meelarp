import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../exhibits/header";

const satelliteImages = [
  {
    src: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/gifs/Yangon_2021_500.gif",
    caption: "Yangon, 2021",
  },
  {
    src: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/gifs/Yangon_2022_500.gif",
    caption: "Yangon, 2022",
  },
  {
    src: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/gifs/Yangon_2023_500.gif",
    caption: "Yangon, 2023",
  },
  {
    src: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/gifs/Yangon_2024_500.gif",
    caption: "Yangon, 2024",
  },
  {
    src: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/gifs/Sittwe_2021.gif",
    caption: "Sittwe, 2021",
  },
  {
    src: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/gifs/Sittwe_2022.gif",
    caption: "Sittwe, 2022",
  },
  {
    src: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/gifs/Sittwe_2023.gif",
    caption: "Sittwe, 2023",
  },
  {
    src: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/gifs/Sittwe_2024.gif",
    caption: "Sittwe, 2024",
  },
  {
    src: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/gifs/Naypyitaw_2021.gif",
    caption: "Naypyitaw, 2021",
  },
  {
    src: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/gifs/Naypyitaw_2022.gif",
    caption: "Naypyitaw, 2022",
  },
  {
    src: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/gifs/Naypyitaw_2023.gif",
    caption: "Naypyitaw, 2023",
  },
  {
    src: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/gifs/Naypyitaw_2024.gif",
    caption: "Naypyitaw, 2024",
  },
  {
    src: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/gifs/Myitkyina_2021.gif",
    caption: "Myitkyina, 2021",
  },
  {
    src: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/gifs/Myitkyina_2022.gif",
    caption: "Myitkyina, 2022",
  },
  {
    src: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/gifs/Myitkyina_2023.gif",
    caption: "Myitkyina, 2023",
  },
  {
    src: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/gifs/Myitkyina_2024.gif",
    caption: "Myitkyina, 2024",
  },
  {
    src: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/gifs/Myanmar_2021.gif",
    caption: "Myanmar, 2021",
  },
  {
    src: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/gifs/Myanmar_2022.gif",
    caption: "Myanmar, 2022",
  },
  {
    src: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/gifs/Myanmar_2023.gif",
    caption: "Myanmar, 2023",
  },
  {
    src: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/gifs/Myanmar_2024.gif",
    caption: "Myanmar, 2024",
  },
  {
    src: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/gifs/Loikaw_2021.gif",
    caption: "Loikaw, 2021",
  },
  {
    src: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/gifs/Loikaw_2022.gif",
    caption: "Loikaw, 2022",
  },
  {
    src: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/gifs/Loikaw_2023.gif",
    caption: "Loikaw, 2023",
  },
  {
    src: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/gifs/Loikaw_2024.gif",
    caption: "Loikaw, 2024",
  },
  {
    src: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/gifs/Hakha_2021.gif",
    caption: "Hakha, 2021",
  },
  {
    src: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/gifs/Hakha_2022.gif",
    caption: "Hakha, 2022",
  },
  {
    src: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/gifs/Hakha_2023.gif",
    caption: "Hakha, 2023",
  },
  {
    src: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/gifs/Hakha_2024.gif",
    caption: "Hakha, 2024",
  },
  {
    src: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/gifs/Dawei_2021.gif",
    caption: "Dawei, 2021",
  },
  {
    src: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/gifs/Dawei_2022.gif",
    caption: "Dawei, 2022",
  },
  {
    src: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/gifs/Dawei_2023.gif",
    caption: "Dawei, 2023",
  },
  {
    src: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/gifs/Dawei_2024.gif",
    caption: "Dawei, 2024",
  },
];

const ExhibitD = () => {
  // Lightbox state
  const [lightbox, setLightbox] = useState({
    open: false,
    src: "",
    caption: "",
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <Header
        title="Exhibit D: Satellite Imagery"
        prevPath="/exhibitC"
        prevLabel="← Previous"
        nextPath="/exhibitE"
        nextLabel="Next →"
      />

      <motion.div
        className="flex flex-col items-center justify-center pt-32 pb-16 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-8 tracking-wide title-font">
          Evidence from Space
        </h1>
        {/* <p className="text-gray-300 max-w-2xl mb-12 text-center text-base md:text-lg">
          Power outages and city-wide blackouts visible from space. Satellite imagery was used to document the change in night-time lights over Myanmar since the coup. Scroll through the images to see the evidence.
        </p> */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          {satelliteImages.map((img, i) => (
            <motion.div
              key={i}
              className="bg-white bg-opacity-5 rounded-xl p-4 flex flex-col items-center shadow-md cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.7 }}
              onClick={() =>
                setLightbox({ open: true, src: img.src, caption: img.caption })
              }
            >
              <img
                src={img.src}
                alt={img.caption}
                className="w-full h-72 object-contain rounded mb-3 border border-white border-opacity-10 transition duration-150 hover:scale-105"
                style={{ background: "#222" }}
              />
              <span className="text-xs text-gray-400">{img.caption}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
  {lightbox.open && (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setLightbox({ open: false, src: "", caption: "" })}
      style={{ cursor: "zoom-out" }}
    >
      <div
        className="relative flex flex-col items-center"
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: "98vw",
          maxHeight: "92vh",
        }}
      >
        <img
          src={lightbox.src}
          alt={lightbox.caption}
          className="rounded-2xl shadow-2xl border border-white bg-black"
          style={{
            width: "min(700px, 92vw)",
            height: "min(520px, 75vh)",
            objectFit: "contain",
            imageRendering: "pixelated", // <- helps small GIFs scale up crisply
            background: "#111",
          }}
        />
        <span className="mt-5 text-base text-gray-200 text-center max-w-2xl px-4">{lightbox.caption}</span>
        <button
          className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-2xl rounded-full px-4 py-1.5 hover:bg-opacity-90 transition font-bold"
          onClick={() => setLightbox({ open: false, src: "", caption: "" })}
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
};

export default ExhibitD;
