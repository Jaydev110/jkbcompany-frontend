import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <section className="jkb-hero">

      <div className="hero-container">

        {/* ==============================
            LEFT SIDE
        ============================== */}

        <div className="hero-content">

          <div className="hero-badge">
            JKB COMPANY
          </div>

          <h1>
            Manage Your
            <span> Company Smarter</span>
          </h1>

          <p>
            A modern employee management platform
            designed to simplify your company,
            employees, tasks and daily operations.
          </p>

          <div className="hero-buttons">

            <Link
              to="/register"
              className="hero-primary-btn"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="hero-secondary-btn"
            >
              Login
            </Link>

          </div>

        </div>


        {/* ==============================
            RIGHT SIDE
        ============================== */}

        <div className="hero-visual">

          <div className="hero-circle"></div>

          <div className="hero-card main-card">

            <div className="card-header">
              <span>
                Employee Dashboard
              </span>

              <span className="online-dot"></span>
            </div>

            <div className="employee-info">

              <div className="employee-avatar">
                J
              </div>

              <div>
                <h3>
                  Welcome to JKB
                </h3>

                <p>
                  Employee Management
                </p>
              </div>

            </div>


            <div className="dashboard-stats">

              <div className="stat-box">
                <strong>120+</strong>
                <span>Employees</span>
              </div>

              <div className="stat-box">
                <strong>35</strong>
                <span>Projects</span>
              </div>

              <div className="stat-box">
                <strong>98%</strong>
                <span>Efficiency</span>
              </div>

            </div>

          </div>


          {/* FLOATING CARD 1 */}

          <div className="floating-card floating-one">

            <div className="floating-icon">
              ✓
            </div>

            <div>
              <strong>
                Tasks Completed
              </strong>

              <small>
                Today
              </small>
            </div>

          </div>


          {/* FLOATING CARD 2 */}

          <div className="floating-card floating-two">

            <div className="floating-icon">
              +
            </div>

            <div>
              <strong>
                New Employee
              </strong>

              <small>
                Added Successfully
              </small>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;