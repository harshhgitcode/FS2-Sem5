import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Posts = () => {
  const { user } = useAuth();

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("All");
  const [status, setStatus] = useState("All");

  useEffect(() => {
    const storedPosts =
      JSON.parse(localStorage.getItem("posts")) || [];

    setPosts(storedPosts);
  }, []);

  const canEdit =
    user?.role === "Admin" || user?.role === "Editor";

  const canDelete = user?.role === "Admin";

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      post.content
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesPlatform =
      platform === "All" || post.platform === platform;

    const matchesStatus =
      status === "All" || post.status === status;

    return (
      matchesSearch &&
      matchesPlatform &&
      matchesStatus
    );
  });

  const deletePost = (id) => {
    if (!canDelete) return;

    const updated = posts.filter(
      (post) => post.id !== id
    );

    setPosts(updated);
    localStorage.setItem(
      "posts",
      JSON.stringify(updated)
    );
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 72px)",
        background: "#eef4fb",
        padding: "45px 7%",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#17233b",
            marginTop: 0,
          }}
        >
          All Posts
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(250px, 1fr) 180px 180px",
            gap: "15px",
            marginBottom: "15px",
          }}
        >
          <input
            placeholder="🔍 Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={inputStyle}
          />

          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            style={inputStyle}
          >
            <option value="All">All Platforms</option>
            <option value="Instagram">Instagram</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Twitter">Twitter</option>
            <option value="Facebook">Facebook</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={inputStyle}
          >
            <option value="All">All Status</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>

        <p style={{ color: "#475569" }}>
          Showing {filteredPosts.length} of {posts.length} posts
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "25px",
            marginTop: "25px",
          }}
        >
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              style={{
                background: "#ffffff",
                borderRadius: "14px",
                padding: "26px",
                boxShadow:
                  "0 8px 25px rgba(15, 23, 42, 0.08)",
                border: "1px solid #dbe4ef",
              }}
            >
              <h2
                style={{
                  color: "#2563eb",
                  marginTop: 0,
                }}
              >
                {post.title}
              </h2>

              <p style={{ color: "#475569" }}>
                {post.content}
              </p>

              <p>
                <strong>Platform:</strong>{" "}
                {post.platform}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {post.status}
              </p>

              <p>
                <strong>Author:</strong>{" "}
                {post.author}
              </p>

              <p style={{ color: "#64748b" }}>
                Created:{" "}
                {new Date(
                  post.createdAt
                ).toLocaleString()}
              </p>

              <p>❤️ {post.likes || 0}</p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "15px",
                }}
              >
                {canEdit && (
                  <button
                    style={editButton}
                    onClick={() =>
                      alert(
                        "Edit functionality can be connected here."
                      )
                    }
                  >
                    Edit
                  </button>
                )}

                {canDelete && (
                  <button
                    style={deleteButton}
                    onClick={() => deletePost(post.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div
            style={{
              background: "#ffffff",
              padding: "40px",
              borderRadius: "14px",
              textAlign: "center",
              marginTop: "25px",
            }}
          >
            <h2>No posts found</h2>
          </div>
        )}
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px 14px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  background: "#ffffff",
  fontSize: "15px",
};

const editButton = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "7px",
  cursor: "pointer",
  fontWeight: "600",
};

const deleteButton = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "7px",
  cursor: "pointer",
  fontWeight: "600",
};

export default Posts;