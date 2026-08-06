import { posts } from "../utils/posts";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import PostCard from "../components/PostCard";

function Posts(){

const{user}=useContext(AuthContext);

return(

<div>

<h1

style={{textAlign:"center",margin:"30px"}}

>

All Posts

</h1>

<div className="posts-grid">

{

posts.map(post=>

<PostCard

key={post.id}

post={post}

user={user}

/>

)

}

</div>

</div>

);

}

export default Posts;