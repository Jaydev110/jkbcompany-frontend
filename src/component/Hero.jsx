function Hero() {
  return (
    <div
      style={{
        background: "#0b3d91",
        color: "white",
        padding: "100px 20px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "55px", color:"white"}}>
        Welcome to JKB Company
      </h1>

      <h3>
        Building Modern Digital Solutions
      </h3>

      <p style={{ maxWidth: "700px", margin: "20px auto" }}>
        We provide Website Development, Software Development,
        Mobile Apps and IT Solutions for businesses.
      </p>

      <button
        style={{
          background: "white",
          color: "#0b3d91",
          padding: "12px 35px",
          border: "none",
          borderRadius: "5px",
          fontWeight: "bold",
        }}
      >
        Explore Services
      </button>
    </div>
  );
}

export default Hero;
