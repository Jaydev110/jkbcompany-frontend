import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { useTheme } from "../../ThemeContext";

function Login() {
  const navigate = useNavigate();

  // =========================================
  // THEME
  // =========================================

  const { setTheme } = useTheme();


  // =========================================
  // LOGIN STATE
  // =========================================

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });


  // =========================================
  // PASSWORD VISIBILITY
  // =========================================

  const [showPassword, setShowPassword] =
    useState(false);


  // =========================================
  // LOADING
  // =========================================

  const [loading, setLoading] =
    useState(false);


  // =========================================
  // HANDLE INPUT CHANGE
  // =========================================

  const handleChange = (e) => {

    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });

  };


  // =========================================
  // LOGIN USER
  // =========================================

  const loginUser = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      // ---------------------------------------
      // SEND LOGIN REQUEST
      // ---------------------------------------

      const res = await axios.post(
        "https://jkbcompany-1.onrender.com/login",
        login
      );


      // ---------------------------------------
      // GET USER
      // ---------------------------------------

      const loggedInUser =
        res.data.user;


      // ---------------------------------------
      // CHECK ROLE
      // ---------------------------------------

      if (
        !loggedInUser ||
        !loggedInUser.role
      ) {

        alert(
          "Invalid user information received"
        );

        return;
      }


      // ---------------------------------------
      // SAVE JWT TOKEN
      // ---------------------------------------

      localStorage.setItem(
        "token",
        res.data.token
      );


      // ---------------------------------------
      // SAVE USER DETAILS
      // ---------------------------------------

      localStorage.setItem(
        "user",
        JSON.stringify(loggedInUser)
      );


      // =======================================
      // LOAD USER'S OWN THEME
      // =======================================

      if (
        loggedInUser.role === "admin"
      ) {

        const adminTheme =
          localStorage.getItem(
            "jkbAdminTheme"
          ) || "light";

        setTheme(adminTheme);

      } else if (
        loggedInUser.role === "employee"
      ) {

        const employeeTheme =
          localStorage.getItem(
            "jkbEmployeeTheme"
          ) || "light";

        setTheme(employeeTheme);

      }


      // ---------------------------------------
      // SUCCESS MESSAGE
      // ---------------------------------------

      alert(
        res.data.message ||
          "Login Successful"
      );


      // =======================================
      // ROLE BASED REDIRECT
      // =======================================

      if (
        loggedInUser.role ===
        "admin"
      ) {

        navigate(
          "/admin-dashboard"
        );

      } else if (
        loggedInUser.role ===
        "employee"
      ) {

        navigate(
          "/dashboard"
        );

      } else {

        // -------------------------------------
        // UNKNOWN ROLE
        // -------------------------------------

        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );

        alert(
          "Invalid user role"
        );

      }

    } catch (err) {

      console.error(
        "Login Error:",
        err
      );

      alert(
        err.response?.data?.message ||
          "Login Failed"
      );

    } finally {

      setLoading(false);

    }

  };


  // =========================================
  // UI
  // =========================================

  return (

    <div className="jkb-login-page">

      {/* =====================================
          LOGIN CARD
      ===================================== */}

      <div className="login-card">

        {/* =================================
            LOGO
        ================================= */}

        <div className="jkb-logo">
          JKB
        </div>


        {/* =================================
            HEADING
        ================================= */}

        <h1>
          Welcome back
        </h1>

        <p className="login-subtitle">
          Sign in to continue to JKB Company
        </p>


        {/* =================================
            LOGIN FORM
        ================================= */}

        <form onSubmit={loginUser}>

          {/* ================================
              EMAIL
          ================================= */}

          <div className="input-group">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={login.email}
              onChange={handleChange}
              required
            />

          </div>


          {/* ================================
              PASSWORD
          ================================= */}

          <div className="input-group">

            <label htmlFor="password">
              Password
            </label>

            <div className="password-box">

              <input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Enter your password"
                value={login.password}
                onChange={handleChange}
                required
              />


              <button
                type="button"
                className="show-password"
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


          {/* ================================
              LOGIN BUTTON
          ================================= */}

          <button
            type="submit"
            className="jkb-login-button"
            disabled={loading}
          >

            {loading
              ? "Logging in..."
              : "Log in"}

          </button>

        </form>


        {/* =================================
            FORGOT PASSWORD
        ================================= */}

        <div className="login-links">

          <Link to="/reset-password">
            Forgot password?
          </Link>

        </div>

      </div>

    </div>

  );
}

export default Login;