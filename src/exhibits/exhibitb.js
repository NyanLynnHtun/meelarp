import React, { useRef, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import Header from "../exhibits/header";
import { AnimatePresence, motion } from "framer-motion";

// Dummy summary data
const regionCounts = [
  { region: "Yangon", count: 152 },
  { region: "Mandalay", count: 75 },
  { region: "Ayeyarwady", count: 31 },
  { region: "Bago", count: 40 },
  { region: "Chin", count: 2 },
  { region: "Kachin", count: 3 },
  { region: "Kayah", count: 2 },
  { region: "Kayin", count: 7 },
  { region: "Magway", count: 23 },
  { region: "Mon", count: 22 },
  { region: "Naypyidaw", count: 14 },
  { region: "Rakhine", count: 8 },
  { region: "Sagaing", count: 20 },
  { region: "Shan", count: 32 },
];
const ageCounts = [
  { age: "18-25", count: 152 },
  { age: "< 18", count: 16 },
  { age: "26-35", count: 121 },
  { age: "36-45", count: 93 },
  { age: "46-60", count: 24 },
  { age: "> 60", count: 20 },
];
const blackoutPlace = [
  { answer: "Yes", count: 397 },
  { answer: "No", count: 29 },
];
const dailyHours = [
  { hours: "< 4hrs", count: 116 },
  { hours: "4-8 hrs", count: 194 },
  { hours: "8-16 hrs", count: 69 },
  { hours: "16-24 hrs", count: 21 },
  { hours: "Never", count: 18 },
  { hours: "Always", count: 8 },
];
const blackoutTime = [
  { slot: "6am-2pm", count: 126 },
  { slot: "12pm-6pm", count: 99 },
  { slot: "6pm-10pm", count: 80 },
  { slot: "10pm-6am", count: 31 },
  { slot: "Unpredictable", count: 247 },
];

const feedbacks = [
  {
    feedback: "Sometimes power comes back only after midnight.",
    region: "Yangon",
    age: "26-40",
    created_at: "2024-04-01T14:08:00",
  },
  {
    feedback: "The blackout always happens during family dinner.",
    region: "Mandalay",
    age: "18-25",
    created_at: "2024-04-03T20:13:00",
  },
  {
    feedback: "No electricity for 3 days straight last month.",
    region: "Kachin",
    age: "41-60",
    created_at: "2024-04-06T11:26:00",
  },
  {
    feedback: "Candles and batteries are now part of my monthly budget.",
    region: "Shan",
    age: "26-40",
    created_at: "2024-04-12T09:22:00",
  },
  // ...more demo feedbacks
];

// Your blackout memories (feedback only)

const blackoutMemories = [
  "It was crazy during the earthquake.",
  "The blackout in our area was due to the earthquake, but the other neighborhood never even had electricity.",
  "Rice not cooked well!",
  "No shower.",
  "When there is no electricity, you can't cook. You have to fetch water to cook, take a shower, and use the toilet.",
  "I have memories of sometimes throwing away food because it was ruined while cooking.",
  "There was a robbery one time during a blackout, I lost sleep because I was chasing the thief in the dark.",
  "Long hours of blackout following the earthquake.",
  "After years of trying to see in the dark, my eyes are getting weak..",
  "Rice cooker is malfunctioning after so many blackouts",
  "I've become used to screaming wheneven power is back on.",
  "No breakfast.",
  "Meals ruined.",
  "Blackout everyday.",
  "Countless number of blackouts.",
  "I slipped during a blackout, my forehead almost cut open.",
  "Always angry over how little electricity we get, 5 mins on, 5 mins off.",
  "Why so frequent blackouts?",
  "No shower for several days in a row.",
  "Always hoping when the power will be back.",
  "Rice was ruined in the process of cooking.",
  "Not even five hours a day, so dissapointed!",
  "Rice was not cooked.",
  "Rice cooker ruined.",
  "Rice cooker stop functioning frequently.",
  "No food.",
  "Cooking rice and curry with coal fire.",
  "I have had trouble many times when the power went out while I was cooking.",
  "Work interrupted.",
  "Watching K drama interrupted frequently.",
  "Waiting for the electricity while having an important task.",
  "More electricity please.",
  "When the power went out and I went to the bathroom with my phone lights. The phone fell out and the glass broke.",
];

// Helper to generate random position, speed, and direction
function randomFloat(a, b) {
  return a + Math.random() * (b - a);
}

function getRandomStyle() {
  const left = randomFloat(8, 80); // vw
  const top = randomFloat(5, 70); // vh
  const scale = randomFloat(0.9, 1.25);
  const duration = randomFloat(7, 18);
  const yShift = randomFloat(-20, 20);

  return {
    initial: { opacity: 0, y: yShift * -2 },
    animate: {
      opacity: 1,
      x: randomFloat(-30, 30),
      y: yShift,
      scale,
      transition: {
        duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: randomFloat(0, 2),
      },
    },
    exit: { opacity: 0 },
    style: {
      position: "absolute",
      left: `${left}vw`,
      top: `${top}vh`,
      zIndex: 2,
      pointerEvents: "none",
    },
  };
}

export function BlackoutMemoriesCloud() {
  // Shuffle and limit if you want (or show all)
  const [shuffled, setShuffled] = useState([]);
  useEffect(() => {
    // Shuffle once on mount
    setShuffled([...blackoutMemories].sort(() => Math.random() - 0.5));
  }, []);

  return (
    <section
      className="relative w-full mx-auto"
      style={{
        height: "56vh", // Or a fixed pixel value if you want
        minHeight: 340,
        maxHeight: 520,
        overflow: "hidden", // Hides any part of cards that tries to escape
        position: "relative",
      }}
    >
      <h2 className="text-2xl md:text-3xl font-black mb-8 text-center tracking-wide text-white/80 z-10 relative">
        Blackout Memories
      </h2>
      <div className="w-full h-full absolute inset-0">
        <AnimatePresence>
          {shuffled.map((text, i) => {
            const { initial, animate, exit, style } = getRandomStyle();
            return (
              <motion.div
                key={i}
                initial={initial}
                animate={animate}
                exit={exit}
                style={{
                  ...style,
                  minWidth: 180,
                  maxWidth: 320,
                  padding: "18px 32px",
                  background: "rgba(255,255,255,0.09)",
                  borderRadius: "1.2em",
                  border: "1px solid rgba(255,255,255,0.10)",
                  color: "#fff",
                  fontSize: "1.05em",
                  boxShadow: "0 4px 36px 0 rgba(0,0,0,0.11)",
                  fontWeight: 500,
                  fontFamily: "inherit",
                  lineHeight: 1.5,
                  filter: "blur(0.3px)",
                  userSelect: "none",
                  transition: "background 0.3s",
                  letterSpacing: "0.02em",
                  opacity: 0.93,
                  pointerEvents: "none",
                }}
              >
                {text}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ---------- 2. Reusable Chart Components ---------- //

function PieDemo({ data, dataKey, nameKey, colorsArr, label, legend }) {
  // Custom label renderer for white labels on black backgrounds
  const renderCustomLabel = ({ name, percent, x, y, index }) => (
    <text
      x={x}
      y={y}
      fill="#aaa"
      fontSize={13}
      fontWeight="bold"
      textAnchor="middle"
      dominantBaseline="central"
      pointerEvents="none"
    >
      {`${name} (${Math.round(percent * 100)}%)`}
    </text>
  );

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={nameKey}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={70}
          fill="#fff"
          paddingAngle={2}
          label={renderCustomLabel}
        >
          {data.map((_, i) => (
            <Cell key={`cell-${i}`} fill={colorsArr[i % colorsArr.length]} />
          ))}
        </Pie>
        {legend && <Legend />}
        <Tooltip
          contentStyle={{
            background: "#fff",
            color: "#111",
            border: "none",
            fontWeight: 600,
          }}
          labelStyle={{ color: "#222" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

function BarDemo({ data, xKey, barKey, label, color }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <XAxis dataKey={xKey} stroke="#fff" fontSize={12} />
        <YAxis stroke="#fff" fontSize={12} allowDecimals={false} />
        <Tooltip
          contentStyle={{ background: "#111", color: "#fff", border: "none" }}
        />
        <Bar dataKey={barKey} fill={color || "#fff"} radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ---------- 3. Main Component ---------- //
export default function ExhibitB() {
  const [showAllFeedback, setShowAllFeedback] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Universal Header */}
      <Header
        title="Exhibit B: Feedback Wall"
        prevPath="/exhibitA"
        prevLabel="← Previous"
        nextPath="/exhibitC"
        nextLabel="Next →"
      />
      {/* Main Content */}
      <div className="mx-auto max-w-7xl w-full pt-32 px-2 py-10 flex flex-col gap-10">
        {/* --- Infographics --- */}
        <h2 className="title-font text-white/70">We conducted a Facebook survey, gathering responses from 426 people across Myanmar. Below are the summarized results.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 shadow">
            <h2 className="mb-3 text-base font-bold tracking-wide uppercase text-white/80">
              Respondents by Region
            </h2>
            <BarDemo
              data={regionCounts}
              xKey="region"
              barKey="count"
              color="#fff"
            />
          </div>
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 shadow">
            <h2 className="mb-3 text-base font-bold tracking-wide uppercase text-white/80">
              Age Distribution
            </h2>
            <BarDemo data={ageCounts} xKey="age" barKey="count" color="#aaa" />
          </div>
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 shadow">
            <h2 className="mb-3 text-base font-bold tracking-wide uppercase text-white/80">
              Blackout at Your Place?
            </h2>
            <PieDemo
              data={blackoutPlace}
              dataKey="count"
              nameKey="answer"
              colorsArr={["#eee", "#222"]}
            />
          </div>
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 shadow">
            <h2 className="mb-3 text-base font-bold tracking-wide uppercase text-white/80">
              Electricity Per Day
            </h2>
            <BarDemo
              data={dailyHours}
              xKey="hours"
              barKey="count"
              color="#f3f3f3"
            />
          </div>
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 shadow">
            <h2 className="mb-3 text-base font-bold tracking-wide uppercase text-white/80">
              Most Blackout Time
            </h2>
            <PieDemo
              data={blackoutTime}
              dataKey="count"
              nameKey="slot"
              colorsArr={["#fff", "#aaa", "#222", "#333"]}
            />
          </div>
        </div>
        <section className="mt-12">
          <div className="bg-white/5 rounded-2xl p-6 shadow">
            <h2 className="mb-3 text-base font-bold tracking-wide uppercase text-white/70 title-font mb-6">
              Scan the QR code to read the full discussion and comments.
            </h2>
            <img
              src="https://mnjbeotqfpzajrksfgcf.supabase.co/storage/v1/object/public/meelarp-media/res/qr-B.png"
              alt= "qr"
              className="w-52 h-52 object-contain mb-4"
            />
          </div>
        </section>
        {/* --- Blackout Memories --- */}
        <section className="mt-12">
          <BlackoutMemoriesCloud />
        </section>
      </div>
    </div>
  );
}
