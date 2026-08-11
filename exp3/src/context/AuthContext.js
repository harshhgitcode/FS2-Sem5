import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const DEMO_USERS = {
  admin: {
    username: "admin",
    password: "admin123",
    name: "Administrator",
    role: "Admin",
  },

  editor: {
    username: "editor",
    password: "editor123",
    name: "Content Editor",
    role: "Editor",
  },

  viewer: {
    username: "viewer",
    password: "viewer123",
    name: "Content Viewer",
    role: "Viewer",
  },
};


// --------------------------------------------------
// Base64 URL encoding
// --------------------------------------------------

const base64UrlEncode = (data) => {
  return btoa(
    unescape(
      encodeURIComponent(JSON.stringify(data))
    )
  )
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};


// --------------------------------------------------
// Create simulated JWT
// --------------------------------------------------

const createSimulatedJWT = (user) => {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const now = Math.floor(Date.now() / 1000);

  const payload = {
    username: user.username,
    name: user.name,
    role: user.role,

    iat: now,

    // Token expires after 1 hour
    exp: now + 60 * 60,
  };

  const encodedHeader = base64UrlEncode(header);
  const encodedPayload = base64UrlEncode(payload);

  // Simulated signature for demonstration.
  // A real backend would cryptographically sign this.
  const signature = base64UrlEncode({
    signed: true,
    algorithm: "HS256",
  });

  return `${encodedHeader}.${encodedPayload}.${signature}`;
};


// --------------------------------------------------
// Decode JWT payload
// --------------------------------------------------

export const decodeJWT = (token) => {
  try {
    if (!token) return null;

    const parts = token.split(".");

    if (parts.length !== 3) {
      return null;
    }

    const base64 = parts[1]
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const decoded = decodeURIComponent(
      atob(base64)
        .split("")
        .map(
          (char) =>
            "%" +
            ("00" + char.charCodeAt(0).toString(16)).slice(-2)
        )
        .join("")
    );

    return JSON.parse(decoded);
  } catch (error) {
    console.error("JWT decoding failed:", error);
    return null;
  }
};


// --------------------------------------------------
// Authentication Provider
// --------------------------------------------------

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);


  // ------------------------------------------------
  // Restore authentication after page refresh
  // ------------------------------------------------

  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (!savedToken) {
      setLoading(false);
      return;
    }

    const decoded = decodeJWT(savedToken);

    if (!decoded) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setLoading(false);
      return;
    }

    // Check expiry
    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded.exp && decoded.exp < currentTime) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setToken("");
      setUser(null);

      setLoading(false);
      return;
    }

    const restoredUser = {
      username: decoded.username,
      name: decoded.name,
      role: decoded.role,
      loginTime: decoded.iat
        ? new Date(decoded.iat * 1000).toISOString()
        : new Date().toISOString(),
      expiry: decoded.exp
        ? new Date(decoded.exp * 1000).toISOString()
        : null,
    };

    setToken(savedToken);
    setUser(restoredUser);

    setLoading(false);
  }, []);


  // ------------------------------------------------
  // LOGIN
  // ------------------------------------------------

  const login = (username, password) => {
    const enteredUsername = username.trim().toLowerCase();

    const account = DEMO_USERS[enteredUsername];

    if (!account) {
      return false;
    }

    if (account.password !== password) {
      return false;
    }


    // Create JWT
    const generatedToken = createSimulatedJWT(account);


    // Decode it again to demonstrate the JWT flow
    const decoded = decodeJWT(generatedToken);


    const loggedInUser = {
      username: decoded.username,
      name: decoded.name,
      role: decoded.role,

      loginTime: decoded.iat
        ? new Date(decoded.iat * 1000).toISOString()
        : new Date().toISOString(),

      expiry: decoded.exp
        ? new Date(decoded.exp * 1000).toISOString()
        : null,
    };


    // Store authentication information
    localStorage.setItem(
      "token",
      generatedToken
    );

    localStorage.setItem(
      "user",
      JSON.stringify(loggedInUser)
    );


    // Update React state
    setToken(generatedToken);
    setUser(loggedInUser);


    return true;
  };


  // ------------------------------------------------
  // LOGOUT
  // ------------------------------------------------

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken("");
    setUser(null);
  };


  // ------------------------------------------------
  // ROLE CHECK
  // ------------------------------------------------

  const hasRole = (roles) => {
    if (!user) {
      return false;
    }

    const allowedRoles = Array.isArray(roles)
      ? roles
      : [roles];

    return allowedRoles.includes(user.role);
  };


  // ------------------------------------------------
  // Authentication status
  // ------------------------------------------------

  const isAuthenticated =
    Boolean(user) && Boolean(token);


  // ------------------------------------------------
  // Context value
  // ------------------------------------------------

  const value = {
    user,
    token,
    loading,
    isAuthenticated,

    login,
    logout,

    hasRole,

    decodeJWT,
  };


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


// --------------------------------------------------
// Custom Hook
// --------------------------------------------------

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};