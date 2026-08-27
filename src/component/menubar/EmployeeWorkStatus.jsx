import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EmployeeWorkStatus.css";

function EmployeeWorkStatus() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const token = localStorage.getItem("token");

  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(true);

  // =========================================
  // EMPLOYEE CHECK
  // =========================================

  if (!user || user.role !== "employee") {
    navigate("/login");
    return null;
  }

  // =========================================
  // FETCH CURRENT EMPLOYEE INFORMATION
  // =========================================

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/my-profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.user) {
          setProfile(res.data.user);

          localStorage.setItem(
            "user",
            JSON.stringify(res.data.user)
          );
        }
      } catch (error) {
        console.error(
          "Unable to fetch work status:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  // =========================================
  // LOGOUT
  // =========================================

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login");
  };

  // =========================================
  // STATUS DESCRIPTION
  // =========================================

  const getStatusDescription = (status) => {
    switch (status) {
      case "Full Time":
        return "You are currently working as a full-time employee.";

      case "Part Time":
        return "You are currently working as a part-time employee.";

      case "Intern":
        return "You are currently registered as an intern.";

      case "Employee":
        return "You are currently registered as an employee.";

      default:
        return "Your current employment status is shown below.";
    }
  };

  if (loading) {
    return (
      <div className="employee-work-status-loading">
        Loading work status...
      </div>
    );
  }

  return (
    <div className="employee-work-status-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <header className="employee-work-status-header">

        <div className="employee-work-status-brand">

          <div className="employee-work-status-logo">
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

        <div className="employee-work-status-header-actions">

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

      <main className="employee-work-status-main">

        {/* PAGE HEADING */}

        <div className="employee-work-status-heading">

          <span>
            MY WORK INFORMATION
          </span>

          <h1>
            Work Status
          </h1>

          <p>
            View your current employment status at JKB Company.
          </p>

        </div>


        {/* =====================================
            STATUS CARD
        ===================================== */}

        <section className="employee-current-status-card">

          <div className="employee-current-status-top">

            <div className="employee-current-status-icon">
              ◷
            </div>

            <div>

              <span>
                CURRENT WORK STATUS
              </span>

              <h2>
                {profile?.workstatus || "Employee"}
              </h2>

            </div>

            <div className="employee-status-badge">
              Active
            </div>

          </div>


          <div className="employee-status-description">

            <p>
              {getStatusDescription(
                profile?.workstatus
              )}
            </p>

          </div>

        </section>


        {/* =====================================
            EMPLOYEE INFORMATION
        ===================================== */}

        <section className="employee-work-information-card">

          <div className="employee-work-card-heading">

            <span>
              EMPLOYEE INFORMATION
            </span>

            <h2>
              Current Details
            </h2>

          </div>


          <div className="employee-work-details">

            <div className="employee-work-detail">

              <span>
                Full Name
              </span>

              <strong>
                {profile?.fullname || "-"}
              </strong>

            </div>


            <div className="employee-work-detail">

              <span>
                Email
              </span>

              <strong>
                {profile?.email || "-"}
              </strong>

            </div>


            <div className="employee-work-detail">

              <span>
                Mobile
              </span>

              <strong>
                {profile?.mobile || "-"}
              </strong>

            </div>


            <div className="employee-work-detail">

              <span>
                Work Status
              </span>

              <strong className="employee-work-status-value">
                {profile?.workstatus || "Employee"}
              </strong>

            </div>


            <div className="employee-work-detail">

              <span>
                Account Role
              </span>

              <strong>
                Employee
              </strong>

            </div>


            <div className="employee-work-detail">

              <span>
                Account Status
              </span>

              <strong className="employee-active-value">
                Active
              </strong>

            </div>

          </div>

        </section>


        {/* =====================================
            NOTICE
        ===================================== */}

        <div className="employee-work-status-notice">

          <div className="employee-notice-icon">
            ℹ
          </div>

          <div>

            <strong>
              Work Status is managed by your administrator
            </strong>

            <p>
              Your employment status can be updated
              by an authorized JKB administrator. Contact
              your administrator if your work status needs
              to be changed.
            </p>

          </div>

        </div>


        {/* =====================================
            QUICK ACTIONS
        ===================================== */}

        <div className="employee-work-quick-actions">

          <button
            type="button"
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
                View assigned work
              </small>

            </div>

            →

          </button>


          <button
            type="button"
            onClick={() =>
              navigate("/my-profile")
            }
          >

            <span>
              👤
            </span>

            <div>

              <strong>
                My Profile
              </strong>

              <small>
                View your account information
              </small>

            </div>

            →

          </button>

        </div>

      </main>

    </div>
  );
}

export default EmployeeWorkStatus;