import React from "react";
import { useSelector } from "react-redux";
import { selectLinkedInPosts } from "../features/posts/selectors";

function FilteredPosts() {
  const posts = useSelector(selectLinkedInPosts);

  return (
    <div className="card">
      <h2>LinkedIn Posts (Memoized)</h2>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default React.memo(FilteredPosts);