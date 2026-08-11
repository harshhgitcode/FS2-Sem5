import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) {
    return null;
  }

  const isAdmin = user.role === "Admin";
  const isEditor = user.role === "Editor";

  const linkStyle = (path) => ({
    color: location.pathname === path ? "#60a5fa" : "#ffffff",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "16px",
    padding: "10px 14px",
    borderRadius: "8px",
  });

  return (
    <nav
      style={{
        width: "100%",
        background: "#17233b",
        minHeight: "72px",
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box",
        padding: "0 40px",
        gap: "30px",
        color: "white",
      }}
    >
      <Link
        to="/dashboard"
        style={{
          color: "#ffffff",
          textDecoration: "none",
          fontSize: "22px",
          fontWeight: "800",
          marginRight: "auto",
        }}
      >
        Post Composer
      </Link>

      <Link to="/dashboard" style={linkStyle("/dashboard")}>
        Dashboard
      </Link>

      <Link to="/posts" style={linkStyle("/posts")}>
        Posts
      </Link>

      {(isAdmin || isEditor) && (
        <Link to="/create-post" style={linkStyle("/create-post")}>
          Create Post
        </Link>
      )}

      <Link to="/analytics" style={linkStyle("/analytics")}>
        Analytics
      </Link>

      {isAdmin && (
        <Link to="/admin" style={linkStyle("/admin")}>
          Admin Panel
        </Link>
      )}

      <Link to="/profile" style={linkStyle("/profile")}>
        Profile
      </Link>

      <button
        onClick={logout}
        style={{
          border: "none",
          background: "#ef4444",
          color: "white",
          padding: "11px 20px",
          borderRadius: "8px",
          fontWeight: "700",
          cursor: "pointer",
          fontSize: "15px",
        }}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;