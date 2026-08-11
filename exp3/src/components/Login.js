import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DEMO_ACCOUNTS = [
  {
    role: "Admin",
    username: "admin",
    password: "admin123",
  },
  {
    role: "Editor",
    username: "editor",
    password: "editor123",
  },
  {
    role: "Viewer",
    username: "viewer",
    password: "viewer123",
  },
];

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Fill credentials ONLY.
  // This does NOT log the user in.
  const handleDemoAccount = (account) => {
    setUsername(account.username);
    setPassword(account.password);
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please enter username and password.");
      return;
    }

    try {
      const result = await login(username.trim(), password);

      if (result === false) {
        setError("Invalid username or password.");
        return;
      }

      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        {/* HEADER */}
        <div className="login-header">
          <h1>Social Media Post Composer</h1>
          <p>JWT Authentication + RBAC</p>
        </div>

        {/* LOGIN FORM */}
        <form onSubmit={handleLogin} className="login-form">

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          <button type="submit" className="login-button">
            Login
          </button>

        </form>

        {/* ERROR */}
        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        {/* DEMO ACCOUNTS */}
        <div className="demo-section">

          <h2>Demo Accounts</h2>

          <p className="demo-info">
            Click <strong>Use</strong> to fill the credentials, then click{" "}
            <strong>Login</strong>.
          </p>

          <div className="demo-table-wrapper">
            <table className="demo-table">

              <thead>
                <tr>
                  <th>Role</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {DEMO_ACCOUNTS.map((account) => (
                  <tr key={account.username}>

                    <td>{account.role}</td>

                    <td>{account.username}</td>

                    <td>{account.password}</td>

                    <td>
                      <button
                        type="button"
                        className="use-button"
                        onClick={() => handleDemoAccount(account)}
                      >
                        Use
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;