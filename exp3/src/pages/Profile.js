import React from "react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, token } = useAuth();

  if (!user) return null;

  return (
    <div
      style={{
        minHeight: "calc(100vh - 72px)",
        background: "#eef4fb",
        padding: "50px 7%",
      }}
    >
      <div
        style={{
          maxWidth: "850px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "16px",
          padding: "35px",
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
        }}
      >
        <h1 style={{ color: "#17233b", marginTop: 0 }}>
          My Profile
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginTop: "25px",
          }}
        >
          <Info title="Name" value={user.name} />
          <Info title="Username" value={user.username} />
          <Info title="Role" value={user.role} />
          <Info
            title="Login Time"
            value={new Date(user.loginTime).toLocaleString()}
          />
          <Info
            title="Expiry"
            value={new Date(user.expiry).toLocaleString()}
          />
        </div>

        <h2 style={{ marginTop: "35px", color: "#17233b" }}>
          JWT Token
        </h2>

        <textarea
          value={token || "Token unavailable"}
          readOnly
          rows="5"
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "12px",
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
            background: "#f8fafc",
            fontFamily: "monospace",
            fontSize: "13px",
          }}
        />
      </div>
    </div>
  );
};

const Info = ({ title, value }) => (
  <div
    style={{
      background: "#f8fafc",
      border: "1px solid #e2e8f0",
      borderRadius: "10px",
      padding: "18px",
    }}
  >
    <div
      style={{
        fontSize: "14px",
        color: "#64748b",
        marginBottom: "7px",
      }}
    >
      {title}
    </div>

    <strong style={{ color: "#17233b" }}>
      {value}
    </strong>
  </div>
);

export default Profile;