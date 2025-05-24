// src/LoginPage.js
import React, { useState } from "react";
import { auth } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await auth.signInWithPassword({ email, password });
    if (error) setErrorMsg(error.message);
    else nav("/admin"); // redirect on success
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-sm"
      >
        <h2 className="text-2xl mb-4">Admin Sign‑In</h2>
        {errorMsg && <p className="text-red-400 mb-2">{errorMsg}</p>}
        <label className="block mb-2">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 p-2 bg-gray-700 rounded"
            required
          />
        </label>
        <label className="block mb-4">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 p-2 bg-gray-700 rounded"
            required
          />
        </label>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
