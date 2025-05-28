import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../exhibits/header";

const evidenceFiles = [
  {
    title: "Court Filing: Power Outage Class Action",
    fileUrl: "https://your-supabase-url/storage/v1/object/public/your-bucket/evidence/class-action.pdf",
    type: "pdf",
    preview: "",
  },
  {
    title: "Official Notice: 2022 Blackout",
    fileUrl: "https://your-supabase-url/storage/v1/object/public/your-bucket/evidence/notice2022.png",
    type: "image",
    preview: "https://your-supabase-url/storage/v1/object/public/your-bucket/evidence/notice2022.png",
  },
  // ...more files
];

const fileIcons = {
  pdf: (
    <span className="text-2xl text-red-400 mr-2">📄</span>
  ),
  image: (
    <span className="text-2xl text-gray-200 mr-2">🖼️</span>
  ),
  doc: (
    <span className="text-2xl text-blue-300 mr-2">📃</span>
  ),
};

const ExhibitE = () => {
  const [lightbox, setLightbox] = useState({ open: false, src: "", title: "" });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header navigation */}
      <Header
        title="Exhibit E: Evidence Archive"
        prevPath="/exhibitD"
        prevLabel="← Previous"
        nextPath="/slideshow/3"
        nextLabel="Exhibits"
      />

      <motion.div
        className="flex flex-col items-center justify-center pt-32 pb-16 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-8 tracking-wide title-font">
          Evidence Archive
        </h1>
        <p className="text-gray-300 max-w-2xl mb-10 text-center text-base md:text-lg">
          Download and review key documents and visual evidence presented in this case.
        </p>

        <div className="w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-7">
          {evidenceFiles.map((file, i) => (
            <motion.div
              key={i}
              className="bg-white bg-opacity-5 rounded-xl flex items-center justify-between p-4 mb-2 border border-white border-opacity-5 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.6 }}
            >
              <div className="flex items-center">
                {/* Icon or preview */}
                {file.type === "image" && file.preview ? (
                  <img
                    src={file.preview}
                    alt={file.title}
                    className="w-12 h-12 object-cover rounded-md mr-3 border border-white border-opacity-10"
                    onClick={() =>
                      setLightbox({ open: true, src: file.preview, title: file.title })
                    }
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  fileIcons[file.type] || fileIcons.doc
                )}

                <div>
                  <span className="font-semibold text-white text-base">{file.title}</span>
                  <div className="text-xs text-gray-400 mt-1">{file.type.toUpperCase()}</div>
                </div>
              </div>
              {/* Download/open button */}
              {file.type === "image" ? (
                <button
                  className="text-sm border border-white rounded-lg px-3 py-1 ml-2 hover:bg-white hover:text-black transition"
                  onClick={() => setLightbox({ open: true, src: file.preview, title: file.title })}
                >
                  View
                </button>
              ) : (
                <a
                  href={file.fileUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm border border-white rounded-lg px-3 py-1 ml-2 hover:bg-white hover:text-black transition"
                >
                  Download
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox for images */}
      <AnimatePresence>
        {lightbox.open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox({ open: false, src: "", title: "" })}
            style={{ cursor: "zoom-out" }}
          >
            <div
              className="relative flex flex-col items-center"
              onClick={e => e.stopPropagation()}
              style={{
                maxWidth: "96vw",
                maxHeight: "92vh",
              }}
            >
              <img
                src={lightbox.src}
                alt={lightbox.title}
                className="object-contain rounded-2xl shadow-2xl border border-white bg-black"
                style={{
                  width: "min(700px, 92vw)",
                  height: "min(520px, 75vh)",
                  objectFit: "contain",
                  imageRendering: "auto",
                  background: "#111",
                }}
              />
              <span className="mt-4 text-base text-gray-200 text-center max-w-xl">{lightbox.title}</span>
              <button
                className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-2xl rounded-full px-4 py-1.5 hover:bg-opacity-90 transition font-bold"
                onClick={() => setLightbox({ open: false, src: "", title: "" })}
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

export default ExhibitE;
