import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MyTasks.css";

function MyTasks() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const token = localStorage.getItem("token");

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingTask, setUpdatingTask] = useState("");

  // =========================================
  // EMPLOYEE CHECK
  // =========================================

  if (!user || user.role !== "employee") {
    navigate("/login");
    return null;
  }


  // =========================================
  // FETCH TASKS
  // =========================================

  const fetchTasks = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        "https://jkbcompany-1.onrender.com/my-tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(
        res.data.tasks || []
      );

    } catch (error) {

      console.error(
        "Unable to fetch tasks:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {
    fetchTasks();
  }, []);


  // =========================================
  // UPDATE TASK STATUS
  // =========================================

  const updateTaskStatus = async (
    taskId,
    status
  ) => {

    try {

      setUpdatingTask(taskId);

      const res = await axios.put(

        `https://jkbcompany-1.onrender.com/my-tasks/${taskId}/status`,

        {
          status,
        },

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }

      );


      alert(
        res.data.message ||
          "Task updated successfully"
      );


      await fetchTasks();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to update task"
      );

    } finally {

      setUpdatingTask("");

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


  // =========================================
  // COUNTS
  // =========================================

  const pendingCount =
    tasks.filter(
      (task) =>
        task.status === "Pending"
    ).length;


  const progressCount =
    tasks.filter(
      (task) =>
        task.status === "In Progress"
    ).length;


  const completedCount =
    tasks.filter(
      (task) =>
        task.status === "Completed"
    ).length;


  return (

    <div className="my-tasks-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <header className="my-tasks-header">

        <div className="my-tasks-brand">

          <div className="my-tasks-logo">
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


        <div className="my-tasks-header-actions">

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

      <main className="my-tasks-main">

        <div className="my-tasks-heading">

          <div>

            <span>
              MY WORK
            </span>

            <h1>
              My Tasks
            </h1>

            <p>
              View your assigned work and
              update your progress.
            </p>

          </div>


          <button
            className="tasks-refresh-button"
            onClick={fetchTasks}
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

        <div className="task-summary">

          <div className="task-summary-card">

            <div className="task-summary-icon">
              ✓
            </div>

            <div>

              <span>
                Total Tasks
              </span>

              <strong>
                {tasks.length}
              </strong>

            </div>

          </div>


          <div className="task-summary-card">

            <div className="task-summary-icon pending">
              ●
            </div>

            <div>

              <span>
                Pending
              </span>

              <strong>
                {pendingCount}
              </strong>

            </div>

          </div>


          <div className="task-summary-card">

            <div className="task-summary-icon progress">
              ◷
            </div>

            <div>

              <span>
                In Progress
              </span>

              <strong>
                {progressCount}
              </strong>

            </div>

          </div>


          <div className="task-summary-card">

            <div className="task-summary-icon completed">
              ✓
            </div>

            <div>

              <span>
                Completed
              </span>

              <strong>
                {completedCount}
              </strong>

            </div>

          </div>

        </div>


        {/* =====================================
            TASK LIST
        ===================================== */}

        <section className="my-tasks-card">

          <div className="my-tasks-card-heading">

            <span>
              ASSIGNED WORK
            </span>

            <h2>
              Your Tasks
            </h2>

          </div>


          {loading ? (

            <div className="my-tasks-message">
              Loading your tasks...
            </div>

          ) : tasks.length === 0 ? (

            <div className="my-tasks-empty">

              <div className="my-tasks-empty-icon">
                ✓
              </div>

              <h3>
                No tasks assigned
              </h3>

              <p>
                Your assigned tasks will appear here.
              </p>

            </div>

          ) : (

            <div className="my-task-list">

              {tasks.map((task) => {

                const isUpdating =
                  updatingTask === task._id;


                return (

                  <div
                    className="my-task-item"
                    key={task._id}
                  >

                    <div className="my-task-icon">
                      ✓
                    </div>


                    <div className="my-task-details">

                      <div className="my-task-title-row">

                        <h3>
                          {task.title}
                        </h3>

                        <span
                          className={
                            `my-task-status ${
                              task.status
                                ?.toLowerCase()
                                .replace(
                                  " ",
                                  "-"
                                )
                            }`
                          }
                        >
                          {task.status}
                        </span>

                      </div>


                      <p>
                        {task.description}
                      </p>


                      <div className="my-task-meta">

                        <span>
                          📅 Due:{" "}
                          {new Date(
                            task.dueDate
                          ).toLocaleDateString()}
                        </span>

                        <span>
                          👤 Assigned by:{" "}
                          {task.createdBy
                            ?.fullname ||
                            "Administrator"}
                        </span>

                      </div>


                      {/* =================================
                          NEXT ACTION
                      ================================= */}

                      <div className="task-status-actions">

                        {task.status ===
                          "Pending" && (

                          <button
                            className="task-start-button"
                            disabled={isUpdating}
                            onClick={() =>
                              updateTaskStatus(
                                task._id,
                                "In Progress"
                              )
                            }
                          >
                            {isUpdating
                              ? "Updating..."
                              : "Start Task →"}
                          </button>

                        )}


                        {task.status ===
                          "In Progress" && (

                          <button
                            className="task-complete-button"
                            disabled={isUpdating}
                            onClick={() =>
                              updateTaskStatus(
                                task._id,
                                "Completed"
                              )
                            }
                          >
                            {isUpdating
                              ? "Updating..."
                              : "Mark Completed ✓"}
                          </button>

                        )}


                        {task.status ===
                          "Completed" && (

                          <div className="task-completed-message">

                            ✓ Task Completed

                            {task.completedAt && (
                              <span>
                                {" "}
                                on{" "}
                                {new Date(
                                  task.completedAt
                                ).toLocaleString()}
                              </span>
                            )}

                          </div>

                        )}

                      </div>

                    </div>

                  </div>

                );

              })}

            </div>

          )}

        </section>

      </main>

    </div>

  );
}

export default MyTasks;