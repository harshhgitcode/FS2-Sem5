import { users } from "../utils/users";

function AdminPanel() {

  return (

    <div className="dashboard">

      <h1>User Management</h1>

      <table className="user-table">

        <thead>

          <tr>

            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Role</th>
            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {
            users.map(user => (

              <tr key={user.id}>

                <td>{user.id}</td>

                <td>{user.name}</td>

                <td>{user.username}</td>

                <td>{user.role}</td>

                <td>Active</td>

              </tr>

            ))
          }

        </tbody>

      </table>

    </div>

  );

}

export default AdminPanel;