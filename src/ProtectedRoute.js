// src/ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { supabase }      from './supabaseClient';
import { Navigate }      from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // session === undefined → still loading
  // session === null      → not logged in
  // session is object     → logged in
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    // 1️⃣ Fetch initial session
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
      });

    // 2️⃣ Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    // 3️⃣ Cleanup
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // 4️⃣ While we're checking session, render nothing (or a loader)
  if (session === undefined) {
    return null;
  }

  // 5️⃣ If no session, redirect to login
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // 6️⃣ Otherwise, render the protected children
  return children;
}
