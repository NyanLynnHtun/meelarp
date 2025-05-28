import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../supabaseClient";

const HasCaseSlide = ({ goToCreditSlide }) => {
  const [voteStats, setVoteStats] = useState({ yes: 0, no: 0, total: 0 });
  const [hasVoted, setHasVoted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchStats = async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      const { count: yesCount, error: yesError } = await supabase
        .from("case_votes")
        .select("*", { count: "exact", head: true })
        .eq("vote", "yes");
      const { count: noCount, error: noError } = await supabase
        .from("case_votes")
        .select("*", { count: "exact", head: true })
        .eq("vote", "no");
      if (yesError || noError) {
        setErrorMsg("Failed to load vote stats.");
        setLoading(false);
        return;
      }
      const yes = yesCount ?? 0;
      const no = noCount ?? 0;
      setVoteStats({
        yes,
        no,
        total: yes + no,
      });
      setLoading(false);
    } catch (err) {
      setErrorMsg("Error connecting to Supabase.");
      setLoading(false);
      console.error("Supabase error:", err);
    }
  };

  useEffect(() => {
    fetchStats(); // initial

    const channel = supabase
      .channel("public:case_votes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "case_votes" },
        fetchStats
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const submitVote = async (vote) => {
    if (hasVoted) return;
    setSubmitting(true);

    // Optimistic UI update
    setVoteStats((prev) => {
      const yes = prev.yes + (vote === "yes" ? 1 : 0);
      const no = prev.no + (vote === "no" ? 1 : 0);
      return { yes, no, total: prev.total + 1 };
    });
    setHasVoted(true);

    // Backend
    const { error } = await supabase.from("case_votes").insert([{ vote }]);
    setSubmitting(false);

    // Optionally re-fetch stats (uncomment if needed)
    // fetchStats();

    // Wait longer before navigating
    setTimeout(goToCreditSlide, 2000);

    if (error) {
      setErrorMsg("Error submitting your vote. Try again.");
    }
  };

  const yesPercent =
    voteStats.total > 0
      ? Math.round((voteStats.yes / voteStats.total) * 100)
      : 0;
  const noPercent = 100 - yesPercent;

  return (
    <div className="hascase-slide flex flex-col items-center justify-center min-h-[60vh] p-8 text-center bg-black">
      <motion.h2
        className="text-2xl font-bold text-white mb-8 tracking-wide title-font"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        style={{ letterSpacing: ".04em" }}
      >
        Do we have a case?
      </motion.h2>

      {errorMsg && <div className="text-red-400 mb-4">{errorMsg}</div>}

      {loading ? (
        <div className="text-gray-500 text-lg my-12">Loading results...</div>
      ) : !hasVoted ? (
        <div className="flex flex-row gap-10 mb-12">
          <motion.button
            className="title-font border border-white text-white font-semibold py-5 px-14 rounded-full text-2xl shadow-none transition-all duration-150 hover:bg-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => submitVote("yes")}
            disabled={submitting}
            style={{ background: "transparent" }}
          >
            Yes
          </motion.button>
          <motion.button
            className="title-font border border-white text-white font-semibold py-5 px-14 rounded-full text-2xl shadow-none transition-all duration-150 hover:bg-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => submitVote("no")}
            disabled={submitting}
            style={{ background: "transparent" }}
          >
            No
          </motion.button>
        </div>
      ) : (
        <motion.div
          className="mb-10 text-xl text-white font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Thank you for voting!
        </motion.div>
      )}

      {/* Minimalist Percentage Bar */}
      {!loading && (
        <div className="w-full max-w-md mx-auto mt-2">
          <div className="flex justify-between mb-1 text-xs font-mono tracking-wider">
            <span className="text-white opacity-60">YES</span>
            <span className="text-white opacity-60">NO</span>
          </div>
          <div className="w-full bg-neutral-800 rounded-full h-6 flex overflow-hidden relative">
            <div
              className="bg-white h-6 transition-all duration-500"
              style={{
                width: `${yesPercent}%`,
                borderTopLeftRadius: "9999px",
                borderBottomLeftRadius: "9999px",
                borderTopRightRadius: yesPercent === 100 ? "9999px" : 0,
                borderBottomRightRadius: yesPercent === 100 ? "9999px" : 0,
                opacity: yesPercent > 0 ? 1 : 0,
              }}
            />
            <div
              className="bg-gray-500 h-6 transition-all duration-500"
              style={{
                width: `${noPercent}%`,
                borderTopRightRadius: "9999px",
                borderBottomRightRadius: "9999px",
                borderTopLeftRadius: noPercent === 100 ? "9999px" : 0,
                borderBottomLeftRadius: noPercent === 100 ? "9999px" : 0,
                opacity: noPercent > 0 ? 0.2 : 0,
              }}
            />
            {/* Percentage overlays */}
            <div
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xs font-bold text-black"
              style={{ opacity: yesPercent > 0 ? 0.75 : 0 }}
            >
              {yesPercent > 0 ? `${yesPercent}%` : ""}
            </div>
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs font-bold text-white"
              style={{ opacity: noPercent > 0 ? 0.65 : 0 }}
            >
              {noPercent > 0 ? `${noPercent}%` : ""}
            </div>
          </div>
          <div className="mt-4 text-gray-400 text-sm tracking-wide font-mono">
            <b className="text-white">{voteStats.total}</b> response
            {voteStats.total !== 1 && "s"} submitted
          </div>
        </div>
      )}
    </div>
  );
};

export default HasCaseSlide;
