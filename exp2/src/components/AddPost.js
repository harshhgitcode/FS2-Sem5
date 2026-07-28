import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../features/posts/postsSlice";

function AddPost() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("LinkedIn");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === "") return;

    dispatch(
      addPost({
        id: Date.now(),
        title,
        platform,
      })
    );

    setTitle("");
    setPlatform("LinkedIn");
  };

  return (
    <div className="card">
      <h2>Add New Post</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br /><br />

        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option>LinkedIn</option>
          <option>Twitter</option>
          <option>Instagram</option>
        </select>

        <br /><br />

        <button type="submit">
          Add Post
        </button>
      </form>
    </div>
  );
}

export default AddPost;