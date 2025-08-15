import { useNavigate } from 'react-router-dom';
// Function to redirect based on user role
// Remove redirectByRole, logic now handled in handleLogin
import React, { useState } from "react";
import supabase from "../api/supabase";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Fetch user role from profiles table using user id
    const userId = data.user?.id;
    if (!userId) {
      setError("No user ID found.");
      setLoading(false);
      return;
    }
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();

    if (profileError) {
      setError("Failed to fetch user role.");
      setLoading(false);
      return;
    }

    const role = profile?.role;
    if (role === "supplier") {
      navigate("/supplierdashboard");
    } else if (role === "buyer") {
      navigate("/home");
    } else {
      setError("Unknown user role.");
    }
    setLoading(false);
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && <p className="login-error">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
