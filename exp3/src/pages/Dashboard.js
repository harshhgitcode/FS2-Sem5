import React from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, token } = useAuth();

  if (!user) return null;

  return (
    <div
      style={{
        minHeight: "calc(100vh - 72px)",
        background: "#eef4fb",
        padding: "45px 7%",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          margin: "0 0 8px",
          fontSize: "38px",
          color: "#17233b",
        }}
      >
        Welcome {user.name}
      </h1>

      <p
        style={{
          fontSize: "18px",
          color: "#475569",
          marginBottom: "30px",
        }}
      >
        Role:{" "}
        <strong style={{ color: "#17233b" }}>
          {user.role}
        </strong>
      </p>

      {/* Authentication Information */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #d7e0eb",
          borderRadius: "14px",
          padding: "24px",
          marginBottom: "30px",
          boxShadow: "0 8px 25px rgba(15, 23, 42, 0.07)",
        }}
      >
        <h2
          style={{
            marginTop: 0,
            color: "#17233b",
          }}
        >
          Authentication Details
        </h2>

        <div style={{ marginBottom: "16px" }}>
          <strong>Username:</strong> {user.username}
        </div>

        <div style={{ marginBottom: "16px" }}>
          <strong>Role:</strong> {user.role}
        </div>

        <div style={{ marginBottom: "16px" }}>
          <strong>Login Time:</strong>{" "}
          {new Date(user.loginTime).toLocaleString()}
        </div>

        <div style={{ marginBottom: "16px" }}>
          <strong>Expiry:</strong>{" "}
          {new Date(user.expiry).toLocaleString()}
        </div>

        <label
          style={{
            display: "block",
            fontWeight: "700",
            marginBottom: "8px",
          }}
        >
          JWT Token
        </label>

        <textarea
          value={token || "Token unavailable"}
          readOnly
          rows="5"
          style={{
            width: "100%",
            maxWidth: "900px",
            padding: "12px",
            boxSizing: "border-box",
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
            background: "#f8fafc",
            fontFamily: "monospace",
            fontSize: "13px",
            resize: "vertical",
          }}
        />
      </div>

      {/* Dashboard Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(210px, 1fr))",
          gap: "20px",
        }}
      >
        <DashboardCard title="Total Posts" value="15" />
        <DashboardCard title="Published" value="11" />
        <DashboardCard title="Drafts" value="4" />
        <DashboardCard title="Followers" value="1.2K" />
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value }) => {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "14px",
        padding: "25px",
        boxShadow: "0 8px 25px rgba(15, 23, 42, 0.08)",
        border: "1px solid #dbe4ef",
      }}
    >
      <p
        style={{
          margin: "0 0 10px",
          fontSize: "17px",
          fontWeight: "700",
          color: "#475569",
        }}
      >
        {title}
      </p>

      <h2
        style={{
          margin: 0,
          fontSize: "36px",
          color: "#2563eb",
        }}
      >
        {value}
      </h2>
    </div>
  );
};

export default Dashboard;