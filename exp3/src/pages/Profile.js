import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Profile() {

  const { user } = useContext(AuthContext);

  return (

    <div className="profile-card">

      <div className="avatar">

        {user.name.charAt(0)}

      </div>

      <h2>{user.name}</h2>

      <p><b>Username :</b> {user.username}</p>

      <p><b>Role :</b> {user.role}</p>

      <p><b>Login Time :</b> {user.loginTime}</p>

      <p><b>Expiry :</b> {user.expiry}</p>

      <textarea

        rows="4"

        readOnly

        value={user.token}

      />

    </div>

  );

}

export default Profile;