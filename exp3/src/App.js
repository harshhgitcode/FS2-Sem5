import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Posts from "./pages/Posts";
import CreatePost from "./pages/CreatePost";
import Analytics from "./pages/Analytics";
import AdminPanel from "./pages/AdminPanel";
import Profile from "./pages/Profile";

import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>

                    {/* ================= LOGIN ================= */}
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />

                    {/* ================= PROTECTED PAGES ================= */}

                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <>
                                    <Navbar />
                                    <Dashboard />
                                </>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/posts"
                        element={
                            <ProtectedRoute>
                                <>
                                    <Navbar />
                                    <Posts />
                                </>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/create-post"
                        element={
                            <ProtectedRoute>
                                <>
                                    <Navbar />
                                    <CreatePost />
                                </>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/analytics"
                        element={
                            <ProtectedRoute>
                                <>
                                    <Navbar />
                                    <Analytics />
                                </>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute>
                                <>
                                    <Navbar />
                                    <AdminPanel />
                                </>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <>
                                    <Navbar />
                                    <Profile />
                                </>
                            </ProtectedRoute>
                        }
                    />

                    {/* ================= FALLBACK ================= */}

                    <Route
                        path="*"
                        element={<Navigate to="/" replace />}
                    />

                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;