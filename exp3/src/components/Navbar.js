import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar(){

const {user,logout}=useContext(AuthContext);

if(!user) return null;

return(

<div className="navbar">

<h2>Post Composer</h2>

<div>

<Link to="/dashboard">Dashboard</Link>

<Link to="/posts">Posts</Link>

{user.role!=="Viewer" &&

<Link to="/create">Create Post</Link>

}

{user.role==="Admin" &&

<Link to="/analytics">Analytics</Link>

}

{user.role==="Admin" &&

<Link to="/admin">Admin Panel</Link>

}

<Link to="/profile">Profile</Link>

<button onClick={logout}>

Logout

</button>

</div>

</div>

);

}

export default Navbar;