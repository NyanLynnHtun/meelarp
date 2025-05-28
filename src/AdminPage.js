// src/AdminPage.js
import React, { useState, useEffect } from "react";
import { supabase, auth } from "./supabaseClient";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) return null;

  // payload[0].payload is the data point { timestamp, region }
  const { timestamp, region, status } = payload[0].payload;

  return (
    <div className="bg-gray-700 text-gray-100 p-2 rounded shadow">
      <p className="font-semibold">{new Date(timestamp).toLocaleString()}</p>
      <p>Region: {region}</p>
      <p>Status: {status}</p>
    </div>
  );
}

export default function AdminPage() {
  const [reports, setReports] = useState([]);

  // State for date filters (YYYY‑MM‑DD)
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [page, setPage] = useState(0);
  const pageSize = 10;
  // Aggregate by region and status for selected reports
  const regionCounts = {};
  for (const r of reports) {
    if (!regionCounts[r.region])
      regionCounts[r.region] = { region: r.region, On: 0, Off: 0 };
    if (r.status === "On") regionCounts[r.region].On += 1;
    if (r.status === "Off") regionCounts[r.region].Off += 1;
  }
  const barData = Object.values(regionCounts);
  // Fetch reports, applying date filters if set
  async function loadReports() {
    let query = supabase.from("submissions").select("*");

    if (startDate) {
      query = query.gte("reported_at", `${startDate}T00:00:00Z`);
    }
    if (endDate) {
      query = query.lte("reported_at", `${endDate}T23:59:59Z`);
    }

    const from = page * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await query
      .order("reported_at", { ascending: false })
      .range(from, to);

    if (error) console.error("Error loading submissions:", error);
    else setReports(data);
  }

  useEffect(() => {
    loadReports();

    const channel = supabase
      .channel("realtime-submissions")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "submissions" },
        () => {
          // Always reload the table/chart/leaderboard when any change happens
          loadReports();
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [startDate, endDate, page]);

  useEffect(() => {
    loadReports();

    const channel = supabase
      .channel("realtime-submissions")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "submissions" },
        ({ new: row }) => {
          const ts = new Date(row.reported_at);
          if (
            (!startDate || ts >= new Date(startDate)) &&
            (!endDate || ts <= new Date(endDate + "T23:59:59"))
          ) {
            if (page === 0) {
              setReports((prev) => [row, ...prev.slice(0, pageSize - 1)]);
            }
          }
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [startDate, endDate, page]);

  // Generate data series
  const onData = reports
    .filter((r) => r.status === "On")
    .map((r) => ({
      timestamp: new Date(r.reported_at).getTime(),
      region: r.region,
      status: "On",
    }));
  const offData = reports
    .filter((r) => r.status === "Off")
    .map((r) => ({
      timestamp: new Date(r.reported_at).getTime(),
      region: r.region,
      status: "Off",
    }));

  // ——————————————
  // 2️⃣ CSV export utility
  const handleExportCSV = () => {
    if (reports.length === 0) return;

    const headers = ["City", "Status", "Reported At"];
    const rows = reports.map((r) => [
      r.region,
      r.status,
      new Date(r.reported_at).toLocaleString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((r) => r.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "submissions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 4️⃣ Sign-out handler
  const handleSignOut = async () => {
    await auth.signOut();
    window.location.href = "/login";
  };

  // Calculate leaderboard for top N regions by "Off" reports
  const topN = 3;
  const leaderboard = Object.values(regionCounts)
    .sort((a, b) => b.Off - a.Off)
    .slice(0, topN)
    .map((r, idx) => ({
      ...r,
      rank: idx + 1,
    }));

  return (
    <div className="min-h-screen bg-black text-white p-0 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-black/80 flex flex-col md:flex-row md:items-center md:justify-between px-6 pt-8 pb-6 mb-3 border-b border-white/10 shadow-lg">
        <h1 className="text-2xl md:text-3xl font-black tracking-wide mb-3 md:mb-0">
          <span className="inline-block pr-2 align-middle">📊</span>
          <span className="title-font tracking-tight">Admin Dashboard</span>
        </h1>
        <div className="flex gap-3">
          <button
            onClick={handleExportCSV}
            className="px-6 py-2 rounded-full bg-white text-black font-semibold shadow hover:bg-gray-100 transition"
          >
            Export CSV
          </button>
          <button
            onClick={handleSignOut}
            className="px-6 py-2 rounded-full bg-black border border-white font-semibold shadow hover:bg-white hover:text-black transition"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Filters */}
      <section className="flex flex-wrap items-end gap-5 px-6 py-4 bg-black">
        <label className="flex flex-col text-xs uppercase tracking-wider font-bold text-gray-400">
          From
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 p-2 rounded bg-white/5 text-white border border-white/10 focus:outline-none focus:border-white/30 transition"
          />
        </label>
        <label className="flex flex-col text-xs uppercase tracking-wider font-bold text-gray-400">
          To
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 p-2 rounded bg-white/5 text-white border border-white/10 focus:outline-none focus:border-white/30 transition"
          />
        </label>
        <button
          onClick={() => loadReports()}
          className="px-4 py-2 rounded-full bg-white text-black font-semibold shadow hover:bg-gray-100 transition"
        >
          Apply Filter
        </button>
        <button
          onClick={() => {
            setStartDate("");
            setEndDate("");
            loadReports();
          }}
          className="px-4 py-2 rounded-full bg-black border border-white text-white font-semibold shadow hover:bg-white hover:text-black transition"
        >
          Reset
        </button>
      </section>

      {/* Pagination */}
      <div className="flex items-center space-x-4 mb-2 px-6 pt-3">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
          className="px-3 py-1 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 disabled:opacity-40"
        >
          ← Prev
        </button>
        <span className="tracking-wide text-xs uppercase text-gray-400">
          Page <b className="text-white">{page + 1}</b>
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={reports.length < pageSize}
          className="px-3 py-1 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 disabled:opacity-40"
        >
          Next →
        </button>
      </div>

      {/* Chart */}
      <section className="mb-8 px-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Reports by Region Chart */}
          <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl shadow-xl p-6 min-w-[320px]">
            <h2 className="text-xl font-bold mb-4 tracking-tight">
              ⚡️ Reports by Region
            </h2>
            <ResponsiveContainer width="100%" height={330}>
              <BarChart data={barData} margin={{ left: 0, right: 12 }}>
                <CartesianGrid strokeDasharray="4 3" stroke="#444" />
                <XAxis
                  dataKey="region"
                  stroke="#aaa"
                  tick={{ fontSize: 13, fill: "#fff", fontWeight: 700 }}
                  interval={0}
                  angle={-18}
                  dy={14}
                  height={60}
                />
                <YAxis
                  allowDecimals={false}
                  stroke="#bbb"
                  tick={{ fontSize: 13, fill: "#fff" }}
                  label={{
                    value: "Reports",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#fff",
                    fontSize: 14,
                    fontWeight: "bold",
                  }}
                />
                <Tooltip
                  contentStyle={{
                    background: "#111",
                    border: "none",
                    color: "#fff",
                    borderRadius: 10,
                    fontWeight: 500,
                    fontSize: 13,
                  }}
                  labelStyle={{ color: "#34D399", fontWeight: 700 }}
                  cursor={{ fill: "#222", opacity: 0.13 }}
                />
                <Legend wrapperStyle={{ color: "#fff", fontWeight: 600 }} />
                <Bar
                  dataKey="On"
                  stackId="a"
                  fill="#22d3ee"
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  dataKey="Off"
                  stackId="a"
                  fill="#f87171"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Leaderboard */}
          <div className="w-full lg:w-72 bg-white/5 border border-white/10 rounded-2xl shadow-xl p-6 flex flex-col">
            <h3 className="text-lg font-bold mb-4 tracking-tight text-red-300">
              Top Outage Regions
            </h3>
            {leaderboard.length === 0 ? (
              <div className="text-gray-400 text-sm">No data.</div>
            ) : (
              <ol className="space-y-3">
                {leaderboard.map((r) => (
                  <li
                    key={r.region}
                    className="flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-black text-red-400">
                        {r.rank}
                      </span>
                      <span className="font-bold text-white">{r.region}</span>
                    </div>
                    <span className="text-lg font-bold text-red-300">
                      {r.Off}
                      <span className="text-xs text-gray-400 ml-1">off</span>
                    </span>
                  </li>
                ))}
              </ol>
            )}
            <div className="mt-6 text-xs text-gray-500 italic">
              Based on “Off” reports in the filtered date range.
            </div>
          </div>
        </div>
      </section>

      {/* Data Table */}
      <section className="px-6">
        <div className="overflow-x-auto bg-white/5 border border-white/10 rounded-2xl shadow-xl">
          <table className="min-w-full divide-y divide-white/10">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-sm font-extrabold uppercase tracking-widest text-gray-200 bg-black/20">
                  City
                </th>
                <th className="px-4 py-3 text-left text-sm font-extrabold uppercase tracking-widest text-gray-200 bg-black/20">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-extrabold uppercase tracking-widest text-gray-200 bg-black/20">
                  Reported At
                </th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r, idx) => (
                <tr
                  key={r.id}
                  className={`transition-all duration-150 ${
                    idx % 2 === 0 ? "bg-white/3" : ""
                  } hover:bg-white/10`}
                >
                  <td className="px-4 py-3 text-base font-medium">
                    {r.region}
                  </td>
                  <td className="px-4 py-3 font-mono">
                    {r.status === "On" ? (
                      <span className="inline-block px-3 py-1 rounded-full bg-teal-500 text-black font-bold text-xs">
                        On
                      </span>
                    ) : (
                      <span className="inline-block px-3 py-1 rounded-full bg-red-500 text-white font-bold text-xs">
                        Off
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400 font-mono">
                    {new Date(r.reported_at).toLocaleString()}
                  </td>
                </tr>
              ))}
              {reports.length === 0 && (
                <tr>
                  <td
                    colSpan="3"
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No reports yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      <div className="h-10"></div>
    </div>
  );
}
