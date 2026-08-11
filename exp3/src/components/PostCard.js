import React from "react";

function PostCard({
  post,
  onEdit,
  onDelete,
  onApprove
}) {

  if (!post) {
    return null;
  }

  return (
    <div className="post-card">

      <h2>{post.title}</h2>

      <p>
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

      {post.createdAt && (
        <p>
          <strong>Created:</strong>{" "}
          {new Date(post.createdAt).toLocaleString()}
        </p>
      )}

      <p>
        ❤️ {post.likes || 0}
      </p>

      {/* EDIT */}
      {onEdit && (
        <button onClick={() => onEdit(post)}>
          Edit
        </button>
      )}

      {/* DELETE */}
      {onDelete && (
        <button onClick={() => onDelete(post.id)}>
          Delete
        </button>
      )}

      {/* APPROVE */}
      {onApprove && post.status === "Draft" && (
        <button onClick={() => onApprove(post.id)}>
          Approve
        </button>
      )}

    </div>
  );
}

export default PostCard;