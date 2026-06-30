function CompanyBenefits() {
  const benefits = [
    {
      title: "Web Development",
      description: "Modern, responsive and high-performance websites."
    },
    {
      title: "Mobile Apps",
      description: "Android and iOS applications for your business."
    },
    {
      title: "Software Solutions",
      description: "Custom software tailored to your organization."
    },
    {
      title: "24/7 Support",
      description: "Reliable customer support whenever you need it."
    }
  ];

  return (
    <div
      style={{
        padding: "60px 30px",
        background: "#f5f7fa",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#0b3d91",
          marginBottom: "40px",
        }}
      >
        Our Services
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "25px",
        }}
      >
        {benefits.map((item, index) => (
          <div
            key={index}
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 5px 15px rgba(0,0,0,.1)",
              textAlign: "center",
            }}
          >
            <h3>{item.title}</h3>

            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompanyBenefits;