import { posts } from "../utils/posts";
import { users } from "../utils/users";

function Analytics() {

  const totalPosts = posts.length;
  const published = posts.filter(post => post.status === "Published").length;
  const drafts = posts.filter(post => post.status === "Draft").length;

  const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);

  return (
    <div className="dashboard">

      <h1>Analytics Dashboard</h1>

      <div className="dashboard-grid">

        <div className="card">
          <h3>Total Users</h3>
          <h1>{users.length}</h1>
        </div>

        <div className="card">
          <h3>Total Posts</h3>
          <h1>{totalPosts}</h1>
        </div>

        <div className="card">
          <h3>Published</h3>
          <h1>{published}</h1>
        </div>

        <div className="card">
          <h3>Drafts</h3>
          <h1>{drafts}</h1>
        </div>

        <div className="card">
          <h3>Total Likes</h3>
          <h1>{totalLikes}</h1>
        </div>

      </div>

    </div>
  );
}

export default Analytics;