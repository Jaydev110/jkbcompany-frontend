import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const token = localStorage.getItem("token");

  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [loadingEmployees, setLoadingEmployees] =
    useState(true);

  const [loadingTasks, setLoadingTasks] =
    useState(true);

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

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
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
      } finally {
        setLoadingEmployees(false);
      }
    };

    fetchEmployees();
  }, [token]);


  // =========================================
  // FETCH TASKS
  // =========================================

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          "https://jkbcompany-1.onrender.com/admin/tasks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTasks(res.data.tasks || []);

      } catch (error) {
        console.error(
          "Unable to fetch tasks:",
          error
        );
      } finally {
        setLoadingTasks(false);
      }
    };

    fetchTasks();
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
  // TASK COUNTS
  // =========================================

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;


  return (
    <div className="jkb-admin-dashboard">

      {/* =====================================
          SIDEBAR
      ===================================== */}

      <aside className="admin-sidebar">

        {/* BRAND */}

        <div className="admin-brand">

          <div className="admin-logo">
            JKB
          </div>

          <div className="admin-brand-text">

            <strong>
              JKB Company
            </strong>

            <span>
              Admin Portal
            </span>

          </div>

        </div>


        {/* NAVIGATION */}

        <nav className="admin-nav">

          <div className="admin-nav-title">
            MAIN
          </div>


          {/* DASHBOARD */}

          <button
            className="admin-nav-item active"
            onClick={() =>
              navigate("/admin-dashboard")
            }
          >
            <span>▣</span>
            Dashboard
          </button>


          {/* EMPLOYEES */}

          <button
            className="admin-nav-item"
            onClick={() =>
              navigate("/admin/employees")
            }
          >
            <span>👥</span>
            Manage Employees
          </button>


          {/* TASKS */}

          <button
            className="admin-nav-item"
            onClick={() =>
              navigate("/admin/tasks")
            }
          >
            <span>✓</span>
            Tasks
          </button>


          {/* WORK STATUS */}

         <button
  className="admin-nav-item"
  onClick={() =>
    navigate("/admin/work-status")
  }
>
  <span>◷</span>
  Work Status
</button>


          <div className="admin-nav-title">
            ACCOUNT
          </div>


          {/* SETTINGS */}

          <button
  className="admin-nav-item"
  onClick={() =>
    navigate("/admin-settings")
  }
>
  <span>⚙</span>
  Settings
</button>
        </nav>


        {/* LOGOUT */}

        <button
          className="admin-logout"
          onClick={logout}
        >
          <span>↪</span>
          Logout
        </button>

      </aside>


      {/* =====================================
          MAIN
      ===================================== */}

      <main className="admin-main">

        {/* TOP BAR */}

        <div className="admin-topbar">

          <div>

            <span className="admin-page-label">
              ADMINISTRATOR
            </span>

            <h1>
              Welcome back,{" "}
              {user?.fullname?.split(" ")[0]} 👋
            </h1>

            <p>
              Manage your JKB Employee Management Portal.
            </p>

          </div>


          {/* USER */}

          <div className="admin-user">

            <div className="admin-user-avatar">

              {user?.fullname
                ?.charAt(0)
                .toUpperCase()}

            </div>

            <div className="admin-user-info">

              <strong>
                {user?.fullname}
              </strong>

              <span>
                Administrator
              </span>

            </div>

          </div>

        </div>


        {/* =====================================
            WELCOME
        ===================================== */}

        <div className="admin-welcome-card">

          <div>

            <span>
              JKB ADMIN PORTAL
            </span>

            <h2>
              Manage your workforce efficiently.
            </h2>

            <p>
              Add employees, manage employee
              information and organize work from
              one centralized platform.
            </p>

          </div>

          <div className="admin-welcome-logo">
            JKB
          </div>

        </div>


        {/* =====================================
            STATISTICS
        ===================================== */}

        <div className="admin-stats">

          {/* EMPLOYEES */}

          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              👥
            </div>

            <div>

              <span>
                Total Employees
              </span>

              <strong>
                {loadingEmployees
                  ? "..."
                  : employees.length}
              </strong>

            </div>

          </div>


          {/* ACTIVE EMPLOYEES */}

          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              ✓
            </div>

            <div>

              <span>
                Active Employees
              </span>

              <strong>
                {loadingEmployees
                  ? "..."
                  : employees.filter(
                      (employee) =>
                        employee.status !==
                        "inactive"
                    ).length}
              </strong>

            </div>

          </div>


          {/* TOTAL TASKS */}

          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              ✓
            </div>

            <div>

              <span>
                Total Tasks
              </span>

              <strong>
                {loadingTasks
                  ? "..."
                  : tasks.length}
              </strong>

            </div>

          </div>


          {/* PENDING */}

          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              ●
            </div>

            <div>

              <span>
                Pending Tasks
              </span>

              <strong>
                {loadingTasks
                  ? "..."
                  : pendingTasks}
              </strong>

            </div>

          </div>

        </div>


        {/* =====================================
            TASK OVERVIEW
        ===================================== */}

        <div className="admin-panel">

          <div className="admin-panel-heading">

            <div>

              <span>
                WORK MANAGEMENT
              </span>

              <h2>
                Task Overview
              </h2>

            </div>

            <button
              className="admin-view-all"
              onClick={() =>
                navigate("/admin/tasks")
              }
            >
              Manage Tasks →
            </button>

          </div>


          <div className="admin-task-overview">

            <div>

              <span>
                TOTAL
              </span>

              <strong>
                {tasks.length}
              </strong>

            </div>


            <div>

              <span>
                PENDING
              </span>

              <strong>
                {pendingTasks}
              </strong>

            </div>


            <div>

              <span>
                IN PROGRESS
              </span>

              <strong>
                {inProgressTasks}
              </strong>

            </div>


            <div>

              <span>
                COMPLETED
              </span>

              <strong>
                {completedTasks}
              </strong>

            </div>

          </div>

        </div>


        {/* =====================================
            EMPLOYEES
        ===================================== */}

        <div className="admin-panel">

          <div className="admin-panel-heading">

            <div>

              <span>
                WORKFORCE
              </span>

              <h2>
                Employees
              </h2>

            </div>

            <button
              className="admin-view-all"
              onClick={() =>
                navigate("/admin/employees")
              }
            >
              View All →
            </button>

          </div>


          {loadingEmployees ? (

            <p className="admin-loading">
              Loading employees...
            </p>

          ) : employees.length === 0 ? (

            <div className="admin-empty">

              <div>
                👥
              </div>

              <h3>
                No employees yet
              </h3>

              <p>
                Add your first employee to get started.
              </p>

              <button
                onClick={() =>
                  navigate("/admin/employees")
                }
              >
                Manage Employees
              </button>

            </div>

          ) : (

            <div className="admin-employee-list">

              {employees.slice(0, 4).map(
                (employee) => (

                  <div
                    className="admin-employee-row"
                    key={employee._id}
                  >

                    <div className="admin-employee-avatar">
                      {employee.fullname
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="admin-employee-info">

                      <strong>
                        {employee.fullname}
                      </strong>

                      <span>
                        {employee.email}
                      </span>

                    </div>

                    <div className="admin-employee-status">

                      <span>
                        {employee.status ===
                        "inactive"
                          ? "Inactive"
                          : "Active"}
                      </span>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>


        {/* =====================================
            QUICK ACTIONS
        ===================================== */}

        <div className="admin-panel">

          <div className="admin-panel-heading">

            <span>
              ADMINISTRATION
            </span>

            <h2>
              Quick Actions
            </h2>

          </div>


          <div className="admin-actions">

            <button
              onClick={() =>
                navigate("/admin/employees")
              }
            >

              <span>
                👥
              </span>

              <div>

                <strong>
                  Manage Employees
                </strong>

                <small>
                  View and add employees
                </small>

              </div>

              <b>
                →
              </b>

            </button>


            <button
              onClick={() =>
                navigate("/admin/tasks")
              }
            >

              <span>
                ✓
              </span>

              <div>

                <strong>
                  Manage Tasks
                </strong>

                <small>
                  Assign and track employee tasks
                </small>

              </div>

              <b>
                →
              </b>

            </button>


           <button
  onClick={() =>
    navigate("/admin/work-status")
  }
>
  <span>
    ◷
  </span>

  <div>
    <strong>
      Work Status
    </strong>

    <small>
      Monitor employee work status
    </small>
  </div>

  <b>
    →
  </b>
</button>

          </div>

        </div>

      </main>

    </div>
  );
}

export default AdminDashboard;