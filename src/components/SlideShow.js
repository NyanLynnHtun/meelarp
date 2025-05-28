import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "./Slideshow.css";
import HasCaseSlide from "./HasCaseSlide";

const slides = [
  {
    type: "text",
    title: "Do we have a case?",
    description:
      "We set out to bring the Myanmar regime to justice; not for war crimes, but for decades of electricity blackouts. Through testimonies, satellite visuals, and printed records, this work presents evidence of a quiet crime against dignity. You are invited to witness, reflect, and decide as the jury. ",
  },
  {
    type: "openingVideo",
    video:
      "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Opening%20Statement.mp4",
    title: "Lawyer Video - Opening Statement",
    description: "",
  },
  {
    type: "exhibits",
    exhibits: [
      {
        title: "Exhibit A: Testimonials",
        url: "/exhibitA",
        description: "Portraits + Audios",
        image:
          "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/icons/Exhibit%20A_%20Testimonies.png",
      },
      {
        title: "Exhibit B: Feedback Wall",
        url: "/exhibitB",
        description: "",
        image:
          "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/icons/Exhibit%20B_%20Feedback%20Wall.png",
      },
      {
        title: "Exhibit C: Public Reaction",
        url: "/exhibitC",
        description: "",
        image:
          "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/icons/Exhibit%20C_Public%20Reaction.png",
      },
      {
        title: "Exhibit D: Satellite Imagery",
        url: "/exhibitD",
        description: "",
        image:
          "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/icons/Exhibit%20D_Satellite%20Imagery.png",
      },
      {
        title: "Exhibit E: Evidence Archive",
        url: "/exhibitE",
        description: "Documents",
        image:
          "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/icons/Exhibit%20E_Evidence%20Archive.png",
      },
    ],
  },
  {
    type: "closingVideo",
    video:
      "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Closing%20Statement.mp4",
    title: "Lawyer Video - Closing Statement",
    description: "",
  },
  {
    type: "haveCase",
    video:
      "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Closing%20Statement.mp4",
    title: "Lawyer Video - Closing Statement",
    description: "",
  },
  {
    type: "credit",
    video:
      "https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/Closing%20Statement.mp4",
    title: "Lawyer Video - Closing Statement",
    description: "",
  },
];

function Slideshow() {
  const { slideNumber } = useParams(); // Access the slide number from the URL
  const [currentSlide, setCurrentSlide] = useState(Number(slideNumber) || 0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const previousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") previousSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);

  useEffect(() => {
    if (slideNumber) {
      setCurrentSlide(Number(slideNumber) - 1); // Adjust slide index to 0-based
    }
  }, [slideNumber]);

  const slide = slides[currentSlide];

  const renderSlide = () => {
    switch (slide.type) {
      case "text":
        return (
          <div className="text-slide">
            <h1 className="text-white text-base text-lg title-font">
              {slide.title}
            </h1>
            {slide.description && (
              <p className="text-gray-400 text-sm mt-1">{slide.description}</p>
            )}
            {currentSlide < slides.length - 1 && (
              <motion.button
                onClick={nextSlide}
                className="bg-transparent mt-5 bg-gray-700 hover:bg-gray-900 text-white py-3 px-6 rounded-full shadow-lg transition z-20 title-font"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                aria-label="Next slide"
              >
                {currentSlide === 0 ? "Start →" : "Next →"}
              </motion.button>
            )}
          </div>
        );

      case "openingVideo":
        return (
          <div className="video-text-slide">
            <div className="video-wrapper">
              <video
                autoPlay
                ref={videoRef}
                src={slide.video}
                className="slide-video"
                onClick={togglePlay}
              />
              {!isPlaying && (
                <button className="play-button" onClick={togglePlay}>
                  ▶
                </button>
              )}
            </div>
            {/* <h1 className="text-lg">{slide.title}</h1>
            <p>{slide.description}</p> */}
          </div>
        );

      case "exhibits":
        return (
          <div className="exhibits-slide flex justify-center px-4 py-10">
            <div className="max-w-6xl w-full">
              {/* <h1 className="text-2xl font-bold text-white text-center mb-12 title-font">
                Exhibits
              </h1> */}

              <div className="flex flex-wrap justify-center gap-x-16 gap-y-16">
                {slide.exhibits.map((exhibit, index) => (
                  <Link
                    to={exhibit.url}
                    key={index}
                    className="flex flex-col items-center text-center w-48 hover:scale-105 transition-transform"
                  >
                    <img
                      src={exhibit.image}
                      alt={exhibit.title}
                      className="w-52 h-52 object-contain mb-4"
                    />
                    <h2 className="text-white text-base font-medium title-font">
                      {exhibit.title}
                    </h2>
                    {/* {exhibit.description && (
                      <p className="text-gray-400 text-sm mt-1">
                        {exhibit.description}
                      </p>
                    )} */}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        );

      case "audio":
        return (
          <div className="audio-slide">
            <img
              src={slide.userImage}
              alt="User"
              className="audio-user-image"
            />
            <audio controls src={slide.audioUrl} className="audio-player" />
          </div>
        );

      case "infographic":
        return (
          <div className="infographic-slide">
            <img
              src={slide.infographic}
              alt="Infographic"
              className="infographic-image"
            />
          </div>
        );

      case "closingVideo":
        return (
          <div className="video-text-slide">
            <div className="video-wrapper">
              <video
                autoPlay
                ref={videoRef}
                src={slide.video}
                className="slide-video"
                onClick={togglePlay}
              />
              {!isPlaying && (
                <button className="play-button" onClick={togglePlay}>
                  ▶
                </button>
              )}
            </div>
            {/* <h1 className="text-lg">{slide.title}</h1>
            <p>{slide.description}</p> */}
          </div>
        );

      case "haveCase":
        return (
          <HasCaseSlide
            goToCreditSlide={() => setCurrentSlide(slides.length - 1)}
          />
        );

      case "credit":
        return (
          <div className="credit-slide flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
            <motion.h1
              className="text-2xl sm:text-3xl font-bold text-white mb-4 title-font"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
            >
              Credits & Appreciation
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg text-gray-200 mb-6 max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              This work was originally created as a Master Project in Digital
              Media at HfK Bremen by Zwe Oak Soe, with contributions from
              individuals residing in refugee camps along the Thai-Myanmar
              border.
              <br />
              <br />
              <span className="font-semibold text-white">
                Special thanks to:
              </span>
            </motion.p>

            <motion.ul
              className="text-white text-base sm:text-lg mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.7 }}
            >
              <li className="mb-2">
                <span className="font-bold">L Lone</span>
              </li>
              <li className="mb-2">
                <span className="font-bold">Khine Zaw</span>
              </li>
              <li className="mb-2">
                <span className="font-bold">Thar Zaw</span>
              </li>
              <li className="mb-2">
                <span className="font-bold">Wi</span>
              </li>
              <li className="mb-2">
                <span className="font-bold">Dustin</span>
              </li>
              {/* Add more roles as needed */}
            </motion.ul>
            <motion.p
              className="text-base text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.7 }}
            >
              <span className="text-gray-400 text-sm mb-1">
                More Information at:
              </span>
              <a
                href="mailto:zoaksoe@hfk-bremen.de"
                className="text-gray-300 text-md p-1 font-semibold underline hover:text-gray-100 transition"
              >
                zoaksoe@hfk-bremen.de
              </a>
              <br />
              <span className="italic">Website design by Dustin 🚀</span>
            </motion.p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="slideshow-container">
      <div className="slide-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="slide-inner"
          >
            {renderSlide()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="navigation-controls">
        {/* Progress Indicators */}
        <div className="progress-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {currentSlide > 0 &&
          currentSlide < slides.length - 2 && ( // hide button at first slide..
            <motion.button
              onClick={nextSlide}
              className="bg-transparent fixed bottom-3 right-8 bg-gray-700 hover:bg-gray-900 text-white py-3 px-6 rounded-full shadow-lg transition z-20 title-font"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              aria-label="Next slide"
            >
              Next →
            </motion.button>
          )}

        {/* Restart button: only show at last slide */}
        {currentSlide === slides.length - 1 && (
          <motion.button
            onClick={() => setCurrentSlide(0)}
            className="bg-transparent fixed bottom-3 right-8 bg-gray-700 hover:bg-gray-900 text-white py-3 px-6 rounded-full shadow-lg transition z-20 title-font"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            aria-label="Restart slideshow"
          >
            Restart ↻
          </motion.button>
        )}
      </div>
    </div>
  );
}

export default Slideshow;
