import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "./Slideshow.css";

const slides = [
  { type: "text", title: "Welcome to the Journey", description: "" },
  {
    type: "imageText",
    image: "https://fakeimg.pl/400x300",
    title: "Step 1: Understand the Path",
    description: "Read carefully and prepare mentally.",
  },
  {
    type: "exhibits",
    exhibits: [
      {
        title: "Exhibit A: Testimonials",
        url: "/exhibitA",
        description: "Portraits + Audios",
        image: "https://fakeimg.pl/200x200?text=Exhibit+A",
      },
      {
        title: "Exhibit B: Social Media Survey Results",
        url: "/exhibitB",
        description: "",
        image: "https://fakeimg.pl/200x200?text=Exhibit+B",
      },
      {
        title: "Exhibit C: Video Compilations",
        url: "/exhibitC",
        description: "",
        image: "https://fakeimg.pl/200x200?text=Exhibit+C",
      },
      {
        title: "Exhibit D: Digital Evidence",
        url: "/exhibitD",
        description: "",
        image: "https://fakeimg.pl/200x200?text=Exhibit+D",
      },
      {
        title: "Exhibit E: Hard Data",
        url: "/exhibitE",
        description: "Documents",
        image: "https://fakeimg.pl/200x200?text=Exhibit+E",
      },
    ],
  },
  {
    type: "audio",
    userImage: "https://fakeimg.pl/150",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  { type: "infographic", infographic: "https://fakeimg.pl/600x400" },
];

function Slideshow() {
  const { slideNumber } = useParams(); // Access the slide number from the URL
  const [currentSlide, setCurrentSlide] = useState(Number(slideNumber) || 0);

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
            <h1 className="slide-title">{slide.title}</h1>
            {slide.description && <p>{slide.description}</p>}
          </div>
        );

      case "imageText":
        return (
          <div className="image-text-slide">
            <img src={slide.image} alt={slide.title} className="slide-image" />
            <h1 className="slide-title">{slide.title}</h1>
            <p>{slide.description}</p>
          </div>
        );

      case "exhibits":
        return (
          <div className="exhibits-slide">
            <h1 className="slide-title">Exhibits</h1>
            <ul className="exhibits-list">
              {slide.exhibits.map((exhibit, index) => (
                <li key={index} className="exhibit-item">
                  <Link to={exhibit.url} className="exhibit-link">
                    <div className="exhibit-content">
                      <div className="exhibit-image-container">
                        <img
                          src={exhibit.image}
                          alt={exhibit.title}
                          className="exhibit-thumbnail"
                        />
                      </div>
                      <div className="exhibit-text">
                        <h2 className="exhibit-title">{exhibit.title}</h2>
                        {exhibit.description && (
                          <p className="exhibit-description">
                            ({exhibit.description})
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );

      case "audio":
        return (
          <div className="audio-slide">
            <img src={slide.userImage} alt="User" className="audio-user-image" />
            <audio controls src={slide.audioUrl} className="audio-player" />
          </div>
        );

      case "infographic":
        return (
          <div className="infographic-slide">
            <img src={slide.infographic} alt="Infographic" className="infographic-image" />
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
        {/* <motion.button
          onClick={previousSlide}
          disabled={currentSlide === 0}
          className="nav-button prev-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Previous slide"
        >
          ← Previous
        </motion.button> */}

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

        {currentSlide < slides.length - 1 && (
          <motion.button
            onClick={nextSlide}
            className="bg-transparent fixed bottom-8 right-8 bg-gray-700 hover:bg-gray-900 text-white py-3 px-6 rounded-full shadow-lg transition z-20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            aria-label="Next slide"
          >
            Next →
          </motion.button>
        )}
      </div>
    </div>
  );
}

export default Slideshow;
