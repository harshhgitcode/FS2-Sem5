import { Link } from "react-router-dom";

function Unauthorized(){

return(

<div className="page">

<h1>

403

</h1>

<h2>

Access Denied

</h2>

<p>

You don't have permission to access this page.

</p>

<Link to="/dashboard">

<button>

Go Back

</button>

</Link>

</div>

);

}

export default Unauthorized;