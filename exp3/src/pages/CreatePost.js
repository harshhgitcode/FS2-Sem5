import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function CreatePost() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [status, setStatus] = useState("");

  const handleSave = (postStatus) => {
    if (!title.trim() || !content.trim()) {
      alert("Please enter both a title and post content.");
      return;
    }

    const existingPosts =
      JSON.parse(localStorage.getItem("posts")) || [];

    const newPost = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      platform,
      status: postStatus,
      author: user?.username || "admin",
      likes: 0,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "posts",
      JSON.stringify([newPost, ...existingPosts])
    );

    setStatus(
      postStatus === "Published"
        ? "Post published successfully!"
        : "Post saved as draft!"
    );

    setTitle("");
    setContent("");
  };

  return (
    <main className="create-post-page">
      <div className="create-post-container">

        <div className="page-header">
          <h1>Create Social Media Post</h1>
          <p>Create and manage your social media content.</p>
        </div>

        <div className="create-post-card">

          <div className="form-group">
            <label htmlFor="post-title">
              Post Title
            </label>

            <input
              id="post-title"
              type="text"
              placeholder="Enter post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="post-content">
              Post Content
            </label>

            <textarea
              id="post-content"
              placeholder="Write your post content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="8"
            />
          </div>

          <div className="form-group">
            <label htmlFor="platform">
              Platform
            </label>

            <select
              id="platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            >
              <option value="Instagram">Instagram</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Twitter">Twitter</option>
              <option value="Facebook">Facebook</option>
            </select>
          </div>

          {status && (
            <div className="success-message">
              {status}
            </div>
          )}

          <div className="form-actions">

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => handleSave("Draft")}
            >
              Save Draft
            </button>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleSave("Published")}
            >
              Publish
            </button>

          </div>

        </div>

        <div className="back-section">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => navigate("/posts")}
          >
            View All Posts
          </button>
        </div>

      </div>
    </main>
  );
}

export default CreatePost;