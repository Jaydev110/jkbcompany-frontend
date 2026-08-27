import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyProfile.css";

function MyProfile() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const [showEmail, setShowEmail] = useState(false);

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
    <div className="my-profile-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <header className="my-profile-header">

        <div className="my-profile-brand">

          <div className="my-profile-logo">
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


        <div className="my-profile-header-actions">

          <button
            onClick={() =>
              navigate("/dashboard")
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

      <main className="my-profile-main">

        {/* PAGE HEADING */}

        <div className="my-profile-heading">

          <span>
            MY ACCOUNT
          </span>

          <h1>
            My Profile
          </h1>

          <p>
            View your employee information and
            account details.
          </p>

        </div>


        {/* =====================================
            PROFILE CARD
        ===================================== */}

        <section className="my-profile-card">

          {/* PROFILE HEADER */}

          <div className="my-profile-card-header">

            <div className="my-profile-avatar">

              {user?.fullname
                ?.charAt(0)
                .toUpperCase()}

            </div>


            <div>

              <h2>
                {user?.fullname}
              </h2>

              <span>
                JKB Employee
              </span>

            </div>


            <div className="my-profile-status">

              <span>
                ●
              </span>

              Active

            </div>

          </div>


          {/* =================================
              INFORMATION
          ================================= */}

          <div className="my-profile-information">

            {/* FULL NAME */}

            <div className="profile-field">

              <span>
                Full Name
              </span>

              <strong>
                {user?.fullname || "-"}
              </strong>

            </div>


            {/* EMAIL */}

            <div className="profile-field">

              <span>
                Email Address
              </span>

              <strong>
                {showEmail
                  ? user?.email
                  : user?.email
                      ?.replace(
                        /^(.{2}).*(@.*)$/,
                        "$1****$2"
                      ) || "-"}
              </strong>

              <button
                className="profile-small-button"
                onClick={() =>
                  setShowEmail(
                    !showEmail
                  )
                }
              >
                {showEmail
                  ? "Hide"
                  : "Show"}
              </button>

            </div>


            {/* MOBILE */}

            <div className="profile-field">

              <span>
                Mobile Number
              </span>

              <strong>
                {user?.mobile || "-"}
              </strong>

            </div>


            {/* WORK STATUS */}

            <div className="profile-field">

              <span>
                Work Status
              </span>

              <strong>
                {user?.workstatus || "-"}
              </strong>

            </div>


            {/* ROLE */}

            <div className="profile-field">

              <span>
                Account Role
              </span>

              <strong>
                Employee
              </strong>

            </div>


            {/* ACCOUNT STATUS */}

            <div className="profile-field">

              <span>
                Account Status
              </span>

              <strong className="profile-active">
                Active
              </strong>

            </div>

          </div>


          {/* =================================
              SECURITY NOTE
          ================================= */}

          <div className="profile-security-note">

            <div>
              🔒
            </div>

            <div>

              <strong>
                Account Security
              </strong>

              <p>
                Your account is managed by the
                JKB Company administrator. Contact
                your administrator if you need to
                update account information.
              </p>

            </div>

          </div>

        </section>


        {/* =====================================
            QUICK LINKS
        ===================================== */}

        <div className="profile-quick-links">

          <button
            onClick={() =>
              navigate("/my-tasks")
            }
          >

            <span>
              ✓
            </span>

            <div>

              <strong>
                My Tasks
              </strong>

              <small>
                View your assigned work
              </small>

            </div>

            →
          </button>


          <button
            onClick={() =>
              navigate("/dashboard")
            }
          >

            <span>
              ▣
            </span>

            <div>

              <strong>
                Dashboard
              </strong>

              <small>
                Return to your dashboard
              </small>

            </div>

            →
          </button>

        </div>

      </main>

    </div>
  );
}

export default MyProfile;