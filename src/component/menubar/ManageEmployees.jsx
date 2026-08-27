import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ManageEmployees.css";

function ManageEmployees() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const token = localStorage.getItem("token");

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [error, setError] = useState("");

  // =========================================
  // ADMIN CHECK
  // =========================================

  if (!user || user.role !== "admin") {
    navigate("/login");
    return null;
  }

  // =========================================
  // FETCH EMPLOYEES
  // =========================================

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        "http://localhost:5000/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const employeeUsers = (
        res.data.users || []
      ).filter(
        (item) => item.role === "employee"
      );

      setEmployees(employeeUsers);

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to load employees"
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // =========================================
  // ACTIVATE / DEACTIVATE
  // =========================================

  const changeEmployeeStatus = async (
    employeeId,
    currentStatus
  ) => {
    const isActive =
      currentStatus !== "inactive";

    const action = isActive
      ? "deactivate"
      : "activate";

    const confirmMessage = isActive
      ? "Are you sure you want to deactivate this employee?"
      : "Are you sure you want to activate this employee?";

    const confirmed =
      window.confirm(confirmMessage);

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(employeeId);

      await axios.put(
        `http://localhost:5000/admin/employee/${employeeId}/${action}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        isActive
          ? "Employee deactivated successfully"
          : "Employee activated successfully"
      );

      await fetchEmployees();

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          `Unable to ${action} employee`
      );

    } finally {
      setActionLoading("");
    }
  };

  // =========================================
  // LOGOUT
  // =========================================

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="manage-employees-page">

      {/* ======================================
          HEADER
      ====================================== */}

      <header className="manage-employees-header">

        <div className="manage-brand">

          <div className="manage-logo">
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

        <div className="manage-header-actions">

          <button
            className="back-dashboard-button"
            onClick={() =>
              navigate("/admin-dashboard")
            }
          >
            ← Dashboard
          </button>

          <button
            className="manage-logout-button"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </header>


      {/* ======================================
          MAIN
      ====================================== */}

      <main className="manage-employees-main">

        {/* ====================================
            PAGE HEADING
        ==================================== */}

        <div className="manage-page-heading">

          <div>

            <span>
              ADMINISTRATION
            </span>

            <h1>
              Manage Employees
            </h1>

            <p>
              View employee accounts and manage
              their access to the JKB portal.
            </p>

          </div>


          {/* ADD EMPLOYEE */}

          <button
            className="add-employee-main-button"
            onClick={() =>
              navigate(
                "/admin/employees/add"
              )
            }
          >
            + Add Employee
          </button>

        </div>


        {/* ======================================
            SUMMARY
        ====================================== */}

        <div className="employee-summary">

          {/* TOTAL */}

          <div className="employee-summary-card">

            <span>
              👥
            </span>

            <div>

              <small>
                Total Employees
              </small>

              <strong>
                {employees.length}
              </strong>

            </div>

          </div>


          {/* ACTIVE */}

          <div className="employee-summary-card">

            <span>
              ●
            </span>

            <div>

              <small>
                Active Employees
              </small>

              <strong>
                {
                  employees.filter(
                    (employee) =>
                      employee.status !==
                      "inactive"
                  ).length
                }
              </strong>

            </div>

          </div>


          {/* INACTIVE */}

          <div className="employee-summary-card">

            <span>
              ○
            </span>

            <div>

              <small>
                Inactive Employees
              </small>

              <strong>
                {
                  employees.filter(
                    (employee) =>
                      employee.status ===
                      "inactive"
                  ).length
                }
              </strong>

            </div>

          </div>

        </div>


        {/* ======================================
            EMPLOYEE TABLE
        ====================================== */}

        <div className="employee-table-card">

          <div className="employee-table-heading">

            <div>

              <span>
                WORKFORCE
              </span>

              <h2>
                Employee List
              </h2>

            </div>

            <button
              onClick={fetchEmployees}
              className="refresh-button"
              disabled={loading}
            >
              {loading
                ? "Loading..."
                : "↻ Refresh"}
            </button>

          </div>


          {/* ====================================
              LOADING
          ==================================== */}

          {loading ? (

            <div className="manage-message">
              Loading employees...
            </div>


          ) : error ? (

            /* ==================================
               ERROR
            ================================== */

            <div className="manage-error">
              {error}
            </div>


          ) : employees.length === 0 ? (

            /* ==================================
               EMPTY
            ================================== */

            <div className="manage-empty">

              <div className="empty-icon">
                👥
              </div>

              <h3>
                No employees found
              </h3>

              <p>
                Add your first employee to the portal.
              </p>

              <button
                onClick={() =>
                  navigate(
                    "/admin/employees/add"
                  )
                }
              >
                Add Employee
              </button>

            </div>


          ) : (

            /* ==================================
               TABLE
            ================================== */

            <div className="employee-table-wrapper">

              <table className="employee-table">

                {/* =================================
                    TABLE HEADER
                ================================= */}

                <thead>

                  <tr>

                    <th>
                      Employee
                    </th>

                    <th>
                      Email
                    </th>

                    <th>
                      Mobile
                    </th>

                    <th>
                      Work Status
                    </th>

                    <th>
                      Account Status
                    </th>

                    <th>
                      Actions
                    </th>

                  </tr>

                </thead>


                {/* =================================
                    TABLE BODY
                ================================= */}

                <tbody>

                  {employees.map(
                    (employee) => {

                      const isInactive =
                        employee.status ===
                        "inactive";

                      return (

                        <tr
                          key={employee._id}
                        >

                          {/* =========================
                              EMPLOYEE
                          ========================= */}

                          <td>

                            <div className="employee-name-cell">

                              <div className="employee-avatar">

                                {employee.fullname
                                  ?.charAt(0)
                                  .toUpperCase()}

                              </div>

                              <div>

                                <strong>
                                  {employee.fullname}
                                </strong>

                                <small>
                                  Employee
                                </small>

                              </div>

                            </div>

                          </td>


                          {/* =========================
                              EMAIL
                          ========================= */}

                          <td>
                            {employee.email}
                          </td>


                          {/* =========================
                              MOBILE
                          ========================= */}

                          <td>
                            {employee.mobile}
                          </td>


                          {/* =========================
                              WORK STATUS
                          ========================= */}

                          <td>

                            <span className="work-status-badge">
                              {employee.workstatus}
                            </span>

                          </td>


                          {/* =========================
                              ACCOUNT STATUS
                          ========================= */}

                          <td>

                            <span
                              className={
                                isInactive
                                  ? "account-status-badge inactive"
                                  : "account-status-badge active"
                              }
                            >
                              {isInactive
                                ? "Inactive"
                                : "Active"}
                            </span>

                          </td>


                          {/* =========================
                              ACTIONS
                          ========================= */}

                          <td>

                            <div className="employee-action-buttons">

                              {/* VIEW */}

                              <button
                                className="view-employee-button"
                                onClick={() =>
                                  navigate(
                                    `/admin/employees/view/${employee._id}`
                                  )
                                }
                              >
                                View
                              </button>


                              {/* EDIT */}

                              <button
                                className="edit-employee-button"
                                onClick={() =>
                                  navigate(
                                    `/admin/employees/edit/${employee._id}`
                                  )
                                }
                              >
                                Edit
                              </button>


                              {/* ACTIVATE / DEACTIVATE */}

                              <button
                                className={
                                  isInactive
                                    ? "activate-button"
                                    : "deactivate-button"
                                }
                                disabled={
                                  actionLoading ===
                                  employee._id
                                }
                                onClick={() =>
                                  changeEmployeeStatus(
                                    employee._id,
                                    employee.status
                                  )
                                }
                              >

                                {actionLoading ===
                                employee._id
                                  ? "Updating..."
                                  : isInactive
                                  ? "Activate"
                                  : "Deactivate"}

                              </button>

                            </div>

                          </td>

                        </tr>

                      );

                    }
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </main>

    </div>
  );
}

export default ManageEmployees;