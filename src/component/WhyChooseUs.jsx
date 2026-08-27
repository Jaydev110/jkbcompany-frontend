import "./WhyChooseUs.css";

function WhyChooseUs() {
  const reasons = [
    {
      number: "01",
      title: "Centralized Employee Data",
      description:
        "Keep employee profiles, contact details and work information organized in one centralized platform.",
    },
    {
      number: "02",
      title: "Easy Task Management",
      description:
        "Assign and monitor employee tasks efficiently so teams can stay organized and productive.",
    },
    {
      number: "03",
      title: "Simple & User Friendly",
      description:
        "A clean and easy-to-use interface helps administrators and employees access the information they need quickly.",
    },
    {
      number: "04",
      title: "Better Organization",
      description:
        "Bring employee information and daily work activities together to make management more efficient.",
    },
  ];

  return (
    <section className="why-section">

      <div className="why-container">

        {/* ==============================
            HEADING
        ============================== */}

        <div className="why-heading">

          <span className="why-label">
            WHY JKB
          </span>

          <h2>
            Why choose
            <span> JKB Company?</span>
          </h2>

          <p>
            JKB Employee Management Portal is designed to
            make employee administration simpler, more organized
            and more efficient for modern organizations.
          </p>

        </div>


        {/* ==============================
            REASON CARDS
        ============================== */}

        <div className="why-grid">

          {reasons.map((reason) => (
            <div
              className="why-card"
              key={reason.number}
            >

              <div className="why-number">
                {reason.number}
              </div>

              <h3>
                {reason.title}
              </h3>

              <p>
                {reason.description}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default WhyChooseUs;