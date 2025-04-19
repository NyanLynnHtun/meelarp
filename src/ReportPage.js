// src/ReportPage.js
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from './supabaseClient';

const DEBOUNCE_MS = 2000;
const STORAGE_KEY = 'lastReport';

export default function ReportPage() {
  // Regions list
  const regions = [
    'Sagaing', 'Bago', 'Magway', 'Mandalay', 'Tanintharyi',
    'Yangon', 'Ayeyarwady', 'Kachin', 'Kayah', 'Kayin',
    'Chin', 'Mon', 'Rakhine', 'Shan'
  ];
  // initial blank selection
  const [region, setRegion] = useState('');
  const [isOn, setIsOn] = useState(true);
  const [lastReport, setLastReport] = useState(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setLastReport(JSON.parse(saved));
  }, []);

  useEffect(() => {
    // skip auto-submit if no region selected
    if (!region) return;

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      const payload = { region, status: isOn ? 'On' : 'Off' };
      const { error } = await supabase.from('submissions').insert([payload]);
      if (error) return console.error('Submit failed:', error);

      const enriched = { ...payload, timestamp: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(enriched));
      setLastReport(enriched);
    }, DEBOUNCE_MS);

    return () => clearTimeout(debounceRef.current);
  }, [region, isOn]);

  return (
    <div className="min-h-screen bg-gray-900 p-4 flex flex-col items-center justify-center">
      {/* Global Title */}
      <h2 className="text-5xl font-bold text-white mb-12">⚡မီးလာပီ⚡</h2>

      {/* Card Container */}
      <div className="bg-gray-800 bg-opacity-90 backdrop-blur-sm rounded-xl shadow-xl p-8 w-full max-w-md">
        {/* Main Header */}
        <h1 className="text-3xl font-extrabold text-white text-center mb-6"></h1>

        {/* Region Selector */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2 font-semibold">Select Region</label>
          <select
            value={region}
            onChange={e => setRegion(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="" disabled>ဒေသ...</option>
            {regions.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Status Toggle (disabled until region selected) */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-300 font-semibold">Status:</span>
          <button
            onClick={() => setIsOn(!isOn)}
            disabled={!region}
            className={`relative inline-flex items-center h-8 w-16 rounded-full transition-colors focus:outline-none ${
              region
                ? isOn
                  ? 'bg-green-500'
                  : 'bg-red-500'
                : 'bg-gray-600 cursor-not-allowed'
            }`}
          >
            <span
              className={`${
                isOn && region ? 'translate-x-8' : 'translate-x-0'
              } inline-block w-8 h-8 bg-white rounded-full transform transition-transform`}
            />
          </button>
        </div>

        {/* Last Report Display */}
        {lastReport && (
          <div className="bg-gray-700 bg-opacity-80 rounded-lg p-4">
            <p className="text-gray-100 font-semibold">Last Report:</p>
            <p className="text-gray-300">Region: {lastReport.region}</p>
            <p className="text-gray-300">Status: {lastReport.status}</p>
            <p className="text-gray-400 text-sm">
              At: {new Date(lastReport.timestamp).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
