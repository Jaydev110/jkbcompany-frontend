import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    mobile: "",
    workstatus: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://jkbcompany.onrender.com/register",
        user
      );

      alert(res.data.message);

      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="container mt-5">

      <div className="card mx-auto shadow p-4" style={{ maxWidth: "500px" }}>

        <h2 className="text-center mb-4">
          Register
        </h2>

        <form onSubmit={registerUser}>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Full Name"
            name="fullname"
            value={user.fullname}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Mobile Number"
            name="mobile"
            value={user.mobile}
            onChange={handleChange}
            required
          />

          <select
            className="form-control mb-3"
            name="workstatus"
            value={user.workstatus}
            onChange={handleChange}
            required
          >
            <option value="">Select Work Status</option>
            <option>Student</option>
            <option>Employee</option>
            <option>Business</option>
            <option>Other</option>
          </select>

          <button
            className="btn btn-primary w-100"
            type="submit"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-3">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

      </div>

    </div>
  );
}

export default Register;