import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
        minHeight: "70vh",
      }}
    >
      <h1>Welcome {user?.fullname} 👋</h1>

      <h2>You have successfully logged in.</h2>

      <br />

      <table
        style={{
          margin: "auto",
          borderCollapse: "collapse",
          width: "450px",
        }}
      >
        <tbody>
          <tr>
            <td><b>Name</b></td>
            <td>{user?.fullname}</td>
          </tr>

          <tr>
            <td><b>Email</b></td>
            <td>{user?.email}</td>
          </tr>

          <tr>
            <td><b>Mobile</b></td>
            <td>{user?.mobile}</td>
          </tr>

          <tr>
            <td><b>Work Status</b></td>
            <td>{user?.workstatus}</td>
          </tr>
        </tbody>
      </table>

      <br />

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;