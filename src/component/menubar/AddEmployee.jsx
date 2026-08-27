import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddEmployee.css";

function AddEmployee() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const token = localStorage.getItem("token");

  const [employee, setEmployee] = useState({
    fullname: "",
    email: "",
    password: "",
    mobile: "",
    workstatus: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // =========================================
  // ADMIN CHECK
  // =========================================

  if (!user || user.role !== "admin") {
    navigate("/login");
    return null;
  }

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
  // CREATE EMPLOYEE
  // =========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/admin/create-employee",
        employee,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        res.data.message ||
          "Employee created successfully"
      );

      // Clear form

      setEmployee({
        fullname: "",
        email: "",
        password: "",
        mobile: "",
        workstatus: "",
      });

      // Go back to employee list

      navigate("/admin/employees");

    } catch (error) {
      console.error(
        "Create employee error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Unable to create employee"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-employee-page">

      <div className="add-employee-card">

        {/* JKB LOGO */}

        <div className="add-employee-logo">
          JKB
        </div>

        <h1>
          Add New Employee
        </h1>

        <p className="add-employee-subtitle">
          Create an employee account from the
          JKB Admin Portal.
        </p>


        <form onSubmit={handleSubmit}>

          {/* FULL NAME */}

          <div className="add-employee-group">

            <label htmlFor="fullname">
              Full Name
            </label>

            <input
              id="fullname"
              type="text"
              name="fullname"
              placeholder="Enter employee name"
              value={employee.fullname}
              onChange={handleChange}
              required
            />

          </div>


          {/* EMAIL */}

          <div className="add-employee-group">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter employee email"
              value={employee.email}
              onChange={handleChange}
              required
            />

          </div>


          {/* PASSWORD */}

          <div className="add-employee-group">

            <label htmlFor="password">
              Initial Password
            </label>

            <div className="add-employee-password">

              <input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Create employee password"
                value={employee.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </button>

            </div>

          </div>


          {/* MOBILE */}

          <div className="add-employee-group">

            <label htmlFor="mobile">
              Mobile Number
            </label>

            <input
              id="mobile"
              type="tel"
              name="mobile"
              placeholder="Enter mobile number"
              value={employee.mobile}
              onChange={handleChange}
              required
            />

          </div>


          {/* WORK STATUS */}

          <div className="add-employee-group">

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


          {/* CREATE BUTTON */}

          <button
            type="submit"
            className="add-employee-button"
            disabled={loading}
          >
            {loading
              ? "Creating Employee..."
              : "Create Employee"}
          </button>

        </form>


        {/* BACK BUTTON */}

        <button
          type="button"
          className="back-admin-button"
          onClick={() =>
            navigate("/admin/employees")
          }
        >
          ← Back to Employees
        </button>

      </div>

    </div>
  );
}

export default AddEmployee;