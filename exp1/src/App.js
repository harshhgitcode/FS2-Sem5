import React, { useState, useEffect } from "react";
import "./App.css";

const limits = {
  Twitter: 280,
  Instagram: 3000,
  LinkedIn: 3000
};

function App() {
  const [platform, setPlatform] = useState("Twitter");
  const [post, setPost] = useState("");
  const [drafts, setDrafts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const limit = limits[platform];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("drafts")) || [];
    setDrafts(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("drafts", JSON.stringify(drafts));
  }, [drafts]);

  const saveDraft = () => {
    if (post.trim() === "") return;

    const draft = {
      platform,
      post
    };

    if (editingIndex !== null) {
      const updated = [...drafts];
      updated[editingIndex] = draft;
      setDrafts(updated);
      setEditingIndex(null);
    } else {
      setDrafts([...drafts, draft]);
    }

    setPost("");
  };

  const editDraft = (index) => {
    setPlatform(drafts[index].platform);
    setPost(drafts[index].post);
    setEditingIndex(index);
  };

  const deleteDraft = (index) => {
    const updated = drafts.filter((_, i) => i !== index);
    setDrafts(updated);
  };

  return (
    <div className="container">

      <h1>Dynamic Post Composer</h1>

      <label>Select Platform</label>

      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      >
        {Object.keys(limits).map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>

      <textarea
        placeholder="Write your post..."
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />

      <p>
        Characters: {post.length}/{limit}
      </p>

      {post.length > limit ? (
        <p className="error">Character limit exceeded!</p>
      ) : (
        <p className="success">Post is valid.</p>
      )}

      <button onClick={saveDraft}>
        {editingIndex !== null ? "Update Draft" : "Save Draft"}
      </button>

      <h2>Saved Drafts</h2>

      {drafts.length === 0 && <p>No drafts available.</p>}

      {drafts.map((draft, index) => (
        <div className="draft" key={index}>
          <h3>{draft.platform}</h3>

          <p>{draft.post}</p>

          <button onClick={() => editDraft(index)}>
            Edit
          </button>

          <button
            className="delete"
            onClick={() => deleteDraft(index)}
          >
            Delete
          </button>

        </div>
      ))}

    </div>
  );
}

export default App;