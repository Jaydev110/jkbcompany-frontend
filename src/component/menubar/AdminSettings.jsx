import { useNavigate } from "react-router-dom";
import { useTheme } from "../../ThemeContext";
import "./AdminSettings.css";

function AdminSettings() {
  const navigate = useNavigate();

  const {
    theme,
    setTheme,
  } = useTheme();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );


  // =========================================
  // ADMIN CHECK
  // =========================================

  if (!user || user.role !== "admin") {
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
    <div className="admin-settings-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <header className="admin-settings-header">

        <div className="admin-settings-brand">

          <div className="admin-settings-logo">
            JKB
          </div>

          <div>

            <strong>
              JKB Company
            </strong>

            <span>
              Admin Portal
            </span>

          </div>

        </div>


        <div className="admin-settings-header-actions">

          <button
            onClick={() =>
              navigate("/admin-dashboard")
            }
          >
            ← Dashboard
          </button>

          <button
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </header>


      {/* =====================================
          MAIN
      ===================================== */}

      <main className="admin-settings-main">

        {/* HEADING */}

        <div className="admin-settings-heading">

          <span>
            ACCOUNT SETTINGS
          </span>

          <h1>
            Settings
          </h1>

          <p>
            Manage your JKB portal preferences.
          </p>

        </div>


        {/* =====================================
            PROFILE
        ===================================== */}

        <section className="settings-card">

          <div className="settings-card-heading">

            <div className="settings-card-icon">
              👤
            </div>

            <div>

              <span>
                ADMINISTRATOR
              </span>

              <h2>
                Profile
              </h2>

            </div>

          </div>


          <div className="settings-profile">

            <div className="settings-avatar">

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
              onClick={() =>
                navigate("/admin-profile")
              }
            >
              View Profile
            </button>

          </div>

        </section>


        {/* =====================================
            APPEARANCE
        ===================================== */}

        <section className="settings-card">

          <div className="settings-card-heading">

            <div className="settings-card-icon">
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


          <p className="settings-description">
            Select a theme for the entire JKB
            Employee Management Portal.
          </p>


          {/* =================================
              THEME OPTIONS
          ================================= */}

          <div className="theme-options">

            {/* LIGHT */}

            <button
              type="button"
              className={
                theme === "light"
                  ? "theme-option selected"
                  : "theme-option"
              }
              onClick={() =>
                setTheme("light")
              }
            >

              <div className="theme-preview light-preview">

                <div className="preview-top">
                </div>

                <div className="preview-content">

                  <span></span>
                  <span></span>
                  <span></span>

                </div>

              </div>


              <div className="theme-option-info">

                <strong>
                  Light
                </strong>

                <small>
                  Bright and clean
                </small>

              </div>


              <div className="theme-radio">

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
                  ? "theme-option selected"
                  : "theme-option"
              }
              onClick={() =>
                setTheme("dark")
              }
            >

              <div className="theme-preview dark-preview">

                <div className="preview-top">
                </div>

                <div className="preview-content">

                  <span></span>
                  <span></span>
                  <span></span>

                </div>

              </div>


              <div className="theme-option-info">

                <strong>
                  Dark
                </strong>

                <small>
                  Easy on the eyes
                </small>

              </div>


              <div className="theme-radio">

                {theme === "dark"
                  ? "●"
                  : "○"}

              </div>

            </button>

          </div>

        </section>


        {/* =====================================
            SECURITY
        ===================================== */}

        <section className="settings-card">

          <div className="settings-card-heading">

            <div className="settings-card-icon">
              🔒
            </div>

            <div>

              <span>
                SECURITY
              </span>

              <h2>
                Account Security
              </h2>

            </div>

          </div>


          <div className="security-info">

            <div>

              <span>
                Account Role
              </span>

              <strong>
                Administrator
              </strong>

            </div>


            <div>

              <span>
                Account Status
              </span>

              <strong className="security-active">
                Active
              </strong>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminSettings;