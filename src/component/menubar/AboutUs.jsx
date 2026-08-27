import React from "react";
import { Link } from "react-router-dom";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="jkb-about-page">

      {/* =========================================
          ABOUT HERO
      ========================================= */}

      <section className="about-hero">

        <div className="about-hero-container">

          <div className="about-hero-content">

            <span className="about-label">
              ABOUT JKB COMPANY
            </span>

            <h1>
              Making employee
              <span> management simpler</span>
            </h1>

            <p>
              JKB Employee Management Portal is a centralized
              platform designed to help organizations manage
              employee information, work status and daily
              activities in a simple and organized way.
            </p>

          </div>

          <div className="about-hero-visual">

            <div className="about-logo-box">
              JKB
            </div>

            <div className="about-floating-card">
              <strong>
                Employee Management
              </strong>

              <span>
                Simple • Organized • Efficient
              </span>
            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          WHO WE ARE
      ========================================= */}

      <section className="about-who-section">

        <div className="about-who-container">

          <div className="about-who-heading">

            <span className="about-section-label">
              WHO WE ARE
            </span>

            <h2>
              One platform for
              <span> better workforce management</span>
            </h2>

          </div>

          <div className="about-who-content">

            <p>
              JKB Company focuses on creating practical
              digital solutions that help organizations
              manage their day-to-day operations more
              efficiently.
            </p>

            <p>
              The JKB Employee Management Portal brings
              important employee information into one
              centralized system. It helps administrators
              manage employee profiles, work status and
              organizational activities without relying
              on disconnected records.
            </p>

            <p>
              Our goal is to make employee administration
              simpler, more organized and easier to access
              through a clean and user-friendly platform.
            </p>

          </div>

        </div>

      </section>


      {/* =========================================
          WHAT THE PORTAL PROVIDES
      ========================================= */}

      <section className="about-features-section">

        <div className="about-features-container">

          <div className="about-features-heading">

            <span className="about-section-label">
              OUR APPROACH
            </span>

            <h2>
              Built around the needs of
              <span> modern organizations</span>
            </h2>

          </div>


          <div className="about-features-grid">

            <div className="about-feature-card">

              <div className="about-feature-number">
                01
              </div>

              <h3>
                Centralized Information
              </h3>

              <p>
                Keep employee details and work-related
                information organized in one place.
              </p>

            </div>


            <div className="about-feature-card">

              <div className="about-feature-number">
                02
              </div>

              <h3>
                Easy Management
              </h3>

              <p>
                Simplify everyday employee administration
                with a clean and easy-to-use interface.
              </p>

            </div>


            <div className="about-feature-card">

              <div className="about-feature-number">
                03
              </div>

              <h3>
                Better Organization
              </h3>

              <p>
                Keep employee records, work status and
                activities structured for easier access.
              </p>

            </div>


            <div className="about-feature-card">

              <div className="about-feature-number">
                04
              </div>

              <h3>
                Scalable Platform
              </h3>

              <p>
                Designed to support growing organizational
                needs and future employee management features.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          MISSION
      ========================================= */}

      <section className="about-mission-section">

        <div className="about-mission-container">

          <div className="about-mission-content">

            <span className="about-section-label">
              OUR MISSION
            </span>

            <h2>
              Helping organizations
              <span> work better</span>
            </h2>

            <p>
              Our mission is to provide a reliable and
              user-friendly employee management platform
              that helps organizations save time, organize
              employee information and improve everyday
              workforce administration.
            </p>

          </div>

        </div>

      </section>


      {/* =========================================
          CTA
      ========================================= */}

      <section className="about-cta-section">

        <div className="about-cta-container">

          <div>
            <span>
              JKB EMPLOYEE MANAGEMENT PORTAL
            </span>

            <h2>
              Ready to manage your workforce better?
            </h2>

            <p>
              Explore the platform and discover how
              JKB can simplify employee management.
            </p>
          </div>

          <Link
            to="/login"
            className="about-cta-button"
          >
            Get Started →
          </Link>

        </div>

      </section>

    </div>
  );
};

export default AboutUs;