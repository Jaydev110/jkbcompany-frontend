import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    mobile: "",
    workstatus: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // =================================
  // HANDLE INPUT CHANGE
  // =================================
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // =================================
  // REGISTER USER
  // =================================
  const registerUser = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post(
        "https://jkbcompany.onrender.com/register",
        user
      );

      alert(res.data.message);

      navigate("/login");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="jkb-register-page">

      {/* =================================
          REGISTER CARD
      ================================= */}

      <div className="register-card">

        {/* JKB LOGO */}
        <div className="jkb-register-logo">
          JKB
        </div>

        {/* HEADING */}
        <h1>Create your account</h1>

        <p className="register-subtitle">
          Join JKB Company and get started
        </p>

        {/* =================================
            REGISTER FORM
        ================================= */}

        <form onSubmit={registerUser}>

          {/* FULL NAME */}
          <div className="register-input-group">

            <label htmlFor="fullname">
              Full Name
            </label>

            <input
              id="fullname"
              type="text"
              name="fullname"
              placeholder="Enter your full name"
              value={user.fullname}
              onChange={handleChange}
              required
            />

          </div>


          {/* EMAIL */}
          <div className="register-input-group">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={handleChange}
              required
            />

          </div>


          {/* PASSWORD */}
          <div className="register-input-group">

            <label htmlFor="password">
              Password
            </label>

            <div className="register-password-box">

              <input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Create a password"
                value={user.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="register-show-password"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </button>

            </div>

          </div>


          {/* MOBILE */}
          <div className="register-input-group">

            <label htmlFor="mobile">
              Mobile Number
            </label>

            <input
              id="mobile"
              type="tel"
              name="mobile"
              placeholder="Enter your mobile number"
              value={user.mobile}
              onChange={handleChange}
              required
            />

          </div>


          {/* WORK STATUS */}
          <div className="register-input-group">

            <label htmlFor="workstatus">
              Work Status
            </label>

            <select
              id="workstatus"
              name="workstatus"
              value={user.workstatus}
              onChange={handleChange}
              required
            >
              <option value="">
                Select your work status
              </option>

              <option value="Student">
                Student
              </option>

              <option value="Employee">
                Employee
              </option>

              <option value="Business">
                Business
              </option>

              <option value="Other">
                Other
              </option>
            </select>

          </div>


          {/* REGISTER BUTTON */}
          <button
            type="submit"
            className="jkb-register-button"
            disabled={loading}
          >
            {loading
              ? "Creating account..."
              : "Create account"}
          </button>

        </form>


        {/* =================================
            LOGIN LINK
        ================================= */}

        <div className="register-login-link">

          <span>
            Already have an account?
          </span>

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Register;