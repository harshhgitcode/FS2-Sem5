import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import DashboardCard from "../components/DashboardCard";

function Dashboard(){

const {user}=useContext(AuthContext);

return(

<div className="dashboard">

<h1>

Welcome {user.name}

</h1>

<p>

Role :

<b> {user.role}</b>

</p>

<div className="token-box">

<p>

Token

</p>

<textarea

rows="4"

readOnly

value={user.token}

/>

<p>

Login :

{user.loginTime}

</p>

<p>

Expiry :

{user.expiry}

</p>

</div>

<div className="dashboard-grid">

<DashboardCard

title="Total Posts"

value="15"

/>

<DashboardCard

title="Published"

value="11"

/>

<DashboardCard

title="Draft"

value="4"

/>

<DashboardCard

title="Followers"

value="1.2K"

/>

</div>

</div>

);

}

export default Dashboard;