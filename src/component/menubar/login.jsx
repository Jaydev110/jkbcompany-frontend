import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://jkbcompany.onrender.com/login",
        login
      );

      // Success Message
      alert(res.data.message);

      // Save JWT Token
      localStorage.setItem("token", res.data.token);

      // Save User Details
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      // Redirect to Dashboard
      navigate("/dashboard");

    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="container mt-5">

      <div
        className="card shadow p-4 mx-auto"
        style={{ maxWidth: "450px" }}
      >

        <h2 className="text-center mb-4">
          Login
        </h2>

        <form onSubmit={loginUser}>

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            name="email"
            value={login.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            name="password"
            value={login.password}
            onChange={handleChange}
            required
          />

          <button
            className="btn btn-primary w-100"
            type="submit"
          >
            Login
          </button>

        </form>

        <div className="text-center mt-3">
          <Link to="/reset-password">
            Forgot Password?
          </Link>
        </div>

        <div className="text-center mt-2">
          Don't have an account?
          <Link to="/register">
            {" "}Register
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Login;