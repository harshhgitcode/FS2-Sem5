import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({

children,

role

}){

const {user}=useContext(AuthContext);

if(!user){

return <Navigate to="/"/>;

}

if(role && role!==user.role){

return <Navigate to="/unauthorized"/>;

}

return children;

}

export default ProtectedRoute;