import React, { useState, useEffect, useRef } from "react";
import { supabase } from "./supabaseClient";

// --- Example feedbacks. In real app, fetch from server or randomize.
const FEEDBACKS = [
  { icon: "💡", message: "Thanks! The power is back in Bago." },
  { icon: "⚡", message: "မင်္ဂလာပါ၊ မီးမလာသေးဘူး Mandalay" },
  { icon: "🔌", message: "Yangon: မီးပြန်လာပြီ" },
  { icon: "🌃", message: "Late night, power restored in Kayin." },
  { icon: "🌩️", message: "Sagaing: Heavy rain, still no power." },
  { icon: "💭", message: "ဖိတ်ကြားမှုကို ကျေးဇူးတင်ပါတယ်!" },
];

const REACTIONS = [
  { icon: "😍", label: "Love" },
  { icon: "🔥", label: "Fire" },
  { icon: "💡", label: "Idea" },
  { icon: "👏", label: "Clap" },
  { icon: "😢", label: "Sad" },
  { icon: "😡", label: "Angry" },
];

const regions = [
  "Sagaing",
  "Bago",
  "Magway",
  "Mandalay",
  "Tanintharyi",
  "Yangon",
  "Ayeyarwady",
  "Kachin",
  "Kayah",
  "Kayin",
  "Chin",
  "Mon",
  "Rakhine",
  "Shan",
];

const STORAGE_KEY = "lastReport";
const DEBOUNCE_MS = 2000;

function FeedbackBubbles({ bubbles }) {
  return (
    <div className="feedback-bubbles">
      {bubbles.map(({ icon, message, id }) => (
        <div key={id} className="feedback-bubble">
          <span className="feedback-bubble-icon">{icon}</span>
          <span>{message}</span>
        </div>
      ))}
    </div>
  );
}

export default function ReportPage() {
  const [region, setRegion] = useState("");
  const [isOn, setIsOn] = useState(false);
  const [lastReport, setLastReport] = useState(null);
  const [bubbles, setBubbles] = useState([]);
  const debounceRef = useRef(null);
  const bubbleId = useRef(0);
  const [floaters, setFloaters] = useState([]);
  const floaterId = useRef(0);

  // Function to trigger floating reaction
  function handleReact(idx) {
    // Random horizontal offset and rotation for natural feeling
    const r = Math.floor(Math.random() * 40 - 20);
    const x = Math.floor(Math.random() * 80 - 40);
    const id = ++floaterId.current;
    setFloaters((fs) => [
      ...fs,
      {
        icon: REACTIONS[idx].icon,
        style: {
          left: `calc(50% + ${x}px)`,
          "--r": `${r}deg`,
        },
        id,
      },
    ]);
    setTimeout(() => setFloaters((fs) => fs.filter((f) => f.id !== id)), 1100);
  }

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setLastReport(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (!region) return;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      const payload = { region, status: isOn ? "On" : "Off" };
      const { error } = await supabase.from("submissions").insert([payload]);
      if (error) return console.error("Submit failed:", error);
      const enriched = { ...payload, timestamp: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(enriched));
      setLastReport(enriched);
    }, DEBOUNCE_MS);
    return () => clearTimeout(debounceRef.current);
  }, [region, isOn]);

  // Bubble popper: shows random feedbacks every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      const fb = FEEDBACKS[Math.floor(Math.random() * FEEDBACKS.length)];
      const id = ++bubbleId.current;
      setBubbles((bubs) => [...bubs, { ...fb, id }]);
      setTimeout(() => {
        setBubbles((bubs) => bubs.filter((b) => b.id !== id));
      }, 4400);
    }, 3300); // Every 3.3s, bubble stays 4.4s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bulb-page-bg min-h-screen flex flex-col relative overflow-hidden">
      {/* Burmese Title */}
      <header className="mt-6 flex items-center justify-between absolute top-0 left-0 right-0 z-10 p-4 bg-transparent">
        <h1
          className="text-2xl font-extrabold text-white text-center w-full title-font"
          style={{ letterSpacing: 1 }}
        >
          Mee Lar P
        </h1>
      </header>

      {/* Bulb scene */}
      <div className="flex flex-col w-full mt-24 mb-10 z-10">
        <div className="bulb-scene" style={{ marginTop: "1px" }}>
          <div className="bulb-wire"></div>
          <div className={`bulb${isOn ? "" : " off"}`}>
            <div className="bulb-base"></div>
            <div className="bulb-glass"></div>
          </div>
        </div>
        {/* Controls below bulb */}
        <div className="controls-area">
          {/* Region Select */}
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="bg-black bg-opacity-50 border border-white text-white py-2 px-6 rounded-lg text-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="" disabled>
              ဒေသရွေးပါ...
            </option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          {/* Toggle Button */}
          <button
            className={`toggle-switch ${region ? "" : "disabled"}`}
            onClick={() => setIsOn(!isOn)}
            disabled={!region}
            aria-label="Toggle Electricity"
          >
            <span className={`slider ${isOn ? "on" : ""}`} />
          </button>
        </div>
      </div>

      {/* Reaction Bar */}
      {/* <div
        className="relative flex flex-col items-center"
        style={{ minHeight: 70 }}
      >
        <div className="reaction-bar">
          {REACTIONS.map((r, i) => (
            <button
              key={r.icon}
              className="reaction-btn"
              aria-label={r.label}
              onClick={() => handleReact(i)}
            >
              {r.icon}
            </button>
          ))}
        </div>
       
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            pointerEvents: "none",
          }}
        >
          {floaters.map((f) => (
            <span
              key={f.id}
              className={`reaction-float${f.icon === "😡" ? " angry" : ""}`}
              style={f.style}
            >
              {f.icon}
            </span>
          ))}
        </div>
      </div> */}

      {/* Status Panel */}
      <div className="last-report absolute bottom-12 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 px-8 py-5 rounded-2xl text-white text-center shadow-2xl w-[90vw] max-w-md z-30 border border-white/20">
        <div className="text-lg font-semibold mb-2 tracking-wide">
          <span>Last Report:</span>
        </div>
        {lastReport ? (
          <>
            <div>
              Region: <span className="font-bold">{lastReport.region}</span>
            </div>
            <div>
              Electricity Status:{" "}
              <span className="font-bold">{lastReport.status}</span>
            </div>
            <div className="text-sm text-gray-300 mt-1">
              At: {new Date(lastReport.timestamp).toLocaleString()}
            </div>
          </>
        ) : (
          <div className="text-gray-400">No report yet</div>
        )}
      </div>

      {/* Feedback Bubbles (live messages, floating) */}
      <FeedbackBubbles bubbles={bubbles} />
    </div>
  );
}
