import { Link } from "react-router-dom";
import "./CompanyBenefits.css";

function CompanyBenefits() {
  const features = [
    {
      number: "01",
      title: "Employee Management",
      description:
        "Manage employee profiles, contact details, work status and important information from one centralized platform.",
    },
    {
      number: "02",
      title: "Task Management",
      description:
        "Create, assign and monitor employee tasks to keep daily work organized and improve team productivity.",
    },
    {
      number: "03",
      title: "Employee Records",
      description:
        "Store and organize employee information in a structured system for easy access and efficient administration.",
    },
    {
      number: "04",
      title: "Workforce Monitoring",
      description:
        "Monitor employee work status and organizational activities through a simple and convenient dashboard.",
    },
  ];

  return (
    <section className="services-preview-section">

      <div className="services-preview-container">

        {/* =================================
            SECTION HEADING
        ================================= */}

        <div className="services-preview-heading">

          <span className="services-preview-label">
            EMPLOYEE MANAGEMENT PORTAL
          </span>

          <h2>
            Everything you need to
            <span> manage your workforce</span>
          </h2>

          <p>
            JKB Employee Management Portal helps organizations
            manage employees, work status, tasks and essential
            employee information through one simple and organized platform.
          </p>

        </div>


        {/* =================================
            FEATURE CARDS
        ================================= */}

        <div className="services-preview-grid">

          {features.map((feature) => (
            <div
              className="services-preview-card"
              key={feature.number}
            >

              <div className="services-preview-number">
                {feature.number}
              </div>

              <h3>
                {feature.title}
              </h3>

              <p>
                {feature.description}
              </p>

              <div className="services-preview-arrow">
                →
              </div>

            </div>
          ))}

        </div>


        {/* =================================
            BUTTON
        ================================= */}

        <div className="services-preview-button-wrapper">

          <Link
            to="/services"
            className="services-preview-button"
          >
            Explore Features
            <span>→</span>
          </Link>

        </div>

      </div>

    </section>
  );
}

export default CompanyBenefits;