import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import { supabase } from "./supabaseClient"; // Import Supabase client

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInitialUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        // Fetch additional profile data from 'users' table
        const { data: profile } = await supabase
          .from("users")
          .select("*")
          .eq("uid", data.user.id)
          .single();
        setUser(profile ? { ...data.user, ...profile } : data.user);
      }
      setLoading(false);
    };

    getInitialUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const { data: profile } = await supabase
            .from("users")
            .select("*")
            .eq("uid", session.user.id)
            .single();
          setUser(profile ? { ...session.user, ...profile } : session.user);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Sign up new user
  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Save profile in 'users' table
        await supabase.from("users").insert([
          {
            uid: data.user.id,
            name,
            email,
            role: "customer",
          },
        ]);
      }
      return data;
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return data;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
