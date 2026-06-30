function WhyChooseUs() {
  return (
    <section
      style={{
        padding: "70px 30px",
        background: "#ffffff",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#0b3d91",
          marginBottom: "20px",
        }}
      >
        Why Choose JKB Company?
      </h2>

      <p
        style={{
          textAlign: "center",
          maxWidth: "800px",
          margin: "0 auto 50px",
          color: "#555",
        }}
      >
        We deliver modern digital solutions with quality, innovation,
        and customer satisfaction as our top priorities.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "25px",
        }}
      >
        <div className="feature-card">
          <h3>🚀 Fast Delivery</h3>
          <p>Projects completed on time without compromising quality.</p>
        </div>

        <div className="feature-card">
          <h3>💻 Latest Technology</h3>
          <p>React, Node.js, MongoDB, Cloud, and modern web technologies.</p>
        </div>

        <div className="feature-card">
          <h3>🤝 Trusted Support</h3>
          <p>Friendly technical support before and after project delivery.</p>
        </div>

        <div className="feature-card">
          <h3>🏆 Quality Assurance</h3>
          <p>Every project is tested carefully for performance and reliability.</p>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;