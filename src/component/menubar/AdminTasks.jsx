import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminTasks.css";

function AdminTasks() {
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

  const [submitting, setSubmitting] =
    useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    dueDate: "",
  });

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
      setLoadingEmployees(true);

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
        (item) =>
          item.role === "employee" &&
          item.status !== "inactive"
      );

      setEmployees(employeeUsers);

    } catch (error) {
      console.error(
        "Employee fetch error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to load employees"
      );

    } finally {
      setLoadingEmployees(false);
    }
  };

  // =========================================
  // FETCH TASKS
  // =========================================

  const fetchTasks = async () => {
    try {
      setLoadingTasks(true);

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
        "Task fetch error:",
        error
      );

    } finally {
      setLoadingTasks(false);
    }
  };

  // =========================================
  // LOAD DATA
  // =========================================

  useEffect(() => {
    fetchEmployees();
    fetchTasks();
  }, []);

  // =========================================
  // HANDLE FORM
  // =========================================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =========================================
  // CREATE TASK
  // =========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.assignedTo) {
      alert("Please select an employee");
      return;
    }

    setSubmitting(true);

    try {
      const res = await axios.post(
        "https://jkbcompany-1.onrender.com/admin/create-task",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        res.data.message ||
          "Task created successfully"
      );

      // Clear form

      setForm({
        title: "",
        description: "",
        assignedTo: "",
        dueDate: "",
      });

      // Refresh tasks

      fetchTasks();

    } catch (error) {
      console.error(
        "Create task error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Unable to create task"
      );

    } finally {
      setSubmitting(false);
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
    <div className="admin-tasks-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <header className="admin-tasks-header">

        <div className="admin-tasks-brand">

          <div className="admin-tasks-logo">
            JKB
          </div>

          <div>
            <strong>
              JKB Company
            </strong>

            <span>
              Task Management
            </span>
          </div>

        </div>


        <div className="admin-tasks-header-actions">

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

      <main className="admin-tasks-main">

        {/* PAGE HEADING */}

        <div className="admin-tasks-heading">

          <div>

            <span>
              ADMINISTRATION
            </span>

            <h1>
              Task Management
            </h1>

            <p>
              Assign and monitor employee tasks
              from one centralized dashboard.
            </p>

          </div>

        </div>


        {/* =====================================
            CREATE TASK
        ===================================== */}

        <section className="create-task-card">

          <div className="task-card-heading">

            <span>
              NEW TASK
            </span>

            <h2>
              Assign a Task
            </h2>

            <p>
              Select an active employee and provide
              the task details below.
            </p>

          </div>


          <form onSubmit={handleSubmit}>

            {/* TITLE */}

            <div className="task-input-group">

              <label htmlFor="title">
                Task Title
              </label>

              <input
                id="title"
                type="text"
                name="title"
                placeholder="Enter task title"
                value={form.title}
                onChange={handleChange}
                required
              />

            </div>


            {/* DESCRIPTION */}

            <div className="task-input-group">

              <label htmlFor="description">
                Description
              </label>

              <textarea
                id="description"
                name="description"
                placeholder="Describe the task..."
                rows="4"
                value={form.description}
                onChange={handleChange}
                required
              />

            </div>


            {/* EMPLOYEE + DATE */}

            <div className="task-form-row">

              <div className="task-input-group">

                <label htmlFor="assignedTo">
                  Assign To
                </label>

                <select
                  id="assignedTo"
                  name="assignedTo"
                  value={form.assignedTo}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    {loadingEmployees
                      ? "Loading employees..."
                      : "Select an employee"}
                  </option>

                  {!loadingEmployees &&
                    employees.map(
                      (employee) => (
                        <option
                          key={employee._id}
                          value={employee._id}
                        >
                          {employee.fullname}
                        </option>
                      )
                    )}

                </select>

              </div>


              <div className="task-input-group">

                <label htmlFor="dueDate">
                  Due Date
                </label>

                <input
                  id="dueDate"
                  type="date"
                  name="dueDate"
                  value={form.dueDate}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* SUBMIT */}

            <button
              type="submit"
              className="create-task-button"
              disabled={submitting}
            >
              {submitting
                ? "Creating Task..."
                : "Assign Task →"}
            </button>

          </form>

        </section>


        {/* =====================================
            TASK LIST
        ===================================== */}

        <section className="admin-task-list-card">

          <div className="task-list-heading">

            <div>

              <span>
                WORK MANAGEMENT
              </span>

              <h2>
                Assigned Tasks
              </h2>

            </div>

            <button
              onClick={fetchTasks}
              className="task-refresh-button"
              disabled={loadingTasks}
            >
              {loadingTasks
                ? "Loading..."
                : "↻ Refresh"}
            </button>

          </div>


          {loadingTasks ? (

            <div className="task-message">
              Loading tasks...
            </div>

          ) : tasks.length === 0 ? (

            <div className="task-empty">

              <div>
                ✓
              </div>

              <h3>
                No tasks assigned yet
              </h3>

              <p>
                Create a task above to assign work
                to an employee.
              </p>

            </div>

          ) : (

            <div className="admin-task-list">

              {tasks.map((task) => (

                <div
                  className="admin-task-item"
                  key={task._id}
                >

                  <div className="task-status-icon">
                    ✓
                  </div>


                  <div className="admin-task-info">

                    <h3>
                      {task.title}
                    </h3>

                    <p>
                      {task.description}
                    </p>

                    <div className="task-meta">

                      <span>
                        👤{" "}
                        {task.assignedTo?.fullname ||
                          "Employee"}
                      </span>

                      <span>
                        📅{" "}
                        {new Date(
                          task.dueDate
                        ).toLocaleDateString()}
                      </span>

                    </div>

                  </div>


                  <span
                    className={`task-status ${task.status
                      ?.toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {task.status}
                  </span>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default AdminTasks;