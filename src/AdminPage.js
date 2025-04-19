// src/AdminPage.js
import React, { useState, useEffect } from "react";
import { supabase, auth } from "./supabaseClient";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
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
      status: 'On',
    }));
  const offData = reports
    .filter((r) => r.status === "Off")
    .map((r) => ({
      timestamp: new Date(r.reported_at).getTime(),
      region: r.region,
      status:    'Off',
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

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">📊 Admin Dashboard</h1>
        <button
          onClick={handleExportCSV}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white transition"
        >
          Export CSV
        </button>

        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white transition"
        >
          Sign Out
        </button>
      </header>

      <div className="mb-6 flex flex-wrap items-end gap-4">
        <label className="flex flex-col text-sm">
          From
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 p-2 bg-gray-700 rounded"
          />
        </label>
        <label className="flex flex-col text-sm">
          To
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 p-2 bg-gray-700 rounded"
          />
        </label>
        <button
          onClick={() => loadReports()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
        >
          Apply Filter
        </button>
        <button
          onClick={() => {
            setStartDate("");
            setEndDate("");
            loadReports();
          }}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white"
        >
          Reset
        </button>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-4 mb-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
          className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
        >
          ← Prev
        </button>
        <span>Page {page + 1}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={reports.length < pageSize}
          className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
        >
          Next →
        </button>
      </div>

      {/* 📍 Reports Timeline */}
      <article className="mb-8 bg-gray-800 p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">📍 Reports Timeline</h2>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="timestamp"
              domain={["auto", "auto"]}
              tickFormatter={(unix) => new Date(unix).toLocaleDateString()}
              name="Time"
            />
            <YAxis type="category" dataKey="region" name="City" />
            {/* ← use our custom tooltip */}
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ strokeDasharray: "3 3" }}
            />
            <Legend />
            <Scatter name="On" data={onData} fill="#34D399" />
            <Scatter name="Off" data={offData} fill="#F87171" />
          </ScatterChart>
        </ResponsiveContainer>
      </article>

      {/* 💻 Data Table */}
      <div className="overflow-x-auto bg-gray-800 rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium">City</th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Status
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Reported At
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {reports.map((r) => (
              <tr key={r.id}>
                <td className="px-4 py-2">{r.region}</td>
                <td className="px-4 py-2">{r.status}</td>
                <td className="px-4 py-2 text-sm text-gray-400">
                  {new Date(r.reported_at).toLocaleString()}
                </td>
              </tr>
            ))}
            {reports.length === 0 && (
              <tr>
                <td colSpan="3" className="px-4 py-6 text-center text-gray-500">
                  No reports yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
