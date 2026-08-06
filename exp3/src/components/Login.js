import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {

  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");

  const {login}=useContext(AuthContext);

  const navigate=useNavigate();

  const handleLogin=()=>{

    const result=login(username,password);

    if(result.success){

      navigate("/dashboard");

    }else{

      setError(result.message);

    }

  };

  return(

    <div className="login-container">

      <div className="login-box">

        <h2>Social Media Post Composer</h2>

        <p>JWT Authentication + RBAC</p>

        <input

          type="text"

          placeholder="Username"

          value={username}

          onChange={(e)=>setUsername(e.target.value)}

        />

        <input

          type="password"

          placeholder="Password"

          value={password}

          onChange={(e)=>setPassword(e.target.value)}

        />

        <button onClick={handleLogin}>

          Login

        </button>

        <p className="error">{error}</p>

      </div>

      <div className="demo-box">

        <h3>Demo Accounts</h3>

        <table>

          <thead>

            <tr>

              <th>Role</th>

              <th>Username</th>

              <th>Password</th>

            </tr>

          </thead>

          <tbody>

            <tr>

              <td>Admin</td>

              <td>admin</td>

              <td>admin123</td>

            </tr>

            <tr>

              <td>Editor</td>

              <td>editor</td>

              <td>editor123</td>

            </tr>

            <tr>

              <td>Viewer</td>

              <td>viewer</td>

              <td>viewer123</td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Login;