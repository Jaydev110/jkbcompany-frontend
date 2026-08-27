import { useNavigate } from "react-router-dom";
import "./AdminProfile.css";

function AdminProfile() {
  const navigate = useNavigate();

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
    <div className="admin-profile-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <header className="admin-profile-header">

        <div className="admin-profile-brand">

          <div className="admin-profile-logo">
            JKB
          </div>

          <div>
            <strong>
              JKB Company
            </strong>

            <span>
              Administrator Portal
            </span>
          </div>

        </div>


        <div className="admin-profile-header-actions">

          <button
            type="button"
            onClick={() =>
              navigate("/admin-settings")
            }
          >
            ← Settings
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

      <main className="admin-profile-main">

        {/* HEADING */}

        <div className="admin-profile-heading">

          <span>
            ADMINISTRATOR ACCOUNT
          </span>

          <h1>
            Admin Profile
          </h1>

          <p>
            View your administrator account information.
          </p>

        </div>


        {/* =====================================
            PROFILE CARD
        ===================================== */}

        <section className="admin-profile-card">

          {/* PROFILE HEADER */}

          <div className="admin-profile-card-header">

            <div className="admin-profile-avatar">

              {user?.fullname
                ?.charAt(0)
                .toUpperCase()}

            </div>


            <div className="admin-profile-name">

              <h2>
                {user?.fullname || "Administrator"}
              </h2>

              <span>
                JKB Company Administrator
              </span>

            </div>


            <div className="admin-profile-status">
              ● Active
            </div>

          </div>


          {/* =================================
              INFORMATION
          ================================= */}

          <div className="admin-profile-details">

            {/* FULL NAME */}

            <div className="admin-profile-field">

              <span>
                Full Name
              </span>

              <strong>
                {user?.fullname || "-"}
              </strong>

            </div>


            {/* EMAIL */}

            <div className="admin-profile-field">

              <span>
                Email Address
              </span>

              <strong>
                {user?.email || "-"}
              </strong>

            </div>


            {/* MOBILE */}

            <div className="admin-profile-field">

              <span>
                Mobile Number
              </span>

              <strong>
                {user?.mobile || "-"}
              </strong>

            </div>


            {/* WORK STATUS */}

            <div className="admin-profile-field">

              <span>
                Work Status
              </span>

              <strong>
                {user?.workstatus || "-"}
              </strong>

            </div>


            {/* ROLE */}

            <div className="admin-profile-field">

              <span>
                Account Role
              </span>

              <strong className="admin-role">
                Administrator
              </strong>

            </div>


            {/* STATUS */}

            <div className="admin-profile-field">

              <span>
                Account Status
              </span>

              <strong className="admin-active">
                Active
              </strong>

            </div>

          </div>


          {/* =================================
              SECURITY INFORMATION
          ================================= */}

          <div className="admin-profile-security">

            <div className="admin-security-icon">
              🔒
            </div>

            <div>

              <strong>
                Administrator Access
              </strong>

              <p>
                This account has administrator
                privileges for managing employees,
                tasks and portal access.
              </p>

            </div>

          </div>


          {/* =================================
              ACTIONS
          ================================= */}

          <div className="admin-profile-actions">

            <button
              type="button"
              className="admin-profile-dashboard-button"
              onClick={() =>
                navigate("/admin-dashboard")
              }
            >
              Go to Dashboard
            </button>


            <button
              type="button"
              className="admin-profile-settings-button"
              onClick={() =>
                navigate("/admin-settings")
              }
            >
              Account Settings
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminProfile;