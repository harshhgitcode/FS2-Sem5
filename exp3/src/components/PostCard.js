function PostCard({ post, user }) {

  return (

    <div className="post-card">

      <h2>{post.title}</h2>

      <p>{post.content}</p>

      <p><b>Platform :</b> {post.platform}</p>

      <p><b>Status :</b> {post.status}</p>

      <p><b>Author :</b> {post.author}</p>

      <p>❤️ {post.likes}</p>

      {user.role === "Admin" && (

        <div>

          <button>Edit</button>

          <button>Delete</button>

          <button>Approve</button>

        </div>

      )}

      {user.role === "Editor" && (

        <div>

          <button>Edit</button>

          <button>Submit</button>

        </div>

      )}

      {user.role === "Viewer" && (

        <div>

          <button>Like ❤️</button>

        </div>

      )}

    </div>

  );

}

export default PostCard;