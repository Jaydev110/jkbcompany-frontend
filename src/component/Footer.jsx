import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="jkb-footer">

      {/* =========================================
          MAIN FOOTER
      ========================================= */}

      <div className="jkb-footer-container">

        {/* BRAND */}

        <div className="jkb-footer-brand">

          <Link
            to="/"
            className="jkb-footer-logo-link"
          >
            <div className="jkb-footer-logo">
              JKB
            </div>

            <div className="jkb-footer-brand-text">

              <strong>
                JKB Company
              </strong>

              <span>
                Employee Management Portal
              </span>

            </div>
          </Link>

          <p>
            A simple and organized employee management
            platform designed to help organizations manage
            their workforce more efficiently.
          </p>

        </div>


        {/* QUICK LINKS */}

        <div className="jkb-footer-column">

          <h3>
            Quick Links
          </h3>

          <Link to="/">
            Home
          </Link>

          <Link to="/about">
            About
          </Link>

          <Link to="/services">
            Services
          </Link>

          <Link to="/contact">
            Contact
          </Link>

        </div>


        {/* PORTAL */}

        <div className="jkb-footer-column">

          <h3>
            Portal
          </h3>

          <Link to="/login">
            Login
          </Link>

          <Link to="/register">
            Register
          </Link>

          <Link to="/reset-password">
            Reset Password
          </Link>

        </div>


        {/* CONTACT */}

        <div className="jkb-footer-column jkb-footer-contact">

          <h3>
            Contact
          </h3>

          <a href="mailto:jkbcompany@gmail.com">
            jkbcompany@gmail.com
          </a>

          <a href="tel:+918260912154">
            +91 8260912154
          </a>

          <span>
            Puri, Odisha, India
          </span>

        </div>

      </div>


      {/* =========================================
          BOTTOM FOOTER
      ========================================= */}

      <div className="jkb-footer-bottom">

        <div className="jkb-footer-bottom-container">

          <p>
            © {new Date().getFullYear()} JKB Company.
            All rights reserved.
          </p>

          <p>
            Employee Management Portal
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;