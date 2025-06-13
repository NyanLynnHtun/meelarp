import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../exhibits/header";


const evidenceFiles = [
  {
    title: "Attestation to the Accuracy of Documented Public Reactions",
    fileUrl: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Evidence%20Archive/Attestation%20to%20the%20Accuracy%20of%20Documented%20Public%20Reactions.pdf",
    type: "pdf",
    preview: "",
    description: "An official statement verifying the collection and translation of public responses on TikTok and Facebook, where citizens express frustration, satire, and survival strategies amid blackout conditions.",
  },
  {
    title: "Case Dossier",
    fileUrl: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Evidence%20Archive/Case%20Dossier.docx.pdf",
    type: "pdf",
    preview: "",
    description: "A curated compilation of evidence, background context, and key timelines outlining the systemic nature of electricity blackouts in Myanmar.",
  },
  {
    title: "Satellite Data Logs",
    fileUrl: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Evidence%20Archive/Satellite%20Data%20Logs.pdf",
    type: "pdf",
    preview: "",
    description: "Visual and quantitative documentation of nighttime blackouts using satellite imagery, highlighting the scope and frequency of power outages across regions.",
  },
  {
    title: "Survey Results",
    fileUrl: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Evidence%20Archive/Survey%20Results.pdf",
    type: "pdf",
    preview: "",
    description: "A summary of anonymous responses to structured questionnaires, providing demographic insight and collective sentiment on blackout-related challenges.",
  },
  {
    title: "TRANSCRIPTS OF THE TESTIMONIES",
    fileUrl: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Evidence%20Archive/TRANSCRIPTS%20OF%20THE%20TESTIMONIES.pdf",
    type: "pdf",
    preview: "",
    description: "Verbatim records of interviews conducted with individuals from diverse backgrounds, capturing personal experiences and emotional narratives about life without stable electricity.",
  },
  {
    title: "Raw Survey Data",
    fileUrl: "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Evidence%20Archive/Survey%20Raw%20Data.pdf",
    type: "pdf",
    preview: "",
    description: "Complete, unfiltered responses from all survey participants, providing transparency and allowing deeper analysis of public experiences with electricity blackouts.",
  },
  // ... add more files ...
];

const fileIcons = {
  pdf: (
    <span className="text-5xl text-red-400 mr-4">📄</span>
  ),
  image: (
    <span className="text-5xl text-gray-200 mr-4">🖼️</span>
  ),
  doc: (
    <span className="text-5xl text-blue-300 mr-4">📃</span>
  ),
};

const ExhibitE = () => {
  const [lightbox, setLightbox] = useState({ open: false, src: "", title: "", type: "", description: "" });

  // Helper: is this file a PDF?
  const isPDF = (file) => file.type === "pdf";

  return (
    <div className="min-h-screen bg-black text-white">
      <Header
        title="Exhibit E: Evidence Archive"
        prevPath="/exhibitD"
        prevLabel="← Previous"
        nextPath="/3"
        nextLabel="Exhibits"
      />

      <motion.div
        className="flex flex-col items-center justify-center pt-32 pb-16 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-6 tracking-wide title-font">
          Evidence Archive
        </h1>
        <p className="text-gray-300 max-w-2xl mb-10 text-center text-lg md:text-xl">
          View and review key documents and visual evidence presented in this case.
        </p>

        <div className="w-full max-w-7xl mx-auto grid gap-8"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          {evidenceFiles.map((file, i) => (
            <motion.div
              key={i}
              className="bg-white/5 rounded-2xl flex flex-col h-full p-7 border border-white/10 shadow group transition hover:scale-[1.02] focus-within:scale-[1.02]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.5 }}
            >
              <div className="flex items-center mb-4 min-h-[64px]">
                {file.preview ? (
                  <img
                    src={file.preview}
                    alt={file.title}
                    className="w-16 h-16 object-cover rounded-md border border-white/10 mr-4"
                  />
                ) : (
                  fileIcons[file.type] || fileIcons.doc
                )}
                <div>
                  <span className="font-bold text-white text-lg md:text-xl">{file.title}</span>
                  <div className="text-xs text-gray-400 mt-1">{file.type.toUpperCase()}</div>
                </div>
              </div>
              {file.description && (
                <p className="text-gray-400 text-sm mb-4">{file.description}</p>
              )}
              <div className="mt-auto flex gap-2">
                {/* Only show "View" for PDF and Images */}
                {isPDF(file) ? (
                  <button
                    className="text-sm border border-white rounded-lg px-4 py-1 hover:bg-white hover:text-black transition font-semibold focus:outline-none focus:ring-2 focus:ring-white"
                    onClick={() =>
                      setLightbox({
                        open: true,
                        src: file.fileUrl,
                        title: file.title,
                        type: file.type,
                        description: file.description || "",
                      })
                    }
                  >
                    View
                  </button>
                ) : file.type === "image" && file.preview ? (
                  <button
                    className="text-sm border border-white rounded-lg px-4 py-1 hover:bg-white hover:text-black transition font-semibold"
                    onClick={() =>
                      setLightbox({
                        open: true,
                        src: file.preview,
                        title: file.title,
                        type: file.type,
                        description: file.description || "",
                      })
                    }
                  >
                    View
                  </button>
                ) : (
                  <a
                    href={file.fileUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm border border-white rounded-lg px-4 py-1 hover:bg-white hover:text-black transition font-semibold"
                  >
                    Download
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox for PDF/Image */}
      <AnimatePresence>
        {lightbox.open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox({ open: false, src: "", title: "", type: "", description: "" })}
            style={{ cursor: "zoom-out" }}
          >
            <div
              className="relative flex flex-col items-center"
              onClick={e => e.stopPropagation()}
              style={{
                maxWidth: "98vw",
                maxHeight: "98vh",
              }}
            >
              {lightbox.type === "pdf" ? (
                <iframe
                  src={lightbox.src + "#toolbar=0"}
                  title={lightbox.title}
                  className="rounded-xl border border-white shadow-2xl bg-white"
                  style={{
                    width: "min(92vw, 950px)",
                    height: "min(80vh, 680px)",
                  }}
                />
              ) : (
                <img
                  src={lightbox.src}
                  alt={lightbox.title}
                  className="object-contain rounded-2xl shadow-2xl border border-white bg-black"
                  style={{
                    width: "min(90vw, 900px)",
                    height: "min(80vh, 640px)",
                    objectFit: "contain",
                  }}
                />
              )}
              <span className="mt-4 text-base text-gray-200 text-center max-w-xl">{lightbox.title}</span>
              <button
                className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-2xl rounded-full px-4 py-1.5 hover:bg-opacity-90 transition font-bold"
                onClick={() => setLightbox({ open: false, src: "", title: "", type: "", description: "" })}
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
