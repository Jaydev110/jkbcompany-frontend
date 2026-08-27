import React from "react";
import { Link } from "react-router-dom";
import "./Services.css";

const Services = () => {
  const features = [
    {
      number: "01",
      title: "Employee Management",
      description:
        "Manage employee profiles, personal details, contact information and work-related data from one centralized system.",
    },
    {
      number: "02",
      title: "Task Management",
      description:
        "Assign tasks, organize daily responsibilities and keep track of employee activities in a structured workflow.",
    },
    {
      number: "03",
      title: "Employee Records",
      description:
        "Maintain employee information in an organized digital system for easier access, management and administration.",
    },
    {
      number: "04",
      title: "Work Status",
      description:
        "Keep employee work status updated so administrators can quickly understand the current workforce situation.",
    },
    {
      number: "05",
      title: "Admin Management",
      description:
        "Provide administrators with centralized access to manage employees, organizational information and system activities.",
    },
    {
      number: "06",
      title: "Secure Authentication",
      description:
        "Login, registration and password reset features help provide controlled and secure access to the portal.",
    },
    {
      number: "07",
      title: "Centralized Dashboard",
      description:
        "View important employee and organizational information through a simple and convenient dashboard.",
    },
    {
      number: "08",
      title: "Scalable Platform",
      description:
        "The portal is designed so additional employee management features can be added as organizational needs grow.",
    },
  ];

  return (
    <div className="jkb-services-page">

      {/* =========================================
          SERVICES HERO
      ========================================= */}

      <section className="services-hero">

        <div className="services-hero-container">

          <div className="services-hero-content">

            <span className="services-label">
              JKB EMPLOYEE MANAGEMENT PORTAL
            </span>

            <h1>
              Powerful tools for
              <span> better employee management</span>
            </h1>

            <p>
              JKB brings essential employee management
              features together in one organized platform,
              helping organizations manage their workforce
              more efficiently.
            </p>

          </div>


          <div className="services-hero-visual">

            <div className="services-main-box">
              JKB
            </div>

            <div className="services-status-card">

              <span className="status-dot"></span>

              <div>
                <strong>
                  Portal Ready
                </strong>

                <small>
                  Employee management system
                </small>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          FEATURES
      ========================================= */}

      <section className="services-features-section">

        <div className="services-container">

          <div className="services-heading">

            <span className="services-section-label">
              PORTAL FEATURES
            </span>

            <h2>
              Everything in one
              <span> employee management platform</span>
            </h2>

            <p>
              From employee information to tasks and
              administration, JKB provides the essential
              tools needed to organize workforce management.
            </p>

          </div>


          <div className="services-features-grid">

            {features.map((feature) => (
              <div
                className="services-feature-card"
                key={feature.number}
              >

                <div className="services-feature-number">
                  {feature.number}
                </div>

                <h3>
                  {feature.title}
                </h3>

                <p>
                  {feature.description}
                </p>

                <div className="services-feature-arrow">
                  →
                </div>

              </div>
            ))}

          </div>

        </div>

      </section>


      {/* =========================================
          HOW IT HELPS
      ========================================= */}

      <section className="services-benefit-section">

        <div className="services-benefit-container">

          <div className="services-benefit-content">

            <span className="services-section-label">
              WHY IT MATTERS
            </span>

            <h2>
              Make employee administration
              <span> simpler and more organized</span>
            </h2>

            <p>
              Instead of managing employee information
              across disconnected records, JKB provides
              a centralized environment where important
              workforce information can be managed more
              efficiently.
            </p>

            <div className="services-benefit-points">

              <div>
                <strong>✓</strong>
                <span>
                  Centralized employee information
                </span>
              </div>

              <div>
                <strong>✓</strong>
                <span>
                  Easier task organization
                </span>
              </div>

              <div>
                <strong>✓</strong>
                <span>
                  Better workforce visibility
                </span>
              </div>

              <div>
                <strong>✓</strong>
                <span>
                  Simple user experience
                </span>
              </div>

            </div>

          </div>


          <div className="services-benefit-visual">

            <div className="services-dashboard-card">

              <div className="dashboard-top">
                <span>
                  JKB Dashboard
                </span>

                <span className="dashboard-online">
                  ●
                </span>
              </div>

              <div className="dashboard-profile">

                <div className="dashboard-avatar">
                  J
                </div>

                <div>
                  <strong>
                    Employee Portal
                  </strong>

                  <small>
                    Management Dashboard
                  </small>
                </div>

              </div>

              <div className="dashboard-boxes">

                <div>
                  <strong>120+</strong>
                  <span>Employees</span>
                </div>

                <div>
                  <strong>35</strong>
                  <span>Tasks</span>
                </div>

                <div>
                  <strong>98%</strong>
                  <span>Active</span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          CTA
      ========================================= */}

      <section className="services-cta-section">

        <div className="services-cta-container">

          <div>

            <span>
              JKB EMPLOYEE MANAGEMENT
            </span>

            <h2>
              Ready to simplify employee management?
            </h2>

            <p>
              Log in to your account or create a new
              account to get started with JKB.
            </p>

          </div>

          <div className="services-cta-buttons">

            <Link
              to="/login"
              className="services-login-button"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="services-register-button"
            >
              Register
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Services;