import { Routes, Route, useLocation } from "react-router-dom";

import NavBar from "./NavBar";
import Footer from "./component/Footer";

// =========================================
// PUBLIC PAGES
// =========================================

import Home from "./component/menubar/Home";
import AboutUs from "./component/menubar/AboutUs";
import Services from "./component/menubar/Services";
import Contact from "./component/menubar/ContactUs";

import Login from "./component/menubar/login";
import ResetPassword from "./component/menubar/ResetPassword";


// =========================================
// EMPLOYEE PORTAL
// =========================================

import Dashboard from "./component/menubar/Dashboard";
import MyProfile from "./component/menubar/MyProfile";
import MyTasks from "./component/menubar/MyTasks";
import EmployeeWorkStatus from "./component/menubar/EmployeeWorkStatus";
import EmployeeSettings from "./component/menubar/EmployeeSettings";


// =========================================
// ADMIN PORTAL
// =========================================

import AdminDashboard from "./component/menubar/AdminDashboard";
import AdminProfile from "./component/menubar/AdminProfile";
import AdminSettings from "./component/menubar/AdminSettings";


// =========================================
// ADMIN EMPLOYEE MANAGEMENT
// =========================================

import ManageEmployees from "./component/menubar/ManageEmployees";
import AddEmployee from "./component/menubar/AddEmployee";
import ViewEmployee from "./component/menubar/ViewEmployee";
import EditEmployee from "./component/menubar/EditEmployee";


// =========================================
// ADMIN TASK MANAGEMENT
// =========================================

import AdminTasks from "./component/menubar/AdminTasks";


// =========================================
// ADMIN WORK STATUS
// =========================================

import WorkStatus from "./component/menubar/WorkStatus";


// =========================================
// PUBLIC LAYOUT
// =========================================

function PublicLayout({ children }) {
  return (
    <>
      <NavBar />

      {children}

      <Footer />
    </>
  );
}


// =========================================
// APP
// =========================================

function App() {
  const location = useLocation();


  // =========================================
  // PORTAL PAGE CHECK
  // =========================================

  const isPortalPage =
    // -----------------------------------------
    // EMPLOYEE PORTAL
    // -----------------------------------------

    location.pathname === "/dashboard" ||

    location.pathname === "/my-profile" ||

    location.pathname === "/my-tasks" ||

    location.pathname === "/employee-work-status" ||

    location.pathname === "/employee-settings" ||


    // -----------------------------------------
    // ADMIN PORTAL
    // -----------------------------------------

    location.pathname === "/admin-dashboard" ||

    location.pathname === "/admin-profile" ||

    location.pathname === "/admin-settings" ||


    // -----------------------------------------
    // ADMIN SUB-PAGES
    // -----------------------------------------

    location.pathname.startsWith("/admin/");


  return (
    <>
      {isPortalPage ? (

        // =====================================
        // PORTAL ROUTES
        // No Public Navbar / Footer
        // =====================================

        <Routes>

          {/* =================================
              EMPLOYEE PORTAL
          ================================= */}

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />


          <Route
            path="/my-profile"
            element={<MyProfile />}
          />


          <Route
            path="/my-tasks"
            element={<MyTasks />}
          />


          <Route
            path="/employee-work-status"
            element={<EmployeeWorkStatus />}
          />


          <Route
            path="/employee-settings"
            element={<EmployeeSettings />}
          />


          {/* =================================
              ADMIN PORTAL
          ================================= */}

          <Route
            path="/admin-dashboard"
            element={<AdminDashboard />}
          />


          <Route
            path="/admin-profile"
            element={<AdminProfile />}
          />


          <Route
            path="/admin-settings"
            element={<AdminSettings />}
          />


          {/* =================================
              EMPLOYEE MANAGEMENT
          ================================= */}

          <Route
            path="/admin/employees"
            element={<ManageEmployees />}
          />


          <Route
            path="/admin/employees/add"
            element={<AddEmployee />}
          />


          <Route
            path="/admin/employees/view/:id"
            element={<ViewEmployee />}
          />


          <Route
            path="/admin/employees/edit/:id"
            element={<EditEmployee />}
          />


          {/* =================================
              TASK MANAGEMENT
          ================================= */}

          <Route
            path="/admin/tasks"
            element={<AdminTasks />}
          />


          {/* =================================
              WORK STATUS
          ================================= */}

          <Route
            path="/admin/work-status"
            element={<WorkStatus />}
          />

        </Routes>

      ) : (

        // =====================================
        // PUBLIC WEBSITE
        // Navbar + Page + Footer
        // =====================================

        <PublicLayout>

          <Routes>

            {/* =================================
                HOME
            ================================= */}

            <Route
              path="/"
              element={<Home />}
            />


            {/* =================================
                ABOUT
            ================================= */}

            <Route
              path="/about"
              element={<AboutUs />}
            />


            {/* =================================
                SERVICES
            ================================= */}

            <Route
              path="/services"
              element={<Services />}
            />


            {/* =================================
                CONTACT
            ================================= */}

            <Route
              path="/contact"
              element={<Contact />}
            />


            {/* =================================
                LOGIN
            ================================= */}

            <Route
              path="/login"
              element={<Login />}
            />


            {/* =================================
                RESET PASSWORD
            ================================= */}

            <Route
              path="/reset-password"
              element={<ResetPassword />}
            />

          </Routes>

        </PublicLayout>

      )}
    </>
  );
}

export default App;