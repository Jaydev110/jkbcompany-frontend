import { useNavigate } from "react-router-dom";
import { useTheme } from "../../ThemeContext";
import "./EmployeeSettings.css";

function EmployeeSettings() {
  const navigate = useNavigate();

  const { theme, setTheme } = useTheme();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  // =========================================
  // EMPLOYEE CHECK
  // =========================================

  if (!user || user.role !== "employee") {
    navigate("/login");
    return null;
  }

  // =========================================
  // LOGOUT
  // =========================================

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="employee-settings-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <header className="employee-settings-header">

        <div className="employee-settings-brand">

          <div className="employee-settings-logo">
            JKB
          </div>

          <div>
            <strong>
              JKB Company
            </strong>

            <span>
              Employee Portal
            </span>
          </div>

        </div>

        <div className="employee-settings-header-actions">

          <button
            type="button"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            ← Dashboard
          </button>

          <button
            type="button"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </header>


      {/* =====================================
          MAIN
      ===================================== */}

      <main className="employee-settings-main">

        <div className="employee-settings-heading">

          <span>
            ACCOUNT SETTINGS
          </span>

          <h1>
            Settings
          </h1>

          <p>
            Manage your JKB employee portal preferences.
          </p>

        </div>


        {/* =====================================
            PROFILE
        ===================================== */}

        <section className="employee-settings-card">

          <div className="employee-settings-card-heading">

            <div className="employee-settings-card-icon">
              👤
            </div>

            <div>

              <span>
                MY ACCOUNT
              </span>

              <h2>
                Profile
              </h2>

            </div>

          </div>


          <div className="employee-settings-profile">

            <div className="employee-settings-avatar">

              {user?.fullname
                ?.charAt(0)
                .toUpperCase()}

            </div>

            <div>

              <strong>
                {user?.fullname}
              </strong>

              <span>
                {user?.email}
              </span>

            </div>


            <button
              type="button"
              onClick={() =>
                navigate("/my-profile")
              }
            >
              View Profile
            </button>

          </div>

        </section>


        {/* =====================================
            APPEARANCE
        ===================================== */}

        <section className="employee-settings-card">

          <div className="employee-settings-card-heading">

            <div className="employee-settings-card-icon">
              🎨
            </div>

            <div>

              <span>
                APPEARANCE
              </span>

              <h2>
                Theme
              </h2>

            </div>

          </div>


          <p className="employee-settings-description">
            Choose the appearance of your employee portal.
          </p>


          {/* =================================
              THEME OPTIONS
          ================================= */}

          <div className="employee-theme-options">

            {/* LIGHT */}

            <button
              type="button"
              className={
                theme === "light"
                  ? "employee-theme-option selected"
                  : "employee-theme-option"
              }
              onClick={() =>
                setTheme("light")
              }
            >

              <div className="employee-theme-preview light-preview">

                <div className="employee-preview-top">
                </div>

                <div className="employee-preview-content">

                  <span></span>
                  <span></span>
                  <span></span>

                </div>

              </div>


              <div className="employee-theme-info">

                <strong>
                  Light
                </strong>

                <small>
                  Bright and clean
                </small>

              </div>


              <div className="employee-theme-radio">

                {theme === "light"
                  ? "●"
                  : "○"}

              </div>

            </button>


            {/* DARK */}

            <button
              type="button"
              className={
                theme === "dark"
                  ? "employee-theme-option selected"
                  : "employee-theme-option"
              }
              onClick={() =>
                setTheme("dark")
              }
            >

              <div className="employee-theme-preview dark-preview">

                <div className="employee-preview-top">
                </div>

                <div className="employee-preview-content">

                  <span></span>
                  <span></span>
                  <span></span>

                </div>

              </div>


              <div className="employee-theme-info">

                <strong>
                  Dark
                </strong>

                <small>
                  Easy on the eyes
                </small>

              </div>


              <div className="employee-theme-radio">

                {theme === "dark"
                  ? "●"
                  : "○"}

              </div>

            </button>

          </div>

        </section>


        {/* =====================================
            ACCOUNT INFORMATION
        ===================================== */}

        <section className="employee-settings-card">

          <div className="employee-settings-card-heading">

            <div className="employee-settings-card-icon">
              🔒
            </div>

            <div>

              <span>
                ACCOUNT
              </span>

              <h2>
                Account Information
              </h2>

            </div>

          </div>


          <div className="employee-security-info">

            <div>

              <span>
                Role
              </span>

              <strong>
                Employee
              </strong>

            </div>


            <div>

              <span>
                Account Status
              </span>

              <strong className="employee-active-status">
                Active
              </strong>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default EmployeeSettings;