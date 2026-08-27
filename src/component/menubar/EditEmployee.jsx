import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./EditEmployee.css";

function EditEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const token = localStorage.getItem("token");

  const [employee, setEmployee] = useState({
    fullname: "",
    email: "",
    mobile: "",
    workstatus: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // =========================================
  // CHECK ADMIN
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
          `https://jkbcompany-1.onrender.com/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = res.data.user;

        setEmployee({
          fullname: data.fullname || "",
          email: data.email || "",
          mobile: data.mobile || "",
          workstatus: data.workstatus || "",
        });

      } catch (error) {
        console.error(
          "Fetch employee error:",
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
  // HANDLE INPUT
  // =========================================

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };


  // =========================================
  // UPDATE EMPLOYEE
  // =========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {

      console.log("Updating employee:", id);
      console.log("Data:", employee);

      const res = await axios.put(
        `https://jkbcompany-1.onrender.com/admin/employee/${id}`,
        employee,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(
        "Update response:",
        res.data
      );

      alert(
        res.data.message ||
          "Employee updated successfully"
      );

      navigate("/admin/employees");

    } catch (error) {

      console.error(
        "Update employee error:",
        error
      );

      console.error(
        "Response:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
          "Unable to update employee"
      );

    } finally {
      setSaving(false);
    }
  };


  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <div className="edit-employee-loading">
        Loading employee...
      </div>
    );
  }


  return (
    <div className="edit-employee-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <header className="edit-employee-header">

        <div className="edit-employee-brand">

          <div className="edit-employee-logo">
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


        <div className="edit-employee-header-actions">

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

      <main className="edit-employee-main">

        <div className="edit-employee-card">

          {/* HEADING */}

          <div className="edit-employee-heading">

            <div className="edit-employee-heading-logo">
              JKB
            </div>

            <div>

              <span>
                ADMINISTRATION
              </span>

              <h1>
                Edit Employee
              </h1>

              <p>
                Update employee information.
              </p>

            </div>

          </div>


          {/* =================================
              FORM
          ================================= */}

          <form onSubmit={handleSubmit}>

            {/* FULL NAME */}

            <div className="edit-input-group">

              <label htmlFor="fullname">
                Full Name
              </label>

              <input
                id="fullname"
                type="text"
                name="fullname"
                value={employee.fullname}
                onChange={handleChange}
                required
              />

            </div>


            {/* EMAIL */}

            <div className="edit-input-group">

              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={employee.email}
                onChange={handleChange}
                required
              />

            </div>


            {/* MOBILE */}

            <div className="edit-input-group">

              <label htmlFor="mobile">
                Mobile Number
              </label>

              <input
                id="mobile"
                type="tel"
                name="mobile"
                value={employee.mobile}
                onChange={handleChange}
                required
              />

            </div>


            {/* WORK STATUS */}

            <div className="edit-input-group">

              <label htmlFor="workstatus">
                Work Status
              </label>

              <select
                id="workstatus"
                name="workstatus"
                value={employee.workstatus}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Work Status
                </option>

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

            </div>


            {/* NOTE */}

            <div className="edit-employee-note">

              <span>
                i
              </span>

              <p>
                Role, account status and password
                are managed separately.
              </p>

            </div>


            {/* BUTTONS */}

            <div className="edit-employee-buttons">

              <button
                type="button"
                className="edit-cancel-button"
                onClick={() =>
                  navigate("/admin/employees")
                }
              >
                Cancel
              </button>


              <button
                type="submit"
                className="edit-save-button"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>

            </div>

          </form>

        </div>

      </main>

    </div>
  );
}

export default EditEmployee;