import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./WorkStatus.css";

function WorkStatus() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const token = localStorage.getItem("token");

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingEmployee, setUpdatingEmployee] = useState("");

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

      const res = await axios.get(
        "https://jkbcompany-1.onrender.com/users",
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

    } catch (error) {
      console.error(
        "Unable to fetch employees:",
        error
      );

      alert(
        error.response?.data?.message ||
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
  // UPDATE WORK STATUS
  // =========================================

  const updateWorkStatus = async (
    employeeId,
    workstatus
  ) => {
    try {
      setUpdatingEmployee(employeeId);

      const res = await axios.put(
        `https://jkbcompany-1.onrender.com/admin/employee/${employeeId}/work-status`,
        {
          workstatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        res.data.message ||
          "Work status updated successfully"
      );

      await fetchEmployees();

    } catch (error) {
      console.error(
        "Work status update error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Unable to update work status"
      );

    } finally {
      setUpdatingEmployee("");
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
    <div className="work-status-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <header className="work-status-header">

        <div className="work-status-brand">

          <div className="work-status-logo">
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


        <div className="work-status-header-actions">

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

      <main className="work-status-main">

        {/* PAGE HEADING */}

        <div className="work-status-heading">

          <div>

            <span>
              ADMINISTRATION
            </span>

            <h1>
              Work Status
            </h1>

            <p>
              Manage the employment status of
              your employees.
            </p>

          </div>


          <button
            className="work-status-refresh"
            onClick={fetchEmployees}
            disabled={loading}
          >
            {loading
              ? "Loading..."
              : "↻ Refresh"}
          </button>

        </div>


        {/* =====================================
            SUMMARY
        ===================================== */}

        <div className="work-status-summary">

          <div className="work-summary-card">

            <div className="work-summary-icon">
              👥
            </div>

            <div>

              <span>
                Employees
              </span>

              <strong>
                {employees.length}
              </strong>

            </div>

          </div>


          <div className="work-summary-card">

            <div className="work-summary-icon">
              ●
            </div>

            <div>

              <span>
                Full Time
              </span>

              <strong>
                {
                  employees.filter(
                    (employee) =>
                      employee.workstatus ===
                      "Full Time"
                  ).length
                }
              </strong>

            </div>

          </div>


          <div className="work-summary-card">

            <div className="work-summary-icon">
              ◷
            </div>

            <div>

              <span>
                Part Time
              </span>

              <strong>
                {
                  employees.filter(
                    (employee) =>
                      employee.workstatus ===
                      "Part Time"
                  ).length
                }
              </strong>

            </div>

          </div>


          <div className="work-summary-card">

            <div className="work-summary-icon">
              ✓
            </div>

            <div>

              <span>
                Interns
              </span>

              <strong>
                {
                  employees.filter(
                    (employee) =>
                      employee.workstatus ===
                      "Intern"
                  ).length
                }
              </strong>

            </div>

          </div>

        </div>


        {/* =====================================
            WORK STATUS TABLE
        ===================================== */}

        <section className="work-status-card">

          <div className="work-status-card-heading">

            <div>

              <span>
                WORKFORCE
              </span>

              <h2>
                Employee Work Status
              </h2>

              <p>
                Change an employee's employment type
                without affecting their account access.
              </p>

            </div>

          </div>


          {loading ? (

            <div className="work-status-message">
              Loading employees...
            </div>

          ) : employees.length === 0 ? (

            <div className="work-status-empty">

              <div>
                👥
              </div>

              <h3>
                No employees found
              </h3>

              <p>
                Add an employee first to manage
                their work status.
              </p>

              <button
                onClick={() =>
                  navigate(
                    "/admin/employees/add"
                  )
                }
              >
                + Add Employee
              </button>

            </div>

          ) : (

            <div className="work-status-table-wrapper">

              <table className="work-status-table">

                <thead>

                  <tr>

                    <th>
                      Employee
                    </th>

                    <th>
                      Email
                    </th>

                    <th>
                      Account Status
                    </th>

                    <th>
                      Current Work Status
                    </th>

                    <th>
                      Change Status
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {employees.map(
                    (employee) => {

                      const inactive =
                        employee.status ===
                        "inactive";

                      return (

                        <tr
                          key={employee._id}
                        >

                          {/* EMPLOYEE */}

                          <td>

                            <div className="work-employee-cell">

                              <div className="work-employee-avatar">

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


                          {/* EMAIL */}

                          <td>
                            {employee.email}
                          </td>


                          {/* ACCOUNT STATUS */}

                          <td>

                            <span
                              className={
                                inactive
                                  ? "work-account-status inactive"
                                  : "work-account-status active"
                              }
                            >
                              {inactive
                                ? "Inactive"
                                : "Active"}
                            </span>

                          </td>


                          {/* CURRENT WORK STATUS */}

                          <td>

                            <span className="current-work-status">
                              {employee.workstatus}
                            </span>

                          </td>


                          {/* CHANGE STATUS */}

                          <td>

                            <select
                              className="work-status-select"
                              value={
                                employee.workstatus ||
                                "Employee"
                              }
                              disabled={
                                updatingEmployee ===
                                employee._id
                              }
                              onChange={(e) =>
                                updateWorkStatus(
                                  employee._id,
                                  e.target.value
                                )
                              }
                            >

                              <option value="Employee">
                                Employee
                              </option>

                              <option value="Full Time">
                                Full Time
                              </option>

                              <option value="Part Time">
                                Part Time
                              </option>

                              <option value="Intern">
                                Intern
                              </option>

                            </select>

                            {updatingEmployee ===
                              employee._id && (

                              <span className="status-updating">
                                Saving...
                              </span>

                            )}

                          </td>

                        </tr>

                      );

                    }
                  )}

                </tbody>

              </table>

            </div>

          )}

        </section>


        {/* =====================================
            INFORMATION
        ===================================== */}

        <div className="work-status-info">

          <div className="work-info-icon">
            ℹ
          </div>

          <div>

            <strong>
              Work Status vs Account Status
            </strong>

            <p>
              Work Status describes the employee's
              employment type, such as Full Time,
              Part Time or Intern. Account Status
              controls whether the employee can
              access the JKB portal.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}

export default WorkStatus;