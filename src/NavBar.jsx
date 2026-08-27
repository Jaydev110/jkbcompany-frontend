import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="jkb-navbar">

      <div className="jkb-navbar-container">

        {/* =================================
            JKB BRAND
        ================================= */}

        <Link
          to="/"
          className="jkb-navbar-brand"
        >

          <div className="jkb-navbar-logo">
            JKB
          </div>

          <div className="jkb-navbar-brand-text">

            <strong>
              JKB Company
            </strong>

            <span>
              Employee Management Portal
            </span>

          </div>

        </Link>


        {/* =================================
            NAVIGATION LINKS
        ================================= */}

        <div className="jkb-navbar-links">

          <Link
            to="/"
            className={
              isActive("/")
                ? "jkb-navbar-link active"
                : "jkb-navbar-link"
            }
          >
            Home
          </Link>


          <Link
            to="/about"
            className={
              isActive("/about")
                ? "jkb-navbar-link active"
                : "jkb-navbar-link"
            }
          >
            About
          </Link>


          <Link
            to="/services"
            className={
              isActive("/services")
                ? "jkb-navbar-link active"
                : "jkb-navbar-link"
            }
          >
            Services
          </Link>


          <Link
            to="/contact"
            className={
              isActive("/contact")
                ? "jkb-navbar-link active"
                : "jkb-navbar-link"
            }
          >
            Contact
          </Link>

        </div>


        {/* =================================
            AUTH BUTTONS
        ================================= */}

        <div className="jkb-navbar-actions">

          <Link
            to="/login"
            className="jkb-navbar-login"
          >
            Login
          </Link>

{/* 
          <Link
            to="/register"
            className="jkb-navbar-register"
          >
            Get Started
          </Link> */}

        </div>

      </div>

    </nav>
  );
};

export default NavBar;