import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../features/posts/postsSlice";

const PostList = React.memo(() => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.posts);

  return (
    <div className="card">
      <h2>All Posts</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Title</th>
            <th>Platform</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>

              <td>{post.platform}</td>

              <td>
                <button
                  onClick={() =>
                    dispatch(deletePost(post.id))
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default PostList;