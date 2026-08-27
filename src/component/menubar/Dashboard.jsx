import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  // =========================================
  // GET LOGGED-IN USER
  // =========================================

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const token = localStorage.getItem("token");

  // =========================================
  // TASK STATE
  // =========================================

  const [tasks, setTasks] = useState([]);

  const [loadingTasks, setLoadingTasks] =
    useState(true);

  // =========================================
  // EMPLOYEE CHECK
  // =========================================

  if (!user || user.role !== "employee") {
    navigate("/login");
    return null;
  }

  // =========================================
  // FETCH EMPLOYEE TASKS
  // =========================================

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/my-tasks",
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
    (task) =>
      task.status === "Pending"
  ).length;

  const progressTasks = tasks.filter(
    (task) =>
      task.status === "In Progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) =>
      task.status === "Completed"
  ).length;

  // =========================================
  // WORK STATUS
  // =========================================

  const workStatus =
    user?.workstatus || "Employee";

  // =========================================
  // RENDER
  // =========================================

  return (
    <div className="jkb-dashboard">

      {/* =====================================
          SIDEBAR
      ===================================== */}

      <aside className="dashboard-sidebar">

        {/* ===================================
            BRAND
        =================================== */}

        <div className="dashboard-brand">

          <div className="dashboard-brand-logo">
            JKB
          </div>

          <div className="dashboard-brand-text">

            <strong>
              JKB Company
            </strong>

            <span>
              Employee Portal
            </span>

          </div>

        </div>


        {/* ===================================
            NAVIGATION
        =================================== */}

        <nav className="dashboard-nav">

          {/* MAIN */}

          <div className="dashboard-nav-section">
            MAIN
          </div>


          {/* DASHBOARD */}

          <button
            type="button"
            className="dashboard-nav-item active"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            <span>▣</span>

            <span className="dashboard-nav-text">
              Dashboard
            </span>
          </button>


          {/* MY PROFILE */}

          <button
            type="button"
            className="dashboard-nav-item"
            onClick={() =>
              navigate("/my-profile")
            }
          >
            <span>◉</span>

            <span className="dashboard-nav-text">
              My Profile
            </span>
          </button>


          {/* MY TASKS */}

          <button
            type="button"
            className="dashboard-nav-item"
            onClick={() =>
              navigate("/my-tasks")
            }
          >
            <span>✓</span>

            <span className="dashboard-nav-text">
              My Tasks
            </span>
          </button>


          {/* WORK STATUS */}

          <button
            type="button"
            className="dashboard-nav-item"
            onClick={() =>
              navigate(
                "/employee-work-status"
              )
            }
          >
            <span>◷</span>

            <span className="dashboard-nav-text">
              Work Status
            </span>
          </button>


          {/* ACCOUNT */}

          <div className="dashboard-nav-section">
            ACCOUNT
          </div>


          {/* SETTINGS */}

          <button
            type="button"
            className="dashboard-nav-item"
            onClick={() =>
              navigate(
                "/employee-settings"
              )
            }
          >
            <span>⚙</span>

            <span className="dashboard-nav-text">
              Settings
            </span>
          </button>

        </nav>


        {/* ===================================
            LOGOUT
        =================================== */}

        <button
          type="button"
          className="dashboard-logout"
          onClick={logout}
        >
          <span>↪</span>

          <span>
            Logout
          </span>
        </button>

      </aside>


      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <main className="dashboard-main">

        {/* ===================================
            TOP BAR
        =================================== */}

        <div className="dashboard-topbar">

          <div>

            <span className="dashboard-page-label">
              EMPLOYEE DASHBOARD
            </span>

            <h1>
              Welcome back,{" "}
              {user?.fullname
                ?.split(" ")[0]} 👋
            </h1>

            <p>
              Here's your JKB employee portal
              overview.
            </p>

          </div>


          {/* USER */}

          <div className="dashboard-user">

            <div className="dashboard-user-avatar">

              {user?.fullname
                ?.charAt(0)
                .toUpperCase()}

            </div>

            <div className="dashboard-user-info">

              <strong>
                {user?.fullname}
              </strong>

              <span>
                Employee
              </span>

            </div>

          </div>

        </div>


        {/* ===================================
            WELCOME CARD
        =================================== */}

        <div className="dashboard-welcome-card">

          <div>

            <span>
              JKB EMPLOYEE PORTAL
            </span>

            <h2>
              Your work, organized in one place.
            </h2>

            <p>
              Access your employee information,
              monitor your tasks and keep track
              of your work through the JKB
              dashboard.
            </p>

          </div>


          <div className="dashboard-welcome-icon">
            JKB
          </div>

        </div>


        {/* ===================================
            STATISTICS
        =================================== */}

        <div className="dashboard-stats">

          {/* ACCOUNT */}

          <div className="dashboard-stat-card">

            <div className="dashboard-stat-icon">
              👤
            </div>

            <div>

              <span>
                Account
              </span>

              <strong>
                {
                  user?.status === "inactive"
                    ? "Inactive"
                    : "Active"
                }
              </strong>

            </div>

          </div>


          {/* TOTAL TASKS */}

          <div className="dashboard-stat-card">

            <div className="dashboard-stat-icon">
              ✓
            </div>

            <div>

              <span>
                My Tasks
              </span>

              <strong>
                {loadingTasks
                  ? "..."
                  : tasks.length}
              </strong>

            </div>

          </div>


          {/* PENDING */}

          <div className="dashboard-stat-card">

            <div className="dashboard-stat-icon">
              ●
            </div>

            <div>

              <span>
                Pending
              </span>

              <strong>
                {loadingTasks
                  ? "..."
                  : pendingTasks}
              </strong>

            </div>

          </div>


          {/* COMPLETED */}

          <div className="dashboard-stat-card">

            <div className="dashboard-stat-icon">
              ✓
            </div>

            <div>

              <span>
                Completed
              </span>

              <strong>
                {loadingTasks
                  ? "..."
                  : completedTasks}
              </strong>

            </div>

          </div>

        </div>


        {/* ===================================
            PROFILE + WORK STATUS
        =================================== */}

        <div className="dashboard-content-grid">

          {/* PROFILE */}

          <div className="dashboard-panel">

            <div className="dashboard-panel-header">

              <div>

                <span>
                  MY ACCOUNT
                </span>

                <h2>
                  My Information
                </h2>

              </div>

            </div>


            <div className="dashboard-profile-details">

              <div className="dashboard-detail">

                <span>
                  Full Name
                </span>

                <strong>
                  {user?.fullname || "-"}
                </strong>

              </div>


              <div className="dashboard-detail">

                <span>
                  Email
                </span>

                <strong>
                  {user?.email || "-"}
                </strong>

              </div>


              <div className="dashboard-detail">

                <span>
                  Mobile
                </span>

                <strong>
                  {user?.mobile || "-"}
                </strong>

              </div>


              <div className="dashboard-detail">

                <span>
                  Work Status
                </span>

                <strong>
                  {workStatus}
                </strong>

              </div>

            </div>

          </div>


          {/* WORK STATUS */}

          <div className="dashboard-panel">

            <div className="dashboard-panel-header">

              <div>

                <span>
                  WORK INFORMATION
                </span>

                <h2>
                  Current Status
                </h2>

              </div>

            </div>


            <div className="employee-status-card">

              <div className="employee-status-icon">
                ●
              </div>

              <div>

                <strong>
                  {workStatus}
                </strong>

                <p>
                  Your current work status
                </p>

              </div>

            </div>


            <div className="employee-status-note">

              <span>
                ✓
              </span>

              <p>
                Your work status is managed
                by your JKB administrator.
              </p>

            </div>

          </div>

        </div>


        {/* ===================================
            RECENT TASKS
        =================================== */}

        <div className="dashboard-panel dashboard-tasks-panel">

          <div className="dashboard-panel-header">

            <div>

              <span>
                WORK MANAGEMENT
              </span>

              <h2>
                Recent Tasks
              </h2>

            </div>


            <button
              type="button"
              className="dashboard-view-tasks"
              onClick={() =>
                navigate("/my-tasks")
              }
            >
              View All →
            </button>

          </div>


          {/* LOADING */}

          {loadingTasks ? (

            <div className="dashboard-task-loading">
              Loading tasks...
            </div>


          ) : tasks.length === 0 ? (

            /* EMPTY */

            <div className="dashboard-task-empty">

              <div>
                ✓
              </div>

              <h3>
                No tasks assigned
              </h3>

              <p>
                Tasks assigned by your
                administrator will appear here.
              </p>

            </div>


          ) : (

            /* TASK LIST */

            <div className="dashboard-recent-task-list">

              {tasks
                .slice(0, 3)
                .map((task) => (

                  <div
                    className="dashboard-recent-task"
                    key={task._id}
                  >

                    <div className="dashboard-task-icon">
                      ✓
                    </div>


                    <div className="dashboard-recent-task-info">

                      <strong>
                        {task.title}
                      </strong>

                      <span>
                        Due:{" "}

                        {task.dueDate
                          ? new Date(
                              task.dueDate
                            ).toLocaleDateString()
                          : "-"}
                      </span>

                    </div>


                    <span
                      className={
                        "dashboard-task-status " +
                        (
                          task.status
                            ?.toLowerCase()
                            .replace(
                              " ",
                              "-"
                            ) || ""
                        )
                      }
                    >
                      {task.status}
                    </span>

                  </div>

                ))}

            </div>

          )}

        </div>


        {/* ===================================
            TASK SUMMARY
        =================================== */}

        <div className="dashboard-task-summary">

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
              {progressTasks}
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


        {/* ===================================
            BOTTOM QUICK ACTIONS
        =================================== */}

        <div className="dashboard-panel dashboard-quick-panel">

          <div className="dashboard-panel-header">

            <div>

              <span>
                QUICK ACTIONS
              </span>

              <h2>
                Employee Portal
              </h2>

            </div>

          </div>


          <div className="dashboard-actions">

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
                  View your employee information
                </small>

              </div>

              <b>
                →
              </b>

            </button>


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
                  View your assigned tasks
                </small>

              </div>

              <b>
                →
              </b>

            </button>


            <button
              type="button"
              onClick={() =>
                navigate(
                  "/employee-work-status"
                )
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
                  View your current work status
                </small>

              </div>

              <b>
                →
              </b>

            </button>


            <button
              type="button"
              onClick={() =>
                navigate(
                  "/employee-settings"
                )
              }
            >

              <span>
                ⚙
              </span>

              <div>

                <strong>
                  Settings
                </strong>

                <small>
                  Manage your portal preferences
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

export default Dashboard;