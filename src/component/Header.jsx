import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="jkb-header">

      <div className="jkb-header-container">

        {/* =================================
            JKB LOGO
        ================================= */}

        <Link to="/" className="jkb-brand">

          <div className="jkb-brand-logo">
            JKB
          </div>

          <div className="jkb-brand-text">
            <strong>JKB Company</strong>
            <span>Employee Management</span>
          </div>

        </Link>


        {/* =================================
            NAVIGATION
        ================================= */}

        <nav className="jkb-navigation">

          <Link
            to="/"
            className={
              isActive("/")
                ? "jkb-nav-link active"
                : "jkb-nav-link"
            }
          >
            Home
          </Link>

          <Link
            to="/about"
            className={
              isActive("/about")
                ? "jkb-nav-link active"
                : "jkb-nav-link"
            }
          >
            About
          </Link>

          <Link
            to="/services"
            className={
              isActive("/services")
                ? "jkb-nav-link active"
                : "jkb-nav-link"
            }
          >
            Services
          </Link>

          <Link
            to="/contact"
            className={
              isActive("/contact")
                ? "jkb-nav-link active"
                : "jkb-nav-link"
            }
          >
            Contact
          </Link>

        </nav>


        {/* =================================
            AUTH BUTTONS
        ================================= */}

        <div className="jkb-header-actions">

          <Link
            to="/login"
            className="jkb-login-link"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="jkb-register-link"
          >
            Get Started
          </Link>

        </div>

      </div>

    </header>
  );
};

export default Header;