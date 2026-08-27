import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./ViewEmployee.css";

function ViewEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const token = localStorage.getItem("token");

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================================
  // ADMIN CHECK
  // =========================================

  if (!user || user.role !== "admin") {
    navigate("/login");
    return null;
  }

  // =========================================
  // FETCH EMPLOYEE
  // =========================================

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setEmployee(res.data.user);

      } catch (error) {

        console.error(
          "View employee error:",
          error
        );

        alert(
          error.response?.data?.message ||
            "Unable to load employee"
        );

        navigate("/admin/employees");

      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id, token, navigate]);


  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <div className="view-employee-loading">
        Loading employee...
      </div>
    );
  }


  // =========================================
  // EMPLOYEE NOT FOUND
  // =========================================

  if (!employee) {
    return (
      <div className="view-employee-loading">
        Employee not found
      </div>
    );
  }


  return (
    <div className="view-employee-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <header className="view-employee-header">

        <div className="view-employee-brand">

          <div className="view-employee-logo">
            JKB
          </div>

          <div>

            <strong>
              JKB Company
            </strong>

            <span>
              Employee Management
            </span>

          </div>

        </div>


        <div className="view-employee-header-actions">

          <button
            onClick={() =>
              navigate("/admin/employees")
            }
          >
            ← Employees
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Logout
          </button>

        </div>

      </header>


      {/* =====================================
          MAIN
      ===================================== */}

      <main className="view-employee-main">

        <div className="view-employee-heading">

          <span>
            EMPLOYEE PROFILE
          </span>

          <h1>
            Employee Details
          </h1>

          <p>
            View employee information and account status.
          </p>

        </div>


        {/* =====================================
            PROFILE CARD
        ===================================== */}

        <section className="view-employee-card">

          {/* PROFILE HEADER */}

          <div className="view-profile-header">

            <div className="view-profile-avatar">

              {employee.fullname
                ?.charAt(0)
                .toUpperCase()}

            </div>


            <div>

              <h2>
                {employee.fullname}
              </h2>

              <span>
                JKB Employee
              </span>

            </div>


            <div
              className={
                employee.status === "inactive"
                  ? "view-account-status inactive"
                  : "view-account-status active"
              }
            >

              ●{" "}

              {employee.status === "inactive"
                ? "Inactive"
                : "Active"}

            </div>

          </div>


          {/* =================================
              DETAILS
          ================================= */}

          <div className="view-profile-details">

            <div className="view-detail">

              <span>
                Full Name
              </span>

              <strong>
                {employee.fullname || "-"}
              </strong>

            </div>


            <div className="view-detail">

              <span>
                Email Address
              </span>

              <strong>
                {employee.email || "-"}
              </strong>

            </div>


            <div className="view-detail">

              <span>
                Mobile Number
              </span>

              <strong>
                {employee.mobile || "-"}
              </strong>

            </div>


            <div className="view-detail">

              <span>
                Work Status
              </span>

              <strong>
                {employee.workstatus || "-"}
              </strong>

            </div>


            <div className="view-detail">

              <span>
                Role
              </span>

              <strong>
                {employee.role || "employee"}
              </strong>

            </div>


            <div className="view-detail">

              <span>
                Account Status
              </span>

              <strong
                className={
                  employee.status === "inactive"
                    ? "text-inactive"
                    : "text-active"
                }
              >
                {employee.status === "inactive"
                  ? "Inactive"
                  : "Active"}
              </strong>

            </div>


            <div className="view-detail">

              <span>
                Joined On
              </span>

              <strong>
                {employee.createdAt
                  ? new Date(
                      employee.createdAt
                    ).toLocaleDateString()
                  : "-"}
              </strong>

            </div>

          </div>


          {/* =================================
              ADMIN ACTIONS
          ================================= */}

          <div className="view-profile-actions">

            <button
              className="view-edit-button"
              onClick={() =>
                navigate(
                  `/admin/employees/edit/${employee._id}`
                )
              }
            >
              Edit Employee
            </button>


            <button
              className="view-back-button"
              onClick={() =>
                navigate("/admin/employees")
              }
            >
              Back to Employees
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default ViewEmployee;